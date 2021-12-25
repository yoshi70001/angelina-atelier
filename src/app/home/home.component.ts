import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  currentUser: any;
  privilegios:object={};
  showBack:boolean=false;
  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    if(Object.keys(this.token.getUser()).length==0){
      window.location.replace("/login")
    }
    if(window.location.href.split("admin").indexOf("")==-1){
      console.log(window.location.href.split("admin"))
      this.showBack=true;
    }
    this.currentUser = this.token.getUser();
    this.privilegios=this.currentUser.data.privileges;
    
  }
  volver():void{
    window.location.href="/admin"
  }
  
  
}