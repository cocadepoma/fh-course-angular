import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent{

  artistas: any[] = [];
  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor(private spotify: SpotifyService) {  }

  buscar(termino:string){

    
    if(termino.length > 0){
      this.loading = true;
      this.spotify.getArtistas(termino)
                  .subscribe( (data:any) => {   

                    this.artistas = data;
                    this.loading = false; 
                    this.error = false;  

                  }, (errorServicio) => {

                    this.loading = false;
                    if(termino.length == 0) {
                      this.error = false;
                    } else {
                      this.error = true;
                    }

                    this.errorMessage = errorServicio.error.error.message;
                  });
    } else {
      this.loading = false;
    }
  }
}
