import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-lg',
  templateUrl: './header-lg.component.html',
  styleUrls: ['./header-lg.component.css']
})
export class HeaderLgComponent implements OnInit {
  showUserDropdown = false;
  hideUserDropdown = false;
  constructor() {}

  setShowUserDropdown() {
    this.showUserDropdown = true;
    this.hideUserDropdown = true;
  }

  setHideUserDropdown() {
    this.hideUserDropdown = false;
    setTimeout(function() {
      this.showUserDropdown = false;
    }, 100);
  }

  ngOnInit() {}
}
