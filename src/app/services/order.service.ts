import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, CreateOrderRequest } from '../models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createOrder(body: CreateOrderRequest): Observable<ApiResponse<{ id: number; order_code: string; final_amount: number }>> {
    return this.http.post<ApiResponse<any>>(`${this.api}/orders`, body);
  }

  getMyOrders(page = 1): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.api}/orders?page=${page}&limit=20`);
  }
}
