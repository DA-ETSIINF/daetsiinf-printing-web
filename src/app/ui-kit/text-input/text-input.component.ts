import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  @Input() labelText: string;
  @Input() id: string;
  @Input() type = 'text';
  @Input() errors = [];
  @Output() inputValue = new EventEmitter();

  isFocus = false;

  constructor() {}

  ngOnInit() {}

  OnInputChange() {
    setTimeout(() => {
      const value = (document.getElementById(this.id) as any).value;
      this.inputValue.emit(value);
    }, 5);
  }
}
