import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  deviceWidth: 'small' | 'large';
  size: number;

  ngOnInit() {
    this.widthStatus(window.innerWidth);
  }

  widthStatus(size) {
    this.size = size;
    this.deviceWidth = size < 992 ? 'small' : 'large';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.widthStatus(event.target.innerWidth);
  }
}
