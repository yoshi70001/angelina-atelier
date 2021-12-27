import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private roles: Object[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showNewsBoard = false;
  showHeader=true;
  ruteLogin=false;
  username?: string;
  
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.data.privileges;
      
      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showAdminBoard = true;
      // this.showNewsBoard = this.roles.includes('ROLE_NEWS');
      this.showNewsBoard = true;

      this.username = user.data.user.usuario;
    }
  }

  
  
}