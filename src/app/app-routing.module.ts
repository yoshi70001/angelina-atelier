import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { RegisterNewComponent } from './registerNew/registerNew.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardNewsComponent } from './board-news/board-news.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { UserComponent } from './views/user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListPrivilegesComponent } from './components/list-privileges/list-privileges.component';
import { NoticiasComponent } from './views/noticias/noticias.component';
import { ContactoComponent } from './views/contacto/contacto.component';
import { CatalogoComponent } from './views/catalogo/catalogo.component';
import { PrincipalComponent } from './views/principal/principal.component';

const routes: Routes = [
  
  {
    path:'admin',children:[
      {path:'',component:ListPrivilegesComponent},
      { path: 'register', component: RegisterComponent },
      { path: 'registerNew', component: RegisterNewComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'user', component: BoardUserComponent },
      { path: 'register/:id', component: RegisterComponent },
      { path: 'registerNew/:id', component: RegisterNewComponent },
      { path: 'deleteNew/:id', component: BoardNewsComponent },
      { path: 'home', component: BoardAdminComponent },
      { path: 'news', component: BoardNewsComponent },
      { path: '**', component: NotFoundComponent },
    ],
    component: HomeComponent
  },
  { path: 'login', component: LoginComponent },


  { path: 'user', children:[
    {path:'',component:UserComponent},
    {path:'noticias',component:NoticiasComponent},
    {path:'catalogo',component:CatalogoComponent},
    {path:'contacto',component:ContactoComponent},
    // { path: '**', component: NotFoundComponent },
  ], component: PrincipalComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' },

  { path: 'not', component: NotFoundComponent},
  { path: '**', redirectTo: 'not', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }