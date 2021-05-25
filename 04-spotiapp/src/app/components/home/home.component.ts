
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor(private spotify: SpotifyService) { 
      
      setTimeout(() => {
        this.loading = true;
        this.spotify.getNewReleases()
                    .subscribe( (data: any) => {
                      this.nuevasCanciones = data;
                      this.loading = false;
                      this.error = false;
                    }, (errorServicio) => {
                      this.loading = false;
                      this.error = true;
                      this.errorMessage = errorServicio.error.error.message;
                    });
      }, 500);


  }

  ngOnInit(): void {
  }

}
