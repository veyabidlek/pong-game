import { Game } from "../classes/Game";

export const drawGameScene = (
  ctx: CanvasRenderingContext2D,
  game: Game,
  CANVAS_WIDTH: number,
  CANVAS_HEIGHT: number
) => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.strokeStyle = "white";
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(CANVAS_WIDTH / 2, 0);
  ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "white";
  ctx.fillRect(
    game.paddle1.x,
    game.paddle1.y,
    game.paddle1.width,
    game.paddle1.height
  );
  ctx.fillRect(
    game.paddle2.x,
    game.paddle2.y,
    game.paddle2.width,
    game.paddle2.height
  );

  ctx.beginPath();
  ctx.arc(game.ball.x, game.ball.y, game.ball.rad, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = "48px monospace";
  ctx.fillText(game.score1.toString(), CANVAS_WIDTH / 4, 60);
  ctx.fillText(game.score2.toString(), (CANVAS_WIDTH * 3) / 4, 60);
};
