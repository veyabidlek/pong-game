import React from "react";
import { Game } from "../classes/Game";

export const GameOverScreen: React.FC<{
  game: Game;
  onBackToMenu: () => void;
}> = ({ game, onBackToMenu }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-6xl font-bold mb-8">GAME OVER</h1>
      <p className="text-4xl mb-8">
        Player {game.score1 >= game.scoreLimit ? "1" : "2"} Wins!
      </p>
      <p className="text-2xl mb-8">
        Score: {game.score1} - {game.score2}
      </p>
      <button
        onClick={onBackToMenu}
        className="px-8 py-4 text-2xl border-2 border-white hover:bg-white hover:text-black transition-colors"
      >
        MAIN MENU
      </button>
    </div>
  );
};
