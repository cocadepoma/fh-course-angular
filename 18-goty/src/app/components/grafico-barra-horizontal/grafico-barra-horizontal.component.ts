import { Component, OnDestroy } from '@angular/core';
import { TimeInterval } from 'rxjs';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrls: ['./grafico-barra-horizontal.component.scss'],
})
export class GraficoBarraHorizontalComponent implements OnDestroy {
  results: any[] = [
    {
      name: 'Juego 1',
      value: 20,
    },
    {
      name: 'Juego 2',
      value: 25,
    },
    {
      name: 'Juego 3',
      value: 15,
    },
    {
      name: 'Juego 4',
      value: 18,
    },
  ];
  private intervalo: any;

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Juegos';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Votos';

  colorScheme = 'nightLights';

  constructor() {
    this.intervalo = setInterval(() => {
      const newResults = [...this.results];
      console.log('click');
      for (let i in newResults) {
        newResults[i].value = Math.round(Math.random() * 500);
        this.results = newResults;
      }
    }, 2500);
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
