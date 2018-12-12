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

  constructor(private filesService: FilesService) {
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
    e.preventDefault();
    this.dropped.emit(e.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(e) {
    e.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(e) {
    e.preventDefault();
    this.hovered.emit(false);
  }

  private getTypeOfItem(itemElem): 'file' | 'folder' {
    return itemElem.closest('section .grid.folders') !== null
      ? 'folder'
      : 'file';
  }

  @HostListener('mousemove', ['$event'])
  dragItem(e) {
    if (e.buttons !== 1) {
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
            this.getTypeOfItem(itemElem);
            const section =
              this.typeOfItem === 'folder'
                ? Array.prototype.slice.call(
                    itemElem.closest('section .grid.folders').children
                  )
                : Array.prototype.slice.call(
                    itemElem.closest('section .grid.files').children
                  );
            const index = section.indexOf(itemElem);
            console.log(index);

            return (system as any)[this.index].files[index];
          })
        )
        .subscribe(it => {
          item = it;
        });
    } else {
      item = this.statusDragable.item;
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
