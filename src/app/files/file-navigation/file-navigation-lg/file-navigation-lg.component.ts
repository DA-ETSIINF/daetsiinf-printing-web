import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../files.service';
import {ShowedItems, Folder, userOS} from '../../../models';
import {AppService} from '../../../app.service';

@Component({
  selector: 'app-file-navigation-lg',
  templateUrl: './file-navigation-lg.component.html',
  styleUrls: ['./file-navigation-lg.component.css']
})
export class FileNavigationLgComponent implements OnInit {

  folders: ShowedItems;
  path: Folder[];
  sidebarStatues: string[];

  constructor(private filesService: FilesService, private appService: AppService) { }

  ngOnInit() {
    this.filesService.showingItems$.subscribe(f => {
      console.log(f[this.filesService.index$.getValue()])
      this.folders = f[this.filesService.index$.getValue()];
      this.folders.name = 'my_files';
    });

    this.filesService.currentFolderId$.subscribe(folderId => {
      this.path = this.filesService.getPath(folderId);
      this.sidebarStatues = this.path.map(() => 'close');
    });
  }

  getUserOS(): userOS {
    return this.appService.getUserOS();
  }

  showPathOptions(i: number) {
    const status = this.sidebarStatues[i];
    const nelements = this.path[i].files.length + this.path[i].folders.length;
    (document.querySelector('.breadcrumb > div .sidebar') as any).style.setProperty('--nelements', nelements)

    this.sidebarStatues = this.sidebarStatues.map(() => 'close');
    this.sidebarStatues[i] = status === 'open' ? 'close' : 'open';
  }
}
