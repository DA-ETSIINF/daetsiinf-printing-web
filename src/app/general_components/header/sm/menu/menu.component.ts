import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  static isOpen: boolean = false;

  constructor() {}

  getStatus = (): boolean => {
    return MenuComponent.isOpen;
  };

  toogleMenu = () => {
    MenuComponent.isOpen = !MenuComponent.isOpen;
  };

  ngOnInit() {}
}
