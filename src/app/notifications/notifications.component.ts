import { Component, OnInit } from '@angular/core';
import { Notification } from '../models';
import { NotificationsService } from './notifications.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.notificationsService.notifications$.subscribe(n => {
      console.log(n);

      this.notifications = n;
    });
  }

  getMarginTop(i: number): any {
    const notifications = document.querySelectorAll('.notification') as any;
    let j = 0,
      marginTop = 0;
    Array.from(notifications).forEach(notification => {
      if (i === j) {
        return marginTop;
      }
      j++;
      marginTop += (notification as any).offsetHeight + 15;
      return marginTop;
    });
    return marginTop + 60;
  }

  removeNotification(i: number) {
    this.notifications.splice(i, 1);
  }
}
