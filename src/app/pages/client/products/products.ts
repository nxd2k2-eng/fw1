import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product, Category, Brand } from '../../../models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: Product[]    = [];
  categories: Category[] = [];
  brands: Brand[]        = [];

  filters    = { search: '', category_id: '', brand_id: '', page: 1, limit: 12 };
  pagination = { total: 0, pages: 1 };
  loading    = false;
  viewMode: 'grid' | 'list' = 'grid';

  constructor(
    private productSvc: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef  
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadBrands();
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    const f: any = { page: this.filters.page, limit: this.filters.limit };
    if (this.filters.search)      f.search      = this.filters.search;
    if (this.filters.category_id) f.category_id = this.filters.category_id;
    if (this.filters.brand_id)    f.brand_id    = this.filters.brand_id;
    this.productSvc.getProducts(f).subscribe({
      next: res => {
        this.products   = res.data.items;
        this.pagination = res.data.pagination;
        this.loading    = false;
        this.cdr.detectChanges();  
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();  
      }
    });
  }

  loadCategories() {
    this.productSvc.getCategories().subscribe(res => {
      this.categories = res.data;
      this.cdr.detectChanges();  
    });
  }

  loadBrands() {
    this.productSvc.getBrands().subscribe(res => {
      this.brands = res.data;
      this.cdr.detectChanges();   
    });
  }

  onSearch()       { this.filters.page = 1; this.loadProducts(); }
  onFilterChange() { this.filters.page = 1; this.loadProducts(); }
  clearFilters()   { this.filters = { search: '', category_id: '', brand_id: '', page: 1, limit: 12 }; this.loadProducts(); }

  goToPage(p: number) {
    if (p < 1 || p > this.pagination.pages) return;
    this.filters.page = p; this.loadProducts();
  }

  viewDetail(id: number) { this.router.navigate(['/products', id]); }
  goOrder(id: number)    { this.router.navigate(['/order-create'], { queryParams: { product_id: id } }); }

  getPages(): number[]             { return Array.from({ length: this.pagination.pages }, (_, i) => i + 1); }
  getDisplayPrice(p: Product)      { return p.sale_price ?? p.price; }
  hasDiscount(p: Product): boolean { return !!(p.sale_price && p.sale_price < p.price); }
  discountPct(p: Product): number  { return Math.round((1 - (p.sale_price! / p.price)) * 100); }
}