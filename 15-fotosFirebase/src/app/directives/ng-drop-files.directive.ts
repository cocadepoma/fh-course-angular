import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]',
})
export class NgDropFilesDirective {
  @Input() archivos: FileItem[] = [];
  //Emisor
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  // Cuando el mouse entra, emite un true
  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }
  // Cuando el mouse se va, emite un false
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }
  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this._getTransferencia(event);

    if (!transferencia) {
      return;
    }

    this._extraerArchivos(transferencia.files);
    this._prevenirDetener(event);
    this.mouseSobre.emit(false);
  }

  // Para extender compatibilidad con navegadores
  private _getTransferencia(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {
    //Convertir objeto en un array
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemp = archivosLista[propiedad];

      if (this._archivoPuedeSerCargado(archivoTemp)) {
        const nuevoArchivo = new FileItem(archivoTemp);
        this.archivos.push(nuevoArchivo);
      }
    }
  }
  // Validaciones

  // Comprueba si el archivo no ha sido dropeado y si es una imagen
  private _archivoPuedeSerCargado(archivo: File): boolean {
    if (!this._archivoStillDropped(archivo.name) && this._isImg(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

  // Para prevenir que al dropear una imagen, el navegador no la abra
  private _prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  // Comprueba si el archivo ya ha sido cargado en el array de archivos
  private _archivoStillDropped(fileName: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo == fileName) {
        console.log('El archivo ' + fileName + ' ya está agregado');
        return true;
      }
    }
    return false;
  }
  // Retornará falso si el archivo es undefined o vacío
  private _isImg(fileType: string): boolean {
    return fileType === '' || fileType === undefined
      ? false
      : fileType.startsWith('image');
  }
}
