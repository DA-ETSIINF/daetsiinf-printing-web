import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { environment } from '../../../../environments/environment';
=======

>>>>>>> c1869ec0d956963bace6f48749257e175a8f47fa
@Component({
  selector: 'app-header-lg',
  templateUrl: './header-lg.component.html',
  styleUrls: ['./header-lg.component.css']
})
export class HeaderLgComponent implements OnInit {
  showUserDropdown = false;
  hideUserDropdown = false;
<<<<<<< HEAD
  version: string = environment.version;
=======
>>>>>>> c1869ec0d956963bace6f48749257e175a8f47fa
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
