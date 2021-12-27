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
    dni: null,
    email: "",
    telefono: "",
    usuario: "",
    contrasena: "",
    // idestado:null,
    privilegiosu: []
  };
  active_buttons: { [index: string]: any } = {};
  status: string = "Registrar";
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  privilegios:any[]=[];
  idUser: any;
  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get("id");
    if (this.idUser) {
      this.status = "Actualizar"
      this.userService.getDataUserId(this.idUser).subscribe(data => {
        let datosUsuario = JSON.parse(data).data.user[0];
        console.log("data", datosUsuario)
        this.form.nombre = datosUsuario.nombre;
        this.form.apaterno = datosUsuario.apaterno;
        this.form.amaterno = datosUsuario.amaterno;
        this.form.email = datosUsuario.email;
        this.form.telefono = datosUsuario.telefono;
        this.form.usuario = datosUsuario.usuario;
        this.form.dni = datosUsuario.dni;
        this.form.active = datosUsuario.estado == "Activo" ? true : false;
        this.form.privilegiosu = (datosUsuario.privilegios).map((elemento: any) => { return elemento.idprivilegio });
        // this.form.active= datosUsuario.estado=="Activo"?true:false;
        for (let id of this.form.privilegiosu) {

          this.active_buttons[id] = true;
        }

      },
        err => {
          alert("Error en la consulta " + err)
        })
    }

    this.userService.getPrivilegios().subscribe(
      data => {
        this.privilegios = JSON.parse(data).data.privilegios;

        for (let index in this.privilegios) {
          let privilegio: any = this.privilegios[index]
          this.active_buttons[privilegio.idprivilegio] = false;
        }


      },
      err => {
        this.privilegios = JSON.parse(err.error).message;
      }
    );
    console.log(this.form);
  }

  onSubmit(): void {
    if (this.form.contrasena.toString().trim() != null && this.form.contrasena.toString().trim() != "") {

      this.form.contrasena = CryptoJS.MD5(this.form.contrasena.toString().trim()).toString();
    }
    console.log("formulario",this.form);

    if (!this.idUser) {
      this.authService.register({
        nombre: this.form.nombre,
        apaterno: this.form.apaterno,
        amaterno: this.form.amaterno,
        dni: this.form.dni,
        email: this.form.email,
        telefono: this.form.telefono,
        usuario: this.form.usuario,
        contrasena: this.form.contrasena,
        idestado: this.form.idestado ? 1 : 2,
        privilegios: this.form.privilegiosu.map((elemento:any)=>{return elemento.toString()})

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
      this.authService.update(
        this.idUser, {
          trabajador: {
            nombre: this.form.nombre,
            apaterno: this.form.apaterno,
            amaterno: this.form.amaterno,
            dni: this.form.dni,
            telefono: this.form.telefono,
        },
        usuario: {
          email: this.form.email,
          usuario: this.form.usuario,
          // contrasena: this.form.contrasena,
          idestado: this.form.idestado ? 1 : 2,
        },
        privilegios: this.form.privilegiosu
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