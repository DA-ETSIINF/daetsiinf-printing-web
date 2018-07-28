import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from './files.service';
import { Item } from '../models';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  currentPage: string;
  status: string;
  items: Item[];

  constructor(private router: Router, private fileService: FilesService) {
    router.events.subscribe(() => {
      this.currentPage = this.router.routerState.snapshot.url;
      this.items =
        this.currentPage === '/my-documents'
          ? this.fileService.getMyDocuments()
          : (this.items = this.fileService.getSharedDocuments());
      this.shortenNames();
    });
  }

  ngOnInit() {}

  shortenNames() {
    this.items.map(e => {
      if (e.name.length > 13) {
        const begin = e.name.substring(0, 8);
        const end = e.name.substring(e.name.length - 5);
        e.shorten = `${begin} ... ${end}`;
      }
    });
  }
  deselect() {}
  select(event) {
    const items = document.querySelectorAll('.selected');
    if (items.length > 0) {
      items[0].classList.remove('selected');
    }
    if (event.target.className.includes('item')) {
      event.target.parentElement.classList.add('selected');
    } else {
      event.target.parentElement.parentElement.classList.add('selected');
    }
  }
}
