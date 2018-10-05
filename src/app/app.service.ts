import { Injectable } from '@angular/core';

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

  constructor() { }
}
