import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { Product, ProductVariant } from '../../../models';

interface CartItem { variant: ProductVariant; product: Product; quantity: number; }

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './order-create.html',
  styleUrl: './order-create.css'
})
export class OrderCreate implements OnInit {
  cart: CartItem[] = [];
  products: Product[] = [];
  searchText = '';
  loading    = false;
  submitting = false;
  success    = false;
  errorMsg   = '';
  resultOrder: any = null;

  customer = { full_name: '', phone: '', email: '', address: '' };
  payment_method: 'cash' | 'bank_transfer' | 'cod' = 'cash';
  note         = '';
  coupon_code  = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productSvc: ProductService,
    private orderSvc: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    setTimeout(() => { this.loadProducts(); }, 0);
  }

  loadProducts() {
    this.loading = true;
    this.productSvc.getProducts({ search: this.searchText, limit: 50 }).subscribe({
      next: res => {
        this.products = res.data.items;
        this.loading  = false;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; }
    });
  }

  onSearch() { this.loadProducts(); }

  getSizes(p: Product) {
    return [...new Set((p.variants || []).map(v => v.size))];
  }
  getVariantsBySize(p: Product, size: string) {
    return (p.variants || []).filter(v => v.size === size && v.stock > 0);
  }

  addToCart(p: Product, variant: ProductVariant) {
    const existing = this.cart.find(c => c.variant.id === variant.id);
    if (existing) { existing.quantity++; }
    else { this.cart.push({ variant, product: p, quantity: 1 }); }
  }

  removeFromCart(i: number) { this.cart.splice(i, 1); }

  changeQty(item: CartItem, delta: number) {
    item.quantity += delta;
    if (item.quantity <= 0)                    this.cart = this.cart.filter(c => c !== item);
    if (item.quantity > item.variant.stock)    item.quantity = item.variant.stock;
  }

  getPrice(item: CartItem): number    { return item.product.sale_price ?? item.product.price; }
  getSubtotal(item: CartItem): number { return this.getPrice(item) * item.quantity; }
  getTotal(): number                  { return this.cart.reduce((s, i) => s + this.getSubtotal(i), 0); }

  get isValid(): boolean {
    return this.cart.length > 0 && !!this.customer.full_name && !!this.customer.phone;
  }

  submit() {
    if (!this.isValid) return;
    this.submitting = true;
    this.errorMsg   = '';
    const body = {
      customer:       this.customer,
      items:          this.cart.map(c => ({ variant_id: c.variant.id, quantity: c.quantity })),
      payment_method: this.payment_method,
      note:           this.note,
      coupon_code:    this.coupon_code || undefined
    };
    this.orderSvc.createOrder(body).subscribe({
      next: res => { this.submitting = false; this.success = true; this.resultOrder = res.data; },
      error: err => { this.submitting = false; this.errorMsg = err.error?.message || 'Tạo đơn thất bại'; }
    });
  }

  reset()    { this.cart = []; this.success = false; this.resultOrder = null; }
  goToList() { this.router.navigate(['/products']); }
}