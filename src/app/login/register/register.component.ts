import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

import { RegisterUser } from '../../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: RegisterUser = {
    email: '',
    username: '',
    password: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit() {}

  register() {
    this.userService.register(this.user);
  }
}
