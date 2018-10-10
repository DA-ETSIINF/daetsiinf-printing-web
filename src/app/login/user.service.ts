import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterUser, LoginUser } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient,
    public router: Router) {}

  register(user: RegisterUser) {
    this.http
      .post(
        `${environment.server}:${environment.port}/auth/users/create/`,
        user
      )
      .pipe(map(data => (data as any).id))
      .subscribe(id => {
        if (id !== undefined) {
          this.login({username: user.username, password: user.password});
        }
      });
  }

  login(user: LoginUser) {
    this.http
      .post(`${environment.server}:${environment.port}/auth/token/create/`, user)
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
            this.router.navigate(['/my-files']);
          }
        })
      ).subscribe();
  }


  private setUserInfo() {
    this.http.get(`${environment.server}:${environment.port}/auth/me/`).subscribe(info => {
      console.log('_____________');
      console.log(info);
    });
  }
  logout() {
    localStorage.removeItem('currentUser');
  }
}
