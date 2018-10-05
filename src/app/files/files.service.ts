import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { Item, InfoFile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  myFiles: Item[] = [
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
  ];
  sharedWithMe = [
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
  ];

  myFiles$: Observable<Item[]> = of(this.getMyFiles());
  sharedWithMe$: Observable<Item[]> = of(this.getSharedFiles());
  itemsInQueue$ = new BehaviorSubject<InfoFile[]>([]);

  constructor(private http: HttpClient) {}
  private getMyFiles() {
    return this.myFiles;
  }

  private getSharedFiles() {
    return this.sharedWithMe;
  }
}
