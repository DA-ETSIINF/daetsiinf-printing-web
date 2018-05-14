import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  static myDocumentsShowing: boolean = true;

  constructor() {}
  static getMyDocumentsShowing = (): boolean => {
    return DocumentsComponent.myDocumentsShowing;
  };
  ngOnInit() {}
}
