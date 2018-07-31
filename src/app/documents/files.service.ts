import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private http: HttpClient) {}

  getJSON(route: string) {
    // console.log(`${environment.server}:${environment.port}/${route}`);
    return !environment.production
      ? this.http.get(`${environment.server}:${environment.port}/${route}`)
      : this.http.get(
          `https://firebasestorage.googleapis.com/v0/b/reprografia-daetsiinf.appspot.com/o/reprografia.json?alt=media&token=${
            environment.firebase_token
          }`
        );
  }
}
