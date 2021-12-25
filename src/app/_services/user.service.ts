import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:3000/v1/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,private token: TokenStorageService) { }

  getPublicContent(): Observable<any> {
    let token:string=this.token.getUser().data.token;
    // console.debug(token)
    const header=new HttpHeaders()
    const httpoptions={headers:header}
    header.append("Content-type","Application/json")
    header.append("Authorization",token)
    
    return  this.http.get(API_URL + 'usuario',httpoptions);
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text', });
  // }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }
  getPrivilegios(): Observable<any> {
    return this.http.get(API_URL + 'privilegio', { responseType: 'text' });
  }
  getDataUserId(id:string):Observable<any>{
    return this.http.get(API_URL+'usuario/'+id,{ responseType: 'text' });
  }
  
}