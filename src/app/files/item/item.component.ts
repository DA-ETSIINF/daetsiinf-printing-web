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
  @Input()
  item: FolderItem | FileItem;

  showOptions$: Subscription;
  showOptions: boolean;

  currentSelected: ShowedItems;

  isFile = false;
  constructor(private filesService: FilesService) {}

  ngOnInit() {
    this.showOptions$ = this.filesService.itemMenu$.subscribe(
      b => (this.showOptions = b)
    );
    this.filesService.currentSelected$.subscribe(files => {
      this.currentSelected = files;
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
    this.currentSelected.files.map(file => {
      if ('type' in file) {
        this.filesService.addFileToQueue(file.id, file.name, (file as FileItem).npages);
      }
    });
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
