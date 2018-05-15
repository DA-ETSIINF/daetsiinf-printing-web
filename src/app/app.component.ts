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
  static deviceWidth: string;

  widthStatus = size => {
    AppComponent.deviceWidth = size < 992 ? 'small' : 'large';
  };

  ngOnInit() {
    this.widthStatus(window.innerWidth);
  }
}
