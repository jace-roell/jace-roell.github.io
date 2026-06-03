"use client";

import { useState, useCallback, useEffect } from "react";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const winner = (board) => {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes(null) ? null : "draw";
};

const minimax = (board, isMax) => {
  const result = winner(board);
  if (result === "O") return 1;
  if (result === "X") return -1;
  if (result === "draw") return 0;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "O";
        best = Math.max(best, minimax(board, false));
        board[i] = null;
      }
    }
    return best;
  }

  let best = Infinity;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "X";
      best = Math.min(best, minimax(board, true));
      board[i] = null;
    }
  }
  return best;
};

const bestMove = (board) => {
  let bestScore = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "O";
      const score = minimax(board, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};

const EMPTY = Array(9).fill(null);
const SITE_DELAY = 280;

export default function TicTacToe() {
  const [board, setBoard] = useState(EMPTY);
  const [locked, setLocked] = useState(false);

  const reset = useCallback(() => {
    setBoard(EMPTY);
    setLocked(false);
  }, []);

  useEffect(() => {
    const result = winner(board);
    if (result) {
      const t = setTimeout(reset, 900);
      return () => clearTimeout(t);
    }
  }, [board, reset]);

  const play = (index) => {
    if (locked || board[index] || winner(board)) return;

    const next = [...board];
    next[index] = "X";
    setBoard(next);
    setLocked(true);

    if (winner(next)) {
      setLocked(false);
      return;
    }

    setTimeout(() => {
      const move = bestMove(next);
      if (move === -1) {
        setLocked(false);
        return;
      }
      const after = [...next];
      after[move] = "O";
      setBoard(after);
      setLocked(false);
    }, SITE_DELAY);
  };

  return (
    <div className="game-panel game-panel--ttt" role="presentation">
      <div className="ttt-grid">
        {board.map((cell, i) => (
          <button
            key={i}
            type="button"
            className={`ttt-cell ${cell ? `ttt-cell--${cell.toLowerCase()}` : ""}`}
            onClick={() => play(i)}
            disabled={locked || !!cell || !!winner(board)}
            aria-label=""
          />
        ))}
      </div>
    </div>
  );
}
