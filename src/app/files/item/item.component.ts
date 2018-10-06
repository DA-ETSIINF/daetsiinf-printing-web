import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilesService } from '../files.service';
import { Item, InfoFile } from '../../models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input()
  item: Item;
  showOptions = false;

  constructor(private filesService: FilesService) {}

  ngOnInit() {}

  toggleOptionsIcon(item, status) {
    if (!this.showOptions) {
      item.children[0].style.display = status;
    }
  }

  toggleOptions(e?) {
    this.showOptions = !this.showOptions;
    if (e) {
      return false;
    }
  }

  addFileToQueue(id: number, name: string, pages: number) {
    let b: InfoFile[];
    this.filesService.itemsInQueue$.subscribe(a => (b = a)).unsubscribe();
    b.push({ id, name, pages, doubledSided: true, ncopies: 1 });
    this.filesService.itemsInQueue$.next(b);
    this.toggleOptions();
  }

  updateName(item: Item) {
    this.filesService.updateItemName$.next(item);
  }
}
