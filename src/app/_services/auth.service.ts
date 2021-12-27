import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    console.log(username,password)
    return this.http.post(AUTH_API + 'login', {
      username:username,
      password:password
    }, httpOptions);
  }

  register( usuario:any): Observable<any> {
    return this.http.post(AUTH_API + 'usuario/register', {
      nombre:usuario.nombre,
      apaterno:usuario.apaterno,
      amaterno:usuario.amaterno,
      dni:usuario.dni,
      email:usuario.email,
      telefono:usuario.telefono,
      usuario:usuario.usuario,
      contrasena:usuario.contrasena,
      idestado:usuario.idestado,
      privilegios:usuario.privilegio

    }, httpOptions);
  }
  update(id:number,usuario:any):Observable<any>{
    return this.http.put(AUTH_API+'usuario/edit/'+id,usuario

    ,httpOptions)
  }

  registerNew( noticia:any): Observable<any> {
    return this.http.post(AUTH_API + 'usuario/register', {
      titular:noticia.titular,
      resena:noticia.resena,
      contenido:noticia.contenido,
      idestado:noticia.idestado,
      imagen:noticia.imagen

    }, httpOptions);
  }
  updateNew(id:number,noticia:any):Observable<any>{
    return this.http.put(AUTH_API+'noticia/edit/'+id,noticia,httpOptions)
  }

}