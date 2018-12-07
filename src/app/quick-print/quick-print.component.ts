import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files/files.service';
import { FileToPrint } from '../models';
import { count } from 'rxjs/operators';

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
      const f = <any>file;
      if (f.type !== 'application/pdf') {
        console.log('Formato de fichero no válido');
      } else {
        this.getNPages(f)
          .then(n => this.filesService.addFileToQueue(0, f.name, n))
          .catch(() => console.log('Something went wrong...'));
      }
    });
  }

  async getNPages(file: any) {
    return new Promise<number>((res, rej) => {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      let npages = 0;
      return (reader.onloadend = () => {
        npages = (reader.result as string).match(/\/Type[\s]*\/Page[^s]/g)
          .length;
        res(npages);
      });
    });
  }
}
