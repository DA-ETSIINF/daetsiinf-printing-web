import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from '../../documents/files.service';
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
    this.fileService.getJSON('my-documents').subscribe(data => {
      if (environment.production) {
        data = data['my-documents'];
      }
      this.myDocuments = <Item[]>data;
    });

    this.fileService.getJSON('shared-with-me').subscribe(data => {
      if (environment.production) {
        data = data['shared-with-me'];
      }
      this.sharedWithMe = <Item[]>data;
    });
  }

  ngOnInit() {}

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
