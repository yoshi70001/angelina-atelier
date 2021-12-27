import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:3000/v1/';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  constructor(private http: HttpClient,private token: TokenStorageService) { }

  getPublicContent(): Observable<any> {
    let token:string=this.token.getUser().data.token;
    // console.debug(token)
    const header=new HttpHeaders()
    const httpoptions={headers:header}
    header.append("Content-type","Application/json")
    header.append("Authorization",token)
    
    return  this.http.get(API_URL + 'noticia',httpoptions);
  }

  getNewsBoard(): Observable<any> {
    return this.http.get(API_URL + 'noticia', { responseType: 'text' });
  }

  // getNewsBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text', });
  // }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }
  getDataNewId(idnoticia:number):Observable<any>{
    return this.http.get(API_URL+'noticia/'+idnoticia,{ responseType: 'text' });
  }

  getStates():Observable<any>{
    return this.http.get(API_URL+'noticia/estados',{ responseType: 'text' });
  }
  
}