import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UserService } from '../../login/user.service';
import { UserInfo } from '../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  userInfo: UserInfo;

  constructor(private appComponent: AppComponent, private userService: UserService) {}

  getDeviceWidth(): string {
    return this.appComponent.deviceWidth;
  }

  ngOnInit() {
    this.userService.userInfo$.subscribe(info => this.userInfo = info);
  }
}
