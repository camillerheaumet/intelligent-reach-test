import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';

import { ProductsService } from "src/app/products/products.service";
import { Product } from './product';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ir-dev-test";
  products$: Observable<Product[]>;
  currentTerm = '';
  brandList = ['All'];
  currentStock = 'all';
  form = new FormGroup({
    term: new FormControl(this.currentTerm),
    brand: new FormControl(this.brandList[0]),
    stock: new FormControl(this.currentStock),
  });
  private searchTerms = new Subject<string>();

  constructor(private productsService: ProductsService)
  {
    this.products$ = productsService.getProducts();

    this.products$.subscribe(productArray => {
      const newBrandList = productArray.reduce((prev, curr) => {
        if(!prev.includes(curr.brand)) {
          prev.push(curr.brand)
        }
        return prev
      }, this.brandList)
      this.brandList = newBrandList
    });
  }

  ngOnInit() {
    this.products$ = this.searchTerms.pipe(
      startWith(this.form.value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(() => this.productsService.searchProducts(this.form.value)),
    );
  }

  onFormChange(){
    this.searchTerms.next(this.form.value);
  }
}
