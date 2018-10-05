import { Component, OnInit } from '@angular/core';

import { RegisterService } from '../_services/register.service';

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

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
  }

  register() {
    this.registerService.register(this.user);
  }

}
