import { Component, OnInit, Input } from '@angular/core';
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

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  addFileToQueue(id: number, name: string, pages: number) {
    let b: InfoFile[];
    this.filesService.itemsInQueue$.subscribe(a => (b = a)).unsubscribe();
    b.push({ id, name, pages, doubledSided: true, ncopies: 1 });
    this.filesService.itemsInQueue$.next(b);
    this.toggleOptions();
  }
}
