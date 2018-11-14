import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map ,  throttle } from 'rxjs/operators';
import { FilesService } from './files.service';
import { FileToPrint, FolderItem } from '../models';
import { AppComponent } from '../app.component';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit, OnDestroy {
  status: string;
  currentSelected: FolderItem[] = [];
  myFiles: FolderItem[] = [];
  myFiles$: Subscription;
  sharedWithMe: FolderItem[] = [];
  sharedWithMe$: Subscription;
  loading: boolean;
  showMyFilesAside: boolean;
  showSharedFilesAside: boolean;
  itemsInQueue: FileToPrint[];

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(
    public router: Router,
    private fileService: FilesService,
    public appComponent: AppComponent
  ) {
    router.events.pipe(throttle(() => interval(100))).subscribe(() => {
      this.loading = true;

      if (this.myFiles$ !== undefined) {
        this.myFiles$.unsubscribe();
      }
      this.myFiles$ = this.fileService.myFiles$
        .pipe(map(items => this.shortenNames(items)))
        .pipe(throttle(() => interval(1000)))
        .subscribe(items => {
          this.myFiles = items;
        });

      if (this.sharedWithMe$ !== undefined) {
        this.sharedWithMe$.unsubscribe();
      }
      this.sharedWithMe$ = this.fileService.sharedWithMe$
        .pipe(map(items => this.shortenNames(items)))
        .pipe(throttle(() => interval(1000)))
        .subscribe(items => {
          this.sharedWithMe = items;
        });

      this.loading = false;
    });
  }

  ngOnInit() {
    this.fileService.itemsInQueue$.subscribe(a => (this.itemsInQueue = a));
  }

  ngOnDestroy() {
    this.myFiles$.unsubscribe();
    this.sharedWithMe$.unsubscribe();
  }

  goTo(page: string, submenu?: string) {
    if (submenu) {
      this.router.navigate([page]);
    } else {
      this.router.navigate([page]);
    }
  }

  shortenNames(files: FolderItem[]): FolderItem[] {
    files.map(e => {
      if (e.name.length > 13) {
        const begin = e.name.substring(0, 8);
        const end = e.name.substring(e.name.length - 5);
        e.shorten = `${begin} ... ${end}`;
      }
    });
    return files;
  }
  deselect() {
    const items = document.querySelectorAll('.selected');
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('selected');
    }
    this.currentSelected = [];
  }
  selectOne(event) {
    if (event.target.localName === 'app-item') {
      event.target.classList.add('selected');
    } else if (event.target.className.includes('item')) {
      event.target.parentElement.classList.add('selected');
    } else {
      event.target.parentElement.parentElement.classList.add('selected');
    }
  }

  getCurrentPath() {
    return this.fileService.currentPage;
  }

  getCurrentItems() {
    return this.fileService.isCurrentPath('/my-files')
      ? this.myFiles
      : this.sharedWithMe;
  }

  select(event, itemInfo) {
    if (!event.ctrlKey) {
      this.deselect();
    }
    this.selectOne(event);
    this.currentSelected.push(itemInfo);
  }

  uploadChange() {
    const fileInput = <HTMLInputElement>document.getElementById('uploadInput');
    const files: FileList = fileInput.files;
    this.fileService.uploadChange(files);
  }

  hideOptions() {
    this.fileService.itemMenu$.next(false);
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  droppedFiles(event) {
    this.fileService.uploadChange(event);
  }
}
