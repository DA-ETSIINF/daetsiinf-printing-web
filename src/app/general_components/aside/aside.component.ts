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
  showMyDocumentsAside = 0;
  showSharedDocumentsAside = 0;
  myDocuments: Item[] = [];
  sharedWithMe: Item[] = [];

  constructor(
    public router: Router,
    private fileService: FilesService,
    public appComponent: AppComponent
  ) {
    this.currentPage = this.router.routerState.snapshot.url;

    this.myDocuments = this.shortenNames(<Item[]>(
      this.fileService.getFake('my-files')
    ));

    this.sharedWithMe = this.shortenNames(<Item[]>(
      this.fileService.getFake('shared-with-me')
    ));
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

  toggleMyDocumentsView(id: string) {
    const ul = document.getElementById(id);
    this.showMyDocumentsAside =
      this.showMyDocumentsAside === 0 ? ul.scrollHeight : 0;
  }

  toggleSharedDocumentsView(id: string) {
    const ul = document.getElementById(id);
    this.showSharedDocumentsAside =
      this.showSharedDocumentsAside === 0 ? ul.scrollHeight : 0;
  }
}
