import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-header-lg',
  templateUrl: './header-lg.component.html',
  styleUrls: ['./header-lg.component.css']
})
export class HeaderLgComponent implements OnInit {
  showUserDropdown = false;
  hideUserDropdown = false;
  version: string = environment.version;
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
