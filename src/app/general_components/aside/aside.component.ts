import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../files/files.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  constructor(
    private fileService: FilesService,
    public appService: AppService
  ) {
  }

  ngOnInit() {}

  isLargeScreen(): boolean {
    return this.appService.deviceWidth === 'large';
  }


  triggerUpload() {
    this.fileService.triggerUpload();
  }
}
