import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:resize)': 'widthStatus($event.target.innerWidth)'
  }
})
export class AppComponent implements OnInit {
  deviceWidth: string;

  widthStatus(size) {
    this.deviceWidth = size < 992 ? 'small' : 'large';
  }

  ngOnInit() {
    this.widthStatus(window.innerWidth);
  }
}
