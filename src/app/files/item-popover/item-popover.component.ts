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
  dragableItem: { item: Item; x: number; y: number };
  dragableItemSubscription: Subscription;
  constructor(private filesService: FilesService) {
    this.dragableItemSubscription = this.filesService.dragableItem$.subscribe(
      item => (this.dragableItem = item !== null ? item : undefined)
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.dragableItemSubscription !== undefined) {
      this.dragableItemSubscription.unsubscribe();
    }
  }
}
