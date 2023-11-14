import {AbstractControl} from "@angular/forms";

export function EmailValidator(control: AbstractControl) {
  const t = control.value;
  if (!t) { return null; }
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(t).toLowerCase()) ? null : {emailNotValid: true};
}

export function ArrayLengthOneValidator(control: AbstractControl) {
  const t: Array<number> = control.value;
  if (!t) { return {noArray: true}; }
  return t.length > 0 ? null : {noElements: true};
}
