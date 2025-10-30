import { Paddle } from "./Paddle";

export class Player {
  id: number;
  paddle: Paddle;

  constructor(id: number, paddle: Paddle) {
    this.id = id;
    this.paddle = paddle;
  }

  moveUp(canvasHeight: number) {
    this.paddle.move(-this.paddle.velocity, canvasHeight);
  }

  moveDown(canvasHeight: number) {
    this.paddle.move(this.paddle.velocity, canvasHeight);
  }

  getPosition() {
    return this.paddle.getPosition();
  }
}
