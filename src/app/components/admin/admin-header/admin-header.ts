import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-admin-header',
  imports: [CommonModule],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.css',
})
export class AdminHeader {
  user: any = null; // 👈 dùng biến thường

  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe((u: any) => {
      this.user = u;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}