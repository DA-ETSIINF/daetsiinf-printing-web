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
    this.notifications$.next([n, ...this.notifications]);
    this.notifications.push(n);
  }
}
