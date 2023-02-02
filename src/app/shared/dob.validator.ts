import { AbstractControl } from '@angular/forms';

export function forbiddenDOBValidation(control: AbstractControl): { [key: string]: boolean } | null
{
  if (control.value) {
    const date1 = new Date(control.value);
    const date2 = new Date();
    let diff: number;
    diff = date2.getFullYear() - date1.getFullYear();
    if (diff <= 8) {
      return { dobForbidden: true };
    } else {
      return null;
    }
  } else {
    return { dobForbidden: false };
  }
  return null;
}
