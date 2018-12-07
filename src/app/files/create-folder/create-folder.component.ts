import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.css']
})
export class CreateFolderComponent implements OnInit {
  showModal = false;
  folderToCreate: string;
  folderToCreateSubscription: Subscription;
  folderName: string;
  randomName: string;

  constructor(private filesService: FilesService) {}

  ngOnInit() {
    this.filesService.createFolder$.subscribe(() => {
      this.showModal = true;
    });
    this.randomName = this.filesService.getRandomName();
  }

  closeModal(e?) {
    if (e && e.target.className !== 'overlay') {
      return;
    }
    (document.querySelector('.overlay') as any).style.opacity = 0;
    (document.querySelector('.create-folder') as any).style.transform =
      'scale(.5)';

    setTimeout(() => {
      this.showModal = false;
    }, 200);
  }

  createFolder() {
    this.filesService.createFolder(this.folderName);
    this.closeModal();
  }
}
