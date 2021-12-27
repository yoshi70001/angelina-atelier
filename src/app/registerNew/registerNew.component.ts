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
    if(this.form.contrasena.trim()!=null&&this.form.contrasena.trim()!=""){
      console.log(this.form.contrasena)
      this.form.contrasena = CryptoJS.MD5(this.form.contrasena.trim())
    }
    
    console.log(this.form)
    // this.authService.register(username, email, password).subscribe(
    //   data => {
    //     console.log(data);
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    //   },
    //   err => {
    //     this.errorMessage = err.error.message;
    //     this.isSignUpFailed = true;
    //   }
    // );
  }
}