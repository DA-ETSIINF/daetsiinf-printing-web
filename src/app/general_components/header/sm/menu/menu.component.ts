import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  static isOpen = false;
  constructor() {}

  getIsOpen() {
    return MenuComponent.isOpen;
  }
  toogleMenu() {
    MenuComponent.isOpen = !MenuComponent.isOpen;
  }
  ngOnInit() {}
}
