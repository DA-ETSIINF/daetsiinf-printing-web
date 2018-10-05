import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from '../../files/files.service';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';
import { Item } from '../../models';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  currentPage: string;
  showMyFilesAside = 0;
  showSharedFilesAside = 0;
  myFiles: Item[] = [];
  sharedWithMe: Item[] = [];

  constructor(
    public router: Router,
    private fileService: FilesService,
    public appComponent: AppComponent
  ) {
    this.currentPage = this.router.routerState.snapshot.url;

    this.fileService.sharedWithMe$.subscribe(items => {
      this.myFiles = items;
    });

    this.fileService.myFiles$.subscribe(items => {
      this.sharedWithMe = items;
    });
  }

  ngOnInit() {}

  shortenNames(files: Item[]): Item[] {
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
