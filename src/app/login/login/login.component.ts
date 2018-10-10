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

  constructor(private userService: UserService) {}

  ngOnInit() {}

  login() {
    this.userService.login(this.user);
  }
}
