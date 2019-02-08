import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterUser, LoginUser, UserInfo } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService implements OnInit {
  userInfo$ = new BehaviorSubject<UserInfo>(undefined);

  constructor(private http: HttpClient, public router: Router) {
    this.fetchProfileInfo();
  }

  ngOnInit() {}

  register(user: RegisterUser) {
    this.http
      .post(
        `${environment.server}:${environment.port}/auth/users/create/`,
        user
      )
      .subscribe(data => {
        if ((data as any).id !== undefined) {
          this.login({ username: user.username, password: user.password });
        }
        console.log(data);
      });
  }

  login(user: LoginUser) {
    this.http
      .post(
        `${environment.server}:${environment.port}/auth/token/create/`,
        user
      )
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          if (res && res.auth_token) {
            // store token of the user to keep user logged in between page refreshes
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ token: res.auth_token })
            );
            this.setUserInfo();
            this.fetchProfileInfo();
            this.router.navigate(['/my-files']);
          }
        })
      )
      .subscribe(res => {
        console.log(res);
      });
  }

  private setUserInfo() {
    this.http
      .get(`${environment.server}:${environment.port}/auth/me/`)
      .subscribe(info => {
        console.log(info);
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    console.log('Login out...');
    this.router.navigate(['/login']);
  }

  fetchProfileInfo() {
    this.userInfo$.next({
      username: '',
      funds: 0,
      email: '',
      id: 0
    });

    if (localStorage.getItem('currentUser') !== null) {
      this.http.get(`${environment.server}:${environment.port}/user/profile/`)
        .subscribe(data => {
          this.userInfo$.next(data[0] as UserInfo);
        });
    }
  }
}
