import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {FilesService} from './files.service';
import {
  FileToPrint,
  FolderItem,
  Folder,
  ShowedItems,
  FileItem,
  popupMenuType
} from '../models';
import {AppService} from '../app.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit, OnDestroy {
  currentSelected: ShowedItems = {files: [], folders: []};
  itemShowing: ShowedItems = {files: [], folders: []};
  allItems: Folder[] = [];
  itemsInQueue: FileToPrint[];

  // State for dropzone CSS toggling
  isHovering: boolean;


  isDragging = false;

  index: 0 | 1 = 0;

  constructor(
    public router: Router,
    private filesService: FilesService,
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
    if (this.appService.deviceWidth === 'small') {
      this.router.navigate([page]);
    }
  }

  deselect() {
    const items = document.querySelectorAll('.selected');
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('selected');
    }
    this.currentSelected = {files: [], folders: []};
    this.filesService.currentSelected$.next({files: [], folders: []});
  }

  select(event: MouseEvent, itemInfo: FileItem | FolderItem) {
    if (!event.ctrlKey) {
      this.deselect();
    }
    const type = 'type' in itemInfo ? 'files' : 'folders';

    // @ts-ignore
    const i = this.itemShowing[type].indexOf(itemInfo);
    // @ts-ignore
    if (this.currentSelected[type].includes(itemInfo)) {
      // @ts-ignore
      const index = this.currentSelected[type].indexOf(itemInfo);
      document.querySelectorAll(`.grid.${type} app-item.selected`)[index].classList.remove('selected');
      this.currentSelected[type].splice(index, 1);
    } else {
      document.querySelectorAll(`.grid.${type} app-item`)[i].classList.add('selected');
      // @ts-ignore
      this.currentSelected[type].push(itemInfo);
      // @ts-ignore
      this.currentSelected[type].sort((a, b) => a.id - b.id);
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

  private detectTarget(e: MouseEvent | any, type: 'press' | 'click'): popupMenuType {
    let classes;
    if (type === 'press') {
      classes = e.srcEvent.path.map(t => (t as HTMLElement).className);
    }
    if (type === 'click') {
      classes = e.composedPath().map(t => (t as HTMLElement).className);
    }
    if (classes.includes('item')) {
      if (classes.includes('grid files')) {
        return 'file';
      }
      if (classes.includes('grid folders')) {
        return 'folder';
      }
    }
    return 'itemExplorer';
  }

  togglePopupMenu(e: MouseEvent, type: 'press' | 'click') {
    this.appService.popupMenu$.next({
      event: e,
      type: this.detectTarget(e, type)
    });
  }
}
