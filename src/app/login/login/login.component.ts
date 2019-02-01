import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

import { LoginUser } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginUser = {
    username: '',
    password: ''
  };

  errors = {
    username: [],
    password: []
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    localStorage.removeItem('currentUser');
  }

  private isEmpty(type: string): boolean {
    if (this.user[type] === '') {
      this.errors[type] = [`El campo ${type} está vacío`];
      return true;
    } else {
      this.errors[type] = [];
      return false;
    }
  }

  login() {
    const isEmpty = this.isEmpty('username') && this.isEmpty('password');
    if (isEmpty) {
      return;
    }

    this.userService.login(this.user);
  }
}
