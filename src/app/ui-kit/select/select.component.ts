import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() options: string[];
  @Output() selectChange = new EventEmitter();

  selected = '';

  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  emitOption(option: string) {
    this.selectChange.emit(option);
    this.selected = option;
    this.isOpen = false;
  }

  toogleOptions() {
    this.isOpen = !this.isOpen;
  }

}
