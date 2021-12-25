import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content: any;
  editPriv:boolean=false;
  delePriv:boolean=false;
constructor(private userService: UserService,private token: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    this.editPriv=this.token.getUser()


    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data.data.user;
        console.log(this.content)  
      },
      err => {
        this.content = JSON.parse(err.error).message;
      
      }
    );
  }
  ngEditUser(id:any):void{
    this.router.navigate(['/admin/register', id]);
  }
  ngDeleteUser(id:any):void{
    
    let deleteB= confirm("¿Esta seguro que desea eliminar al usuario?");
    if(deleteB){
      console.log("has eliminado "+id)
    }
  }
}
