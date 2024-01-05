import { ValidationErrors, AbstractControl } from '@angular/forms';

export class RegisterValidators {
  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (!email) {
      return null;
    }
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) ? null : { email: true };
  }
}
