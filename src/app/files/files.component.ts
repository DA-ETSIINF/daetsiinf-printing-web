import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, throttle } from 'rxjs/operators';
import { FilesService } from './files.service';
import {
  FileToPrint,
  FolderItem,
  Folder,
  ShowedItems,
  FileItem
} from '../models';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit, OnDestroy {
  status: string;
  currentSelected: ShowedItems = { files: [], folders: [] };
  itemShowing: ShowedItems = { files: [], folders: [] };
  allItems: Folder[] = [];
  showMyFilesAside: boolean;
  showSharedFilesAside: boolean;
  itemsInQueue: FileToPrint[];

  // State for dropzone CSS toggling
  isHovering: boolean;


  isDragging = false;

  index: 0 | 1 = 0;

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
    this.fileService.index$.subscribe(i => (this.index = i));
    this.fileService.dragableItem$.subscribe(dragable => this.isDragging = dragable !== null);
  }

  getItems() {
    this.fileService.showingFiles$.subscribe(showingData => {
      this.itemShowing = showingData[this.index];
    });
  }

  ngOnDestroy() {
    this.fileService.files$.unsubscribe();
  }

  goTo(page: string) {
    if (this.appComponent.deviceWidth === 'small') {
      this.router.navigate([page]);
    }
  }

  deselect() {
    const items = document.querySelectorAll('.selected');
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('selected');
    }
    this.currentSelected = { files: [], folders: [] };
    this.fileService.currentSelected$.next({ files: [], folders: [] });
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
    this.fileService.currentSelected$.next(this.currentSelected);
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

  triggerUpload() {
    this.fileService.triggerUpload();
  }

  triggerCreateFolder() {
    this.fileService.createFolder$.next();
  }
}
