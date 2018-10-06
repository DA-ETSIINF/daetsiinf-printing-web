import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../../models';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilesService } from '../files.service';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css']
})
export class ChangeNameComponent implements OnInit, OnDestroy {
  showModal = false;
  itemToUpdate: Item;
  itemToUpdateSubscription: Subscription;

  constructor(private filesService: FilesService) {}

  ngOnInit() {
    this.itemToUpdateSubscription = this.filesService.updateItemName$
      .pipe(map(d => (this.itemToUpdate = d)))
      .subscribe(() => {
        if (this.itemToUpdate !== undefined) {
          this.showModal = true;
          setTimeout(() => {
            const input = document.getElementById('nameItem') as any;
            input.select();
            input.focus();
          }, 0);
        } else {
          this.showModal = false;
        }
      });
  }

  ngOnDestroy() {
    this.itemToUpdateSubscription.unsubscribe();
  }

  closeModal(e?) {
    if (e && e.target.className !== 'overlay') {
      return;
    }
    (document.querySelector('.overlay') as any).style.opacity = 0;
    (document.querySelector('.change-name') as any).style.transform =
      'scale(.5)';

    setTimeout(() => {
      this.filesService.updateItemName$.next(undefined);
    }, 200);
  }
}
