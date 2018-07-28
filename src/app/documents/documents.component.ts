import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../general_components/header/header.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  static myDocumentsShowing = true;
  static currentURL: string;

  constructor(private location: Location) {}

  static showDocumentsOptions() {
    return (
      DocumentsComponent.currentURL === '/my-documents' ||
      DocumentsComponent.currentURL === '/shared-with-me'
    );
  }

  static getMyDocumentsShowing() {
    return DocumentsComponent.myDocumentsShowing;
  }
  static viewMyDocuments() {
    DocumentsComponent.myDocumentsShowing = true;
  }

  static viewSharedDocuments() {
    DocumentsComponent.myDocumentsShowing = false;
  }

  ngOnInit() {
    DocumentsComponent.currentURL = this.location.path();
    DocumentsComponent.myDocumentsShowing =
      DocumentsComponent.currentURL === '/shared-with-me' ? false : true;
  }
}
