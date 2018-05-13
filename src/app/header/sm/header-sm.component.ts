import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-header-sm',
  templateUrl: './header-sm.component.html',
  styleUrls: ['./header-sm.component.css']
})
export class HeaderSmComponent implements OnInit {
  isOpen: boolean = false;
  constructor() {}
  toggleMenu() {
    MenuComponent.isOpen = !MenuComponent.isOpen;
  }
  ngOnInit() {}
}
