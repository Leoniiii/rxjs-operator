import { Component, OnDestroy } from '@angular/core';

import { EMPTY, Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
})
export class ProductListAltComponent implements OnDestroy {
  pageTitle = 'Products';
  selectedProductId: number;

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  products$ = this.productService.products$.pipe(
    catchError((error) => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    })
  );

  selectedProducts$ = this.productService.selectedProduct$;
  sub: Subscription;

  constructor(private productService: ProductService) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
