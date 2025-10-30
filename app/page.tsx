"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Game } from "./classes/Game";
import { MainMenu } from "./components/MainMenu";
import { GameOverScreen } from "./components/GameOverScreen";
import { useKeyboardInput } from "./hooks/useKeyboardInput";
import { drawGameScene } from "./utils/drawGameScene";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const PongGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"menu" | "playing" | "ended">(
    "menu"
  );
  const [game, setGame] = useState<Game | null>(null);
  const keysPressed = useKeyboardInput();
  const animationFrameId = useRef<number>(0);

  const gameLoop = useCallback(() => {
    if (!game || !game.isActive) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    game.processInput(keysPressed.current);
    game.updatePosition();

    if (game.ball.isLineCrossed(CANVAS_WIDTH)) {
      game.increaseScore();
    }

    if (game.checkWin()) {
      game.endGame();
      setGameState("ended");
      return;
    }

    drawGameScene(ctx, game, CANVAS_WIDTH, CANVAS_HEIGHT);
    // eslint-disable-next-line react-hooks/immutability
    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [game, keysPressed]);

  useEffect(() => {
    if (gameState === "playing" && game) {
      animationFrameId.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState, game, gameLoop]);

  const startGame = () => {
    const newGame = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);
    newGame.startGame();
    setGame(newGame);
    setGameState("playing");
  };

  const backToMenu = () => {
    setGameState("menu");
    setGame(null);
  };

  if (gameState === "menu") {
    return <MainMenu onStartGame={startGame} />;
  }

  if (gameState === "ended" && game) {
    return <GameOverScreen game={game} onBackToMenu={backToMenu} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-2 border-white"
      />
      <button
        onClick={backToMenu}
        className="mt-4 px-6 py-2 text-lg border border-white text-white hover:bg-white hover:text-black transition-colors"
      >
        Back to Menu
      </button>
    </div>
  );
};

export default PongGame;
