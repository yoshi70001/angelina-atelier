import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { NoticiasService } from '../_services/noticias.service';

@Component({
  selector: 'app-board-news',
  templateUrl: './board-news.component.html',
  styleUrls: ['./board-news.component.css']
})
export class BoardNewsComponent implements OnInit {

  content: any;
  editPriv:boolean=false;
  delePriv:boolean=false;
  constructor(private newService: NoticiasService,private token: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    this.editPriv=this.token.getUser()


    this.newService.getPublicContent().subscribe(
      data => {
        this.content = data.data.new;
        console.log(this.content)  
      },
      err => {
        this.content = JSON.parse(err.error).message;
      
      }
    );
  }

  ngEditNoticia(idnoticia:any):void{
    this.router.navigate(['/admin/registerNew', idnoticia]);
  }
  ngDeleteNoticia(idnoticia:any):void{
    
    let deleteB= confirm("¿Esta seguro que desea eliminar la noticia?");
    if(deleteB){
      this.router.navigate(['/admin/deleteNew', idnoticia]);
      console.log("Has eliminado "+idnoticia)
    }
  }

}
