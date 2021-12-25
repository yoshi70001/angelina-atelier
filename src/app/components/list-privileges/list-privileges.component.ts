import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-list-privileges',
  templateUrl: './list-privileges.component.html',
  styleUrls: ['./list-privileges.component.css']
})
export class ListPrivilegesComponent implements OnInit {
  currentUser: any;
  privilegios: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.privilegios=this.currentUser.data.privileges;
  }
  ngRedirect(ruta:number):void{
    let rutas:string[]=["/admin/user","/admin/register"]
    window.location.replace(rutas[ruta-1]);
  }
}
