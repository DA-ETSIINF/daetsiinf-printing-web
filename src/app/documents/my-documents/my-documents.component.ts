import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.css']
})
export class MyDocumentsComponent implements OnInit {
  constructor() {}

  getDeviceWidth = (): string => {
    return AppComponent.deviceWidth;
  };

  ngOnInit() {}
}
