import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.scss'],
})
export class DonaComponent {
  constructor() {}

  // Doughnut
  public doughnutChartLabels: Label[] = [
    'Tiempo funcionamiento',
    'Tiempo avería',
    'Tiempo muerto',
  ];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
  public numeros_random() {
    this.doughnutChartData = [
      [
        Math.round(Math.random() * 1000) + 1,
        Math.round(Math.random() * 1000) + 1,
        Math.round(Math.random() * 1000) + 1,
      ],
    ];
  }
}
