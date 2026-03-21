import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  values = [
    {
      icon: 'bi-patch-check-fill',
      title: 'Hàng Chính Hãng',
      desc: 'Chúng tôi chỉ phân phối sản phẩm chính hãng từ các thương hiệu uy tín toàn cầu.'
    },
    {
      icon: 'bi-award-fill',
      title: 'Chất Lượng',
      desc: 'Mỗi sản phẩm được kiểm tra kỹ lưỡng để đảm bảo độ bền và sự thoải mái tối ưu.'
    },
    {
      icon: 'bi-palette-fill',
      title: 'Phong Cách',
      desc: 'Bộ sưu tập đa dạng từ thể thao, công sở đến thời trang đường phố cho mọi phong cách.'
    },
  ];

  stats = [
    { num: '500+', label: 'Mẫu Giày'    },
    { num: '8',    label: 'Thương Hiệu' },
    { num: '2K+',  label: 'Khách Hàng'  },
    { num: '98%',  label: 'Hài Lòng'    },
  ];

  team = [
    { name: 'Nguyễn Xuân Dương', role: 'Giám Đốc',          icon: 'bi-person-workspace'    },
    { name: 'Phan Thị Tường Vy', role: 'Quản Lý Sản Phẩm',  icon: 'bi-box-seam'            },
    { name: 'Trần Thiên Tứ',     role: 'Marketing',           icon: 'bi-megaphone-fill'      },
    { name: 'Khang',             role: 'Chăm Sóc KH',         icon: 'bi-headset'             },
  ];

  brands = ['Nike', 'Adidas', 'Puma', 'Converse', 'Vans', 'New Balance', "Biti's", 'Ananas'];
}