import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/core/common.service';
import { CustomValidators } from 'src/core/validators';
import { MatDatepicker } from '@angular/material/datepicker';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-payment',
  templateUrl: './invoice-payment.component.html',
})
export class InvoicePaymentComponent implements OnInit {
  form: FormGroup;

  disableBtn: boolean = false;
  isLoading: boolean = false;

  submitted: boolean = false;
  invoiceid: any;
  invoiceDetails: any;

  subtotal: number = 0;
  grandtotal: number = 0;

  today : Date = new Date();

  
  @ViewChild(MatDatepicker) picker : any;
  
  constructor(
    private fb: FormBuilder,
    private _commonService: CommonService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      invnumber: [],
      billaddress: [],
      shippingaddress: [],
      totalamount: [],
      cardnumber: [, Validators.required],
      cvv: [
        ,
        Validators.compose([
          Validators.required,
          CustomValidators.insertonlythreenumber,
          CustomValidators.insertonlypositivenumber,
        ]),
      ],
      expirydate: [, Validators.required],
      holdername: [, Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.invoiceid = param['id'];
      this.onLoadInvoices(this.invoiceid);
    });
  }

  onLoadInvoices(id: any) {
    this.isLoading = true;
    this._commonService.getById(id).subscribe((res: any) => {
      console.log('res', res);
      this.isLoading = false;
      this.invoiceDetails = res;
      this.form.get('invnumber')?.setValue(res.invnumber);
      this.form.get('billaddress')?.setValue(res.billaddress);
      this.form.get('shippingaddress')?.setValue(res.shippingaddress);
      this.form.get('totalamount')?.setValue(res.totalamount);

      this.form.get('invnumber')?.disable();
      this.form.get('billaddress')?.disable();
      this.form.get('shippingaddress')?.disable();
      this.form.get('totalamount')?.disable();
    });
  }

  onSubmit(valid: boolean, value: any) {
    this.submitted = true;
     if (!valid) {
      
      swal.fire(
        '',
        'Validation failed!',
        'error'
      )
      return;
    } 
    let model = this.form.getRawValue();
    this.disableBtn = true;
    console.log('model', model);
    this._commonService
    .makePayment(model).subscribe((res: any) => {
       this._router.navigate(['/pages/view/'+this.invoiceid]);
       this.disableBtn = false;
       this.updateStatus();
       swal.fire(
        '',
        'Payment made success!',
        'success'
      )
    },(e)=>{
      console.log("e",e)
      swal.fire(
        '',
        'Something went wrong!',
        'error'
      )
    });
  }
 
  monthSelected(params : any) {
    var date = params._d ? params._d : params;
    this.form.controls['expirydate'].setValue(date);
    this.picker.close();
  }

  updateStatus() {
    let model: any = {};
    model['_id'] = this.invoiceid;
    model['status'] = 'Paid';
    this.disableBtn = true;
    this._commonService.updatestatus(model).subscribe((res: any) => {
      console.log('res', res);
      this.disableBtn = false;
    });
  }

  previewBtn(item: any) {
    console.log('item', item);
    this._router.navigateByUrl('/pages/view/' + item._id);
  }

}
