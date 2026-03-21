import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  // Dữ liệu thật từ API
  newProducts: Product[] = [];

  // Dữ liệu tĩnh hợp lý — không cần API
  categories = [
    { icon: 'bi-trophy',    name: 'Thể Thao', count: 120 },
    { icon: 'bi-briefcase', name: 'Giày Da',  count: 85  },
    { icon: 'bi-stars',     name: 'Cao Gót',  count: 60  },
    { icon: 'bi-moisture',  name: 'Boot',     count: 45  },
  ];

  features = [
    { icon: 'bi-patch-check-fill', title: 'Hàng Chính Hãng',     desc: 'Cam kết 100% sản phẩm chính hãng từ các thương hiệu lớn' },
    { icon: 'bi-truck',            title: 'Giao Hàng Nhanh',      desc: 'Giao hàng nội thành trong 2–4 giờ, miễn phí đơn từ 500k' },
    { icon: 'bi-arrow-repeat',     title: 'Đổi Trả Dễ Dàng',      desc: 'Đổi trả trong 7 ngày nếu sản phẩm lỗi hoặc không vừa size' },
    { icon: 'bi-credit-card',      title: 'Thanh Toán Linh Hoạt', desc: 'Tiền mặt, chuyển khoản, COD — nhiều hình thức tiện lợi' },
  ];

brands = [
  { name: 'Nike',        count: 45, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80' },
  { name: 'Adidas',      count: 38, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&q=80' },
  { name: 'Puma',        count: 22, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&q=80' },
  { name: 'Converse',    count: 18, image: 'https://images.unsplash.com/photo-1494496195158-c3bc scale-down943f?w=300&q=80' },
  { name: 'Vans',        count: 15, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&q=80' },
  { name: 'New Balance', count: 20, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=300&q=80' },
];

  constructor(
    private router: Router,
    private productSvc: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.productSvc.getProducts({ limit: 4, page: 1 }).subscribe({
        next: res => {
          this.newProducts = res.data.items;
          this.cdr.detectChanges();
        },
        error: () => {}
      });
    }, 0);
  }

  goToProducts()         { this.router.navigate(['/products']); }
  goToContact()          { this.router.navigate(['/contact']);  }
  goToDetail(id: number) { this.router.navigate(['/products', id]); }

  getDisplayPrice(p: Product): number  { return p.sale_price ?? p.price; }
  hasDiscount(p: Product): boolean     { return !!(p.sale_price && p.sale_price < p.price); }
  discountPct(p: Product): number      { return Math.round((1 - (p.sale_price! / p.price)) * 100); }
}