import { Component, OnInit } from '@angular/core';
import { CommandsService, CommandHistory } from './commands.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
  command: string;
  loading = false;
  prompt: string;
  history: CommandHistory[] = [];
  constructor(private commandsService: CommandsService) {}

  ngOnInit() {
    this.commandsService.history$.subscribe(h => {
      console.log(h);

      this.history.push(h);
    });
    this.prompt = this.commandsService.prompt;
  }

  sendCommand() {
    if (this.command.length !== 0) {
      this.commandsService.getResultFromCommand(this.command);
    }
    this.command = '';
    this.prompt = this.commandsService.prompt;
  }

  onKeyDown(e) {
    if (e.code === 'KeyC' && e.ctrlKey) {
      this.commandsService.getResultFromCommand('break');
    } else if (
      this.commandsService.gameIsRunning &&
      ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)
    ) {
      console.log('lamo');
      if (this.commandsService.currentSignal) {
        this.commandsService.currentSignal('KEY', e.key);
      }
    }
  }
}
