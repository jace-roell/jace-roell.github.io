"use client";

import { useState, useCallback, useEffect } from "react";

const ROWS = 8;
const COLS = 8;
const MINES = 10;
const MINE = -1;
const RESET_DELAY = 1000;

const neighbors = (r, c) => {
  const list = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) list.push([nr, nc]);
    }
  }
  return list;
};

const makeEmpty = () => ({
  board: Array.from({ length: ROWS }, () => Array(COLS).fill(0)),
  revealed: Array.from({ length: ROWS }, () => Array(COLS).fill(false)),
  flagged: Array.from({ length: ROWS }, () => Array(COLS).fill(false)),
  started: false,
  status: "playing",
});

const placeMines = (board, safeR, safeC) => {
  const forbidden = new Set(
    neighbors(safeR, safeC)
      .concat([[safeR, safeC]])
      .map(([r, c]) => `${r},${c}`)
  );

  const spots = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!forbidden.has(`${r},${c}`)) spots.push([r, c]);
    }
  }

  for (let i = spots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [spots[i], spots[j]] = [spots[j], spots[i]];
  }

  for (let i = 0; i < MINES; i++) {
    const [r, c] = spots[i];
    board[r][c] = MINE;
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] === MINE) continue;
      board[r][c] = neighbors(r, c).filter(([nr, nc]) => board[nr][nc] === MINE)
        .length;
    }
  }
};

const countRevealed = (revealed) =>
  revealed.flat().filter(Boolean).length;

export default function Minesweeper() {
  const [state, setState] = useState(makeEmpty);

  const reset = useCallback(() => setState(makeEmpty()), []);

  useEffect(() => {
    if (state.status === "won" || state.status === "lost") {
      const t = setTimeout(reset, RESET_DELAY);
      return () => clearTimeout(t);
    }
  }, [state.status, reset]);

  const reveal = (r, c) => {
    if (state.status !== "playing" || state.flagged[r][c]) return;

    setState((prev) => {
      if (prev.revealed[r][c]) return prev;

      const board = prev.board.map((row) => [...row]);
      const revealed = prev.revealed.map((row) => [...row]);
      const flagged = prev.flagged.map((row) => [...row]);
      let started = prev.started;
      let status = prev.status;

      if (!started) {
        placeMines(board, r, c);
        started = true;
      }

      const flood = (row, col) => {
        if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return;
        if (revealed[row][col] || flagged[row][col]) return;

        revealed[row][col] = true;

        if (board[row][col] === MINE) {
          status = "lost";
          for (let mr = 0; mr < ROWS; mr++) {
            for (let mc = 0; mc < COLS; mc++) {
              if (board[mr][mc] === MINE) revealed[mr][mc] = true;
            }
          }
          return;
        }

        if (board[row][col] === 0) {
          for (const [nr, nc] of neighbors(row, col)) flood(nr, nc);
        }
      };

      flood(r, c);

      if (status !== "lost") {
        const safeCells = ROWS * COLS - MINES;
        if (countRevealed(revealed) >= safeCells) status = "won";
      }

      return { board, revealed, flagged, started, status };
    });
  };

  const toggleFlag = (r, c, e) => {
    e.preventDefault();
    if (state.status !== "playing" || state.revealed[r][c]) return;

    setState((prev) => {
      const flagged = prev.flagged.map((row) => [...row]);
      flagged[r][c] = !flagged[r][c];
      return { ...prev, flagged };
    });
  };

  const cellClass = (r, c) => {
    const { revealed, flagged, board, status } = state;
    const classes = ["ms-cell"];

    if (revealed[r][c]) {
      classes.push("ms-cell--revealed");
      if (board[r][c] === MINE) classes.push("ms-cell--mine");
      else if (board[r][c] > 0) classes.push(`ms-cell--n${board[r][c]}`);
    } else if (flagged[r][c]) {
      classes.push("ms-cell--flagged");
    }

    if (status === "won") classes.push("ms-cell--won");
    if (status === "lost" && revealed[r][c] && board[r][c] === MINE) {
      classes.push("ms-cell--boom");
    }

    return classes.join(" ");
  };

  const cellLabel = (r, c) => {
    const { revealed, board } = state;
    if (!revealed[r][c]) return "";
    if (board[r][c] === MINE) return "";
    if (board[r][c] === 0) return "";
    return String(board[r][c]);
  };

  return (
    <div
      className="game-panel game-panel--ms"
      role="presentation"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="ms-grid">
        {Array.from({ length: ROWS }, (_, r) =>
          Array.from({ length: COLS }, (_, c) => (
            <button
              key={`${r}-${c}`}
              type="button"
              className={cellClass(r, c)}
              onClick={() => reveal(r, c)}
              onContextMenu={(e) => toggleFlag(r, c, e)}
              disabled={state.status !== "playing"}
              aria-label=""
            >
              {cellLabel(r, c)}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
