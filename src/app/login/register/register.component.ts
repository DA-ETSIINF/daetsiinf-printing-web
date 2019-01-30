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
    username: '',
    email: '',
    password: ''
  };

  errors = {
    username: [],
    email: [],
    password: [],
    password2: []
  };

  password2: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    localStorage.removeItem('currentUser');
  }

  private checkPasswords(): boolean {
    if (this.user.password === this.password2) {
      return true;
    } else {
      this.errors.password2.push('Las contraseñas no coinciden');
      return false;
    }
  }

  private isEmpty(type: string): boolean {
    if (this.user[type] === '') {
      this.errors[type].push(`El campo ${type} está vacío`);
      return false;
    }
    return true;
  }

  private checkUsername(): boolean {
    if (this.user.username.length < 3) {
      this.errors.username.push('El nombre de usuario debe de tener al menos 3 caracteres');
      return false;
    }
    return true;
  }

  private checkEmail(): boolean {
    const email = this.user.email.split('@');
    if (email.length !== 2) {
      this.errors.email.push('Email no válido');
      return false;
    } else if (email[1] !== 'alumnos.upm.es') {
      this.errors.email.push('Usa el correo de @alumnos.upm.es');
    }
    return true;
  }

  register() {
    this.errors.username = [];
    this.errors.email = [];
    this.errors.password = [];
    this.errors.password2 = [];

    let registerFormOk = true;
    ['username', 'email', 'password', 'password2'].map(input => {
      if (this.isEmpty(input)) {
        registerFormOk = false;
      }
    });

    if (this.checkUsername() || this.checkPasswords() || this.checkEmail()) {
      registerFormOk = false;
    }

    if (!registerFormOk) {
      return;
    }

    this.userService.register(this.user);
  }
}
