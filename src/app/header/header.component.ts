import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DocumentsComponent } from '../documents/documents.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  host: {
    '(window:resize)': 'widthStatus($event.target.innerWidth)'
  }
})
export class HeaderComponent implements OnInit {
  static currentURL: string;
  deviceWidth: string;
  constructor(private location: Location) {}

  widthStatus = size => {
    this.deviceWidth = size < 992 ? 'small' : 'large';
  };

  static showDocumentsOptions = () => {
    return (
      HeaderComponent.currentURL == '/my-documents' ||
      HeaderComponent.currentURL == '/shared-with-me'
    );
  };
  ngOnInit() {
    this.widthStatus(window.innerWidth);
    HeaderComponent.currentURL = this.location.path();
    if (HeaderComponent.currentURL == '/shared-with-me')
      DocumentsComponent.myDocumentsShowing = false;
  }
}
