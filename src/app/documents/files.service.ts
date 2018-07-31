import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models';

=======
import { Item } from '../models';
>>>>>>> c1869ec0d956963bace6f48749257e175a8f47fa
@Injectable({
  providedIn: 'root'
})
export class FilesService {
<<<<<<< HEAD
  constructor(private http: HttpClient) {}

  getJSON(route: string) {
    // console.log(`${environment.server}:${environment.port}/${route}`);
    return this.http.get(`${environment.server}:${environment.port}/${route}`);
=======
  constructor() {}

  getSharedDocuments(): Item[] {
    return [
      {
        id: 1,
        name: 'Estructura de computadores',
        type: 'folder'
      },
      {
        id: 2,
        name: 'Algoritmica',
        type: 'folder'
      },
      {
        id: 3,
        name: 'Redes',
        type: 'folder'
      },
      {
        id: 4,
        name: 'Arquitectura de computadores',
        type: 'folder'
      },
      {
        id: 5,
        name: 'Examen 12/07',
        type: 'pdf'
      }
    ];
  }

  getMyDocuments(): Item[] {
    return [
      {
        id: 1,
        name: 'Matemática Discreta I',
        type: 'folder'
      },
      {
        id: 2,
        name: 'Examen Matlab',
        type: 'folder'
      },
      {
        id: 3,
        name: 'Economía',
        type: 'pdf'
      },
      {
        id: 4,
        name: 'Programación',
        type: 'folder'
      },
      {
        id: 5,
        name: 'Examen 12/07',
        type: 'pdf'
      },
      {
        id: 6,
        name: 'Examen Lenguajes 12/07',
        type: 'pdf'
      }
    ];
>>>>>>> c1869ec0d956963bace6f48749257e175a8f47fa
  }
}
