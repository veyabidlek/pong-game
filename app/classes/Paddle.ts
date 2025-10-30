export class Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = 5;
  }

  move(dy: number, canvasHeight: number) {
    this.y += dy;
    if (this.y < 0) this.y = 0;
    if (this.y + this.height > canvasHeight)
      this.y = canvasHeight - this.height;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}
