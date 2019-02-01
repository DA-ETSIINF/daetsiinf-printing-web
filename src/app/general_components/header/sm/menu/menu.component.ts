import { Component, Input, Output } from '@angular/core';
import { UserInfo } from '../../../../models';
import { Router } from '@angular/router';
import { UserService } from '../../../../login/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  static isOpen = false;

  @Input()
  userInfo: UserInfo;

  constructor(private router: Router, private userService: UserService) {}

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

  logout() {
    this.userService.logout();
  }
}
