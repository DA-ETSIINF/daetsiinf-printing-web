import { Component, OnInit } from '@angular/core';
import { UserService } from '../../login/user.service';
import { UserInfo } from '../../models';
import { NotificationsService } from '../../notifications/notifications.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: UserInfo;
  constructor(private userService: UserService, private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.userService.userInfo$.subscribe(userInfo => this.userInfo = userInfo);
  }

  changePassword() {
    this.notificationsService.addNotification({
      title: 'Funcionalidad no disponible',
      status: 'info',
      description: 'El cambio de contraseña en estos momentos no esta disponible'
    });
  }

  languageOnChange(option: string) {
    console.log(option);
  }

  goTo() {
    console.log('should be redirectioned');
  }
}
