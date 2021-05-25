import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {
 

  constructor( private http: HttpClient) { }


  getProvincias(){
    return this.http.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=espana-municipios&q=&facet=communidad_autonoma&facet=provincia&facet=municipio'); 
  }
  
}
