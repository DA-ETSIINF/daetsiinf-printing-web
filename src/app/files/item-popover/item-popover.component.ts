import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  of,
  Observable,
  Subject,
  interval,
  Subscription
} from 'rxjs';
import { Item } from '../../models';
import { FilesService } from '../files.service';

@Component({
  selector: 'app-item-popover',
  templateUrl: './item-popover.component.html',
  styleUrls: ['./item-popover.component.css']
})
export class ItemPopoverComponent implements OnInit, OnDestroy {
  dragableItem: Item;
  dragableItemSubscription: Subscription;
  x = 0;
  y = 0;
  constructor(private filesService: FilesService) {
    this.dragableItemSubscription = this.filesService.dragableItem$.subscribe(
      item => {
        if (item !== undefined) {
          this.dragableItem = item.item;
          this.x = item.x;
          this.y = item.y;
        }
      }
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.dragableItemSubscription !== undefined) {
      this.dragableItemSubscription.unsubscribe();
    }
  }
}
