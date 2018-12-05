import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.css']
})
export class CreateFolderComponent implements OnInit {
  showModal = false;

  constructor(private filesService: FilesService) {}

  ngOnInit() {}

  closeModal(e?) {
    if (e && e.target.className !== 'overlay') {
      return;
    }
    (document.querySelector('.overlay') as any).style.opacity = 0;
    (document.querySelector('.change-name') as any).style.transform =
      'scale(.5)';

    setTimeout(() => {
      this.filesService.updateItemName$.next(undefined);
    }, 200);
  }
}

