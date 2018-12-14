import { Component, OnInit, Input } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { UserInfo } from '../../../models';
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

  @Input()
  userInfo: UserInfo;


  constructor(private router: Router, private menu: MenuComponent) {}

  toggleMenu() {
    this.menu.toogleMenu();
  }
  showFilesNav() {
    return ['/my-files', '/shared-with-me'].includes(this.currentPage);
  }
  ngOnInit() {
    this.currentPage = this.router.routerState.snapshot.url;
  }
}
