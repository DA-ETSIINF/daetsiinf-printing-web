import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() class: 'large' | 'medium' | 'small' = 'medium';
  click = new EventEmitter();

  constructor() { }

  ngOnInit() {}
}
