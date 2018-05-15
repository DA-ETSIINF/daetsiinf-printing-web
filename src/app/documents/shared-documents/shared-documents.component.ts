import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-shared-documents',
  templateUrl: './shared-documents.component.html',
  styleUrls: ['./shared-documents.component.css']
})
export class SharedDocumentsComponent implements OnInit {
  constructor() {}

  getDeviceWidth = (): string => {
    return AppComponent.deviceWidth;
  };

  ngOnInit() {}
}
