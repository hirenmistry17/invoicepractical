import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceViewComponent } from './invoice-view.component';

const routes: Routes = [
    { path : ':id' , component : InvoiceViewComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceViewRoutingModule { }
