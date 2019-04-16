import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-file-navigation',
  templateUrl: './file-navigation.component.html',
  styleUrls: ['./file-navigation.component.css']
})
export class FileNavigationComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  isLargeScreen(): boolean {
    return this.appService.deviceWidth === 'large';
  }
}
