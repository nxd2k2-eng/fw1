import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeader } from '../../components/admin/admin-header/admin-header';
import { Sidebar } from '../../components/admin/sidebar/sidebar';

@Component({
  selector: 'app-admin-layout',
  standalone: true,            // ← thêm dòng này
  imports: [AdminHeader, Sidebar, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {}