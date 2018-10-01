import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  static isOpen = false;
  constructor(private router: Router) {}

  getIsOpen() {
    return MenuComponent.isOpen;
  }
  toogleMenu() {
    MenuComponent.isOpen = !MenuComponent.isOpen;
  }
  ngOnInit() {}

  goTo(route: string) {
    MenuComponent.isOpen = false;
    this.router.navigate([route]);
  }
}
