import { Component, OnInit } from "@angular/core";
import { Marcador } from "src/app/classes/marcador.class";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from "./mapa-editar.component";

@Component({
  selector: "app-mapa",
  templateUrl: "./mapa.component.html",
  styleUrls: ["./mapa.component.css"],
})
export class MapaComponent implements OnInit {
  marcadores: Marcador[] = [];

  lat = 51.678418;
  lng = 7.809007;

  constructor(public snackBar: MatSnackBar,
    public dialog: MatDialog) {
    if (localStorage.getItem("marcadores")) {
      this.marcadores = JSON.parse(localStorage.getItem("marcadores"));
    }
  }

  ngOnInit(): void { }

  agregarMarcador(evento) {
    const coords: { lat: number; lng: number } = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);

    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this.mostrarSnackbar("Marcador guardardo correctamente", "Cerrar");
  }

  guardarStorage() {
    localStorage.setItem("marcadores", JSON.stringify(this.marcadores));
  }
  borrarMarcador(posicion: number) {
    this.marcadores.splice(posicion, 1);
    this.guardarStorage();
    this.mostrarSnackbar(
      "Marcador eliminado satisfactoriamente",
      "Cerrar"
    );
  }
  editarMarcador(marcador: Marcador) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!result) {
        return;
      }
      marcador.titulo = result.titulo;
      marcador.desc = result.desc;
      this.guardarStorage();
      this.mostrarSnackbar("Marcador actualizado", "Cerrar");

    });

  }
  mostrarSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
  }


}
