import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  of,
  Subject,
  concat
} from 'rxjs';

import {
  FileToPrint,
  Folder,
  FolderItem,
  ShowedItems,
  FileItem
} from '../models';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService implements OnInit {
  files: Folder[] = [];
  files$ = new Subject<Folder[]>();
  showingItems$ = new BehaviorSubject<ShowedItems[]>([
    { id: 0, name: '', files: [], folders: [] },
    { id: 0, name: '', files: [], folders: [] }
  ]);

  currentSelected$ = new BehaviorSubject<ShowedItems>({
    id: 0,
    name: '',
    files: [],
    folders: []
  });

  itemsInQueue$ = new BehaviorSubject<FileToPrint[]>([]);
  updateItemName$ = new Subject<FolderItem | FileItem>();
  deleteItem$ = new Subject<FolderItem | FileItem>();
  createFolder$ = new Subject();

  itemMenu$ = new BehaviorSubject<boolean>(false);
  draggableItem$ = new Subject<{
    item: FolderItem;
    x: number;
    y: number;
    typeOfItem: 'file' | 'folder';
  }>();

  currentFolderId$ = new BehaviorSubject<number>(0);

  // 0 means my-files
  // 1 means shared-with-me
  index$ = new BehaviorSubject<0 | 1>(0);

  randomNames: string[][] = [
    [
      'Un buen nombre sería',
      'Nombre',
      '¿Y que tal este nombre?',
      'Yo que sé...'
    ],
    ['Asignatura chunga', 'Esta vez sacaré un 10', 'temp1']
  ];

  constructor(
    private http: HttpClient,
    public router: Router,
    private notificationsService: NotificationsService
  ) {
    this.fetchFiles();
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentPage = this.router.routerState.snapshot.url;
      this.index$.next(currentPage.includes('/my-files') ? 0 : 1);
    });
  }

  private appendItem(folderArr: Folder): ShowedItems {
    const results: ShowedItems = {
      id: 0,
      name: '',
      folders: [],
      files: []
    };
    if (folderArr === undefined) {
      return results;
    }
    folderArr.folders.map(folder => {
      results.folders.push({
        id: folder.id,
        name: folder.name,
        shorten: ''
      });
      if (folder.name.length > 13) {
        const begin = folder.name.substring(0, 8);
        const end = folder.name.substring(folder.name.length - 5);
        results.folders[
          results.folders.length - 1
        ].shorten = `${begin} ... ${end}`;
      }
    });
    folderArr.files.map(file => {
      results.files.push({
        id: file.id,
        name: file.name,
        type: file.type,
        link: file.link,
        npages: file.npages,
        shorten: ''
      });
      if (file.name.length > 13) {
        const begin = file.name.substring(0, 8);
        const end = file.name.substring(file.name.length - 5);
        results.files[results.files.length - 1].shorten = `${begin} ... ${end}`;
      }
    });
    return results;
  }

  findFolder(id: number, i: number): Folder {
    if (id === -1) {
      return this.files[i];
    }
    return this.findFolderRecursion(id, this.files);
  }

  private findFolderRecursion(id: number, folder: Folder[]): Folder {
    let foundedFolder;
    folder.forEach(f => {
      if (f.id === id) {
        foundedFolder = f;
      }
    });
    if (foundedFolder !== undefined) {
      return foundedFolder;
    }

    folder.forEach(f => {
      foundedFolder = this.findFolderRecursion(id, f.folders);
    });

    if (foundedFolder !== undefined) {
      return foundedFolder;
    }
    return undefined;
  }

  getPath(id: number): Folder[] {
    return this.getPathRecursion(id, this.files, []);
  }

  private getPathRecursion(id: number, folder: Folder[], path: Folder[]): Folder[] {
    let foundedFolder: Folder;
    folder.forEach(f => {
      if (f.id === id) {
        foundedFolder = f;
      }
    });

    if (foundedFolder !== undefined) {
      path.push(foundedFolder)
      return path;
    }

    folder.forEach(f => {
      path.push(f);
      this.getPathRecursion(id, f.folders, path);
    });

    return path;
  }

  updateShowing(id: number, type: 'myFiles' | 'sharedWithMe'): ShowedItems {
    const i = type === 'myFiles' ? 0 : 1;
    let folderArr: Folder;
    folderArr = this.findFolder(id, i);
    return this.appendItem(folderArr);
  }

  private handleData(data: Folder[]): Folder[] {
    data.map(_ => {
      _.files.map(file => {
        file.type = file.name.split('.').pop();
        file.name = file.name.substr(0, file.name.length - 4);
        if (file.name.length > 19) {
          const begin = file.name.substring(0, 13);
          const end = file.name.substring(file.name.length - 5);
          file.shorten = `${begin} ... ${end}`;
        }
      });
    });
    return data;
  }

  fetchFiles() {
    this.http
      .get(`${environment.server}:${environment.port}/print/files`)
      .subscribe(
        data => {
          data = this.handleData(data as Folder[]);
          this.files = data as Folder[];
          this.files$.next(this.files);
          console.log("%cEstructura de ficheros:", "background:#dedede; color:#333;");
          console.log(this.files);
          this.showingItems$.next([
            this.updateShowing(-1, 'myFiles'),
            { id: 0, name: '', files: [], folders: [] }
          ]);
          // TODO: This only works on root folder, must be repair
          this.currentFolderId$.next(this.files[this.index$.getValue()].id);
        },
        () => {
          this.notificationsService.addNotification({
            title: 'No se ha podido conectar con la API',
            status: 'error'
          });
        }
      );
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
      fd.set('file', file);
      fd.set('folder', 1);
      files$.push(of(fd));
    });
    concat(...files$).subscribe(fileData => {
      this.http
        .post(
          `${environment.server}:${environment.port}/print/upload/`,
          fileData
        )
        .subscribe(
          res => {
            console.log(res);

            this.notificationsService.addNotification({
              title: 'Archivo subido',
              status: 'ok'
            });
            this.fetchFiles();
          },
          err => {
            console.log(fileData);

            if (err.error.response === 'It´s not a valid file') {
              this.notificationsService.addNotification({
                title: 'Archivo no válido',
                status: 'error'
              });
            } else {
              this.notificationsService.addNotification({
                title: 'Error al subir el archivo',
                description: 'Ha habido un error en el servidor a la hora de tratar de \
                              subir el archivo. Vuelve a intentarlo en unos momentos',
                status: 'error'
              });
            }
          }
        );
    });
  }

  deleteItem(item: FolderItem) {
    console.log('Eliminar', item);
  }

  printFiles(files: FileToPrint[]) {
    this.http
      .post(
        `${environment.server}:${environment.port}/print/send-to-printer/`,
        files[0]
      )
      .subscribe(res => {
        this.notificationsService.addNotification({
          title: 'Enviada la petición',
          status: 'ok',
          description:
            'Ahora la carga de trabajo está en el backend y la impresora. Cruza los dedos.'
        });
      });
    if (files[0].ncopies > 1) {
      files[0].ncopies--;
      this.printFiles(files);
    }
    if (files.length > 1) {
      this.printFiles(files.slice(1));
    }
  }

  addFileToQueueByIndex(index: number) {
    this.showingItems$.subscribe(data => {
      this.index$.subscribe(i => {
        const file: FileItem = data[i].files[index];
        this.addFileToQueue(file);
      });
    });
  }

  addFileToQueue(file: FileItem) {
    const fileToPrint: FileToPrint = {
      documentId: file.id,
      name: file.name,
      npages: file.npages,
      doubleSided: true,
      ncopies: 1,
      color: false
    };
    this.itemsInQueue$.next([
      ...this.itemsInQueue$.getValue(),
      ...[fileToPrint]
    ]);
  }

  createFolder(name: string) {
    console.log(name);
  }

  getRandomName(): string {
    return `${
      this.randomNames[0][
        Math.floor(Math.random() * this.randomNames[0].length)
      ]
    }: ${
      this.randomNames[1][
        Math.floor(Math.random() * this.randomNames[1].length)
      ]
    }`;
  }

  moveFileToFolder (item: FolderItem, folder: FolderItem) {
    console.log("API call");
  }
}
