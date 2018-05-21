import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MenuComponent } from '../../general_components/header/sm/menu/menu.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.css']
})
export class MyDocumentsComponent implements OnInit {
  constructor(public router: Router) {}

  getDeviceWidth = (): string => {
    return AppComponent.deviceWidth;
  };

  goToSharedDocuments = () => {
    this.router.navigate(['shared-with-me']);
  };

  openMenu = () => {
    MenuComponent.isOpen = true;
  };

  ngOnInit() {}
}
