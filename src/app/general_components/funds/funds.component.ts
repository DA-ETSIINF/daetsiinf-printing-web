import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

import Chart from 'chart.js';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.initChart();
  }

  getCSSVariable(CSSVar: string): string {
    const computedStyle: CSSStyleDeclaration = getComputedStyle(
      document.querySelector(':root')
    );
    return computedStyle.getPropertyValue(CSSVar).trim();
  }

  getPointColors(data: number[]) {
    const colors: String[] = [];
    const [badColor, goodColor] = [
      this.getCSSVariable('--supporting__error-4'),
      this.getCSSVariable('--supporting__ok-4')
    ];
    let lastValue = 0;
    data.map(newValue => {
      colors.push(lastValue < newValue ? goodColor : badColor);
      lastValue = newValue;
    });
    return colors;
  }

  setExtremes(amounts: number[], dates: string[], pointsColors) {
    const createdAt = '';

    amounts.unshift(0);
    dates.unshift(createdAt);
    pointsColors.unshift(this.getCSSVariable('--dark-2'));

    amounts.push(amounts[amounts.length - 1]);
    dates.push('Actualmente');
    pointsColors.push(this.getCSSVariable('--dark-2'));

    return [amounts, dates, pointsColors];
  }

  initChart() {
    const canvas = <HTMLCanvasElement>document.getElementById('chart');
    const ctx = canvas.getContext('2d');

    const funds = this.appService.fundsData;
    let amounts: number[] = funds.map(fund => fund.amount);
    let dates = funds.map(fund => fund.date);
    let pointsColors = this.getPointColors(amounts);
    [amounts, dates, pointsColors] = this.setExtremes(
      amounts,
      dates,
      pointsColors
    );
    const height = Math.round(Math.max.apply(Math, amounts.map(e => e)) * 1.1);

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            data: amounts,
            steppedLine: true,
            backgroundColor: 'transparent',
            borderColor: this.getCSSVariable('--dark-1'),
            pointBackgroundColor: pointsColors,
            pointBorderColor: 'white',
            pointBorderWidth: 3,
            pointRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        scales: { yAxes: [{ ticks: { suggestedMax: height } }] },
        legend: { display: false }
      }
    });
  }
}
