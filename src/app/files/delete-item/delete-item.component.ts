import { Component, OnInit, OnDestroy } from '@angular/core';
import { FolderItem } from '../../models';
import { Subscription, BehaviorSubject, Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FilesService } from '../files.service';
import { differenceInMilliseconds, lastDayOfISOWeek } from 'date-fns';
@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit, OnDestroy {
  showModal = false;
  itemToDelete: FolderItem;
  itemToDeleteSubscription: Subscription;

  interval$ = interval(50);
  intervalSubscription: Subscription;
  start: Date;
  progress = 0;

  constructor(private filesService: FilesService) {}

  ngOnInit() {
    this.itemToDeleteSubscription = this.filesService.deleteItem$
      .pipe(map(d => (this.itemToDelete = d)))
      .subscribe(() => {
        this.showModal = this.itemToDelete !== undefined ? true : false;
        this.progress = 0;
      });
  }

  ngOnDestroy() {
    this.itemToDeleteSubscription.unsubscribe();
    if (this.intervalSubscription !== undefined) {
      this.intervalSubscription.unsubscribe();
    }
  }

  closeModal(e?) {
    if (e && e.target.className !== 'overlay') {
      return;
    }
    (document.querySelector('.overlay') as any).style.opacity = 0;
    (document.querySelector('.delete-modal') as any).style.transform =
      'scale(.5)';

    setTimeout(() => {
      this.filesService.deleteItem$.next(undefined);
    }, 200);
  }

  getCSSVariable(CSSVar: string): string {
    const computedStyle: CSSStyleDeclaration = getComputedStyle(
      document.querySelector(':root')
    );
    return computedStyle.getPropertyValue(CSSVar).trim();
  }

  mouseDown() {
    this.start = new Date();
    this.intervalSubscription = this.interval$
      .pipe(map(p => p * 6))
      .pipe(take(20))
      .subscribe(p => {
        if (p <= 100) {
          this.progress = p;
        } else {
          this.progress = 100;
        }
      });
  }

  fakeProgress() {
    if (this.progress < 20) {
      this.progress = 20;
      setTimeout(() => {
        this.progress = 0;
      }, 500);
    }
  }

  mouseUp() {
    const end: Date = new Date();
    const difference = differenceInMilliseconds(end, this.start);
    this.start = null;
    this.intervalSubscription.unsubscribe();
    if (difference >= 1000) {
      const trash = document.querySelector('.delete i') as any;
      trash.style.color = this.getCSSVariable('--bad');
      trash.style.transform = 'scale(0)';
      this.filesService.deleteItem(this.itemToDelete);
      setTimeout(() => {
        this.closeModal();
        this.progress = 0;
      }, 800);
    } else {
      setTimeout(() => {
        this.progress = 0;
      }, 200);
    }
  }
}
