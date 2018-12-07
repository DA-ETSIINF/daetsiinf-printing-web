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
    this.screen.childNodes.forEach(child => {
      (child as any).style.background = '#000';
    });

    this.snake.map(n => {
      const child = this.screen.childNodes.item(n);
      (child as any).style.background = '#fff';
    });
  }
  checkForBorders() {
    const head = this.snake[this.snake.length - 1];
    const row = Math.floor(head / this.squaresInARow);
    const col = head % this.squaresInARow;
    console.log(0 < row, row);

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
    if (!this.checkForBorders()) {
      console.log('Perdiste');
      return ['Tocaste la pared'];
    }
    this.snake.splice(0, 1);

    const head = this.snake[this.snake.length - 1];
    const row = Math.floor(head / this.squaresInARow);
    const col = head % this.squaresInARow;
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

    this.drawSnake();
  }

  signal(type: string, value: any) {
    if (type === 'KEY') {
      switch (value) {
        case 'ArrowDown':
          this.movement = 'down';
          break;
        case 'ArrowUp':
          this.movement = 'up';
          break;
        case 'ArrowLeft':
          this.movement = 'left';
          break;
        case 'ArrowRight':
          this.movement = 'right';
          break;
      }
      console.log(value, this.movement);
    }
  }

  init() {
    this.setDisplay();
    this.drawSnake();

    const ticks = interval(50);
    ticks.subscribe(tick => {
      this.moveSnake();
    });
  }
}
