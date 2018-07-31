import { Component, OnInit } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-header-sm',
  templateUrl: './header-sm.component.html',
  styleUrls: ['./header-sm.component.css']
})
export class HeaderSmComponent implements OnInit {
  currentPage: string;
  version: string = environment.version;
  constructor(private router: Router, private menu: MenuComponent) {}

  toggleMenu() {
    this.menu.toogleMenu();
  }
  showDocumentsNav() {
    return ['/my-documents', '/shared-with-me'].includes(this.currentPage);
  }
  ngOnInit() {
    this.currentPage = this.router.routerState.snapshot.url;
  }
}
