import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Pacos',
    apellido: 'RSsssss',
    email: 'paco@gmail.com',
    pais: 'ESP',
    genero: 'M'
  }
  
  paises: any[] = [];

  constructor( private pais: PaisService) { }

  ngOnInit(): void {

    this.pais.getPaises().subscribe( paises => {

      this.paises = paises;

      this.paises.unshift({
        nombre: '[ Seleccionar País ]',
        codigo: ''
      });

    });
  }

  guardar(form: NgForm) {

    if(form.invalid) {

      Object.values(form.controls).forEach( control => {
        control.markAsTouched();
      });
      
      return;
    }
    Object.values(form.controls).forEach( control => {
      control.markAsTouched();
    });

  }

}
