import { Component, OnInit } from '@angular/core';
import { DocumentsComponent } from '../documents.component';

@Component({
  selector: 'app-aside-documents',
  templateUrl: './aside-documents.component.html',
  styleUrls: ['./aside-documents.component.css']
})
export class AsideDocumentsComponent implements OnInit {
  constructor() {}

  viewMyDocuments = e => {
    e.preventDefault();
    DocumentsComponent.viewMyDocuments();
  };

  viewSharedDocuments = e => {
    e.preventDefault();
    DocumentsComponent.viewSharedDocuments();
  };

  getMyDocumentsShowing = (): boolean => {
    return DocumentsComponent.myDocumentsShowing;
  };

  ngOnInit() {}
}
