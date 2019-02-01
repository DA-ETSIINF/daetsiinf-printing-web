import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilesService } from '../files.service';
import { FolderItem, FileToPrint, FileItem, ShowedItems } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  static currentSelected: ShowedItems;
  @Input()
  item: FolderItem | FileItem;

  showOptions$: Subscription;
  showOptions: boolean;

  @Input()
  index: number;

  isFile = false;
  constructor(private filesService: FilesService) {}

  ngOnInit() {
    this.showOptions$ = this.filesService.itemMenu$.subscribe(
      b => (this.showOptions = b)
    );
    this.filesService.currentSelected$.subscribe(files => {
      ItemComponent.currentSelected = files;
    });
    this.isFile = 'type' in this.item;
  }

  toggleOptionsIcon(item, status) {
    if (!this.showOptions && this.isFile) {
      item.querySelector('.options-icon').style.display = status;
    }
  }

  toggleOptions(e?) {
    this.filesService.itemMenu$.next(false);
    this.showOptions = !this.showOptions;
    if (e) {
      return false;
    }
  }

  addFileToQueue() {
    this.filesService.addFileToQueue(this.index);
    this.toggleOptions();
  }

  updateName(item: FolderItem | FileItem) {
    this.filesService.updateItemName$.next(item);
  }

  deleteItem(item: FolderItem | FileItem) {
    this.filesService.deleteItem$.next(item);
  }

  getIcon(item: FolderItem | FileItem) {
    if ('type' in item) {
      switch (item.type) {
        case 'pdf':
          return 'picture_as_pdf';
      }
    } else {
      return 'folder';
    }
  }
}
