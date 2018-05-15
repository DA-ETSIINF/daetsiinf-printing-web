import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header.component';
import { MenuComponent } from './menu/menu.component';
import { DocumentsComponent } from '../../documents/documents.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-sm',
  templateUrl: './header-sm.component.html',
  styleUrls: ['./header-sm.component.css']
})
export class HeaderSmComponent implements OnInit {
  isOpen: boolean = false;
  constructor() {}

  toggleMenu = () => {
    MenuComponent.isOpen = !MenuComponent.isOpen;
  };

  getMyDocumentsShowing = () => {
    return DocumentsComponent.myDocumentsShowing;
  };

  showDocumentsOptions = () => {
    return DocumentsComponent.showDocumentsOptions();
  };

  viewMyDocuments = () => {
    DocumentsComponent.viewMyDocuments();
  };

  viewSharedDocuments = () => {
    DocumentsComponent.viewSharedDocuments();
  };

  ngOnInit() {}
}
