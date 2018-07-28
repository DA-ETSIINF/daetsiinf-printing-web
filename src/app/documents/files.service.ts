import { Injectable } from '@angular/core';
import { Item } from '../models';
@Injectable({
  providedIn: 'root'
})
export class FilesService {
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
  }
}
