import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private http: HttpClient) {}

  getJSON(route: string) {
    // console.log(`${environment.server}:${environment.port}/${route}`);
    return this.http.get(`${environment.server}:${environment.port}/${route}`);
  }
}
