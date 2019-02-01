import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input()
  checked: boolean;

  @Output()
  checkedEmitter = new EventEmitter();


  constructor() { }

  ngOnInit() {}

  onCheckboxChange() {
    this.checked = !this.checked;
    this.checkedEmitter.emit(this.checked);
  }

}
