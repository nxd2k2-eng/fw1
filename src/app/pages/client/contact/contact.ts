import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  form = { name: '', email: '', phone: '', subject: '', message: '' };
  submitted = false;
  sending = false;

  subjects = [
    'Hỏi về sản phẩm',
    'Hỗ trợ đơn hàng',
    'Chính sách đổi trả',
    'Hợp tác kinh doanh',
    'Khác',
  ];

  infos = [
    { icon: 'bi-geo-alt-fill',   label: 'Địa chỉ',      value: '123 Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ' },
    { icon: 'bi-telephone-fill', label: 'Điện thoại',   value: '0901 234 567' },
    { icon: 'bi-envelope-fill',  label: 'Email',         value: 'support@shoeshop.vn' },
    { icon: 'bi-clock-fill',     label: 'Giờ làm việc', value: 'T2–T7: 8:00–21:00 | CN: 9:00–18:00' },
  ];

  faqs = [
    { q: 'Chính sách đổi trả như thế nào?',
      a: 'Đổi trả trong 7 ngày với sản phẩm lỗi hoặc không vừa size. Sản phẩm cần còn nguyên tem mác.' },
    { q: 'Thời gian giao hàng bao lâu?',
      a: 'Nội thành Cần Thơ: 2–4 giờ. Các tỉnh khác: 2–5 ngày làm việc.' },
    { q: 'Có được kiểm tra hàng trước khi nhận không?',
      a: 'Có, bạn hoàn toàn có thể kiểm tra sản phẩm trước khi thanh toán với hình thức COD.' },
    { q: 'Làm thế nào để biết size phù hợp?',
      a: 'Mỗi sản phẩm đều có bảng quy đổi size chi tiết. Nếu cần tư vấn hãy liên hệ hotline.' },
  ];

  send() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.sending = true;
    setTimeout(() => { this.sending = false; this.submitted = true; }, 1200);
  }

  reset() {
    this.form = { name: '', email: '', phone: '', subject: '', message: '' };
    this.submitted = false;
  }
}