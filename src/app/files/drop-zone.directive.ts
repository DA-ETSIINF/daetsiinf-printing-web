import {
  Directive,
  HostListener,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FilesService } from './files.service';
import { map } from 'rxjs/operators';
import { FolderItem, FileItem } from '../models';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective implements OnDestroy {
  @Output()
  dropped = new EventEmitter<FileList>();
  @Output()
  hovered = new EventEmitter<boolean>();

  dragable: {
    item: FolderItem | FileItem;
    x: number;
    y: number;
    typeOfItem: 'folder' | 'file';
  } = null;
  statusDragableSubscription: Subscription;
  index: 0 | 1;
  typeOfItem: 'folder' | 'file';

  fileHoverFolder = false;

  constructor(
    private filesService: FilesService,
    public appService: AppService
  ) {
    this.statusDragableSubscription = this.filesService.draggableItem$.subscribe(
      file => {
        this.dragable = file;
      }
    );
    this.filesService.index$.subscribe(i => (this.index = i));
  }

  ngOnDestroy() {}

  @HostListener('drop', ['$event'])
  onDrop(e) {
    if (this.appService.deviceWidth === 'small') {
      return;
    }
    e.preventDefault();
    this.dropped.emit(e.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(e) {
    if (this.appService.deviceWidth === 'small') {
      return;
    }
    e.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(e) {
    if (this.appService.deviceWidth === 'small') {
      return;
    }
    e.preventDefault();
    this.hovered.emit(false);
  }

  @HostListener('mousemove', ['$event'])
  dragItem(e) {
    if (e.buttons !== 1 || this.appService.deviceWidth === 'small') {
      return;
    }

    this.fileHoverFolder = false;

    let item: FolderItem | FileItem;
    if (this.dragable === null) {
      this.filesService.showingItems$
        .pipe(
          map(system => {
            const itemElem = e.target.closest('app-item');
            if (itemElem === null) {
              return;
            }
            if (this.typeOfItem === undefined) {
              this.typeOfItem =
                itemElem.closest('.folders') !== null ? 'folder' : 'file';
            }
            const section = Array.prototype.slice.call(
              itemElem.closest(`section .grid.${this.typeOfItem}s`).children
            );
            const index = section.indexOf(itemElem);
            return (system as any)[this.index][`${this.typeOfItem}s`][index];
          })
        )
        .subscribe(it => {
          item = it;
        });
    } else {
      item = this.dragable.item;
    }

    if (item === undefined || item === null) {
      return;
    }

    const fileHoverClassElement = document.querySelector('app-item.file-hover');
    if (fileHoverClassElement !== null) {
      fileHoverClassElement.classList.remove('file-hover');
    }

    const itemInScreen = e.path[0].closest('.item');
    if (itemInScreen !== null) {
      const isFolder = itemInScreen.children[0].innerHTML === 'folder';
      if (isFolder) {
        itemInScreen.parentElement.classList.add('file-hover');
        this.fileHoverFolder = true;
      }
    }
    this.filesService.draggableItem$.next({
      item,
      x: e.pageX,
      y: e.pageY + 5,
      typeOfItem: this.typeOfItem
    });
  }

  @HostListener('mouseup', ['$event'])
  mouseUp(e) {
    // Remove all folders with the class file-hover
    const fileHoverClassElement = document.querySelector('app-item.file-hover');
    if (fileHoverClassElement !== null) {
      fileHoverClassElement.classList.remove('file-hover');
    }

    // In case of a drop in a folder, detect which folder is the destination
    // and make the call to the API (fileService)
    if (this.fileHoverFolder) {
      const folders = document.querySelector('.folders');
      Array.from(folders.children).map((el, i) => {
        if (el === fileHoverClassElement) {
          this.filesService.showingItems$.subscribe(files => {
            const folder = files[this.index].folders[i];
            this.filesService.moveFileToFolder(this.dragable.item, folder);
          });
        }
      });
    }

    // Add file to queue if file is dropped in blue part
    const appPrinterDropZone = document.querySelector('app-printer-drop-zone');
    Array.from(e.path).map(el => {
      if (el === appPrinterDropZone) {
        this.filesService.addFileToQueue(this.dragable.item as FileItem);
      }
    });

    // Remove draglable item from screen
    this.typeOfItem = undefined;
    this.filesService.draggableItem$.next(null);
  }
}
