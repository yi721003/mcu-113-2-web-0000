import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

export const productResolver: ResolveFn<Product> = (route) => {
  const productService = inject(ProductService);
  const id = route.paramMap.get('id')!;
  return productService.getById(+id);
};
