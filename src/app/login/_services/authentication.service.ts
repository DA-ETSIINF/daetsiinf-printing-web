import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  isLogged = false;

  constructor(private http: HttpClient) {}

  login(id_employee: string, password: string) {
    return this.http
      .post<any>('/api/authenticate', {
        id_employee: id_employee,
        password: password
      })
      .pipe(
        map((res: any) => {
          // login successful if there's a jwt token in the response
          if (res && res.token) {
            this.isLogged = true;
            // store id_employee and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ id_employee, token: res.token })
            );
          }
        })
      );
  }

  logout() {
    this.isLogged = false;
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
