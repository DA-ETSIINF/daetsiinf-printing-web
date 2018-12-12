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

  statusDragable: { item: FolderItem | FileItem; x: number; y: number } = null;
  statusDragableSubscription: Subscription;
  index: 0 | 1;

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

  @HostListener('mousemove', ['$event'])
  dragItem(e) {
    let item: FolderItem;
    if (e.buttons !== 1) {
      return;
    }

    if (this.statusDragable === null) {
      const itemElem = e.target.closest('app-item');
      if (itemElem === null) {
        return;
      }
      const section = Array.prototype.slice.call(
        itemElem.closest('section .grid').children
      );

      const index = section.indexOf(itemElem);

      this.filesService.showingFiles$
        .pipe(
          map(system => {
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
      y: e.pageY + 5
    });
  }

  @HostListener('mouseup', ['$event'])
  mouseUp(e) {
    this.filesService.dragableItem$.next(null);
  }
}
