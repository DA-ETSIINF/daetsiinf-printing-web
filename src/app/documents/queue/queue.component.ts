import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { AppComponent } from '../../app.component';
import { InfoFile } from '../../models';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  showQueue = false;
  step = 'first';
  lastChanged = new Date().getTime();

  itemsInQueue: InfoFile[];

  constructor(
    private appComponent: AppComponent,
    private filesService: FilesService
  ) {
    this.filesService.itemsInQueue.subscribe(e => {
      this.itemsInQueue = e;
      console.log(e);
    });
  }

  ngOnInit() {}

  toggleQueue() {
    this.showQueue = !this.showQueue;
    const queueElem = document.querySelector('app-queue') as any;
    const top =
      queueElem.style.top === 'calc(100vh - 44px)' || queueElem.style.top === ''
        ? queueElem.offsetHeight
        : 44;
    queueElem.style.top = `calc(100vh - ${top}px)`;
  }

  setStep(step: string) {
    const time = new Date().getTime();
    if (Math.abs(time - this.lastChanged) > 100) {
      this.step = step;
    }
    this.lastChanged = time;
  }

  getWindowSize() {
    return this.appComponent.size;
  }
}
