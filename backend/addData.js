/*eslint-disable*/
const sql = require('mssql');
const dbConfig = require('./dbConfig');

async function resetAndAddMultipleEmployeeData() {
  try {
    const pool = await sql.connect(dbConfig);
    console.log('Kết nối thành công!');

    // Xóa tất cả dữ liệu cũ
    await pool.request().query('DELETE FROM [dbo].[KhachHang]');
    await pool.request().query('DELETE FROM [dbo].[ChiNhanh]');
    await pool.request().query('DELETE FROM [dbo].[NhaCungCap]');
    await pool.request().query('DELETE FROM [dbo].[SanPham]');
    await pool.request().query('DELETE FROM [dbo].[DungCuHocTap]');
    await pool.request().query('DELETE FROM [dbo].[Sach]');
    await pool.request().query('DELETE FROM [dbo].[PhuKienSach]');
    await pool.request().query('DELETE FROM [dbo].[DanhSachSanPhamMua]');
    await pool.request().query('DELETE FROM [dbo].[DanhSachSanPhamNhap]');
    await pool.request().query('DELETE FROM [dbo].[DanhSachSanPhamKho]');
    await pool.request().query('DELETE FROM [dbo].[DiaChiGiaoHang]');
    await pool.request().query('DELETE FROM [dbo].[DanhGia]');
    await pool.request().query('DELETE FROM [dbo].[GioHang]');
    await pool.request().query('DELETE FROM [dbo].[CaLamViec]');
    await pool.request().query('DELETE FROM [dbo].[HoaDonBanHang]');
    await pool.request().query('DELETE FROM [dbo].[HoaDonNhapHang]');
    await pool.request().query('DELETE FROM [dbo].[BangLuong]');
    await pool.request().query('DELETE FROM [dbo].[Voucher]');
    await pool.request().query('DELETE FROM [dbo].[NhanVien]');


    
    console.log('Tất cả dữ liệu đã được xóa!');

    const customers = [
      { ID: 'KH000001', Ten: 'Nguyễn Hoàng Long', SDT: '0901234567', NgaySinh: '1990-04-12', GioiTinh: 'Nam', Email: 'nguyenhoanglong@example.com', DaiDienDoanhNghiep: 0, TenTaiKhoan: 'nguyenhoanglong', MatKhau: 'nguyen123' },
      { ID: 'KH000002', Ten: 'Trần Minh Tuấn', SDT: '0902345678', NgaySinh: '1988-06-25', GioiTinh: 'Nam', Email: 'tranminhtuan@example.com', DaiDienDoanhNghiep: 1, TenTaiKhoan: 'tranminhtuan', MatKhau: 'tran123' },
      { ID: 'KH000003', Ten: 'Lê Thị Mai', SDT: '0903456789', NgaySinh: '1995-07-10', GioiTinh: 'Nữ', Email: 'lethimai@example.com', DaiDienDoanhNghiep: 0, TenTaiKhoan: 'lethimai', MatKhau: 'lethimai123' },
      { ID: 'KH000004', Ten: 'Phạm Anh Tú', SDT: '0904567890', NgaySinh: '1992-01-22', GioiTinh: 'Nam', Email: 'phamantuu@example.com', DaiDienDoanhNghiep: 1, TenTaiKhoan: 'phamantuu', MatKhau: 'pham123' },
      { ID: 'KH000005', Ten: 'Đỗ Hiếu', SDT: '0905678901', NgaySinh: '1994-09-17', GioiTinh: 'Nam', Email: 'dohongnhung@example.com', DaiDienDoanhNghiep: 1, TenTaiKhoan: 'dohongnhung', MatKhau: 'hongnhung123' },
      { ID: 'KH000006', Ten: 'Ngô Thành Hân', SDT: '0906789012', NgaySinh: '1993-02-14', GioiTinh: 'Nam', Email: 'ngominhquan@example.com', DaiDienDoanhNghiep: 0, TenTaiKhoan: 'ngominhquan', MatKhau: 'minhquan123' },
      { ID: 'KH000007', Ten: 'Bùi Thị Lan', SDT: '0907890123', NgaySinh: '1991-08-03', GioiTinh: 'Nữ', Email: 'buithilan@example.com', DaiDienDoanhNghiep: 1, TenTaiKhoan: 'buithilan', MatKhau: 'lan123' },
      { ID: 'KH000008', Ten: 'Võ Ngọc Hân', SDT: '0908901234', NgaySinh: '1996-11-30', GioiTinh: 'Nữ', Email: 'vongochan@example.com', DaiDienDoanhNghiep: 1, TenTaiKhoan: 'vongochan', MatKhau: 'ngochan123' },
      { ID: 'KH000009', Ten: 'Hoàng Minh Chiến', SDT: '0909012345', NgaySinh: '1989-12-05', GioiTinh: 'Nam', Email: 'hoangminhchien@example.com', DaiDienDoanhNghiep: 0, TenTaiKhoan: 'hoangminhchien', MatKhau: 'chien123' },
      { ID: 'KH000010', Ten: 'Lê Thị Thanh', SDT: '0900123456', NgaySinh: '1994-05-18', GioiTinh: 'Nữ', Email: 'lethithanh@example.com', DaiDienDoanhNghiep: 1, TenTaiKhoan: 'lethithanh', MatKhau: 'thanh123' }
    ];

    const chiNhanh = [
        { MaChiNhanh: '00001', ThoiGianBatDau: '07:00', ThoiGianKetThuc: '17:00', Ten: 'Chi nhánh Hà Nội', SDT: '024-12345678', DiaChi: 'Số 123, Phố Lê Duẩn, Quận Hoàn Kiếm, Hà Nội' },
        { MaChiNhanh: '00002', ThoiGianBatDau: '07:00', ThoiGianKetThuc: '17:30', Ten: 'Chi nhánh TP.HCM', SDT: '028-87654321', DiaChi: 'Số 456, Đường Nguyễn Thị Minh Khai, Quận 1, TP.HCM' },
        { MaChiNhanh: '00003', ThoiGianBatDau: '07:30', ThoiGianKetThuc: '18:00', Ten: 'Chi nhánh Đà Nẵng', SDT: '0236-11223344', DiaChi: 'Số 789, Đường Hùng Vương, Quận Hải Châu, Đà Nẵng' },
        { MaChiNhanh: '00004', ThoiGianBatDau: '08:00', ThoiGianKetThuc: '18:30', Ten: 'Chi nhánh Hải Phòng', SDT: '0225-44556677', DiaChi: 'Số 321, Phố Trần Phú, Quận Ngô Quyền, Hải Phòng' },
        { MaChiNhanh: '00005', ThoiGianBatDau: '08:00', ThoiGianKetThuc: '17:00', Ten: 'Chi nhánh Cần Thơ', SDT: '0292-99887766', DiaChi: 'Số 654, Đường Lê Lợi, Quận Ninh Kiều, Cần Thơ' }
    ];

    const nhaCungCap = [
        { MaNhaCungCap: 'NCC0001', TenNhaCungCap: 'Công ty ABC', DiaChi: 'Số 100, Đường Lê Lợi, Quận 1, TP.HCM', SDT: '0901122333' },
        { MaNhaCungCap: 'NCC0002', TenNhaCungCap: 'Công ty XYZ', DiaChi: 'Số 200, Đường Nguyễn Thị Minh Khai, Quận 3, TP.HCM', SDT: '0902233444' },
        { MaNhaCungCap: 'NCC0003', TenNhaCungCap: 'Công ty 123', DiaChi: 'Số 300, Đường Trần Phú, Quận 5, TP.HCM', SDT: '0903344555' },
        { MaNhaCungCap: 'NCC0004', TenNhaCungCap: 'Công ty DEF', DiaChi: 'Số 400, Đường Lý Thường Kiệt, Quận 10, TP.HCM', SDT: '0904455666' },
        { MaNhaCungCap: 'NCC0005', TenNhaCungCap: 'Công ty GHI', DiaChi: 'Số 500, Đường Hoàng Văn Thụ, Quận Tân Bình, TP.HCM', SDT: '0905566777' }
    ];
      
    const sanPham = [
      { MaSanPham: 'DC000001', Ten: 'Bút bi Thiên Long', GiaBan: 4000, GiaVonTrungBinh: 3500, NhaCungCap: 'NCC0001', TinhTrang: 'Còn hàng', LoaiSanPham: 'Dụng cụ học tập' },
      { MaSanPham: 'DC000002', Ten: 'Vở', GiaBan: 10000, GiaVonTrungBinh: 8500, NhaCungCap: 'NCC0001', TinhTrang: 'Đang nhập thêm', LoaiSanPham: 'Dụng cụ học tập'},
      { MaSanPham: 'DC000003', Ten: 'Cặp sách da', GiaBan: 500000, GiaVonTrungBinh: 450000, NhaCungCap: 'NCC0002', TinhTrang: 'Còn hàng', LoaiSanPham: 'Dụng cụ học tập'},
      { MaSanPham: 'DC000004', Ten: 'Bút lông màu', GiaBan: 20000, GiaVonTrungBinh: 18000, NhaCungCap: 'NCC0004', TinhTrang: 'Còn hàng', LoaiSanPham: 'Dụng cụ học tập'},
      { MaSanPham: 'DC000005', Ten: 'Bảng con', GiaBan: 30000, GiaVonTrungBinh: 25000, NhaCungCap: 'NCC0005', TinhTrang: 'Hết hàng', LoaiSanPham: 'Dụng cụ học tập'},
      { MaSanPham: 'DC000006', Ten: 'Kéo cắt giấy', GiaBan: 20000, GiaVonTrungBinh: 18000, NhaCungCap: 'NCC0003', TinhTrang: 'Còn hàng', LoaiSanPham: 'Dụng cụ học tập'},

      { MaSanPham: 'SC000001', Ten: 'Toán học 12', GiaBan: 50000, GiaVonTrungBinh: 45000, NhaCungCap: 'NCC0002', TinhTrang: 'Hết hàng', LoaiSanPham: 'Sách'},
      { MaSanPham: 'SC000002', Ten: 'Vật lý 10', GiaBan: 60000, GiaVonTrungBinh: 55000, NhaCungCap: 'NCC0003', TinhTrang: 'Nghỉ bán', LoaiSanPham: 'Sách' },
      { MaSanPham: 'SC000003', Ten: 'Putin bàn bên thỉnh thoảng trêu ghẹo tôi bằng tiếng hạt nhân', GiaBan: 70000, GiaVonTrungBinh: 65000, NhaCungCap: 'NCC0004', TinhTrang: 'Còn hàng', LoaiSanPham: 'Sách'},
      { MaSanPham: 'SC000004', Ten: 'Bí kíp không làm mà có ăn', GiaBan: 80000, GiaVonTrungBinh: 75000, NhaCungCap: 'NCC0001', TinhTrang: 'Còn hàng', LoaiSanPham: 'Sách'},
      { MaSanPham: 'SC000005', Ten: 'PickleBall cho người mới bắt đầu', GiaBan: 90000, GiaVonTrungBinh: 85000, NhaCungCap: 'NCC0003', TinhTrang: 'Còn hàng', LoaiSanPham: 'Sách'},
      { MaSanPham: 'SC000006', Ten: 'Cypher: Cách để trở thành bài thủ chuyên nghiệp', GiaBan: 100000, GiaVonTrungBinh: 95000, NhaCungCap: 'NCC0005', TinhTrang: 'Còn hàng', LoaiSanPham: 'Sách'},

      { MaSanPham: 'PK000001', Ten: 'Bìa sách', GiaBan: 10000, GiaVonTrungBinh: 8000, NhaCungCap: 'NCC0001', TinhTrang: 'Còn hàng', LoaiSanPham: 'Phụ kiện sách'},
      { MaSanPham: 'PK000002', Ten: 'Dây đeo sách', GiaBan: 15000, GiaVonTrungBinh: 12000, NhaCungCap: 'NCC0003', TinhTrang: 'Hết hàng', LoaiSanPham: 'Phụ kiện sách'},
      { MaSanPham: 'PK000003', Ten: 'Kẹp sách', GiaBan: 5000, GiaVonTrungBinh: 4000, NhaCungCap: 'NCC0002', TinhTrang: 'Đang nhập thêm', LoaiSanPham: 'Phụ kiện sách'},
      { MaSanPham: 'PK000004', Ten: 'Sổ tay', GiaBan: 25000, GiaVonTrungBinh: 20000, NhaCungCap: 'NCC0005', TinhTrang: 'Còn hàng', LoaiSanPham: 'Phụ kiện sách'},
      { MaSanPham: 'PK000005', Ten: 'Bút dạ quang', GiaBan: 20000, GiaVonTrungBinh: 17000, NhaCungCap: 'NCC0004', TinhTrang: 'Hết hàng', LoaiSanPham: 'Phụ kiện sách'},
      { MaSanPham: 'PK000006', Ten: 'Kẹp giấy', GiaBan: 5000, GiaVonTrungBinh: 4000, NhaCungCap: 'NCC0004', TinhTrang: 'Nghỉ bán', LoaiSanPham: 'Phụ kiện sách'}
  ];
  
  const dungCuHocTap = [
      { MaSanPham: 'DC000001', MauSac: 'Xanh', Loai: 'Bút bi', Size: '15cm' },
      { MaSanPham: 'DC000002', MauSac: 'Trắng', Loai: 'Vở', Size: 'A5' },
      { MaSanPham: 'DC000003', MauSac: 'Nâu', Loai: 'Cặp sách', Size: '30x40 cm' },
      { MaSanPham: 'DC000004', MauSac: 'Đỏ', Loai: 'Bút lông màu', Size: '10cm' },
      { MaSanPham: 'DC000005', MauSac: 'Đen', Loai: 'Bảng con', Size: '20x30 cm' },
      { MaSanPham: 'DC000006', MauSac: 'Vàng', Loai: 'Kéo cắt giấy', Size: '20cm' }
  ];
          
  const sach = [
      { MaSanPham: 'SC000001', TheLoai: 'Sách giáo khoa', NhaXuatBan: 'NXB Giáo dục', NgayPhatHanh: '2021-09-01', TacGia: 'Nguyễn Quang Hùng', NguoiDich: 'N/A', DinhDang: 'Bìa mềm', Size: 'A4', SoTrang: 180 },
      { MaSanPham: 'SC000002', TheLoai: 'Sách giáo khoa', NhaXuatBan: 'NXB Khoa học và Kỹ thuật', NgayPhatHanh: '2020-12-15', TacGia: 'David Halliday', NguoiDich: 'Hoàng Minh Đức', DinhDang: 'Bìa cứng', Size: 'A5', SoTrang: 400 },
      { MaSanPham: 'SC000003', TheLoai: 'Tiểu thuyết', NhaXuatBan: 'NXB Văn học', NgayPhatHanh: '2021-06-20', TacGia: 'V.V Putin', NguoiDich: 'Nguyễn Thị Hằng', DanhGia: 4.7, DinhDang: 'Bìa mềm', Size: 'A5', SoTrang: 320 },
      { MaSanPham: 'SC000004', TheLoai: 'Sách hướng dẫn', NhaXuatBan: 'NXB Thanh Niên', NgayPhatHanh: '2020-11-10', TacGia: 'Nguyễn Cao Tuấn', NguoiDich: 'Phạm Quỳnh Anh', DinhDang: 'Bìa mềm', Size: 'A5', SoTrang: 280 },
      { MaSanPham: 'SC000005', TheLoai: 'Sách hướng dẫn', NhaXuatBan: 'NXB Thanh Niên', NgayPhatHanh: '2019-03-25', TacGia: 'J.R.R. Tolkien', NguoiDich: 'Nguyễn Quang Duy', DinhDang: 'Bìa cứng', Size: 'A4', SoTrang: 350 },
      { MaSanPham: 'SC000006', TheLoai: 'Tiểu thuyết', NhaXuatBan: 'NXB Thanh Niên', NgayPhatHanh: '2018-05-15', TacGia: 'Isaac Asimov', NguoiDich: 'Nguyễn Đức Lợi', DinhDang: 'Bìa cứng', Size: 'A5', SoTrang: 500 },
  ];
          
          
  const phuKienSach = [
      { MaSanPham: 'PK000001', MoTa: 'Bìa sách bảo vệ', CongDung: 'Bảo vệ sách', MauSac: 'Đỏ' },
      { MaSanPham: 'PK000002', MoTa: 'Dây đeo sách ', CongDung: 'Đeo sách dễ dàng', MauSac: 'Xanh' },
      { MaSanPham: 'PK000003', MoTa: 'Kẹp sách ', CongDung: 'Giữ sách không bị rơi', MauSac: 'Vàng' },
      { MaSanPham: 'PK000004', MoTa: 'Sổ tay học sinh', CongDung: 'Ghi chép', MauSac: 'Đen' },
      { MaSanPham: 'PK000005', MoTa: 'Bút dạ quang ', CongDung: 'Vẽ và đánh dấu', MauSac: 'Cam' },
      { MaSanPham: 'PK000006', MoTa: 'Kẹp giấy văn phòng', CongDung: 'Giữ giấy gọn gàng', MauSac: 'Đỏ' }
    ];

    const employees = [
      { Ten: 'Nguyễn Thành An', LoaiNhanVien: 'Bán thời gian', HeSoLuong: 2.5, GioiTinh: 'Nam', ChucVu: 'Quản lý', NgaySinh: '1995-06-15', MaNhanVienQuanLy: 'NV000002', MaChiNhanh: '00001' },
      { Ten: 'Trần Bình Lực', LoaiNhanVien: 'Toàn thời gian', HeSoLuong: 1.2, GioiTinh: 'Nam', ChucVu: 'Nhân viên', NgaySinh: '1994-08-12', MaNhanVienQuanLy: 'NV000005', MaNhanVienBiQuanLy: 'NV000001', MaChiNhanh: '00002' },
      { Ten: 'Lê Cường', LoaiNhanVien: 'Bán thời gian', HeSoLuong: 1.3, GioiTinh: 'Nam', ChucVu: 'Quản lý', NgaySinh: '1993-11-20', MaNhanVienQuanLy: 'NV000008', MaChiNhanh: '00003'},
      { Ten: 'Phạm Duy', LoaiNhanVien: 'Bán thời gian', HeSoLuong: 1.1, GioiTinh: 'Nam', ChucVu: 'Nhân viên', NgaySinh: '1992-09-10', MaNhanVienQuanLy: 'NV000008', MaNhanVienBiQuanLy: 'NV000003', MaChiNhanh: '00004'},
      { Ten: 'Đỗ Hiếu', LoaiNhanVien: 'Toàn thời gian', HeSoLuong: 1.0, GioiTinh: 'Nam', ChucVu: 'Bảo vệ', NgaySinh: '1995-05-25', MaNhanVienBiQuanLy: 'NV000002', MaChiNhanh: '00005'},
      { Ten: 'Ngô Thành Hân', LoaiNhanVien: 'Bán thời gian', HeSoLuong: 1.2, GioiTinh: 'Nam', ChucVu: 'Nhân viên', NgaySinh: '1994-07-13', MaNhanVienQuanLy: 'NV000010', MaNhanVienBiQuanLy: 'NV000007', MaChiNhanh: '00001'},
      { Ten: 'Bùi Giang', LoaiNhanVien: 'Toàn thời gian', HeSoLuong: 1.1, GioiTinh: 'Nam', ChucVu: 'Quản lý', NgaySinh: '1993-02-05', MaNhanVienQuanLy: 'NV000006', MaNhanVienBiQuanLy: 'NV000001', MaChiNhanh: '00002'},
      { Ten: 'Võ Hà', LoaiNhanVien: 'Bán thời gian', HeSoLuong: 1.3, GioiTinh: 'Nữ', ChucVu: 'Bảo vệ', NgaySinh: '1996-01-30', MaNhanVienBiQuanLy: 'NV000003', MaChiNhanh: '00003'},
      { Ten: 'Hoàng Yến', LoaiNhanVien: 'Toàn thời gian', HeSoLuong: 1.0, GioiTinh: 'Nữ', ChucVu: 'Nhân viên', NgaySinh: '1994-12-05', MaNhanVienBiQuanLy: 'NV000002', MaChiNhanh: '00004'},
      { Ten: 'Lê Quang', LoaiNhanVien: 'Toàn thời gian', HeSoLuong: 1.2, GioiTinh: 'Nam', ChucVu: 'Nhân viên', NgaySinh: '1992-10-22', MaNhanVienBiQuanLy: 'NV000006', MaChiNhanh: '00005'}
    ];

    const salaryRecords = [
        { IDNhanVien: 'NV000001', ThoiGianLamViec: 160, ThangVaNam: '2024-01', TongLuong: 8000000, ThuongThem: 500000, IDNhanVienCapNhat: 'NV000007', ThoiGianCapNhat: '2024-01-31 17:00:00' },
        { IDNhanVien: 'NV000002', ThoiGianLamViec: 150, ThangVaNam: '2024-01', TongLuong: 7500000, ThuongThem: 400000, IDNhanVienCapNhat: 'NV000003', ThoiGianCapNhat: '2024-01-31 17:00:00' },
        { IDNhanVien: 'NV000003', ThoiGianLamViec: 170, ThangVaNam: '2024-02', TongLuong: 8200000, ThuongThem: 600000, IDNhanVienCapNhat: 'NV000001', ThoiGianCapNhat: '2024-02-28 17:00:00' },
        { IDNhanVien: 'NV000004', ThoiGianLamViec: 160, ThangVaNam: '2024-02', TongLuong: 7000000, ThuongThem: 300000, IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-02-28 17:00:00' },
        { IDNhanVien: 'NV000005', ThoiGianLamViec: 150, ThangVaNam: '2024-03', TongLuong: 8000000, ThuongThem: 400000, IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-03-31 17:00:00' },
        { IDNhanVien: 'NV000006', ThoiGianLamViec: 160, ThangVaNam: '2024-03', TongLuong: 7600000, ThuongThem: 300000, IDNhanVienCapNhat: 'NV000003', ThoiGianCapNhat: '2024-03-31 17:00:00' },
        { IDNhanVien: 'NV000007', ThoiGianLamViec: 155, ThangVaNam: '2024-04', TongLuong: 8100000, ThuongThem: 500000, IDNhanVienCapNhat: 'NV000003', ThoiGianCapNhat: '2024-04-30 17:00:00' },
        { IDNhanVien: 'NV000008', ThoiGianLamViec: 145, ThangVaNam: '2024-04', TongLuong: 7300000, ThuongThem: 200000, IDNhanVienCapNhat: 'NV000001', ThoiGianCapNhat: '2024-04-30 17:00:00' },
        { IDNhanVien: 'NV000009', ThoiGianLamViec: 160, ThangVaNam: '2024-05', TongLuong: 8000000, ThuongThem: 400000, IDNhanVienCapNhat: 'NV000003', ThoiGianCapNhat: '2024-05-31 17:00:00' },
        { IDNhanVien: 'NV000010', ThoiGianLamViec: 165, ThangVaNam: '2024-05', TongLuong: 7700000, ThuongThem: 300000, IDNhanVienCapNhat: 'NV000007', ThoiGianCapNhat: '2024-05-31 17:00:00' }
    ];
    
    
    const deliveryAddresses = [
        { MaDiaChi: 'DC000001', MaKhachHang: 'KH000001', DiaChi: 'Số 12, Đường Nguyễn Thị Minh Khai, Quận 1, TP.HCM', IDNhanVienCapNhat: 'NV000001', ThoiGianCapNhat: '2024-01-15 14:30:00' },
        { MaDiaChi: 'DC000002', MaKhachHang: 'KH000001', DiaChi: 'Số 45, Đường Lê Lai, Quận 5, TP.HCM', IDNhanVienCapNhat: 'NV000001', ThoiGianCapNhat: '2024-02-20 09:00:00' },
        { MaDiaChi: 'DC000003', MaKhachHang: 'KH000002', DiaChi: 'Số 78, Đường Nguyễn Hữu Cảnh, Quận Bình Thạnh, TP.HCM', IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-03-10 16:15:00' },
        { MaDiaChi: 'DC000004', MaKhachHang: 'KH000002', DiaChi: 'Số 23, Đường Hai Bà Trưng, Quận 3, TP.HCM', IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-04-25 11:45:00' },
        { MaDiaChi: 'DC000005', MaKhachHang: 'KH000003', DiaChi: 'Số 56, Đường Phan Đình Phùng, Quận Phú Nhuận, TP.HCM', IDNhanVienCapNhat: 'NV000003', ThoiGianCapNhat: '2024-05-12 10:30:00' },
        { MaDiaChi: 'DC000006', MaKhachHang: 'KH000003', DiaChi: 'Số 89, Đường Nguyễn Văn Cừ, Quận 5, TP.HCM', IDNhanVienCapNhat: 'NV000003', ThoiGianCapNhat: '2024-06-15 13:00:00' },
        { MaDiaChi: 'DC000007', MaKhachHang: 'KH000004', DiaChi: 'Số 34, Đường Cộng Hòa, Quận Tân Bình, TP.HCM', IDNhanVienCapNhat: 'NV000004', ThoiGianCapNhat: '2024-07-01 15:00:00' },
        { MaDiaChi: 'DC000008', MaKhachHang: 'KH000004', DiaChi: 'Số 78, Đường Lý Thường Kiệt, Quận 10, TP.HCM', IDNhanVienCapNhat: 'NV000004', ThoiGianCapNhat: '2024-08-10 14:30:00' },
        { MaDiaChi: 'DC000009', MaKhachHang: 'KH000005', DiaChi: 'Số 56, Đường Nguyễn Tất Thành, Quận 4, TP.HCM', IDNhanVienCapNhat: 'NV000005', ThoiGianCapNhat: '2024-09-10 09:30:00' },
        { MaDiaChi: 'DC000010', MaKhachHang: 'KH000005', DiaChi: 'Số 23, Đường Trần Hưng Đạo, Quận 1, TP.HCM', IDNhanVienCapNhat: 'NV000005', ThoiGianCapNhat: '2024-10-15 16:00:00' },
        { MaDiaChi: 'DC000011', MaKhachHang: 'KH000006', DiaChi: 'Số 12, Đường Xô Viết Nghệ Tĩnh, Quận Bình Thạnh, TP.HCM', IDNhanVienCapNhat: 'NV000006', ThoiGianCapNhat: '2024-11-01 14:30:00' },
        { MaDiaChi: 'DC000012', MaKhachHang: 'KH000006', DiaChi: 'Số 8, Đường Đinh Tiên Hoàng, Quận 1, TP.HCM', IDNhanVienCapNhat: 'NV000006', ThoiGianCapNhat: '2024-11-10 17:00:00' },
        { MaDiaChi: 'DC000013', MaKhachHang: 'KH000007', DiaChi: 'Số 14, Đường Trường Chinh, Quận 12, TP.HCM', IDNhanVienCapNhat: 'NV000007', ThoiGianCapNhat: '2024-12-01 10:00:00' },
        { MaDiaChi: 'DC000014', MaKhachHang: 'KH000007', DiaChi: 'Số 56, Đường Nguyễn Trãi, Quận 5, TP.HCM', IDNhanVienCapNhat: 'NV000007', ThoiGianCapNhat: '2024-12-05 15:30:00' },
        { MaDiaChi: 'DC000015', MaKhachHang: 'KH000008', DiaChi: 'Số 67, Đường Cách Mạng Tháng 8, Quận 10, TP.HCM', IDNhanVienCapNhat: 'NV000008', ThoiGianCapNhat: '2024-12-10 16:30:00' },
        { MaDiaChi: 'DC000016', MaKhachHang: 'KH000008', DiaChi: 'Số 102, Đường Lê Lợi, Quận 1, TP.HCM', IDNhanVienCapNhat: 'NV000008', ThoiGianCapNhat: '2024-12-15 09:00:00' },
        { MaDiaChi: 'DC000017', MaKhachHang: 'KH000009', DiaChi: 'Số 15, Đường Nguyễn Bỉnh Khiêm, Quận 1, TP.HCM', IDNhanVienCapNhat: 'NV000009', ThoiGianCapNhat: '2024-12-18 11:00:00' },
        { MaDiaChi: 'DC000018', MaKhachHang: 'KH000009', DiaChi: 'Số 78, Đường Hồng Bàng, Quận 5, TP.HCM', IDNhanVienCapNhat: 'NV000009', ThoiGianCapNhat: '2024-12-20 10:00:00' },
        { MaDiaChi: 'DC000019', MaKhachHang: 'KH000010', DiaChi: 'Số 23, Đường Lý Tự Trọng, Quận 1, TP.HCM', IDNhanVienCapNhat: 'NV000010', ThoiGianCapNhat: '2024-12-22 14:30:00' },
        { MaDiaChi: 'DC000020', MaKhachHang: 'KH000010', DiaChi: 'Số 88, Đường Tôn Đức Thắng, Quận 3, TP.HCM', IDNhanVienCapNhat: 'NV000010', ThoiGianCapNhat: '2024-12-25 13:00:00' }
    ];
    

    const Vouchers = [
        { Code: 'VO000001', SoLanApDungToiDa: 3, TiLeGiam: 0.30, GiaTriGiam: 50000, NgayBatDau: '2024-01-01', NgayKetThuc: '2024-01-31' },
        { Code: 'VO000002', SoLanApDungToiDa: 2, TiLeGiam: 0.40, GiaTriGiam: 30000, NgayBatDau: '2024-02-01', NgayKetThuc: '2024-02-28' },
        { Code: 'VO000003', SoLanApDungToiDa: 1, TiLeGiam: 0.30, GiaTriGiam: 40000, NgayBatDau: '2024-03-01', NgayKetThuc: '2024-03-31' },
        { Code: 'VO000004', SoLanApDungToiDa: 5, TiLeGiam: 0.30, GiaTriGiam: 60000, NgayBatDau: '2024-04-01', NgayKetThuc: '2024-04-30' },
        { Code: 'VO000005', SoLanApDungToiDa: 3, TiLeGiam: 0.40, GiaTriGiam: 70000, NgayBatDau: '2024-05-01', NgayKetThuc: '2024-05-31' }
    ];
    
    const hoaDonNhapHang = [
        { IDHoaDon: 100001, GhiChu: 'Nhập sách học tập', ThueNhap: 50, ThoiGian: '2024-01-10 08:30:00', GiaTong: 5000000, TongGiaVon: 4500000, MaNhanVienPhuTrach: 'NV000001', MaNhaCungCap: 'NCC0001', MaChiNhanhNhanHang: '00001' },
        { IDHoaDon: 100002, GhiChu: 'Mua sách giáo khoa', ThueNhap: 30, ThoiGian: '2024-02-05 14:00:00', GiaTong: 3000000, TongGiaVon: 2700000, MaNhanVienPhuTrach: 'NV000001', MaNhaCungCap: 'NCC0002', MaChiNhanhNhanHang: '00002' },
        { IDHoaDon: 100003, GhiChu: 'Mua dụng cụ học tập', ThueNhap: 40, ThoiGian: '2024-03-15 10:00:00', GiaTong: 4000000, TongGiaVon: 3600000, MaNhanVienPhuTrach: 'NV000003', MaNhaCungCap: 'NCC0003', MaChiNhanhNhanHang: '00003' },
        { IDHoaDon: 100004, GhiChu: 'Nhập sách nghiên cứu', ThueNhap: 60, ThoiGian: '2024-04-10 09:30:00', GiaTong: 6000000, TongGiaVon: 5400000, MaNhanVienPhuTrach: 'NV000007', MaNhaCungCap: 'NCC0004', MaChiNhanhNhanHang: '00004' },
        { IDHoaDon: 100005, GhiChu: 'Mua sách tham khảo cho học sinh', ThueNhap: 20, ThoiGian: '2024-05-18 11:15:00', GiaTong: 2000000, TongGiaVon: 1800000, MaNhanVienPhuTrach: 'NV000001', MaNhaCungCap: 'NCC0005', MaChiNhanhNhanHang: '00005' },
        { IDHoaDon: 100006, GhiChu: 'Mua phụ kiện sách', ThueNhap: 70, ThoiGian: '2024-06-12 16:45:00', GiaTong: 7000000, TongGiaVon: 6300000, MaNhanVienPhuTrach: 'NV000007', MaNhaCungCap: 'NCC0001', MaChiNhanhNhanHang: '00001' },
        { IDHoaDon: 100007, GhiChu: 'Đặt sách học từ xa', ThueNhap: 80, ThoiGian: '2024-07-20 13:00:00', GiaTong: 8000000, TongGiaVon: 7200000, MaNhanVienPhuTrach: 'NV000003', MaNhaCungCap: 'NCC0002', MaChiNhanhNhanHang: '00002' },
        { IDHoaDon: 100008, GhiChu: 'Nhập dụng cụ học tập cho học sinh', ThueNhap: 25, ThoiGian: '2024-08-05 10:30:00', GiaTong: 2500000, TongGiaVon: 2250000, MaNhanVienPhuTrach: 'NV000001', MaNhaCungCap: 'NCC0003', MaChiNhanhNhanHang: '00003' },
        { IDHoaDon: 100009, GhiChu: 'Mua sách giáo khoa', ThueNhap: 15, ThoiGian: '2024-09-07 09:15:00', GiaTong: 1500000, TongGiaVon: 1350000, MaNhanVienPhuTrach: 'NV000003', MaNhaCungCap: 'NCC0004', MaChiNhanhNhanHang: '00004' },
        { IDHoaDon: 100010, GhiChu: 'Nhập sách chuyên ngành', ThueNhap: 50, ThoiGian: '2024-10-12 14:00:00', GiaTong: 5000000, TongGiaVon: 4500000, MaNhanVienPhuTrach: 'NV000007', MaNhaCungCap: 'NCC0005', MaChiNhanhNhanHang: '00005' },
        { IDHoaDon: 100011, GhiChu: 'Mua sách cho thư viện', ThueNhap: 90, ThoiGian: '2024-11-02 15:00:00', GiaTong: 9000000, TongGiaVon: 8100000, MaNhanVienPhuTrach: 'NV000003', MaNhaCungCap: 'NCC0001', MaChiNhanhNhanHang: '00001' },
        { IDHoaDon: 100012, GhiChu: 'Mua phụ kiện sách cho học sinh', ThueNhap: 45, ThoiGian: '2024-12-01 11:30:00', GiaTong: 4500000, TongGiaVon: 4050000, MaNhanVienPhuTrach: 'NV000001', MaNhaCungCap: 'NCC0002', MaChiNhanhNhanHang: '00002' }
    ];
    
    const hoaDonBanHang = [
        { 
            MaHoaDon: 200001, 
            GhiChu: 'Bán sách giáo khoa lớp 10', 
            HinhThucThanhToan: 'Chuyển khoản', 
            TrangThai: 'Đã thanh toán', 
            DiaChi: 'Số 123, Phố Lê Duẩn, Quận Hoàn Kiếm, Hà Nội', 
            GiaTong: 1500000, 
            MaKhachHang: 'KH000001', 
            MaNhanVienPhuTrach: 'NV000001', 
            MaChiNhanhIn: '00001', 
            NgayTaoDon: '2024-12-01 10:00:00', 
            ThanhTien: 1500000, 
            MaVoucher: 'VO000001'
        },
        { 
            MaHoaDon: 200002, 
            GhiChu: 'Bán sách tham khảo toán học', 
            HinhThucThanhToan: 'Tiền mặt', 
            TrangThai: 'Chưa thanh toán', 
            DiaChi: 'Số 456, Đường Nguyễn Thị Minh Khai, Quận 3, TP.HCM', 
            GiaTong: 1200000, 
            MaKhachHang: 'KH000002', 
            MaNhanVienPhuTrach: 'NV000002', 
            MaChiNhanhIn: '00002', 
            NgayTaoDon: '2024-12-02 14:30:00', 
            ThanhTien: 1200000, 
            MaVoucher: 'VO000002'
        },
        { 
            MaHoaDon: 200003,  
            GhiChu: 'Bán bộ phụ kiện sách và dụng cụ học tập', 
            HinhThucThanhToan: 'Chuyển khoản', 
            TrangThai: 'Đã thanh toán', 
            DiaChi: 'Số 789, Đường Trần Phú, Quận 5, TP.HCM', 
            GiaTong: 2500000, 
            MaKhachHang: 'KH000003', 
            MaNhanVienPhuTrach: 'NV000003', 
            MaChiNhanhIn: '00003', 
            NgayTaoDon: '2024-12-03 09:00:00', 
            ThanhTien: 2500000, 
            MaVoucher: 'VO000003'
        },
        { 
            MaHoaDon: 200004,   
            GhiChu: 'Bán sách giáo khoa lớp 12', 
            HinhThucThanhToan: 'Tiền mặt', 
            TrangThai: 'Chưa thanh toán', 
            DiaChi: 'Số 321, Đường Lý Thường Kiệt, Quận 10, TP.HCM', 
            GiaTong: 1800000, 
            MaKhachHang: 'KH000004', 
            MaNhanVienPhuTrach: 'NV000004', 
            MaChiNhanhIn: '00004', 
            NgayTaoDon: '2024-12-04 11:00:00', 
            ThanhTien: 1800000, 
            MaVoucher: 'VO000004'
        },
        { 
            MaHoaDon: 200005,  
            GhiChu: 'Bán dụng cụ học tập cho học sinh lớp 8', 
            HinhThucThanhToan: 'Chuyển khoản', 
            TrangThai: 'Đã thanh toán', 
            DiaChi: 'Số 654, Đường Hoàng Văn Thụ, Quận Tân Bình, TP.HCM', 
            GiaTong: 2000000, 
            MaKhachHang: 'KH000005', 
            MaNhanVienPhuTrach: 'NV000007', 
            MaChiNhanhIn: '00005', 
            NgayTaoDon: '2024-12-05 15:30:00', 
            ThanhTien: 2000000, 
            MaVoucher: 'VO000005'
        }
    ];


    const gioHang = [
        { MaKhachHang: 'KH000001', MaSanPham: 'PK000004', SoLuong: 2 },
        { MaKhachHang: 'KH000002', MaSanPham: 'SC000005', SoLuong: 1 },
        { MaKhachHang: 'KH000002', MaSanPham: 'DC000006', SoLuong: 5 },
        { MaKhachHang: 'KH000003', MaSanPham: 'DC000006', SoLuong: 3 },
        { MaKhachHang: 'KH000004', MaSanPham: 'PK000003', SoLuong: 1 },
        { MaKhachHang: 'KH000004', MaSanPham: 'DC000002', SoLuong: 4 },
        { MaKhachHang: 'KH000005', MaSanPham: 'SC000004', SoLuong: 2 },
        { MaKhachHang: 'KH000005', MaSanPham: 'PK000006', SoLuong: 1 },
        { MaKhachHang: 'KH000006', MaSanPham: 'DC000006', SoLuong: 6 },
        { MaKhachHang: 'KH000006', MaSanPham: 'SC000004', SoLuong: 3 }
    ];
    

    const workShifts = [
        { MaNhanVien: 'NV000001', ThoiDiemBatDau: '2024-12-01 08:00:00', ThoiDiemKetThuc: '2024-12-01 17:00:00' },
        { MaNhanVien: 'NV000002', ThoiDiemBatDau: '2024-12-01 08:00:00', ThoiDiemKetThuc: '2024-12-01 17:00:00' },
        { MaNhanVien: 'NV000003', ThoiDiemBatDau: '2024-12-01 08:00:00', ThoiDiemKetThuc: '2024-12-01 17:00:00' },
        { MaNhanVien: 'NV000004', ThoiDiemBatDau: '2024-12-01 08:00:00', ThoiDiemKetThuc: '2024-12-01 17:00:00' },
        { MaNhanVien: 'NV000005', ThoiDiemBatDau: '2024-12-01 08:00:00', ThoiDiemKetThuc: '2024-12-01 17:00:00' }
    ];
    
    const reviews = [
        { MaSanPham: 'SC000001', MaKhachHang: 'KH000001', SoSao: 5, BinhLuan: 'Sản phẩm tuyệt vời!' },
        { MaSanPham: 'SC000006', MaKhachHang: 'KH000002', SoSao: 4, BinhLuan: 'Chất lượng tốt, giao hàng nhanh.' },
        { MaSanPham: 'SC000002', MaKhachHang: 'KH000003', SoSao: 3, BinhLuan: 'Sản phẩm ổn, nhưng cần cải thiện.' },
        { MaSanPham: 'SC000004', MaKhachHang: 'KH000004', SoSao: 2, BinhLuan: 'Không đúng như mong đợi.' },
        { MaSanPham: 'SC000005', MaKhachHang: 'KH000005', SoSao: 1, BinhLuan: 'Rất tệ, tôi sẽ không mua lại.' },
        { MaSanPham: 'SC000005', MaKhachHang: 'KH000006', SoSao: 5, BinhLuan: 'Sản phẩm tuyệt vời!' },
    ];
    
    const danhSachSanPhamNhap = [
        { MaHoaDon: 100001, MaSanPham: 'DC000006', SoLuong: 100, GiaNhap: 50000 },
        { MaHoaDon: 100002, MaSanPham: 'SC000003', SoLuong: 200, GiaNhap: 45000 },
        { MaHoaDon: 100003, MaSanPham: 'PK000001', SoLuong: 150, GiaNhap: 35000 },
        { MaHoaDon: 100004, MaSanPham: 'DC000004', SoLuong: 50, GiaNhap: 70000 },
        { MaHoaDon: 100005, MaSanPham: 'SC000005', SoLuong: 75, GiaNhap: 55000 },
        { MaHoaDon: 100006, MaSanPham: 'PK000006', SoLuong: 120, GiaNhap: 60000 },
        { MaHoaDon: 100007, MaSanPham: 'DC000002', SoLuong: 90, GiaNhap: 40000 },
        { MaHoaDon: 100008, MaSanPham: 'SC000006', SoLuong: 200, GiaNhap: 30000 },
        { MaHoaDon: 100009, MaSanPham: 'PK000001', SoLuong: 180, GiaNhap: 25000 },
        { MaHoaDon: 100010, MaSanPham: 'DC000001', SoLuong: 60, GiaNhap: 90000 }
    ];
    
    const danhSachSanPhamKho = [
        { MaChiNhanh: '00001', MaSanPham: 'SC000006', SoLuong: 50 },
        { MaChiNhanh: '00002', MaSanPham: 'PK000005', SoLuong: 30 },
        { MaChiNhanh: '00003', MaSanPham: 'DC000001', SoLuong: 70 },
        { MaChiNhanh: '00004', MaSanPham: 'PK000006', SoLuong: 40 },
        { MaChiNhanh: '00005', MaSanPham: 'DC000002', SoLuong: 120 },
        { MaChiNhanh: '00001', MaSanPham: 'SC000004', SoLuong: 80 },
        { MaChiNhanh: '00002', MaSanPham: 'DC000005', SoLuong: 90 },
        { MaChiNhanh: '00003', MaSanPham: 'PK000003', SoLuong: 100 },
        { MaChiNhanh: '00004', MaSanPham: 'SC000004', SoLuong: 150 },
        { MaChiNhanh: '00005', MaSanPham: 'SC000006', SoLuong: 60 },
        { MaChiNhanh: '00001', MaSanPham: 'PK000006', SoLuong: 110 },
    ];
    
    const danhSachSanPhamMua = [
        { MaHoaDon: 200001, MaSanPham: 'PK000006', SoLuong: 5, GiaKhiMua: 70000 },
        { MaHoaDon: 200002, MaSanPham: 'SC000002', SoLuong: 3, GiaKhiMua: 75000 },
        { MaHoaDon: 200003, MaSanPham: 'SC000001', SoLuong: 2, GiaKhiMua: 80000 },
        { MaHoaDon: 200004, MaSanPham: 'PK000004', SoLuong: 1, GiaKhiMua: 200000 },
        { MaHoaDon: 200005, MaSanPham: 'DC000003', SoLuong: 4, GiaKhiMua: 90000 },
        { MaHoaDon: 200001, MaSanPham: 'PK000004', SoLuong: 6, GiaKhiMua: 85000 },
        { MaHoaDon: 200002, MaSanPham: 'SC000001', SoLuong: 3, GiaKhiMua: 95000 },
        { MaHoaDon: 200003, MaSanPham: 'SC000005', SoLuong: 7, GiaKhiMua: 70000 },
        { MaHoaDon: 200004, MaSanPham: 'PK000002', SoLuong: 4, GiaKhiMua: 65000 },
        { MaHoaDon: 200005, MaSanPham: 'DC000004', SoLuong: 2, GiaKhiMua: 110000 }
    ];
    


    function generateSDT() {
      return '090' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    }

    function removeVietnameseTones(str) {
      const vietnameseMap = {
        'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
        'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
        'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
        'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
        'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
        'đ': 'd'
      };

      return str.split('').map(char => vietnameseMap[char] || char).join('');
    }

    function generateEmailAndPassword(name) {
      const nameWithoutTones = removeVietnameseTones(name).replace(/\s+/g, '').toLowerCase();
      const email = nameWithoutTones + '@example.com';

      const nameParts = nameWithoutTones.split('');
      const password = nameParts[0] + nameParts[1] + nameParts[2] + Math.floor(Math.random() * 1000);
      const userName = nameWithoutTones;
      return { email, password, userName };
    }

    
    async function addCustomer(customer) {
      const query = `INSERT INTO KhachHang (ID, Ten, SDT, NgaySinh, GioiTinh, Email, DaiDienDoanhNghiep, TenTaiKhoan, MatKhau) VALUES 
      ('${removeVietnameseTones(customer.ID)}', N'${customer.Ten}', '${customer.SDT}', '${customer.NgaySinh}', N'${customer.GioiTinh}',
      '${removeVietnameseTones(customer.Email)}', ${customer.DaiDienDoanhNghiep}, '${removeVietnameseTones(customer.TenTaiKhoan)}', '${customer.MatKhau}')`;

      try {
          await pool.request().query(query);
      } catch (error) {
          console.log('Lỗi khi thêm khách hàng: ', error);
      }
    }

    for (const customer of customers) {
      await addCustomer(customer);
    }

    async function addBranch(branch) {
      const query = `INSERT INTO ChiNhanh (MaChiNhanh, ThoiGianBatDau, ThoiGianKetThuc, Ten, SDT, DiaChi) VALUES
      ('${removeVietnameseTones(branch.MaChiNhanh)}', '${branch.ThoiGianBatDau}', '${branch.ThoiGianKetThuc}', N'${branch.Ten}', '${branch.SDT}', N'${branch.DiaChi}')`;

      try {
          await pool.request().query(query);
      } catch (error) {
          console.log('Lỗi khi thêm chi nhánh: ', error);
      }
    }

    for (const branch of chiNhanh) {
      await addBranch(branch);
    }

    async function addSupplier(supplier) {
      const query = `INSERT INTO NhaCungCap (MaNhaCungCap, TenNhaCungCap, DiaChi, SDT) VALUES
        ('${supplier.MaNhaCungCap}', N'${supplier.TenNhaCungCap}', N'${supplier.DiaChi}', '${supplier.SDT}')`;

      try {
          await pool.request().query(query);
      } catch (error) {
          console.log('Lỗi khi thêm nhà cung cấp: ', error);
      }
    }

    for (const supplier of nhaCungCap) {
      await addSupplier(supplier);
    }

    async function addProduct(sanPham, sach, dungCuHocTap, phuKienSach) {
      try {
        let request = pool.request();

        // Input parameters for SanPham
        request.input('MaSanPham', sql.VarChar(15), sanPham.MaSanPham);
        request.input('Ten', sql.NVarChar(100), sanPham.Ten);
        request.input('GiaBan', sql.Int, sanPham.GiaBan);
        request.input('GiaVonTrungBinh', sql.Decimal(18,2), sanPham.GiaVonTrungBinh);
        request.input('HinhAnh', sql.VarBinary(sql.MAX), null);
        request.input('NhaCungCap', sql.NVarChar(100), sanPham.NhaCungCap);
        request.input('TinhTrang', sql.NVarChar(50), sanPham.TinhTrang);
        request.input('LoaiSanPham', sql.NVarChar(35), sanPham.LoaiSanPham);

        // Input parameters for DungCuHocTap
        request.input('MauSac', sql.NVarChar(10), dungCuHocTap?.MauSac || null || phuKienSach?.MauSac);
        request.input('Loai', sql.NVarChar(20), dungCuHocTap?.Loai || null);
        request.input('Size', sql.NVarChar(10), dungCuHocTap?.Size || null || sach?.Size);

        // Input parameters for Sach
        request.input('TheLoai', sql.NVarChar(100), sach?.TheLoai || null);
        request.input('NhaXuatBan', sql.NVarChar(100), sach?.NhaXuatBan || null);
        request.input('NgayPhatHanh', sql.Date, sach?.NgayPhatHanh || null);
        request.input('TacGia', sql.NVarChar(100), sach?.TacGia || null);
        request.input('NguoiDich', sql.NVarChar(100), sach?.NguoiDich || null);
        request.input('DinhDang', sql.NVarChar(20), sach?.DinhDang || null);
        request.input('SoTrang', sql.Int, sach?.SoTrang || null);

        // Input parameters for PhuKienSach
        request.input('CongDung', sql.NVarChar(255), phuKienSach?.CongDung || null);
        request.input('MoTa', sql.NVarChar(255), phuKienSach?.MoTa || null);

        await request.execute('addProduct');
        // console.log(`Added product ${sanPham.MaSanPham}`);
      } catch (err) {
          console.error('Error adding product:', err);
      }
    }

    for (const product of sanPham) {
      await addProduct(product, sach.find(s => s.MaSanPham === product.MaSanPham), dungCuHocTap.find(d => d.MaSanPham === product.MaSanPham), phuKienSach.find(p => p.MaSanPham === product.MaSanPham));
    }

  // Thêm nhân viên
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    const { email, password, userName } = generateEmailAndPassword(employee.Ten);
    const sdt = generateSDT();
    const employeeID = `NV${(i + 1).toString().padStart(6, '0')}`;

    await pool.request()
        .input('ID', sql.VarChar, employeeID)
        .input('LoaiNhanVien', sql.NVarChar, employee.LoaiNhanVien)
        .input('HeSoLuong', sql.Decimal(18, 2), employee.HeSoLuong)
        .input('ChucVu', sql.NVarChar, employee.ChucVu)
        .input('SDT', sql.VarChar, sdt)
        .input('NgaySinh', sql.Date, employee.NgaySinh)
        .input('GioiTinh', sql.NVarChar, employee.GioiTinh)
        .input('Email', sql.VarChar, email)
        .input('Ten', sql.NVarChar, employee.Ten)
        .input('MatKhau', sql.VarChar, password)
        .input('TenTaiKhoan', sql.NVarChar, userName)
        .input('MaNhanVienQuanLy', sql.VarChar, employee.MaNhanVienQuanLy || null)
        .input('MaNhanVienBiQuanLy', sql.VarChar, employee.MaNhanVienBiQuanLy || null)
        .input('MaChiNhanhLamViec', sql.Int, employee.MaChiNhanh)
        .query(`
            INSERT INTO [dbo].[NhanVien] (
                [ID], [LoaiNhanVien], [ChucVu], [HeSoLuong], [SDT], 
                [NgaySinh], [GioiTinh], [Email], [Ten], [TenTaiKhoan], 
                [MatKhau], [MaNhanVienQuanLy], [MaNhanVienBiQuanLy], [MaChiNhanhLamViec]
            )
            VALUES (
                @ID, @LoaiNhanVien, @ChucVu, @HeSoLuong, @SDT, 
                @NgaySinh, @GioiTinh, @Email, @Ten, @TenTaiKhoan, 
                @MatKhau, @MaNhanVienQuanLy, @MaNhanVienBiQuanLy, @MaChiNhanhLamViec
            )
        `);
  }

  async function addVoucher(voucher) {
    const query = `
        INSERT INTO Voucher (Code, SoLanApDungToiDa, TiLeGiam, GiaTriGiam, NgayBatDau, NgayKetThuc)
        VALUES (
            '${voucher.Code}', ${voucher.SoLanApDungToiDa}, ${voucher.TiLeGiam}, ${voucher.GiaTriGiam}, 
            '${voucher.NgayBatDau}', '${voucher.NgayKetThuc}'
        )
    `;

    try {
        await pool.request().query(query);
    } catch (error) {
        console.log('Lỗi khi thêm voucher: ', error);
    }
  }
  for (const voucher of Vouchers) {
    await addVoucher(voucher);
  }


  async function addSalaryRecord(salaryRecord) {
    const query = `
      INSERT INTO BangLuong (IDNhanVien, ThoiGianLamViec, ThangVaNam, TongLuong, ThuongThem, IDNhanVienCapNhat, ThoiGianCapNhat)
      VALUES (
        '${salaryRecord.IDNhanVien}', ${salaryRecord.ThoiGianLamViec}, '${salaryRecord.ThangVaNam}', ${salaryRecord.TongLuong},
        ${salaryRecord.ThuongThem}, '${salaryRecord.IDNhanVienCapNhat}', '${salaryRecord.ThoiGianCapNhat}'
      )
    `;
    
    try {
      await pool.request().query(query);
    } catch (error) {
      console.log('Lỗi khi thêm bản ghi lương: ', error);
    }
  }

  async function addDeliveryAddress(deliveryAddress) {
    const query = `
      INSERT INTO DiaChiGiaoHang (MaKhachHang, DiaChi)
      VALUES (
        '${deliveryAddress.MaKhachHang}', N'${deliveryAddress.DiaChi}'
      )
    `;
    
    try {
      await pool.request().query(query);
    } catch (error) {
      console.log('Lỗi khi thêm địa chỉ giao hàng: ', error);
    }
  }

  for (const address of deliveryAddresses) {
    await addDeliveryAddress(address);
  }


  for (const record of salaryRecords) {
    await addSalaryRecord(record);
  }

  async function addProductToCart(cartItem) {
    const query = `INSERT INTO GioHang (MaKhachHang, MaSanPham, SoLuong) VALUES
        ('${cartItem.MaKhachHang}', '${cartItem.MaSanPham}', ${cartItem.SoLuong})`;

    try {
        await pool.request().query(query);
    } catch (error) {
        console.log('Lỗi khi thêm sản phẩm vào giỏ hàng: ', error);
    }
  }

  for (const cartItem of gioHang) {
    await addProductToCart(cartItem);
  }

  async function addWorkShift(workShift) {
    const query = `INSERT INTO CaLamViec (MaNhanVien, ThoiDiemBatDau, ThoiDiemKetThuc) VALUES
      ('${workShift.MaNhanVien}', '${workShift.ThoiDiemBatDau}', '${workShift.ThoiDiemKetThuc}')`;

    try {
        await pool.request().query(query);
    } catch (error) {
        console.log('Lỗi khi thêm ca làm việc: ', error);
    }
  }

  for (const workShift of workShifts) {
    await addWorkShift(workShift);
  }

    async function addReview(review) {
      const query = `INSERT INTO DanhGia (MaSanPham, MaKhachHang, SoSao, BinhLuan) VALUES
        ('${review.MaSanPham}', '${review.MaKhachHang}', ${review.SoSao}, N'${review.BinhLuan}')`;

      try {
          await pool.request().query(query);
      } catch (error) {
          console.log('Lỗi khi thêm đánh giá: ', error);
      }
    }

    for (const review of reviews) {
      await addReview(review);
    }

    async function addHoaDonBan(hoaDon) {
      const query = `INSERT INTO HoaDonBanHang (MaHoaDon, GhiChu, HinhThucThanhToan, TrangThai, DiaChi, GiaTong, MaKhachHang, MaNhanVienPhuTrach, MaChiNhanhIn, NgayTaoDon, ThanhTien, MaVoucher) 
      VALUES 
      ('${hoaDon.MaHoaDon}', N'${hoaDon.GhiChu}', N'${hoaDon.HinhThucThanhToan}', N'${hoaDon.TrangThai}', N'${hoaDon.DiaChi}', ${hoaDon.GiaTong}, '${hoaDon.MaKhachHang}', '${hoaDon.MaNhanVienPhuTrach}', '${hoaDon.MaChiNhanhIn}', '${hoaDon.NgayTaoDon}', ${hoaDon.ThanhTien}, '${hoaDon.MaVoucher}')`;

      try {
          await pool.request().query(query);
      } catch (error) {
          console.log('Lỗi khi thêm hóa đơn bán hàng: ', error);
      }
    }

    for (const hoaDon of hoaDonBanHang) {
      await addHoaDonBan(hoaDon);
    }

    async function addHoaDonNhap(hoaDon) {
      const query = `INSERT INTO HoaDonNhapHang (IDHoaDon, GhiChu, ThueNhap, ThoiGian, GiaTong, TongGiaVon, MaNhanVienPhuTrach, MaNhaCungCap, MaChiNhanhNhanHang) 
      VALUES 
      (${hoaDon.IDHoaDon}, N'${hoaDon.GhiChu}', ${hoaDon.ThueNhap}, '${hoaDon.ThoiGian}', ${hoaDon.GiaTong}, ${hoaDon.TongGiaVon}, '${hoaDon.MaNhanVienPhuTrach}', '${hoaDon.MaNhaCungCap}', '${hoaDon.MaChiNhanhNhanHang}')`;

      try {
          await pool.request().query(query);
      } catch (error) {
          console.log('Lỗi khi thêm hóa đơn nhập hàng: ', error);
      }
    }

    for (const hoaDon of hoaDonNhapHang) {
      await addHoaDonNhap(hoaDon);
    }

    async function addProductStock(stockItem) {
      const query = `INSERT INTO DanhSachSanPhamKho (MaChiNhanh, MaSanPham, SoLuong) VALUES
        ('${stockItem.MaChiNhanh}', '${stockItem.MaSanPham}', ${stockItem.SoLuong})`;

      try {
          await pool.request().query(query);
      } catch (error) {
          console.log('Lỗi khi thêm sản phẩm vào kho: ', error);
      }
    }

    for (const stockItem of danhSachSanPhamKho) {
      await addProductStock(stockItem);
    }

    async function addProductImport(product) {
      const query = `INSERT INTO DanhSachSanPhamNhap (MaHoaDon, MaSanPham, SoLuong, GiaNhap) VALUES
        (${product.MaHoaDon}, '${product.MaSanPham}', ${product.SoLuong}, ${product.GiaNhap})`;

      try {
          await pool.request().query(query);
      } catch (error) {
          console.log('Lỗi khi thêm sản phẩm nhập: ', error);
      }
    }

    for (const product of danhSachSanPhamNhap) {
      await addProductImport(product);
    }

  async function addProductPurchase(purchase) {
    const query = `INSERT INTO DanhSachSanPhamMua (MaHoaDon, MaSanPham, SoLuong, GiaKhiMua) VALUES
      (${purchase.MaHoaDon}, '${purchase.MaSanPham}', ${purchase.SoLuong}, ${purchase.GiaKhiMua})`;
    try {
        await pool.request().query(query);
    } catch (error) {
        console.log('Lỗi khi thêm sản phẩm mua: ', error);
    }
  }

  for (const purchase of danhSachSanPhamMua) {
    await addProductPurchase(purchase);
  }

  async function updateTotalHoaDon(maHoaDon) {
    try {
        const result = await pool.request()
            .input('MaHoaDon', sql.Int, maHoaDon)
            .query('SELECT dbo.TinhTongGiaTriHoaDon(@MaHoaDon) AS TongGiaTri');

        const tongGiaTri = result.recordset[0].TongGiaTri;

        await pool.request()
            .input('MaHoaDon', sql.Int, maHoaDon)
            .input('TongGiaTri', sql.Float, tongGiaTri)
            .query('UPDATE HoaDonBanHang SET ThanhTien = @TongGiaTri WHERE MaHoaDon = @MaHoaDon');

        // console.log(`Cập nhật thành công Tổng Giá Trị cho Hóa Đơn Mã ${maHoaDon}.`);
    } catch (error) {
        console.error('Lỗi khi cập nhật Tổng Giá Trị Hóa Đơn:', error);
    } 

  }
    for (const hoaDon of hoaDonBanHang) {
      await updateTotalHoaDon(hoaDon.MaHoaDon);
    }

  } catch (err) {
    console.error('Lỗi kết nối hoặc truy vấn:', err);
  } finally {
    sql.close();
  }
}

resetAndAddMultipleEmployeeData();
