export class Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rad: number;

  constructor(x: number, y: number, vx: number, vy: number, rad: number) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.rad = rad;
  }

  moveX() {
    this.x += this.vx;
  }

  moveY() {
    this.y += this.vy;
  }

  checkIsWallTouched(canvasHeight: number): boolean {
    return this.y - this.rad <= 0 || this.y + this.rad >= canvasHeight;
  }

  isLineCrossed(canvasWidth: number): boolean {
    return this.x - this.rad <= 0 || this.x + this.rad >= canvasWidth;
  }
}
