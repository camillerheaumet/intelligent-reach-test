import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import { ProductsGridComponent } from "./products-grid.component";

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ProductsGridComponent
  ],
  exports: [
    ProductsGridComponent
  ],
  providers: [
  ]
})

export class ProductsModule { }
