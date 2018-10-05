import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterUser, LoginUser } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  register(user: RegisterUser) {
    this.http
      .post(
        `${environment.server}:${environment.port}/auth/users/create/`,
        user
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  login(user: LoginUser): Observable<any> {
    return this.http
      .post(`${environment.server}:${environment.port}`, user)
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          if (res && res.token) {
            // store token of the user to keep user logged in between page refreshes
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ token: res.token })
            );
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
