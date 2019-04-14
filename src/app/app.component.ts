import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.init();
  }

  showTerminal(): boolean {
    return !this.appService.showTerminal;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.appService.widthStatus(event.target.innerWidth);
  }
}
