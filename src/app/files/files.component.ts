import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from './files.service';
import {
  FileToPrint,
  FolderItem,
  Folder,
  ShowedItems,
  FileItem,
  popupMenuType
} from '../models';
import { StreamRightClick } from '../models';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit, OnDestroy {
  currentSelected: ShowedItems = { files: [], folders: [] };
  itemShowing: ShowedItems = { files: [], folders: [] };
  allItems: Folder[] = [];
  itemsInQueue: FileToPrint[];

  // State for dropzone CSS toggling
  isHovering: boolean;


  isDragging = false;

  index: 0 | 1 = 0;

  constructor(
    public router: Router,
    private filesService: FilesService,
    public appComponent: AppComponent,
    private appService: AppService
  ) {
    this.filesService.files$.subscribe(data => {
      this.allItems = data;
    });
  }

  ngOnInit() {
    this.getItems();
    this.filesService.itemsInQueue$.subscribe(a => (this.itemsInQueue = a));
    this.filesService.index$.subscribe(i => (this.index = i));
    this.filesService.draggableItem$.subscribe(dragable => this.isDragging = dragable !== null);
  }

  getItems() {
    this.filesService.showingItems$.subscribe(showingData => {
      this.itemShowing = showingData[this.index];
    });
  }

  ngOnDestroy() {
    this.filesService.files$.unsubscribe();
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
    this.filesService.currentSelected$.next({ files: [], folders: [] });
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
    this.filesService.currentSelected$.next(this.currentSelected);
  }

  uploadChange() {
    const fileInput = <HTMLInputElement>document.getElementById('uploadInput');
    const files: FileList = fileInput.files;
    this.filesService.uploadChange(files);
  }

  hideOptions() {
    this.filesService.itemMenu$.next(false);
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  droppedFiles(event) {
    this.filesService.uploadChange(event);
  }

  triggerUpload() {
    this.filesService.triggerUpload();
  }

  triggerCreateFolder() {
    this.filesService.createFolder$.next();
  }

  private detectTarget(e: MouseEvent): popupMenuType {
    const classes = e.composedPath().map(t => (t as HTMLElement).className);
    if (classes.includes('grid files')) { return 'file'; }
    if (classes.includes('grid folders')) { return 'folder'; }
    return 'itemExplorer';
  }

  togglePopupMenu(e: MouseEvent) {
    this.appService.popupMenu$.next({
      event: e,
      type: this.detectTarget(e)
    });
  }
}
