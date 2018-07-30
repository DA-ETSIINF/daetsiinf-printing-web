import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(private appComponent: AppComponent) {}

  getDeviceWidth(): string {
    return this.appComponent.deviceWidth;
  }

  ngOnInit() {}
}
