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
      this.notifications = n;
    });
  }

  removeNotification(i: number) {
    this.notificationsService.removeNotification(i - 1);
  }
}
