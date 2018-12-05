import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../files/files.service';

@Component({
  selector: 'app-upload-btn',
  templateUrl: './upload-btn.component.html',
  styleUrls: ['./upload-btn.component.css']
})
export class UploadBtnComponent implements OnInit {
  showOptions = false;

  constructor(
    private fileService: FilesService
  ) {}

  uploadClicked() {
    // Clears focus on button so it can make the animation more than once
    setTimeout(() => {
      document.getElementById('upload-btn').blur();
    }, 100);
  }

  ngOnInit() {}

  triggerUpload() {
    this.fileService.triggerUpload();
  }
}
