import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        loadChildren: () =>
          import('./invoice-list/invoice-list.module').then(
            (m) => m.InvoiceListModule
          ),
      },
      {
        path: 'view',
        loadChildren: () =>
          import('./invoice-view/invoice-view.module').then(
            (m) => m.InvoiceViewModule
          ),
      },
      {
        path: 'invoice-payment',
        loadChildren: () =>
          import('./invoice-payment/invoice-payment.module').then(
            (m) => m.InvoicePaymentModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
