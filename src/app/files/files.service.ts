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

import { delay ,  throttle } from 'rxjs/operators';
import { FileToPrint, Folder, FolderItem } from '../models';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  files: Folder[] = [
    {
      name: 'Mis documentos',
      id: 1,
      files: [{
        name: 'File 1.pdf',
        id: 2,
        npages: 10
      },
      {
        name: 'File 2.pdf',
        id: 5,
        npages: 10
      }],
      folders: [{
        id: 3,
        name: 'Estructura',
        files: [{
          name: 'Practica 1.pdf',
          id: 4,
          npages: 10
        }],
        folders: [
          {
            name: '0fdsa',
            id: 10,
            folders: [],
            files: [{
              name: 'dfsafds.pdf',
              id: 16,
              npages: 10
            }]
          }
        ]
      }],
    },
    {
      name: 'Compartidos conmmigo',
      id: 1,
      files: [{
        name: 'File 1.pdf',
        id: 200,
        npages: 10
      },
      {
        name: 'File 2.pdf',
        id: 500,
        npages: 10
      }],
      folders: [{
        id: 344,
        name: 'Estructura',
        files: [{
          name: 'Practica 1.pdf',
          id: 41,
          npages: 10
        }],
        folders: []
      }],
    }
  ];

  myFiles: FolderItem[] = [];


  myFiles$: Observable<FolderItem[]> = of(this.getFolderItems(0, 'folders'));
  sharedWithMe$: Observable<FolderItem[]> = of([]);
  // sharedWithMe$: Observable<FolderItem[]> = of(this.getFiles(1));
  itemsInQueue$ = new BehaviorSubject<FileToPrint[]>([]);
  updateItemName$ = new Subject<FolderItem>();
  deleteItem$ = new Subject<FolderItem>();

  itemMenu$ = new BehaviorSubject<boolean>(false);
  dragableItem$ = new Subject<{ item: FolderItem; x: number; y: number }>();

  currentPage: string;

  constructor(private http: HttpClient, public router: Router) {
    this.router.events.pipe(throttle(() => interval(100))).subscribe(() => {
      this.currentPage = this.router.routerState.snapshot.url;
    });
  }


  fetchFiles(): Observable<any> {
    return this.http.get(`${environment.server}:${environment.port}/print/files`);
  }

  getFolderItems(n: number, type: string): FolderItem[] {
    const arr: FolderItem[] = [];
    let files: FolderItem[] = [];
    this.fetchFiles().subscribe(data => {
      files = data as FolderItem[];
      console.log('sdfads', files[n]);
      files[n]['files'].map(item => {
        const itemInfo: FolderItem = {
          name: item.name,
          id: item.id,
          type: item.name.substring(item.name.length - 3),
        };
        if (type !== 'folders') {
          itemInfo.npages = item.npages;
          itemInfo.link = item.file;
        }
        console.log(itemInfo);
        arr.push(itemInfo);
      });
      console.log(arr);
    });
    return arr;
  }

  getFiles(n: number) {
    const items = [
      ...this.getFolderItems(n, 'folders'),
      ...this.getFolderItems(n, 'files'),
    ];
    return items;
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
      console.log(fileData);
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
}
