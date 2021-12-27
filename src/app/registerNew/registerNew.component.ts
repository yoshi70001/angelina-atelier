import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { NoticiasService } from '../_services/noticias.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-registerNew',
  templateUrl: './registerNew.component.html',
  styleUrls: ['./registerNew.component.css']
})
export class RegisterNewComponent implements OnInit {
  form: any = {
    titular: "",
    resena: "",
    contenido: "",
    estado: "",
    imagen: ""
  };
  active_buttons:{[index: string]:any}={};
  status: string = "Registrar";
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  estados: any;
  idNoticia: any;

  constructor(private authService: AuthService, private noticiasService: NoticiasService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let idNoticia = this.route.snapshot.paramMap.get("id");
    if (idNoticia) {
      this.status = "Modificar"
      this.noticiasService.getDataNewId(parseInt(idNoticia)).subscribe(data => {

        let datosNoticia = JSON.parse(data).data.new;
        console.log(datosNoticia);
        this.form.titular = datosNoticia.titular;
        this.form.resena= datosNoticia.resena;
        this.form.contenido= datosNoticia.contenido;
        this.form.idestado= datosNoticia.idestado;
        this.form.imagen= datosNoticia.imagen;
        // this.form.active= datosUsuario.estado=="Activo"?true:false;
        console.log(this.active_buttons)
      },
        err => {
          alert("Error en la consulta " + err)
        })
    }

    this.noticiasService.getStates().subscribe(data => {

      this.estados = JSON.parse(data).data.statesnew;
      console.log(this.estados);

    },
    err => {
      console.log(JSON.parse(err.error).message);
    });

  }

  onSubmit(): void {
    console.log("formulario",this.form);

    if (!this.idNoticia) {
      this.authService.registerNew({
        titular: this.form.titular,
        resena: this.form.resena,
        contenido: this.form.contenido,
        idestado: this.form.idestado,
        imagen: this.form.imagen

      }).subscribe(
        data => {

          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    } else {
      this.authService.updateNew(
        this.idNoticia, {
          titular: this.form.titular,
          resena: this.form.resena,
          contenido: this.form.contenido,
          idestado: this.form.idestado,
          imagen: this.form.imagen
      }
      ).subscribe(
        data => {
          
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
  }
}