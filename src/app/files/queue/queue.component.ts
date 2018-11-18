import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { AppComponent } from '../../app.component';
import { FileToPrint } from '../../models';
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
  filesInQueue: FileToPrint[] = [];

  constructor(
    private appComponent: AppComponent,
    private filesService: FilesService
  ) {
    this.filesService.itemsInQueue$.subscribe(e => {
      this.filesInQueue = e;
    });
  }

  ngOnInit() {}

  toggleQueue() {
    this.showQueue = !this.showQueue;
    const queueElem = document.querySelector('app-queue') as any;
    const top = this.showQueue ? queueElem.offsetHeight : 44;
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

  setDoubledSided(bool: boolean, i: number) {
    this.filesInQueue[i].doubleSided = bool;
  }

  getPrice(file: FileToPrint) {
    let price = file.npages * 0.04 * file.ncopies;
    if (!file.doubleSided) {
      price /= 2;
    }
    price = Math.round(price * 100) / 100;
    return `${price}€`;
  }

  cancel() {
    this.toggleQueue();
    setTimeout(() => this.setStep('first'), 100);
  }

  removeFile(id: number) {
    let elems;
    this.filesService.itemsInQueue$.subscribe(a => (elems = a)).unsubscribe();
    const index = elems.find(e => e.id === id);

    if (elems.length === 1) {
      this.cancel();
    }

    setTimeout(() => {
      elems.splice(elems.indexOf(index), 1);
    }, 150);
  }

  currentAmount(): number {
    return 3.04;
  }

  cost(): number {
    return this.filesInQueue.reduce((cost, e) => {
      return (
        cost +
        (e.doubleSided ? e.npages * 0.04 : e.npages * 2 * 0.04) * e.ncopies
      );
    }, 0);
  }

  printFiles() {
    this.filesService.printFiles(this.filesInQueue);
  }
}
