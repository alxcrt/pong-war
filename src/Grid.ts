import type p5 from "p5";
import { Ball } from "./Ball";

export class Grid {
  // Array to store balls
  private balls: Ball[] = [];
  private cols: number;
  private rows: number;
  private cellSize: number;
  private squares: string[][] = [];
  private whiteScore: number = 0;
  private blackScore: number = 0;

  // Method to update all balls
  updateBalls() {
    for (const ball of this.balls) {
      ball.update(this.getWidth(), this.getHeight(), this.squares);
    }
  }

  // Method to draw all balls
  drawBalls(p: p5) {
    for (const ball of this.balls) {
      ball.draw(p);
    }
  }

  constructor(width: number, height: number) {
    const cellSize = 25;
    this.cols = width / cellSize;
    this.rows = height / cellSize;
    this.cellSize = cellSize;

    // Define day and night colors (black and white)
    const DAY_COLOR = "#ffffff";
    const DAY_BALL_COLOR = "#000000";
    const NIGHT_COLOR = "#000000";
    const NIGHT_BALL_COLOR = "#ffffff";

    this.balls = [
      new Ball(width / 4, height / 2, cellSize, 8, -8, DAY_BALL_COLOR),
      new Ball((width / 4) * 3, height / 2, cellSize, -8, 8, NIGHT_BALL_COLOR),
    ];

    // Populate the fields, left half white (day), right half black (night)
    for (let i = 0; i < this.cols; i++) {
      this.squares[i] = [];
      for (let j = 0; j < this.rows; j++) {
        this.squares[i][j] = i < this.cols / 2 ? DAY_COLOR : NIGHT_COLOR;
      }
    }
  }

  draw(p: p5) {
    this.whiteScore = 0;
    this.blackScore = 0;

    // Iterate through the grid
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        // Apply different colors based on position
        p.noStroke();
        p.fill(this.squares[i][j]);
        p.rect(
          i * this.cellSize,
          j * this.cellSize,
          this.cellSize,
          this.cellSize
        );

        // Update scores
        if (this.squares[i][j] === "#ffffff") this.whiteScore++;
        if (this.squares[i][j] === "#000000") this.blackScore++;
      }
    }

    this.drawBalls(p);
    this.updateBalls();
  }

  getWidth(): number {
    return this.cols * this.cellSize;
  }

  getHeight(): number {
    return this.rows * this.cellSize;
  }

  getWhiteScore(): number {
    return this.whiteScore;
  }

  getBlackScore(): number {
    return this.blackScore;
  }
}
