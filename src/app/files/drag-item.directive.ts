import {
  Directive,
  HostListener,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: '[appDragItem]'
})
export class DragItemDirective {
  constructor() {}

  @HostListener('mousedown', ['$event'])
  onDrag(event) {}
}
