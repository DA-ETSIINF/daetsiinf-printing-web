import { Injectable, OnInit } from '@angular/core';
import {UserInfo} from './models';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  userInfo: UserInfo = {
    username: 'Javier',
    email: 'sdlkfjlksdjfasdjf@alumnos.upm.es',
    quantity: 4.09
  };

  userInfo$ = new BehaviorSubject<UserInfo>(this.userInfo);

  constructor() { }

  ngOnInit(): void {
  }
}
