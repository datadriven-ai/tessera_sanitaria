import { Component } from '@angular/core';
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'HealthPoint Backoffice';

  constructor(private _authService: AuthService) {
    this._authService.connect();
  }
}
