import { Component, Input } from "@angular/core";
import { Product } from '../product';

@Component({
  selector: "products-table",
  templateUrl: "products-grid.component.html",
  styleUrls: [],
  providers: []
})
export class ProductsGridComponent {
  @Input() products: Product[] = [];
}
