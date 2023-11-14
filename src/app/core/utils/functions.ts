import {throwError} from "rxjs";
import * as Moment from 'moment';

export function handleError(response: any, store: any) {
    store.setError(response.error.errorMessage);
    return throwError(response);
}

export function toMoment(date?: string): Moment.Moment {
    return date ? Moment(date) : Moment();
}
