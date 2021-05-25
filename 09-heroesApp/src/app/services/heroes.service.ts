import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  private url: string = 'https://login-app-ebe0c.firebaseio.com';

  constructor( private http: HttpClient) { }


  crearHeroe (heroe: HeroeModel) {
    
    return this.http.post( `${this.url}/heroes.json`, heroe )
              .pipe(
                map( (resp: any) => {
                  heroe.id = resp.name
                  return heroe;
                })
              )
  }

  actualizarHeroe ( heroe: HeroeModel ) {

    // ...hero copia todas las propiedades del objeto
    const heroeTemp = {
      ...heroe
    };
      
    delete heroeTemp.id;

    return this.http.put( `${this.url }/heroes/${ heroe.id }.json`, heroeTemp);

  }
  
  borrarHeroe( id: string ) {

    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
    
  }

  getHeroe (id: string ) {

    return this.http.get(`${ this.url }/heroes/${ id }.json`);

  }


  getHeroes() {

    return this.http.get(`${this.url}/heroes.json`)
            .pipe(
              map( resp => this.crearArray(resp)),
              delay(600)
              //map (this.crearArray) es la misma ionstrucción pero con código más limpio
            )
  }

  private crearArray( heroesObj: object){

    if ( heroesObj === null ) { return []; }

    const heroes: HeroeModel[] = [];
    
    Object.keys( heroesObj ).forEach( key => {

      //console.log(key);
      
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    })

    return heroes;
  }



}
