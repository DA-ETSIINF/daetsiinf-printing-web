import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilesService } from '../files.service';
import { FolderItem, FileToPrint } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input()
  item: FolderItem;

  showOptions$: Subscription;
  showOptions: boolean;

  constructor(private filesService: FilesService) {}

  ngOnInit() {
    this.showOptions$ = this.filesService.itemMenu$.subscribe(
      b => (this.showOptions = b)
    );
  }

  toggleOptionsIcon(item, status) {
    if (!this.showOptions) {
      item.children[0].style.display = status;
    }
  }

  toggleOptions(e?) {
    this.filesService.itemMenu$.next(false);
    this.showOptions = !this.showOptions;
    if (e) {
      return false;
    }
  }

  addFileToQueue(id: number, name: string, npages: number) {
    let b: FileToPrint[];
    this.filesService.itemsInQueue$.subscribe(a => (b = a)).unsubscribe();
    b.push({ id, name, npages, doubledSided: true, ncopies: 1 });
    this.filesService.itemsInQueue$.next(b);
    this.toggleOptions();
  }

  updateName(item: FolderItem) {
    this.filesService.updateItemName$.next(item);
  }

  deleteItem(item: FolderItem) {
    this.filesService.deleteItem$.next(item);
  }
}
