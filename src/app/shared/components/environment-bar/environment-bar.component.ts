import { Component } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'hpb-environment-bar',
  templateUrl: './environment-bar.component.html',
  styleUrls: ['./environment-bar.component.scss']
})
export class EnvironmentBarComponent {

  get show(): boolean {
    return !environment.production;
  }

  get text(): string {
    return environment.environmentName;
  }
}
