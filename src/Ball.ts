import type p5 from "p5";

export class Ball {
  private readonly MAX_SPEED = 15;
  private readonly MIN_SPEED = 5;

  public x: number;
  public y: number;
  public radius: number;
  public speedX: number;
  public speedY: number;
  public color: string;

  constructor(
    x: number,
    y: number,
    radius: number,
    speedX: number,
    speedY: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  private addRandomness() {
    this.speedX += Math.random() * 0.02 - 0.01;
    this.speedY += Math.random() * 0.02 - 0.01;

    // Limit the speed of the ball
    this.speedX = Math.min(
      Math.max(this.speedX, -this.MAX_SPEED),
      this.MAX_SPEED
    );
    this.speedY = Math.min(
      Math.max(this.speedY, -this.MAX_SPEED),
      this.MAX_SPEED
    );

    // Make sure the ball always maintains a minimum speed
    if (Math.abs(this.speedX) < this.MIN_SPEED)
      this.speedX = this.speedX > 0 ? this.MIN_SPEED : -this.MIN_SPEED;
    if (Math.abs(this.speedY) < this.MIN_SPEED)
      this.speedY = this.speedY > 0 ? this.MIN_SPEED : -this.MIN_SPEED;
  }

  update(width: number, height: number, squares: string[][]) {
    // Get the reverse color for checking collisions
    const reverseColor = this.color === "#000000" ? "#ffffff" : "#000000";
    const cellSize = width / squares.length; // Calculate cell size from grid dimensions

    // Update position
    this.x += this.speedX;
    this.y += this.speedY;

    // Check for wall collisions
    if (this.x >= width - this.radius / 2 || this.x <= this.radius / 2) {
      this.speedX *= -1;
      this.addRandomness();
      // Push ball away from edge to prevent sticking
      if (this.x > width - this.radius / 2)
        this.x = width - this.radius / 2 - 1;
      if (this.x < this.radius / 2) this.x = this.radius / 2 + 1;
    }
    if (this.y >= height - this.radius / 2 || this.y <= this.radius / 2) {
      this.speedY *= -1;
      this.addRandomness();
      // Push ball away from edge to prevent sticking
      if (this.y > height - this.radius / 2)
        this.y = height - this.radius / 2 - 1;
      if (this.y < this.radius / 2) this.y = this.radius / 2 + 1;
    }

    // Check for square collisions
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
      const checkX = this.x + Math.cos(angle) * (this.radius / 2);
      const checkY = this.y + Math.sin(angle) * (this.radius / 2);

      const i = Math.floor(checkX / cellSize);
      const j = Math.floor(checkY / cellSize);

      if (i >= 0 && i < squares.length && j >= 0 && j < squares[0].length) {
        if (squares[i][j] !== reverseColor) {
          // Square hit! Update square color
          squares[i][j] = reverseColor;

          // Determine bounce direction based on the angle
          if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) {
            this.speedX *= -1;
          } else {
            this.speedY *= -1;
          }

          // Add randomness after collision
          this.addRandomness();

          // Break after first collision to prevent multiple bounces
          break;
        }
      }
    }
  }

  draw(p: p5) {
    p.fill(this.color);
    p.noStroke();
    p.ellipse(this.x, this.y, this.radius, this.radius);
  }
}
