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

  statusDragable: { item: Item; x: number; y: number };

  constructor(private filesService: FilesService) {}

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
    if (e.buttons === 1 && e.target.closest('app-item') !== null) {
      const itemElem = e.target.closest('app-item');
      const section = Array.prototype.slice.call(
        itemElem.closest('section').children
      );
      console.log(e);

      const index = section.indexOf(itemElem);
      if (this.filesService.isCurrentPath('/my-files')) {
        this.filesService.myFiles$
          .pipe(map(item => item[index]))
          .subscribe(item =>
            this.filesService.dragableItem$.next({
              item,
              x: e.screenX,
              y: e.screenY
            })
          )
          .unsubscribe();
      }
    }
  }

  @HostListener('mouseup', ['$event'])
  mouseUp(e) {
    this.filesService.dragableItem$.next(undefined);
  }
}
