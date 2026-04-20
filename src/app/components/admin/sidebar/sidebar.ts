import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊', exact: true },
    { path: '/admin/products', label: 'Sản phẩm', icon: '👟', exact: false },
    { path: '/admin/category', label: 'Danh mục', icon: '🗂️', exact: false },
    { path: '/admin/orders', label: 'Đơn hàng', icon: '📦', exact: false },
  ];
}
