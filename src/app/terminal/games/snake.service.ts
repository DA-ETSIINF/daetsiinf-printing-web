import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SnakeService {
  snake: number[] = [0, 1, 2, 3, 4];
  screen;
  movement = 'right';
  nBoxes = 1600;
  squaresInARow = Math.sqrt(this.nBoxes);
  appleInGame = false;
  appleBox: number;
  score = 0;
  stop = false;

  constructor() {}

  private setDisplay() {
    this.screen = document.querySelector('.screen');
    this.screen.className = 'screen active';

    for (let i = 0; i < this.nBoxes; i++) {
      const child = document.createElement('div');
      child.classList.add('pixel');
      this.screen.appendChild(child);
    }
    (this.screen as any).style.gridGap = `1px`;
    (this.screen as any).style.gridTemplateRows = `repeat(${
      this.squaresInARow
    }, 1fr)`;
    (this.screen as any).style.gridTemplateColumns = `repeat(${
      this.squaresInARow
    }, 1fr)`;
  }
  drawSnake() {
    this.screen.childNodes.forEach(c => {
      (c as any).style.background = '#000';
    });

    let child: any;
    this.snake.map(n => {
      child = this.screen.childNodes.item(n);
      child.style.background = '#fff';
    });

    child = this.screen.childNodes.item(this.appleBox);
    child.style.background = '#fff';
  }
  checkForBorders() {
    const head = this.snake[this.snake.length - 1];
    const row = Math.floor(head / this.squaresInARow);
    const col = head % this.squaresInARow;

    switch (this.movement) {
      case 'right':
        return col < this.squaresInARow - 1;
      case 'down':
        return row < this.squaresInARow - 1;
      case 'left':
        return 0 < col;
      case 'up':
        return 0 < row;
    }
  }

  moveSnake() {
    const head = this.snake[this.snake.length - 1];
    const row = Math.floor(head / this.squaresInARow);
    const col = head % this.squaresInARow;

    if (head === this.appleBox) {
      this.appleInGame = false;
      this.score += 10;
      console.log(this.score);
    } else {
      this.snake.splice(0, 1);
    }

    if (!this.checkForBorders()) {
      switch (this.movement) {
        case 'right':
          this.snake.push(row * this.squaresInARow);
          break;
        case 'down':
          this.snake.push(col);
          break;
        case 'left':
          this.snake.push((row + 1) * this.squaresInARow - 1);
          break;
        case 'up':
          this.snake.push(this.nBoxes - this.squaresInARow + col);
          break;
      }
    } else {
      switch (this.movement) {
        case 'right':
          this.snake.push(row * this.squaresInARow + col + 1);
          break;
        case 'down':
          this.snake.push((row + 1) * this.squaresInARow + col);
          break;
        case 'left':
          this.snake.push(row * this.squaresInARow + col - 1);
          break;
        case 'up':
          this.snake.push((row - 1) * this.squaresInARow + col);
          break;
      }
    }

    this.drawSnake();
  }

  spawnApple() {
    if (!this.appleInGame) {
      this.appleBox = Math.floor(Math.random() * this.nBoxes);
      console.log(this.appleBox);
      this.appleInGame = true;
    }
  }

  signal(type: string, value: any) {
    if (type === 'KEY') {
      switch (value) {
        case 'ArrowDown':
          if (this.movement !== 'up') {
            this.movement = 'down';
          }
          break;
        case 'ArrowUp':
          if (this.movement !== 'down') {
            this.movement = 'up';
          }
          break;
        case 'ArrowLeft':
          if (this.movement !== 'right') {
            this.movement = 'left';
          }
          break;
        case 'ArrowRight':
          if (this.movement !== 'left') {
            this.movement = 'right';
          }

          break;
      }
      console.log(value, this.movement);
    }
  }

  init() {
    this.setDisplay();
    this.drawSnake();

    const ticks = interval(40);
    ticks.subscribe(tick => {
      this.spawnApple();
      this.moveSnake();
    });
  }
}
