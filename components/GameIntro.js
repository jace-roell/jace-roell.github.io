"use client";

import TicTacToe from "./games/TicTacToe";
import ConnectFour from "./games/ConnectFour";
import Minesweeper from "./games/Minesweeper";
import "../styles/gameIntro.css";

export default function GameIntro() {
  return (
    <div className="game-intro">
      <TicTacToe />
      <ConnectFour />
      <Minesweeper />
    </div>
  );
}
