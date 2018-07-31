import { Component, OnInit } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { environment } from '../../../../environments/environment';
=======
>>>>>>> c1869ec0d956963bace6f48749257e175a8f47fa
@Component({
  selector: 'app-header-sm',
  templateUrl: './header-sm.component.html',
  styleUrls: ['./header-sm.component.css']
})
export class HeaderSmComponent implements OnInit {
  currentPage: string;
<<<<<<< HEAD
  version: string = environment.version;
=======
>>>>>>> c1869ec0d956963bace6f48749257e175a8f47fa
  constructor(private router: Router, private menu: MenuComponent) {}

  toggleMenu() {
    this.menu.toogleMenu();
  }
  showDocumentsNav() {
    return ['/my-documents', '/shared-with-me'].includes(this.currentPage);
  }
  ngOnInit() {
    this.currentPage = this.router.routerState.snapshot.url;
  }
}
