import { FormControl } from '@angular/forms';

export class CustomValidators {
  static insertonlythreenumber(control: FormControl) {
    var regex = /^\d{3}$/;
    var valid = regex.test(control.value);
    if (control.value) {
      return valid ? null : { insertonlythreenumber: true };
    } else {
      return null;
    }
  }

     static insertonlypositivenumber(control: FormControl) {
        var regex = /^[0-9]*(?:\.\d{1,2})?$/;
        var valid = regex.test(control.value);
        
        if(control.value) {
            if(control.value <= 0) {
                return { insertonlypositivenumber: true };
            } else {
                return valid ? null : { insertonlypositivenumber: true };
            }
        } else {
            return null;
        }
    }

}
