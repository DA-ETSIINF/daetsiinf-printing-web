import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-lg',
  templateUrl: './header-lg.component.html',
  styleUrls: ['./header-lg.component.css']
})
export class HeaderLgComponent implements OnInit {
  static showUserDropdown: boolean = false;
  static hideUserDropdown: boolean = false;
  constructor() {}

  getShowUserDropdown = (): boolean => {
    return HeaderLgComponent.showUserDropdown;
  };
  getHideUserDropdown = (): boolean => {
    return HeaderLgComponent.hideUserDropdown;
  };

  showUserDropdown = () => {
    HeaderLgComponent.showUserDropdown = true;
    HeaderLgComponent.hideUserDropdown = true;
  };

  hideUserDropdown = () => {
    HeaderLgComponent.hideUserDropdown = false;
    setTimeout(function() {
      HeaderLgComponent.showUserDropdown = false;
    }, 100);
  };

  ngOnInit() {}
}
