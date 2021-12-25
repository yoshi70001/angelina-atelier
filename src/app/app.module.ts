import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { UserComponent } from './views/user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { ListPrivilegesComponent } from './components/list-privileges/list-privileges.component';
import { NoticiasComponent } from './views/noticias/noticias.component';
import { CatalogoComponent } from './views/catalogo/catalogo.component';
import { ContactoComponent } from './views/contacto/contacto.component';
import { PrincipalComponent } from './views/principal/principal.component';
import { FooterUserComponent } from './views/layout/footer-user/footer-user.component';
import { HeaderUserComponent } from './views/layout/header-user/header-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    UserComponent,
    NotFoundComponent,
    HeaderComponent,
    ListPrivilegesComponent,
    NoticiasComponent,
    CatalogoComponent,
    ContactoComponent,
    PrincipalComponent,
    FooterUserComponent,
    HeaderUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }