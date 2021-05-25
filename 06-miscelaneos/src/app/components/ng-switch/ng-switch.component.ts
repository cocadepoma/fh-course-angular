import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-switch',
  templateUrl: './ng-switch.component.html',
  styles: [
  ]
})
export class NgSwitchComponent implements OnInit {

  alerta: string = "warning";
  constructor() { }

  ngOnInit(): void {
  }
  cambiarColor(){
    let x:number = Math.floor(Math.random() * (5)) + 1;
    switch(x){
      case 1: this.alerta = 'primary';
      break;
      case 2: this.alerta = 'success';
      break;
      case 3: this.alerta = 'danger';
      break;
      case 4: this.alerta = 'warning';
      break;
      case 5: this.alerta = 'default';
    }
  }
}
