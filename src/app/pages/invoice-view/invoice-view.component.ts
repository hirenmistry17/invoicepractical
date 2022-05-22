import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/core/common.service';
declare var $: any;

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss'],
  
})
export class InvoiceViewComponent implements OnInit {
  
  invoiceid : any;

  invoiceDetails: any;

  disableBtn : boolean = false;
  isLoading : boolean = false;


  subtotal : number = 0;
  grandtotal : number = 0;

  constructor( private _commonService: CommonService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((param)=>{
      this.invoiceid = param['id'];
      this.onLoadInvoices(this.invoiceid);
    })
  }

  onLoadInvoices(id : any){
    this.isLoading = true;
    this._commonService
     .getById(id)
      .subscribe((res: any) => {
        console.log("res",res);
        this.isLoading = false;
        this.invoiceDetails = res;

        this.subtotal = res.products.map((a : any) =>  { return a.amount}).reduce((a: number,b:number)=> a+b);
        this.grandtotal = res.products.map((a : any) =>  { return a.totalamount}).reduce((a: number,b:number)=> a+b);
     });
  } 

    
  toPdf(){
    let printContents , popupWin : any;
    printContents = document.getElementById('print')?.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
                @page {`+ 'size: A4 portrait;margin: 30pt 30pt 30pt 45pt;' + `}

           @media print {
              body {
                margin: 0;
                color: #000;
                background-color: #fff;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
                font-family: poppins, arial;
                  font-size: 13px;
                  color: #000000;
              }
              * {
                box-sizing: border-box;
              }
              .print-page {
                  font-family: poppins, arial;
                  font-size: 13px;
                  color: #000000;
                  background: #ffffff;
              }
              .text-right {
                text-align: right;
              }
              .text-center {
                text-align: center;
              }
              .text-left {
                text-align: left;
              }

              .align-top {
                vertical-align: top;
              }
          

              row {
                display: flex;
                flex-wrap: wrap;
                margin-right: -15px;
                margin-left: -15px;
            }
            .float-right {
              float: right!important;
              }

              .col-sm-4 {
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
            }
            @media (min-width: 576px)
              .col-sm-4 {
                  flex: 0 0 33.333333%;
                  max-width: 33.333333%;
              }

            .col-6 {
              flex: 0 0 50%;
              max-width: 50%;
          }
            .table {
              width: 100%;
              margin-bottom: 1rem;
              color: #212529;
            }
              .table-responsive {
                display: block;
                width: 100%;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            }
 
            .table td, .table th {
              padding: 0.75rem;
              vertical-align: top;
              border-top: 1px solid #dee2e6;
              text-align : center;
            }
              .table td, .table th {
                padding: 0.75rem;
                vertical-align: top;
                border-top: 1px solid #dee2e6;
            }
 
          .text-break {
              word-break: break-word !important;
              word-wrap: break-word !important;
          }

       
         .break-row-after {
           page-break-after: auto;
          }
          .break-row-inside {
              page-break-inside: avoid;
          }

          .align-middle {
            vertical-align: middle;
          }

          .d-none {
            display:none;
          }

          .d-block {
              display: block;
          }


          .row {
              display: flex;
              flex-wrap: wrap;
          }

              }
            </style>
          </head>
          <body onload="window.print();window.close()">${printContents}</body>
        </html>`
    );
    popupWin.document.close();
  }

}
