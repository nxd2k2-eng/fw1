import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiResponse, AuthUser } from '../models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;
  private userSubject = new BehaviorSubject<AuthUser | null>(this.loadUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  private loadUser(): AuthUser | null {
    if (typeof window === 'undefined') return null; // ← thêm dòng này
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }

  get currentUser(): AuthUser | null {
    return this.userSubject.value;
  }
  get token(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }
  get isLoggedIn(): boolean {
    return !!this.token;
  }

  login(
    email: string,
    password: string,
  ): Observable<ApiResponse<{ token: string; user: AuthUser }>> {
    return this.http
      .post<
        ApiResponse<{ token: string; user: AuthUser }>
      >(`${this.api}/auth/login`, { email, password })
      .pipe(
        tap((res) => {
          if (res.success && typeof window !== 'undefined') {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            this.userSubject.next(res.data.user);
          }
        }),
      );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.userSubject.next(null);
  }
}
