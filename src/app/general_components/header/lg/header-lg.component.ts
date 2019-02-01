import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserInfo } from '../../../models';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { fromEvent, timer, Observable } from 'rxjs';
import { buffer, map, filter, debounce } from 'rxjs/operators';
import { UserService } from '../../../login/user.service';
@Component({
  selector: 'app-header-lg',
  templateUrl: './header-lg.component.html',
  styleUrls: ['./header-lg.component.css']
})
export class HeaderLgComponent implements OnInit {
  showUserDropdown = false;
  version: string = environment.version;

  @Input()
  userInfo: UserInfo;

  constructor(
    private router: Router,
    private appService: AppService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const clickStream$ = fromEvent(document.getElementById('version'), 'click');
    clickStream$
      .pipe(buffer(clickStream$.pipe(debounce(() => timer(200)))))
      .pipe(map(list => list.length))
      .pipe(filter(x => x >= 5))
      .subscribe(() => {
        this.appService.showTerminal = true;
      });
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.userService.logout();
  }
}
