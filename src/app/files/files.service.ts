import { Injectable, OnInit } from '@angular/core';
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

import { delay, throttle, tap, throwIfEmpty } from 'rxjs/operators';
import { FileToPrint, Folder, FolderItem } from '../models';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class FilesService implements OnInit {
  fetchedMyFiles: FolderItem[] = [];
  myFiles: FolderItem[] = [];

  myFiles$ = new Subject<FolderItem[]>();
  sharedWithMe$: Observable<FolderItem[]> = of([]);
  // sharedWithMe$: Observable<FolderItem[]> = of(this.getFiles(1));
  itemsInQueue$ = new BehaviorSubject<FileToPrint[]>([]);
  updateItemName$ = new Subject<FolderItem>();
  deleteItem$ = new Subject<FolderItem>();
  createFolder$ = new Subject();

  itemMenu$ = new BehaviorSubject<boolean>(false);
  dragableItem$ = new Subject<{ item: FolderItem; x: number; y: number }>();

  currentPage: string;

  randomNames: { a: string; b: string }[] = [
    { a: 'Un buen nombre sería', b: 'Asignatura chunga' },
    { a: 'Nombre', b: 'Esta vez sacaré un 10' },
    { a: '¿Y qué tal este nombre?', b: 'temp1' }
  ];

  constructor(private http: HttpClient, public router: Router) {
    this.fetchFiles(0);
    this.router.events.pipe(throttle(() => interval(100))).subscribe(() => {
      this.currentPage = this.router.routerState.snapshot.url;
    });
  }

  ngOnInit() {}

  fetchFiles(n: number) {
    this.http
      .get(`${environment.server}:${environment.port}/print/files`)
      .subscribe(data => {
        this.fetchedMyFiles = data as FolderItem[];
        this.myFiles$.next([
          ...this.getFolderItems(n, 'folders'),
          ...this.getFolderItems(n, 'files')
        ]);
      });
  }

  getFolderItems(n: number, type: string) {
    const arr: FolderItem[] = [];
    this.fetchedMyFiles[n][type].map(item => {
      const itemInfo: FolderItem = {
        name: item.name,
        id: item.id,
        type: item.name.substring(item.name.length - 3)
      };
      if (type !== 'folders') {
        itemInfo.npages = item.npages;
        itemInfo.link = item.file;
      }
      arr.push(itemInfo);
    });
    return arr;
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
      files$.push(of(fd));
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

  deleteItem(item: FolderItem) {
    console.log('Eliminar', item);
  }

  isCurrentPath(path: string) {
    return this.currentPage === path;
  }

  printFiles(files: FileToPrint[]) {
    console.log(files[0]);
    this.http
      .post(
        `${environment.server}:${environment.port}/print/send-to-printer/`,
        files[0]
      )
      .subscribe(res => {
        console.log(res);
      });
    if (files.length > 1) {
      this.printFiles(files.slice(1));
    }
  }

  addFileToQueue(documentId: number, name: string, npages: number) {
    let b: FileToPrint[];
    this.itemsInQueue$.subscribe(a => (b = a)).unsubscribe();
    b.push({ documentId, name, npages, doubleSided: true, ncopies: 1 });
    this.itemsInQueue$.next(b);
    console.log(b);
  }

  createFolder(name: string) {
    console.log(name);
  }

  getRandomName(): string {
    const a = [];
    const b = [];
    this.randomNames.map(c => {
      a.push(c.a);
      b.push(c.b);
    });
    return `${a[Math.floor(Math.random() * this.randomNames.length)]}: ${
      b[Math.floor(Math.random() * this.randomNames.length)]
    }`;
  }
}
