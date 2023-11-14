import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./website/login/login-page.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule)},
  {path: 'login', component: LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
