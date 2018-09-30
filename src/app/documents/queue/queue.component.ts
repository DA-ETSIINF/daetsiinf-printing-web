import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { AppComponent } from '../../app.component';
import { InfoFile } from '../../models';
import { elementStart } from '@angular/core/src/render3/instructions';

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

  setDoubledSided(bool: boolean, id: number) {
    this.itemsInQueue.map(a => {
      if (a.id === id) {
        a.doubledSided = bool;
      }
    });
  }

  getPrice(file: InfoFile) {
    let price = file.pages * 0.04;
    if (!file.doubledSided) {
      price = price * 2;
    }
    return `${price}€`;
  }

  cancel() {
    this.toggleQueue();
    setTimeout(() => this.setStep('first'), 100);
  }
  removeFile(id: number) {
    let elems;
    this.filesService.itemsInQueue.subscribe(a => (elems = a));
    let index = elems.find(e => e.id === id);
    elems.splice(elems.indexOf(index), 1);

    if (elems.length === 0) {
      this.cancel();
    }

    setTimeout(() => {
      console.log('0000');

      // this.filesService.itemsInQueue.next(elems);
    }, 3000);
  }
}
