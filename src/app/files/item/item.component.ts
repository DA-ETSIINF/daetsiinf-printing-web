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

  @Input()
  index: number;

  isFile = false;
  constructor(private filesService: FilesService) {}

  ngOnInit() {
    this.filesService.currentSelected$.subscribe(files => {
      ItemComponent.currentSelected = files;
    });
    this.isFile = 'type' in this.item;
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
