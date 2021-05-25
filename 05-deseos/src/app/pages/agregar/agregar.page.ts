import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(private deseosService: DeseosService,
              private route: ActivatedRoute) { 

    const listaId = this.route.snapshot.paramMap.get('listaId'); //Obtener el id, de la barra de dirección
    this.lista = this.deseosService.obtenerLista (listaId);

  }

  ngOnInit() {
  }

  agregarItem() {
    if(this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);

    this.lista.items.push( nuevoItem );

    this.nombreItem = '';

    this.deseosService.guardarStorage();
  }

  cambioCheck(item: ListaItem) {
    
    //filter va a devoler un array con la condición que le pasamos,
    // en este caso, los items de la lista que su checkbox esté a 'false'
    const pendientes = this.lista.items
                                  .filter( itemData => itemData.completado === false )
                                  .length;

    if(pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosService.guardarStorage();


  }

  borrar(i: number) {
    this.lista.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }
  
}
