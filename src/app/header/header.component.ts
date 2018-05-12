import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  host: {
    '(window:resize)': 'widthStatus($event.target.innerWidth)'
  }
})
export class HeaderComponent implements OnInit {
  deviceWidth: string;
  constructor() {}

  widthStatus(size) {
    this.deviceWidth = size < 992 ? 'small' : 'large';
  }

  ngOnInit() {
    this.widthStatus(window.innerWidth);
  }
}
