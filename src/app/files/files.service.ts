import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  of,
  Observable,
  Subject,
  interval,
  concat,
  ReplaySubject
} from 'rxjs';

import { delay } from 'rxjs/operators';
import { Item, InfoFile } from '../models';
import { throttle } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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
  updateItemName$ = new Subject<Item>();
  deleteItem$ = new Subject<Item>();

  itemMenu$ = new BehaviorSubject<boolean>(false);
  dragableItem$ = new Subject<{ item: Item; x: number; y: number }>();

  currentPage: string;

  constructor(private http: HttpClient, public router: Router) {
    this.router.events.pipe(throttle(() => interval(100))).subscribe(() => {
      this.currentPage = this.router.routerState.snapshot.url;
    });
  }
  private getMyFiles() {
    return this.myFiles;
  }

  private getSharedFiles() {
    return this.sharedWithMe;
  }

  triggerUpload() {
    const fileInput = <HTMLInputElement>document.getElementById('uploadInput');
    fileInput.click();
  }

  uploadChange(files: FileList) {
    const files$ = [];
    let fd;
    Array.from(files).map(file => {
      fd = new FormData();
      fd.set('file', files[0]);
      fd.set('folder', 1);
      const fileInfo = {
        file: fd,
        folder: 1
      };
      files$.push(of(fileInfo));
    });

    concat(...files$).subscribe(fileData => {
      this.http
        .post(
          `${environment.server}:${environment.port}/print/upload/`,
          fileData
        )
        .subscribe(res => console.log(res));
    });
  }

  deleteItem(item: Item) {
    console.log('Eliminaar', item);
  }

  isCurrentPath(path: string) {
    return this.currentPage === path;
  }
}
