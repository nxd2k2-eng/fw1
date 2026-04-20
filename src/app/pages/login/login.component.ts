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
    const email = this.email.trim();
    const password = this.password.trim();

    if (!email || !password) {
      this.errorMsg = 'Vui lòng nhập đầy đủ thông tin';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.auth.login(email, password).subscribe({
      next: (res) => {
        this.loading = false;

        if (!res.success) {
          this.errorMsg = res.message || 'Sai email hoặc mật khẩu';
          return;
        }

        const role = res?.data?.user?.role;

        this.router.navigate([
          role === 'team_leader' ? '/admin' : '/'
        ]);
      },
      error: (err) => {
        this.loading = false;
        console.error('Login error', err);
        this.errorMsg =
          err?.error?.message || 'Sai email hoặc mật khẩu';
      }
    });
  }
}