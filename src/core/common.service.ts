import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CommonService {
  constructor(private httpClient: HttpClient) {}

  url = 'http://localhost:3001/api/invoice/insert';
  post(model: any) {
    return this.httpClient.post(this.url, model);
  }

  url21 = 'http://localhost:3001/api/invoice/getById';
  getById(id : any) {
    return this.httpClient.get(this.url21+`/${id}`);
  }

  url2 = 'http://localhost:3001/api/invoice/getall';
  getall() {
    return this.httpClient.get(this.url2);
  }

  url3 = 'http://localhost:3001/api/invoice/payment';
  makePayment(add : any) {
    return this.httpClient.post(this.url3, add);
  }
  
  url4 = 'http://localhost:3001/api/product/getall';
  getallproducts() {
    return this.httpClient.get(this.url4);
  }

  url5 = 'http://localhost:3001/api/invoice/updatestatus';
  updatestatus(model : any) {
    return this.httpClient.post(this.url5,model);
  }

}
