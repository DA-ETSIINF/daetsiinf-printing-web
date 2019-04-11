import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  deviceWidth: 'small' | 'large';
  size: number;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.widthStatus(window.innerWidth);
    this.appService.setLang();
    document.addEventListener('click', () => this.hidePopupMenu());
  }

  widthStatus(size) {
    this.size = size;
    this.deviceWidth = size < 992 ? 'small' : 'large';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.widthStatus(event.target.innerWidth);
  }

  showTerminal(): boolean {
    return !this.appService.showTerminal;
  }

  hidePopupMenu() {
    this.appService.popupMenu$.next(null)
  }
}
