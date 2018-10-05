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

  files = {
    'my-documents': [
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
        type: 'pdf',
        pages: 12
      }
    ],
    'shared-with-me': [
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
        type: 'pdf',
        pages: 3
      },
      {
        id: 4,
        name: 'Programación',
        type: 'folder'
      },
      {
        id: 5,
        name: 'Examen 12/07',
        type: 'pdf',
        pages: 7
      },
      {
        id: 6,
        name: 'Examen Lenguajes 12/07',
        type: 'pdf',
        pages: 18
      }
    ]
  };

  constructor(private http: HttpClient) {}

  getFake(route: string) {
    console.log(this.files[route]);

    return this.files[route];
  }
}
