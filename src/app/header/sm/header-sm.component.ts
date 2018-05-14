import { Component, OnInit } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { DocumentsComponent } from '../../documents/documents.component';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-sm',
  templateUrl: './header-sm.component.html',
  styleUrls: ['./header-sm.component.css']
})
export class HeaderSmComponent implements OnInit {
  currentURL: string;
  isOpen: boolean = false;
  constructor(private location: Location) {}

  toggleMenu = () => {
    MenuComponent.isOpen = !MenuComponent.isOpen;
  };
  getMyDocumentsShowing = () => {
    return DocumentsComponent.getMyDocumentsShowing();
  };
  viewMyDocuments = e => {
    e.preventDefault();
    DocumentsComponent.myDocumentsShowing = true;
  };

  viewSharedDocuments = e => {
    e.preventDefault();
    DocumentsComponent.myDocumentsShowing = false;
  };

  showDocumentsOptions = (): boolean => {
    return (
      this.currentURL == '/my-documents' || this.currentURL == '/shared-with-me'
    );
  };

  ngOnInit() {
    this.currentURL = this.location.path();
    if (this.currentURL == '/shared-with-me')
      DocumentsComponent.myDocumentsShowing = false;
  }
}
