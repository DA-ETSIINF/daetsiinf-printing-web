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
  currentSelected: Item[];

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
  deselect() {
    const items = document.querySelectorAll('.selected');
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('selected');
    }
    this.currentSelected = [];
  }
  selectOne(event) {
    if (event.target.localName === 'app-item') {
      event.target.classList.add('selected');
    } else if (event.target.className.includes('item')) {
      event.target.parentElement.classList.add('selected');
    } else {
      event.target.parentElement.parentElement.classList.add('selected');
    }
  }
  select(event, itemInfo) {
    if (!event.ctrlKey) {
      this.deselect();
    }
    this.selectOne(event);
    this.currentSelected.push(itemInfo);
    console.log(this.currentSelected);
  }
}
