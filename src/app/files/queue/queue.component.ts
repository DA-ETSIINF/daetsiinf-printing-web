import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { AppService } from '../../app.service';
import { FileToPrint } from '../../models';
import { UserService } from '../../login/user.service';
import { UserInfo } from '../../models';
import { Router } from '@angular/router';

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
  userInfo: UserInfo;

  // This var represents if we need to show the funds.
  showMyMoney = true;
  constructor(
    private appService: AppService,
    private filesService: FilesService,
    private userService: UserService,
    private router: Router
  ) {
    this.filesService.itemsInQueue$.subscribe(e => {
      this.filesInQueue = e;
      console.log(this.filesInQueue);
    });
    const url = this.router.routerState.snapshot.url;
    if (url !== '/quick') {
      this.userService.userInfo$.subscribe(i => this.userInfo = i);
    } else {
      this.showMyMoney = false;
    }
  }

  ngOnInit() {}

  toggleQueue() {
    this.showQueue = !this.showQueue;
    const queueElem = document.querySelector('app-queue') as any;
    const bottom = this.showQueue ? 0 : 50;
    queueElem.style.bottom = `-${bottom}%`;
  }

  setStep(step: string) {
    const time = new Date().getTime();
    if (Math.abs(time - this.lastChanged) > 100) {
      this.step = step;
    }
    this.lastChanged = time;
  }

  getWindowSize() {
    return this.appService.size;
  }

  setDoubledSided(bool: boolean, i: number) {
    this.filesInQueue[i].doubleSided = bool;
  }

  setColor(bool: boolean, i: number) {
    this.filesInQueue[i].color = bool;
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

  removeFile(index: number) {
    const currentItems = this.filesService.itemsInQueue$.getValue();
    if (currentItems.length === 1) {
      this.cancel();
    }
    setTimeout(() => {
      currentItems.splice(index, 1);
      this.filesService.itemsInQueue$.next(currentItems);
    }, 150);
  }

  currentAmount(): number {
    return this.userInfo.funds;
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
