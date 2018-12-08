import { Injectable } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
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
  ticks$: Subscription;
  changedKey = false;

  constructor() {}

  private setDisplay() {
    this.screen = document.querySelector('.screen');
    this.screen.className = 'screen active';

    const span: any = document.createElement('span');
    span.innerHTML = this.score;
    span.style.position = 'absolute';

    this.screen.appendChild(span);

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
      (c as any).style.opacity = '1';
    });

    let child: any;
    const dif = 1 / this.snake.length;
    this.snake.map((n, i) => {
      child = this.screen.childNodes.item(n);
      child.style.background = '#fff';
      child.style.opacity = dif * i + 0.3;
    });

    child = this.screen.childNodes.item(this.appleBox);
    child.style.background = '#fff';
  }
  isBorder() {
    const head = this.snake[this.snake.length - 1];
    const row = Math.floor(head / this.squaresInARow);
    const col = head % this.squaresInARow;

    switch (this.movement) {
      case 'right':
        return col % this.squaresInARow !== 0;
      case 'down':
        return row < this.squaresInARow - 1;
      case 'left':
        return col - 1 !== 0;
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
      this.screen.querySelector('span').innerHTML = this.score;
    } else {
      this.snake.splice(0, 1);
    }

    if (!this.isBorder()) {
      switch (this.movement) {
        case 'right':
          this.snake.push(head - this.squaresInARow + 1);
          break;
        case 'down':
          this.snake.push(col);
          break;
        case 'left':
          this.snake.push(head - 1 + this.squaresInARow);
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
          this.snake.push(head - 1);
          break;
        case 'up':
          this.snake.push((row - 1) * this.squaresInARow + col);
          break;
      }

      if (
        this.snake.indexOf(this.snake[this.snake.length - 1]) !==
        this.snake.length - 1
      ) {
        return this.stopGame();
      }
    }

    this.drawSnake();
  }

  spawnApple() {
    if (!this.appleInGame) {
      this.appleBox = Math.floor(Math.random() * this.nBoxes);
      this.appleInGame = true;
    }
  }

  stopGame() {
    this.ticks$.unsubscribe();
    this.snake = [0, 1, 2, 3, 4];
    this.screen.className = 'screen';
    alert(`You score was: ${this.score}`);
    this.movement = 'right';
    this.screen.innerHTML = '';
    this.score = 0;
    return [`You score was: ${this.score}`];
  }

  signal(type: string, value: any = 0) {
    switch (type) {
      case 'KEY':
        switch (value) {
          case 'ArrowDown':
            if (this.movement !== 'up' && !this.changedKey) {
              this.movement = 'down';
            }
            break;
          case 'ArrowUp':
            if (this.movement !== 'down' && !this.changedKey) {
              this.movement = 'up';
            }
            break;
          case 'ArrowLeft':
            if (this.movement !== 'right' && !this.changedKey) {
              this.movement = 'left';
            }
            break;
          case 'ArrowRight':
            if (this.movement !== 'left' && !this.changedKey) {
              this.movement = 'right';
            }
            break;
        }
        this.changedKey = true;
        break;
      case 'BREAK':
        return this.stopGame();
    }
  }

  init() {
    this.setDisplay();
    this.drawSnake();

    const ticks = interval(35);
    this.ticks$ = ticks.subscribe(tick => {
      this.changedKey = false;
      this.spawnApple();
      this.moveSnake();
    });
  }
}
