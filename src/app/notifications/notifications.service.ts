import { Injectable } from '@angular/core';
import { Notification } from '../models';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notifications$ = new Subject<Notification[]>();
  notifications: Notification[] = [];
  constructor() {}

  addNotification(n: Notification) {
    this.notifications.push(n);
    this.notifications$.next(this.notifications);
  }
  removeNotification(i: number) {
    this.notifications.splice(i, 1);
    this.notifications$.next(this.notifications);
  }
}
