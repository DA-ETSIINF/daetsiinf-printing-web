import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MenuComponent } from '../../general_components/header/sm/menu/menu.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-documents',
  templateUrl: './shared-documents.component.html',
  styleUrls: ['./shared-documents.component.css']
})
export class SharedDocumentsComponent implements OnInit {
  constructor(public router: Router) {}

  getDeviceWidth = (): string => {
    return AppComponent.deviceWidth;
  };

  goToMyDocuments = () => {
    this.router.navigate(['my-documents']);
  };

  openMenu = () => {
    MenuComponent.isOpen = true;
  };

  ngOnInit() {}
}
