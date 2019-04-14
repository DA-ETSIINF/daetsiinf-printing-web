import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from '../../files/files.service';
import { AppService } from '../../app.service';
import { FolderItem, Folder, ShowedItems } from '../../models';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  currentPage: string;
  showMyFilesAside = 0;
  showSharedFilesAside = 0;
  files: Folder[];
  myFilesShowing: ShowedItems =  {files: [], folders: []};
  myFilesShared: ShowedItems = {files: [], folders: []};
  myFiles: FolderItem[] = [];
  sharedWithMe: FolderItem[] = [];
  separatorHeight = 3;

  constructor(
    public router: Router,
    private fileService: FilesService,
    public appService: AppService
  ) {
    this.currentPage = this.router.routerState.snapshot.url;
    this.fileService.files$.subscribe(data => {
      this.files = data;
    });
    this.fileService.showingItems$.subscribe(data => {
      this.myFilesShowing = data[0];
      this.myFilesShared = data[1];
    });
  }

  ngOnInit() {}

  isLargeScreen(): boolean {
    return this.appService.deviceWidth === 'large';
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
  triggerUpload() {
    this.fileService.triggerUpload();
  }
}
