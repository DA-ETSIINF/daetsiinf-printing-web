import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files/files.service';
import { FileToPrint } from '../models';

@Component({
  selector: 'app-quick-print',
  templateUrl: './quick-print.component.html',
  styleUrls: ['./quick-print.component.css']
})
export class QuickPrintComponent implements OnInit {
  isHovering: boolean;
  files: FileToPrint[] = [];
  constructor(private filesService: FilesService) {}

  ngOnInit() {
    this.filesService.itemsInQueue$.subscribe(f => (this.files = f));
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onChangeFiles(event) {
    Object.values(event.target.files).map(file => {
      console.log(file);
      if (file.type !== 'application/pdf') {
        console.log('Formato de fichero no válido');
      } else {
        this.filesService.addFileToQueue(0, file.name, 8);
      }
    });
  }
}
