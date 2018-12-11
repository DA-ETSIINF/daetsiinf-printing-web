import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, throttle } from 'rxjs/operators';
import { FilesService } from './files.service';
import { FileToPrint, FolderItem, Folder, ShowedItems, FileItem } from '../models';
import { AppComponent } from '../app.component';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit, OnDestroy {
  status: string;
  currentSelected: ShowedItems = {files: [], folders: []};
  itemShowing: ShowedItems = {files: [], folders: []};
  allItems: Folder[] = [];
  index: 0 | 1 = 0;
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
    this.fileService.files$.subscribe(data => {
      this.allItems = data;
    });
  }

  ngOnInit() {
    this.getItems();
    this.fileService.itemsInQueue$.subscribe(a => (this.itemsInQueue = a));
    this.router.events.subscribe(() => {
      const currentPage = this.router.routerState.snapshot.url;
      if (currentPage === '/my-files') {
        this.index = 0;
      } else if (currentPage === '/shared-with-me') {
        this.index = 1;
      }
      this.getItems();
    });
  }

  getItems() {
    console.log("_____");
    
    this.fileService.showingFiles$.subscribe(showingData => {
      this.itemShowing = showingData[this.index];
    });
  }

  ngOnDestroy() {
    this.fileService.files$.unsubscribe();
  }

  goTo(page: string, submenu?: string) {
    if (submenu) {
      this.router.navigate([page]);
    } else {
      this.router.navigate([page]);
    }
  }

  shortenNames(files: FileItem[]): FolderItem[] {
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
    this.currentSelected = {files: [], folders: []};
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

  getCurrentItems() {
    return this.allItems[this.index];
  }

  select(event, itemInfo: FileItem | FolderItem) {
    if (!event.ctrlKey) {
      this.deselect();
    }
    this.selectOne(event);
    if ('type' in itemInfo) {
      // Es de tipo FileItem
      this.currentSelected.files.push(itemInfo);
    } else {
      // Es de tipo FolderItem
      this.currentSelected.folders.push(itemInfo);
    }
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
