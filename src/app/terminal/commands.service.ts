import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { FilesService } from '../files/files.service';
import { SnakeService } from './games/snake.service';
export interface CommandHistory {
  prompt: string;
  command: string;
  results: string[];
}
export interface Command {
  name: string;
  minLength: number;
  maxLength: number;
  exec: Function;
  signal?: Function;
}
@Injectable({
  providedIn: 'root'
})
export class CommandsService {
  commands: Command[] = [
    {
      name: 'ls',
      minLength: 1,
      maxLength: 1,
      exec: () => {
        const files = [];
        this.filesService.myFiles$.subscribe(f => {
          files.push((f as any).name);
        });
        return files;
      }
    },
    {
      name: 'mkdir',
      minLength: 2,
      maxLength: 2,
      exec: name => this.filesService.createFolder(name)
    },
    {
      name: 'prompt',
      minLength: 1,
      maxLength: 2,
      exec: () => {
        if (this.argv.length === 1) {
          return [this.prompt];
        }
        if (this.argv.length === 2) {
          this.prompt = this.argv[1];
          return [''];
        }
      }
    },
    {
      name: 'alert',
      minLength: 2,
      maxLength: 2,
      exec: () => {
        alert(this.argv[1]);
        return ['Alerta mostrada'];
      }
    },
    {
      name: 'snake',
      minLength: 1,
      maxLength: 1,
      exec: () => {
        this.snakeService.init();
        this.gameIsRunning = true;
      },
      signal: (type, value) =>
        console.log(this.snakeService.signal(type, value))
    },
    {
      name: 'break',
      minLength: 1,
      maxLength: 1,
      exec: () => {
        if (this.currentSignal) {
          return this.currentSignal('BREAK');
        }
      }
    }
  ];

  history$ = new Subject<CommandHistory>();
  prompt = '/home/users/dani$';
  gameIsRunning = false;
  currentSignal: Function;
  argv: string[];

  errors = {
    COMMAND_NOT_FOUND: 'El comando no está disponible',
    ARGC_WRONG: 'El número de parámetro es incorrecto'
  };

  constructor(
    private filesService: FilesService,
    private snakeService: SnakeService
  ) {}

  private commandExists(command): Command {
    let c: Command;
    this.commands.map(_c => {
      if (_c.name === command) {
        c = _c;
      }
    });
    return c;
  }

  private argcOk(c: Command, argc: number): boolean {
    return c.minLength <= argc && c.maxLength >= argc;
  }

  execCommand(c: Command) {
    const prompt = this.prompt;

    let results: string[];
    switch (this.argv[0]) {
      case 'ls':
        results = c.exec();
        break;
      case 'mkdir':
        results = c.exec(c.name);
        break;
      case 'prompt':
        results = c.exec();
        break;
      case 'alert':
        results = c.exec();
        break;
      case 'snake':
        results = c.exec();
        break;
      case 'break':
        results = c.exec();
        this.currentSignal = null;
        break;
    }
    if (c.signal) {
      this.currentSignal = c.signal;
    }
    this.appendItemToHistory(results, this.argv, prompt);
  }

  private appendItemToHistory(
    results: string[],
    argv: string[] = this.argv,
    prompt = this.prompt
  ) {
    let command = '';
    argv.map(_c => (command += _c + ' '));
    this.history$.next({
      prompt,
      command,
      results
    });
  }

  getResultFromCommand(command) {
    this.argv = command.split(' ').filter(a => a !== '');

    const c = this.commandExists(this.argv[0]);
    if (c === undefined) {
      this.appendItemToHistory([this.errors.COMMAND_NOT_FOUND]);
      return;
    }
    if (!this.argcOk(c, this.argv.length)) {
      this.appendItemToHistory([this.errors.ARGC_WRONG]);
      return;
    }
    this.execCommand(c);
  }
}
