import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  imports: [PagesRoutingModule],
  declarations: [PagesComponent],
})
export class PagesModule {}
