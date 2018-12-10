import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from '../../files/files.service';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';
import { FolderItem, Folder } from '../../models';

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
  myFilesShowing: FolderItem[] = [];
  myFilesShared: FolderItem[] = [];
  myFiles: FolderItem[] = [];
  sharedWithMe: FolderItem[] = [];

  constructor(
    public router: Router,
    private fileService: FilesService,
    public appComponent: AppComponent
  ) {
    this.currentPage = this.router.routerState.snapshot.url;
    this.fileService.files$.subscribe(data => {
      this.files = data;
    });
    this.fileService.showingFiles$.subscribe(data => {
      this.myFilesShowing = data[0];
      this.myFilesShared = data[1];
    });
  }

  ngOnInit() {}

  shortenNames(files: FolderItem[]): FolderItem[] {
    files.map(e => {
      if (e.name.length > 13) {
        const begin = e.name.substring(0, 8);
        const end = e.name.substring(e.name.length - 5);
        e.shorten = `${begin} ... ${end}`;
      }
    });
    return files;
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
    this.showMyFilesAside = this.showMyFilesAside === 0 ? ul.scrollHeight : 0;
  }

  toggleSharedFilesView(id: string) {
    const ul = document.getElementById(id);
    this.showSharedFilesAside =
      this.showSharedFilesAside === 0 ? ul.scrollHeight : 0;
  }
  triggerUpload() {
    this.fileService.triggerUpload();
  }
}
