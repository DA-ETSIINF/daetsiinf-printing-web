import {
  Directive,
  HostListener,
  HostBinding,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FilesService } from './files.service';
import { map } from 'rxjs/operators';
import { FolderItem, FileItem } from '../models';
import { Subscription, Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective implements OnDestroy {
  @Output()
  dropped = new EventEmitter<FileList>();
  @Output()
  hovered = new EventEmitter<boolean>();

  statusDragable: {
    item: FolderItem | FileItem;
    x: number;
    y: number;
    typeOfItem: 'folder' | 'file';
  } = null;
  statusDragableSubscription: Subscription;
  index: 0 | 1;
  typeOfItem: 'folder' | 'file';

  constructor(
    private filesService: FilesService,
    public appComponent: AppComponent
  ) {
    this.statusDragableSubscription = this.filesService.dragableItem$.subscribe(
      file => {
        this.statusDragable = file;
      }
    );
    this.filesService.index$.subscribe(i => (this.index = i));
  }

  ngOnDestroy() {}

  @HostListener('drop', ['$event'])
  onDrop(e) {
    if (this.appComponent.deviceWidth === 'small') {
      return;
    }
    e.preventDefault();
    this.dropped.emit(e.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(e) {
    if (this.appComponent.deviceWidth === 'small') {
      return;
    }
    e.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(e) {
    if (this.appComponent.deviceWidth === 'small') {
      return;
    }
    e.preventDefault();
    this.hovered.emit(false);
  }

  @HostListener('mousemove', ['$event'])
  dragItem(e) {
    if (e.buttons !== 1 || this.appComponent.deviceWidth === 'small') {
      return;
    }

    let item: FolderItem | FileItem;
    if (this.statusDragable === null) {
      this.filesService.showingFiles$
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
      item = this.statusDragable.item;
    }

    if (item === undefined || item === null) {
      return;
    }
    this.filesService.dragableItem$.next({
      item,
      x: e.pageX,
      y: e.pageY + 5,
      typeOfItem: this.typeOfItem
    });
  }

  @HostListener('mouseup', ['$event'])
  mouseUp(e) {
    this.typeOfItem = undefined;
    this.filesService.dragableItem$.next(null);
  }
}
