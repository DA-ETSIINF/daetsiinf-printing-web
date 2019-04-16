import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from '../../files/files.service';
import { AppService } from '../../app.service';
import { FolderItem, Folder, ShowedItems } from '../../models';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  currentPage: string;
  showMyFilesAside = 0;
  showSharedFilesAside = 0;
  files: Folder[];
  myFilesShowing: ShowedItems =  { id: 0, name: '', files: [], folders: []};
  myFilesShared: ShowedItems = { id: 0, name: '', files: [], folders: []};
  myFiles: FolderItem[] = [];
  sharedWithMe: FolderItem[] = [];
  separatorHeight = 3;

  constructor( public router: Router,
               private fileService: FilesService,
               public appService: AppService) { }

  ngOnInit() {
    this.currentPage = this.router.routerState.snapshot.url;
    this.fileService.files$.subscribe(data => {
      this.files = data;
    });
    this.fileService.showingItems$.subscribe(data => {
      this.myFilesShowing = data[0];
      this.myFilesShared = data[1];
    });
  }

  goTo(page: string, submenu?: string) {
    if (submenu) {
      this.router.navigate([page]);
    } else {
      this.router.navigate([page]);
    }
  }

  toggleMyFilesView(id: string) {
    const ul = document.getElementById(id);
    this.showMyFilesAside = this.showMyFilesAside === 0 ?  this.separatorHeight + ul.scrollHeight : 0;
  }

  toggleSharedFilesView(id: string) {
    const ul = document.getElementById(id);
    this.showSharedFilesAside =
      this.showSharedFilesAside === 0 ? this.separatorHeight + ul.scrollHeight : 0;
  }

}
