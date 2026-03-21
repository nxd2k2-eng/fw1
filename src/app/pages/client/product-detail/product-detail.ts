import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product, ProductVariant } from '../../../models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  loading = true;
  selectedVariant: ProductVariant | null = null;
  selectedSize  = '';
  selectedColor = '';
  activeImage   = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productSvc: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productSvc.getProduct(id).subscribe({
      next: res => {
        this.product     = res.data;
        this.activeImage = res.data.thumbnail_url || '';
        this.loading     = false;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; }
    });
  }

  get sizes(): string[] {
    return [...new Set((this.product?.variants || []).map(v => v.size))];
  }

  get colors(): string[] {
    return [...new Set((this.product?.variants || [])
      .filter(v => !this.selectedSize || v.size === this.selectedSize)
      .map(v => v.color))];
  }

  selectSize(size: string) {
    this.selectedSize    = size;
    this.selectedColor   = '';
    this.selectedVariant = null;
  }

  selectColor(color: string) {
    this.selectedColor   = color;
    this.selectedVariant = (this.product?.variants || []).find(
      v => v.size === this.selectedSize && v.color === color
    ) || null;
  }

  isColorAvailable(color: string): boolean {
    return (this.product?.variants || []).some(
      v => v.color === color &&
           (!this.selectedSize || v.size === this.selectedSize) &&
           v.stock > 0
    );
  }

  getDisplayPrice(): number { return this.product?.sale_price ?? this.product?.price ?? 0; }
  hasDiscount(): boolean    { return !!(this.product?.sale_price && this.product.sale_price < this.product.price); }
  discountPct(): number     { return Math.round((1 - (this.product!.sale_price! / this.product!.price)) * 100); }

  goToOrder() {
    if (!this.selectedVariant) return;
    this.router.navigate(['/order-create'], { queryParams: { variant_id: this.selectedVariant.id } });
  }
  goBack() { this.router.navigate(['/products']); }
}