import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { UserService } from '../../login/user.service';
import { UserInfo } from '../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  userInfo: UserInfo;

  constructor(
    private appService: AppService,
    private userService: UserService
  ) {}

  getDeviceWidth(): string {
    return this.appService.deviceWidth;
  }

  ngOnInit() {
    this.userService.userInfo$.subscribe(info => (this.userInfo = info));
  }
}
