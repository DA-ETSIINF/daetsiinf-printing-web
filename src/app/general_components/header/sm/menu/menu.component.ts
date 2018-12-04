import { Component, Input, Output } from '@angular/core';
import { UserInfo } from '../../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  static isOpen = false;

  @Input()
  userInfo: UserInfo;

  constructor(private router: Router) {


  }

  getIsOpen() {
    return MenuComponent.isOpen;
  }
  toogleMenu() {
    MenuComponent.isOpen = !MenuComponent.isOpen;
  }
  goTo(route: string) {
    MenuComponent.isOpen = false;
    this.router.navigate([route]);
  }
}
