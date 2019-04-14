import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FilesService} from '../../files/files.service';
import {FileItem, FolderItem, ItemMenu} from '../../models';

@Component({
  selector: 'app-floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.css']
})
export class FloatingMenuComponent implements OnInit {

  menuList: ItemMenu[];
  position = {
    x: undefined,
    y: undefined
  };
  constructor(
    private appService: AppService,
    private filesService: FilesService) { }

  ngOnInit() {
    this.appService.popupMenu$.subscribe(d => {
      if (d !== null) {
        d.event.preventDefault();
        this.menuList = [];
        console.log(d);
        this.position = {
          x: d.event.clientX,
          y: d.event.clientY
        };
        switch (d.type) {
          case 'file':
            this.setItemFilesMenu(this.getItem(d.event, 'files') as FileItem);
            break;
          case 'folder':
            this.setItemFolderMenu(this.getItem(d.event, 'folders') as FolderItem);
            break;
          case 'itemExplorer':
            this.setItemExplorerMenu();
            break;
        }
      } else {
        this.menuList = [];
      }
    });
  }

  isSmallScreen(): boolean {
    return this.appService.deviceWidth === 'small';
  }

  private getItem(e: Event, targetQuery: string): FileItem | FolderItem {
    const target = (e.composedPath()[0] as HTMLElement).closest(`.${targetQuery} app-item`);
    let index = -1;
    const targets = document.querySelectorAll(`.${targetQuery} app-item`);
    targets.forEach((appItem, i) => {
      if (appItem.isEqualNode(target)) {
        index = i;
        return;
      }
    });
    return this.filesService.showingItems$.getValue()[this.filesService.index$.getValue()][targetQuery][index];
  }

  private setItemFilesMenu(item: FileItem) {
    this.menuList = [
      {
        text: 'add_to_queue',
        icon: 'printer',
        functionToRun: () => this.filesService.addFileToQueue(item)
      }, {
        text: 'change_name',
        icon: 'edit',
        functionToRun: () => this.filesService.updateItemName$.next(item)
      }, {
        text: 'delete',
        icon: 'delete',
        functionToRun: () => this.filesService.deleteItem$.next(item)
      }
    ];
  }

  private setItemFolderMenu(folder: FolderItem) {
    this.menuList = [
      {
        text: 'change_name',
        icon: 'edit',
        functionToRun: () => this.filesService.updateItemName$.next(folder)
      }, {
        text: 'delete',
        icon: 'delete',
        functionToRun: () => this.filesService.deleteItem$.next(folder)
      }
    ];
  }

  private setItemExplorerMenu() {
    this.menuList = [
      {
        text: 'upload_file',
        icon: 'cloud_upload',
        functionToRun: () => this.filesService.triggerUpload()
      }, {
        text: 'create_folder',
        icon: 'folder',
        functionToRun: () => this.filesService.createFolder$.next()
      }
    ];
  }
}
