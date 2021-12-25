import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    active: false,
    nombre: "",
    apaterno: "",
    amaterno: "",
    dni:null,
    email: "",
    telefono: "",
    usuario: "",
    contrasena: "",
    // idestado:null,
    privilegiosu: []
  };
  active_buttons:{[index: string]:any}={};
  status: string = "Registrar";
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  privilegios: any;

  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let idUser = this.route.snapshot.paramMap.get("id");
    if (idUser) {
      this.status = "Actualizar"
      this.userService.getDataUserId(idUser).subscribe(data => {
        let datosUsuario = JSON.parse(data).data.user[0];
        console.log(datosUsuario)
        this.form.nombre = datosUsuario.nombre;
        this.form.apaterno= datosUsuario.apaterno;
        this.form.amaterno= datosUsuario.amaterno;
        this.form.email= datosUsuario.email;
        this.form.telefono= datosUsuario.telefono;
        this.form.usuario= datosUsuario.usuario;
        this.form.active= datosUsuario.estado=="Activo"?true:false;
        this.form.privilegiosu=(datosUsuario.privilegios).map((elemento:any)=>{return elemento.idprivilegio});
        // this.form.active= datosUsuario.estado=="Activo"?true:false;
        for(let id of this.form.privilegiosu){
          console.log(id)
          this.active_buttons[id]=true;
        }
        console.log(this.active_buttons)
      },
        err => {
          alert("Error en la consulta " + err)
        })
    }

    this.userService.getPrivilegios().subscribe(
      data => {
        this.privilegios = JSON.parse(data).data.privilegios;
        console.log(JSON.parse(data).data.privilegios)
        for(let index in this.privilegios){
          let privilegio:any=this.privilegios[index]
          this.active_buttons[privilegio.idprivilegio]=false;
        }
        console.log(this.active_buttons)
        
      },
      err => {
        this.privilegios = JSON.parse(err.error).message;
      }
    );
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
  agregarPrivilegio(id: string, e: any) {
    if (e.currentTarget.checked) {
      if (this.form.privilegiosu.indexOf(id) == -1) {
        this.form.privilegiosu.push(id);
      }
    } else {
      if (this.form.privilegiosu.indexOf(id) != -1) {
        this.form.privilegiosu.splice(this.form.privilegiosu.indexOf(id), 1);
      }
    }
  }
}