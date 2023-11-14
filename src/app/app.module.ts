import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginModule} from "./website/login/login.module";
import {EnvironmentBarComponent} from "./shared/components/environment-bar/environment-bar.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {ContainerComponent} from "./website/container/container.component";

@NgModule({
  declarations: [
    AppComponent,
    EnvironmentBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
