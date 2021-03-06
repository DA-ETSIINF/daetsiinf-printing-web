import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import {StreamRightClick, userOS} from './models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  fundsData = [
    {
      amount: 8.33,
      date: '23/09/18'
    },
    {
      amount: 3.12,
      date: '24/09/18'
    },
    {
      amount: 5.76,
      date: '25/09/18'
    },
    {
      amount: 7.01,
      date: '27/09/18'
    },
    {
      amount: 0.97,
      date: '29/09/18'
    }
  ];

  showTerminal = false;
  currentLang = 'es';

  deviceWidth: 'small' | 'large';
  size: number;


  popupMenu$ = new BehaviorSubject<StreamRightClick>(null);

  constructor(private translateService: TranslateService) {}

  init() {
    this.widthStatus(window.innerWidth);
    this.setLang();
    document.addEventListener('click', () => this.hidePopupMenu());
  }

  setLang() {
    this.translateService.setDefaultLang(this.currentLang);
  }

  switchLanguage() {
    if (this.currentLang === 'es') {
      this.currentLang = 'en';
      this.translateService.use('en');
    } else if (this.currentLang === 'en') {
      this.currentLang = 'es';
      this.translateService.use('es');
    }
  }

  widthStatus(size) {
    this.size = size;
    this.deviceWidth = size < 992 ? 'small' : 'large';
  }

  hidePopupMenu() {
    this.popupMenu$.next(null);
  }

  getUserOS(): userOS {
    const userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      return 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      return 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      return 'Windows';
    } else if (/Android/.test(userAgent)) {
      return 'Android';
    } else if (!os && /Linux/.test(platform)) {
      return 'Linux';
    }
    return undefined;
  }
}
