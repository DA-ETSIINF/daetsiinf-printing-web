import { Component, OnInit } from '@angular/core';
import { DocumentsComponent } from '../../documents/documents.component';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor() {}

  getDeviceWidth = (): string => {
    return AppComponent.deviceWidth;
  };

  ngOnInit() {}
}
