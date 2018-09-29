import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { InfoFile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  itemsInQueue = new BehaviorSubject<InfoFile[]>([]);

  constructor(private http: HttpClient) {}

  getJSON(route: string) {
    return !environment.production
      ? this.http.get(`${environment.server}:${environment.port}/${route}`)
      : this.http.get(
          `https://firebasestorage.googleapis.com/v0/b/reprografia-daetsiinf.appspot.com/o/reprografia.json?alt=media&token=${
            environment.firebase_token
          }`
        );
  }
}
