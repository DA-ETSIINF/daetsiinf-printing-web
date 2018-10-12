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
import { Item } from '../models';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective implements OnDestroy {
  @Output()
  dropped = new EventEmitter<FileList>();
  @Output()
  hovered = new EventEmitter<boolean>();

  statusDragable: { item: Item; x: number; y: number } = null;
  statusDragableSubscription: Subscription;

  constructor(private filesService: FilesService) {
    this.statusDragableSubscription = this.filesService.dragableItem$.subscribe(
      file => {
        this.statusDragable = file;
      }
    );
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
    console.log(e);
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
    let item;
    if (e.buttons !== 1) {
      return;
    }
    if (this.statusDragable === null) {
      const itemElem = e.target.closest('app-item');
      const section = Array.prototype.slice.call(
        itemElem.closest('section').children
      );
      if (this.filesService.isCurrentPath('/my-files')) {
        const index = section.indexOf(itemElem);
        this.filesService.myFiles$
          .pipe(
            map(files => {
              return files[index];
            })
          )
          .subscribe(it => (item = it));
      }
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
