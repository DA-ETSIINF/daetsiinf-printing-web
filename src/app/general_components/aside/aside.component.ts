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
  showMyDocumentsAside = false;
  showSharedDocumentsAside = false;
  myDocumentsItems: Item[] = [];
  sharedWithMeItems: Item[] = [];

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
      this.myDocumentsItems = <Item[]>data;
    });

    this.fileService.getJSON('shared-with-me').subscribe(data => {
      if (environment.production) {
        data = data['shared-with-me'];
      }
      this.sharedWithMeItems = <Item[]>data;
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
}
