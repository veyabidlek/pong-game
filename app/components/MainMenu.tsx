import React from "react";

export const MainMenu: React.FC<{ onStartGame: () => void }> = ({
  onStartGame,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-6xl font-bold mb-8">PONG</h1>
      <div className="space-y-4">
        <button
          onClick={onStartGame}
          className="block w-64 px-8 py-4 text-2xl border-2 border-white hover:bg-white hover:text-black transition-colors"
        >
          START GAME
        </button>
        <div className="text-center text-sm mt-8">
          <p>Player 1: W/S keys</p>
          <p>Player 2: ↑/↓ keys</p>
        </div>
      </div>
    </div>
  );
};
