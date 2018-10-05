import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { RegisterUser } from '../../models';

@Injectable({ providedIn: 'root' })
export class RegisterService {

    constructor(private http: HttpClient) {}

    register(user: RegisterUser) {
        console.log(`${environment.server}:${environment.port}/auth/users/create/`);
        console.log(user);
        this.http.post(`${environment.server}:${environment.port}/auth/users/create/`, user, {}).subscribe(data => {
            console.log(data);
        });
    }
}
