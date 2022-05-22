import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicePaymentRoutingModule } from './invoice-payment-routing.module';
import { InvoicePaymentComponent } from './invoice-payment.component';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';  
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import * as _moment from 'moment';
 import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
const moment =  _moment;

class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    var formatString = 'MM/YYYY';
    return moment(date).format(formatString);
  }
}

@NgModule({
  imports: [
    InvoicePaymentRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,

    MatDatepickerModule,
    MatNativeDateModule 

  ],
  declarations: [InvoicePaymentComponent],
  providers :[
    {
      provide: DateAdapter, useClass: CustomDateAdapter
    }
  ]
})
export class InvoicePaymentModule {}
