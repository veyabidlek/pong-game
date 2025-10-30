import { Player } from "./Player";
import { Ball } from "./Ball";
import { Paddle } from "./Paddle";

export class Game {
  player1: Player;
  player2: Player;
  paddle1: Paddle;
  paddle2: Paddle;
  ball: Ball;
  scoreLimit: number;
  isActive: boolean;
  score1: number;
  score2: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.scoreLimit = 5;
    this.isActive = false;
    this.score1 = 0;
    this.score2 = 0;

    const paddleWidth = 10;
    const paddleHeight = 100;
    this.paddle1 = new Paddle(
      20,
      canvasHeight / 2 - paddleHeight / 2,
      paddleWidth,
      paddleHeight
    );
    this.paddle2 = new Paddle(
      canvasWidth - 30,
      canvasHeight / 2 - paddleHeight / 2,
      paddleWidth,
      paddleHeight
    );

    this.player1 = new Player(1, this.paddle1);
    this.player2 = new Player(2, this.paddle2);

    this.ball = new Ball(canvasWidth / 2, canvasHeight / 2, 4, 3, 8);
  }

  processInput(keys: Set<string>) {
    if (keys.has("w")) this.player1.moveUp(this.canvasHeight);
    if (keys.has("s")) this.player1.moveDown(this.canvasHeight);
    if (keys.has("ArrowUp")) this.player2.moveUp(this.canvasHeight);
    if (keys.has("ArrowDown")) this.player2.moveDown(this.canvasHeight);
  }

  updatePosition() {
    this.ball.moveX();
    this.ball.moveY();

    if (this.ball.checkIsWallTouched(this.canvasHeight)) {
      this.ball.vy *= -1;
    }

    const p1 = this.paddle1;
    const p2 = this.paddle2;

    if (
      this.ball.x - this.ball.rad <= p1.x + p1.width &&
      this.ball.x + this.ball.rad >= p1.x &&
      this.ball.y >= p1.y &&
      this.ball.y <= p1.y + p1.height
    ) {
      this.ball.vx = Math.abs(this.ball.vx);
    }

    if (
      this.ball.x + this.ball.rad >= p2.x &&
      this.ball.x - this.ball.rad <= p2.x + p2.width &&
      this.ball.y >= p2.y &&
      this.ball.y <= p2.y + p2.height
    ) {
      this.ball.vx = -Math.abs(this.ball.vx);
    }
  }

  increaseScore() {
    if (this.ball.x - this.ball.rad <= 0) {
      this.score2++;
      this.resetBall();
    } else if (this.ball.x + this.ball.rad >= this.canvasWidth) {
      this.score1++;
      this.resetBall();
    }
  }

  resetBall() {
    this.ball.x = this.canvasWidth / 2;
    this.ball.y = this.canvasHeight / 2;
    this.ball.vx = (Math.random() > 0.5 ? 1 : -1) * 4;
    this.ball.vy = (Math.random() - 0.5) * 6;
  }

  checkWin(): boolean {
    return this.score1 >= this.scoreLimit || this.score2 >= this.scoreLimit;
  }

  startGame() {
    this.isActive = true;
    this.score1 = 0;
    this.score2 = 0;
    this.resetBall();
  }

  endGame() {
    this.isActive = false;
  }
}
