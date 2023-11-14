import {Pipe, PipeTransform} from "@angular/core";
import {USER_ROLES} from "../models/user.model";
import {CAMPAIGN_STATUS} from "../models/campaign";
@Pipe({name: 'translateRole'})
export class TranslateRolePipe implements PipeTransform {

  transform(role: string, plural = true): string {
    switch (role.toUpperCase()) {
      case USER_ROLES.ADMIN:
        return 'Admin Backoffice';
      case USER_ROLES.BACKOFFICE:
        return 'Backoffice';
      case USER_ROLES.MEDIC:
        return plural ? 'Medici' : 'Medico';
      case USER_ROLES.USER:
        return plural ? 'Pazienti' : 'Paziente';
      case USER_ROLES.HEALTHPOINT:
        return plural ? 'Operatori Punto Salute' : 'Operatore Punto Salute';
      case USER_ROLES.SECRETARY:
        return 'Segreteria';
      case CAMPAIGN_STATUS.BOOKED:
        return 'Future';
      case CAMPAIGN_STATUS.STARTED:
        return 'In corso'
      case CAMPAIGN_STATUS.DONE:
        return 'Passate'
      default:
        return role;
    }
  }

}
