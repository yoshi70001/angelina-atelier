import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/v1/';


@Injectable({
  providedIn: 'root'
})


export class CatalogoService {

  constructor(private http: HttpClient) {  
   }
   getAllPrendas(): Observable<any>{

    return this.http.get(API_URL+"",{ responseType: 'text' })
   }

}
