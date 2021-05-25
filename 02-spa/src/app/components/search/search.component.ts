import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroesService, Heroe } from '../../services/heroes.service';
import { HeroesComponent } from '../heroes/heroes.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

  heroesFull:Heroe[] = [];
  heroes:Heroe[] = [];
  termino:string;

  constructor(private activatedRoute: ActivatedRoute,
              private _heroesService: HeroesService,
              private router: Router) {

   }

  ngOnInit(): void {
      this.heroesFull = this._heroesService.getHeroes();
      this.activatedRoute.params.subscribe( params=>{
      this.termino = params['termino'];
      this.heroes = this._heroesService.buscarHeroes(params['termino']);
      // console.log(this.heroes);
    })
  }

  verHeroe(nombre:string) {
    let id = this._heroesService.getIdHeroe(nombre);
    this.router.navigate( ['heroe', id]);
  }

}
