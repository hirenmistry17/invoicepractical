import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/core/common.service';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {
  form: FormGroup;

  List: any[] = [];
  productList: any[] = [];
  selectedProduct: any[] = [];

  disableBtn: boolean = false;
  isLoading: boolean = false;

  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _commonService: CommonService,
    private _router: Router
  ) {
    this.form = this.fb.group({
      invnumber: [, Validators.required],
      billaddress: [, Validators.required],
      shippingaddress: [, Validators.required],
      totalamount: [],
      products: [[], Validators.required],
    });
  }

  ngOnInit() {
    this.form.get('products')?.valueChanges.subscribe((data) => {
      this.selectedProduct = data;
    });
    this.isLoading = true;
    this.onLoadInvoices();
    this.getallproducts();
    this.isLoading = false;
  }

  onLoadInvoices() {
    this._commonService.getall().subscribe((res: any) => {
      this.List = [];
      this.List = res;
    });
  }
  getallproducts() {
    this._commonService.getallproducts().subscribe((res: any) => {
      console.log('res', res);
      this.productList = [];
      this.productList = res;
    });
  }

  onSubmit(valid: boolean, value: any) {
    this.submitted = true;
    let qty = this.selectedProduct.map((a) => a.qty);
    if (!valid) {
      alert('not valid !');
      return;
    } else if (
      qty.includes(null) ||
      qty.includes(undefined) ||
      qty.includes(0)
    ) {
      alert('enter valid qty !');
      return;
    }
    let model = { ...value };
    model['products'] = [];
    let products = [];
    products = this.selectedProduct.map((a) => {
      return {
        productid: a._id,
        productname: a.title,
        amount: a.rate,
        qty: a.qty,
        totalamount: a.rate * a.qty,
      };
    });
    model['products'] = products;
    model['totalamount'] = products
      .map((a: any) => a.totalamount)
      .reduce((b: number, c: number) => b + c);
    this.disableBtn = true;
    console.log('model', model);
    this._commonService.post(model).subscribe(
      (res: any) => {
        $('#closeid').click();
        swal.fire('', 'Invoice added successfully !', 'success');
        this.isLoading = true;
        this.onLoadInvoices();
        this.isLoading = false;
        this.disableBtn = false;
      },
      (e) => {
        swal.fire('', 'Something went wrong !', 'error');
        this.disableBtn = false;
      }
    );
  }

  updateStatus(item: any) {
    this._router.navigateByUrl('/pages/invoice-payment/' + item._id);
  }

  previewBtn(item: any) {
    console.log('item', item);
    this._router.navigateByUrl('/pages/view/' + item._id);
  }
}
