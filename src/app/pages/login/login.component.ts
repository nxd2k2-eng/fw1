import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // fix styleUrl -> styleUrls
})
export class LoginComponent {

  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  showPass = false;
  loading = false;
  errorMsg = '';

  login() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Vui lòng nhập đầy đủ thông tin';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.loading = false;

        const role = res?.data?.user?.role;

        this.router.navigate([
          role === 'team_leader' ? '/admin' : '/home'
        ]);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg =
          err?.error?.message || 'Sai email hoặc mật khẩu';
      }
    });
  }
}