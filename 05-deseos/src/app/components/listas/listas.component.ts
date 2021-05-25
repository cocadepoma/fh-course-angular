import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) { 
  
  }

  ngOnInit() {}

  listaSeleccionada( lista: Lista) {

    if (this.terminada ) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  async borrarLista(lista: Lista) {
    
    // this.deseosService.borrarLista(lista);
    
      const alert = await this.alertCtrl.create({
        header: `Vas a borrar la lista << ${lista.titulo} >>, estás seguro?`,
     
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelar');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.deseosService.borrarLista(lista);
            }
          }
        ]
      }); 
    
      await alert.present();  
  }

  async editarLista(lista: Lista){

    const alert = await this.alertCtrl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            console.log(data);
            if( data.titulo.length === 0) {
              return;
            }
            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();


  } 
}
