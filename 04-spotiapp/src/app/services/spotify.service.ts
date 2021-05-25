import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
  token: string;

  constructor(private http: HttpClient) { 
    this.getToken();
  }

  // getHeaders(){
  //   const bodyy = {
  //     'grant_type': 'client_credentials'
  //   }
  //   this.http.post('https://accounts.spotify.com/api/token', bodyy, )
  // }

  getToken(){
        
    const body = new HttpParams()
          .append('grant_type','client_credentials')
          .append('client_id', '313fd0c5f54d4308aa92d6833772d79b')
          .append('client_secret','e9b7f2bfcf5747a58c4aee167cd12636');
 
    return this.http.post('https://accounts.spotify.com/api/token',body).subscribe( (token:any) => {
      this.token = token.access_token;
    }, (err:any) => {
      console.log(err);
    });
    
  }

  getQuery( query:string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer BQCl41EvY2GteAeefuD3DKGBGYxn5MQWUWgt74omWIb0uYgGgsBphhPj1IIjzwRMDsxLbBQADBxeDTwA_fY`
    });
    return this.http.get(url, { headers });
    
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
               .pipe( map( data => data['albums'].items ));


    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQBHzwytNK5MpYTL8RfdOW6qeNVnEx4QPVxG22neSaoEGQhIChkOIcfd_rovKpOad2hadSBzmuBTwS3iIos'
    // });
    // return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers })
    //            .pipe( map( data => data['albums'].items ));
    
  }

  getArtistas( termino: string) {

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
               .pipe( map( data => data['artists'].items));


    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQBHzwytNK5MpYTL8RfdOW6qeNVnEx4QPVxG22neSaoEGQhIChkOIcfd_rovKpOad2hadSBzmuBTwS3iIos'
    // });

    // return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, { headers })
    //            .pipe( map( data => data['artists'].items));
    
  }

  getArtista(id: string) {

    return this.getQuery(`artists/${id}`);
               
  }

  getTopTracks(id: string) {

    return this.getQuery(`artists/${id}/top-tracks?country=us`)
               .pipe( map( data => data['tracks']));
               
  }
}
