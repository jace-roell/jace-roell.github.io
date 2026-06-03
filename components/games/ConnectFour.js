"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  ROWS,
  COLS,
  SITE,
  PLAYER,
  drop,
  checkWin,
  siteMove as siteMoveSync,
} from "../../lib/connectFourAi";

const SITE_DELAY = 320;

const emptyBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(null));

const full = (board) => board[0].every((cell) => cell !== null);

export default function ConnectFour() {
  const [board, setBoard] = useState(emptyBoard);
  const [locked, setLocked] = useState(false);
  const workerRef = useRef(null);
  const requestIdRef = useRef(0);
  const pendingBoardRef = useRef(null);

  const reset = useCallback(() => {
    setBoard(emptyBoard());
    setLocked(false);
    pendingBoardRef.current = null;
    requestIdRef.current += 1;
  }, []);

  useEffect(() => {
    if (typeof Worker === "undefined") return;

    const worker = new Worker(
      new URL("./connectFour.worker.js", import.meta.url)
    );
    workerRef.current = worker;

    worker.onmessage = ({ data: { col, requestId } }) => {
      if (requestId !== requestIdRef.current) return;

      const afterPlayer = pendingBoardRef.current;
      pendingBoardRef.current = null;

      if (!afterPlayer) {
        setLocked(false);
        return;
      }

      if (col === -1) {
        setLocked(false);
        return;
      }

      const afterSite = drop(afterPlayer, col, SITE);
      if (afterSite) setBoard(afterSite);
      setLocked(false);
    };

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (checkWin(board, PLAYER) || checkWin(board, SITE) || full(board)) {
      const t = setTimeout(reset, 1000);
      return () => clearTimeout(t);
    }
  }, [board, reset]);

  const runSiteMove = (afterPlayer) => {
    const requestId = ++requestIdRef.current;
    pendingBoardRef.current = afterPlayer;

    const applyMove = (colMove) => {
      if (requestId !== requestIdRef.current) return;

      pendingBoardRef.current = null;

      if (colMove === -1) {
        setLocked(false);
        return;
      }

      const afterSite = drop(afterPlayer, colMove, SITE);
      if (afterSite) setBoard(afterSite);
      setLocked(false);
    };

    window.setTimeout(() => {
      if (requestId !== requestIdRef.current) return;

      const worker = workerRef.current;
      if (worker) {
        worker.postMessage({ board: afterPlayer, requestId });
        return;
      }

      applyMove(siteMoveSync(afterPlayer));
    }, SITE_DELAY);
  };

  const playCol = (col) => {
    if (locked || board[0][col]) return;

    const afterPlayer = drop(board, col, PLAYER);
    if (!afterPlayer) return;

    setBoard(afterPlayer);

    if (checkWin(afterPlayer, PLAYER) || full(afterPlayer)) {
      return;
    }

    setLocked(true);
    runSiteMove(afterPlayer);
  };

  return (
    <div className="game-panel game-panel--c4" role="presentation">
      <div className="c4-board">
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              type="button"
              className={`c4-slot ${cell ? `c4-slot--${cell.toLowerCase()}` : ""}`}
              onClick={() => playCol(c)}
              disabled={locked || !!cell}
              aria-label=""
            />
          ))
        )}
      </div>
    </div>
  );
}
