const sql = require('mssql');
const dbConfig = require('./dbConfig');

async function resetAndAddMultipleEmployeeData() {
  try {
    const pool = await sql.connect(dbConfig);
    console.log('Kết nối thành công!');

    // Xóa tất cả dữ liệu cũ
    await pool.request().query('DELETE FROM [dbo].[DanhSachSanPhamMua]');
    await pool.request().query('DELETE FROM [dbo].[DanhSachSanPhamKho]');
    await pool.request().query('DELETE FROM [dbo].[DanhSachSanPhamNhap]');
    await pool.request().query('DELETE FROM [dbo].[DanhGia]');
    await pool.request().query('DELETE FROM [dbo].[GioHang]');
    await pool.request().query('DELETE FROM [dbo].[CaLamViec]');
    await pool.request().query('DELETE FROM [dbo].[HoaDonBanHang]');
    await pool.request().query('DELETE FROM [dbo].[HoaDonNhapHang]');
    await pool.request().query('DELETE FROM [dbo].[BangLuong]');
    await pool.request().query('DELETE FROM [dbo].[Voucher]');
    await pool.request().query('DELETE FROM [dbo].[NhanVien]');
    await pool.request().query('DELETE FROM [dbo].[KhachHang]');
    await pool.request().query('DELETE FROM [dbo].[ChiNhanh]');
    await pool.request().query('DELETE FROM [dbo].[NhaCungCap]');
    await pool.request().query('DELETE FROM [dbo].[SanPham]');
    await pool.request().query('DELETE FROM [dbo].[DungCuHocTap]');
    await pool.request().query('DELETE FROM [dbo].[Sach]');
    await pool.request().query('DELETE FROM [dbo].[PhuKienSach]');

    
    console.log('Tất cả dữ liệu đã được xóa!');

    const employees = [
      { Ten: 'Nguyễn Thành An', SoGioLam: 40, HeSoLuong: 2.5, Luong: 8000000, GioiTinh: 'Nam', ThoiGianBatDau: '2023-12-01 08:00:00', ChucVu: 'Quản lý', NgaySinh: '1995-06-15' },
      { Ten: 'Trần Bình Lực', SoGioLam: 38, HeSoLuong: 1.2, Luong: 7500000, GioiTinh: 'Nam', ThoiGianBatDau: '2023-12-01 08:00:00', ChucVu: 'Nhân viên', NgaySinh: '1994-08-12' },
      { Ten: 'Lê Cường', SoGioLam: 42, HeSoLuong: 1.3, Luong: 8200000, GioiTinh: 'Nam', ThoiGianBatDau: '2023-12-01 08:00:00', ChucVu: 'Nhân viên', NgaySinh: '1993-11-20' },
      { Ten: 'Phạm Duy', SoGioLam: 35, HeSoLuong: 1.1, Luong: 7000000, GioiTinh: 'Nam', ThoiGianBatDau: '2023-12-01 08:00:00', ChucVu: 'Nhân viên', NgaySinh: '1992-09-10' },
      { Ten: 'Đỗ Hiếu', SoGioLam: 40, HeSoLuong: 1.0, Luong: 8000000, GioiTinh: 'Nam', ThoiGianBatDau: '2023-12-01 08:00:00', ChucVu: 'Nhân viên', NgaySinh: '1995-05-25' },
      { Ten: 'Ngô Thành Hân', SoGioLam: 38, HeSoLuong: 1.2, Luong: 7600000, GioiTinh: 'Nam', ThoiGianBatDau: '2023-12-01 08:00:00', ChucVu: 'Nhân viên', NgaySinh: '1994-07-13' },
      { Ten: 'Bùi Giang', SoGioLam: 41, HeSoLuong: 1.1, Luong: 8100000, GioiTinh: 'Nam', ThoiGianBatDau: '2023-12-01 08:00:00', ChucVu: 'Nhân viên', NgaySinh: '1993-02-05' },
      { Ten: 'Võ Hà', SoGioLam: 37, HeSoLuong: 1.3, Luong: 7300000, GioiTinh: 'Nữ', ThoiGianBatDau: '2023-12-01 08:00:00', ChucVu: 'Nhân viên', NgaySinh: '1996-01-30' },
      { Ten: 'Hoàng Yến', SoGioLam: 40, HeSoLuong: 1.0, Luong: 8000000, GioiTinh: 'Nữ', ThoiGianBatDau: '2023-12-01 08:00:00', ChucVu: 'Nhân viên', NgaySinh: '1994-12-05' },
      { Ten: 'Lê Quang', SoGioLam: 39, HeSoLuong: 1.2, Luong: 7800000, GioiTinh: 'Nam', ThoiGianBatDau: '2023-12-01 08:00:00', ChucVu: 'Nhân viên', NgaySinh: '1992-10-22' }
    ];

    const salaryRecords = [
        { IDNhanVien: 'NV000001', ThoiGianLamViec: 160, ThangVaNam: '2024-01', TongLuong: 8000000, ThuongThem: 500000, IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-01-31 17:00:00' },
        { IDNhanVien: 'NV000002', ThoiGianLamViec: 150, ThangVaNam: '2024-01', TongLuong: 7500000, ThuongThem: 400000, IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-01-31 17:00:00' },
        { IDNhanVien: 'NV000003', ThoiGianLamViec: 170, ThangVaNam: '2024-02', TongLuong: 8200000, ThuongThem: 600000, IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-02-28 17:00:00' },
        { IDNhanVien: 'NV000004', ThoiGianLamViec: 160, ThangVaNam: '2024-02', TongLuong: 7000000, ThuongThem: 300000, IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-02-28 17:00:00' },
        { IDNhanVien: 'NV000005', ThoiGianLamViec: 150, ThangVaNam: '2024-03', TongLuong: 8000000, ThuongThem: 400000, IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-03-31 17:00:00' },
        { IDNhanVien: 'NV000006', ThoiGianLamViec: 160, ThangVaNam: '2024-03', TongLuong: 7600000, ThuongThem: 300000, IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-03-31 17:00:00' },
        { IDNhanVien: 'NV000007', ThoiGianLamViec: 155, ThangVaNam: '2024-04', TongLuong: 8100000, ThuongThem: 500000, IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-04-30 17:00:00' },
        { IDNhanVien: 'NV000008', ThoiGianLamViec: 145, ThangVaNam: '2024-04', TongLuong: 7300000, ThuongThem: 200000, IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-04-30 17:00:00' },
        { IDNhanVien: 'NV000009', ThoiGianLamViec: 160, ThangVaNam: '2024-05', TongLuong: 8000000, ThuongThem: 400000, IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-05-31 17:00:00' },
        { IDNhanVien: 'NV000010', ThoiGianLamViec: 165, ThangVaNam: '2024-05', TongLuong: 7700000, ThuongThem: 300000, IDNhanVienCapNhat: 'NV000002', ThoiGianCapNhat: '2024-05-31 17:00:00' }
    ];
    

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
    
    
    const chiNhanh = [
        { MaChiNhanh: '00001', ThoiGianBatDau: '08:00', ThoiGianKetThuc: '17:00', Ten: 'Chi nhánh Hà Nội', SDT: '024-12345678', DiaChi: 'Số 123, Phố Lê Duẩn, Quận Hoàn Kiếm, Hà Nội' },
        { MaChiNhanh: '00002', ThoiGianBatDau: '08:00', ThoiGianKetThuc: '17:00', Ten: 'Chi nhánh TP.HCM', SDT: '028-87654321', DiaChi: 'Số 456, Đường Nguyễn Thị Minh Khai, Quận 1, TP.HCM' },
        { MaChiNhanh: '00003', ThoiGianBatDau: '08:00', ThoiGianKetThuc: '17:00', Ten: 'Chi nhánh Đà Nẵng', SDT: '0236-11223344', DiaChi: 'Số 789, Đường Hùng Vương, Quận Hải Châu, Đà Nẵng' },
        { MaChiNhanh: '00004', ThoiGianBatDau: '08:00', ThoiGianKetThuc: '17:00', Ten: 'Chi nhánh Hải Phòng', SDT: '0225-44556677', DiaChi: 'Số 321, Phố Trần Phú, Quận Ngô Quyền, Hải Phòng' },
        { MaChiNhanh: '00005', ThoiGianBatDau: '08:00', ThoiGianKetThuc: '17:00', Ten: 'Chi nhánh Cần Thơ', SDT: '0292-99887766', DiaChi: 'Số 654, Đường Lê Lợi, Quận Ninh Kiều, Cần Thơ' }
    ];

    const nhaCungCap = [
        { MaNhaCungCap: 'NCC0001', TenNhaCungCap: 'Công ty ABC', DiaChi: 'Số 100, Đường Lê Lợi, Quận 1, TP.HCM', SDT: '0901122333' },
        { MaNhaCungCap: 'NCC0002', TenNhaCungCap: 'Công ty XYZ', DiaChi: 'Số 200, Đường Nguyễn Thị Minh Khai, Quận 3, TP.HCM', SDT: '0902233444' },
        { MaNhaCungCap: 'NCC0003', TenNhaCungCap: 'Công ty 123', DiaChi: 'Số 300, Đường Trần Phú, Quận 5, TP.HCM', SDT: '0903344555' },
        { MaNhaCungCap: 'NCC0004', TenNhaCungCap: 'Công ty DEF', DiaChi: 'Số 400, Đường Lý Thường Kiệt, Quận 10, TP.HCM', SDT: '0904455666' },
        { MaNhaCungCap: 'NCC0005', TenNhaCungCap: 'Công ty GHI', DiaChi: 'Số 500, Đường Hoàng Văn Thụ, Quận Tân Bình, TP.HCM', SDT: '0905566777' }
      ];
      
      const dungCuHocTap = [
        { MaSanPham: 'DC000001', TenSanPham: 'Bút bi', Gia: 4000, MoTa: 'Bút bi màu đen' },
        { MaSanPham: 'DC000002', TenSanPham: 'Vở', Gia: 10000, MoTa: 'Vở học sinh 100 trang' },
        { MaSanPham: 'DC000003', TenSanPham: 'Cặp sách', Gia: 500000, MoTa: 'Cặp sách đeo vai' },
        { MaSanPham: 'DC000004', TenSanPham: 'Tẩy', Gia: 5000, MoTa: 'Tẩy bút chì' },
        { MaSanPham: 'DC000005', TenSanPham: 'Thước kẻ', Gia: 10000, MoTa: 'Thước kẻ 30cm' },
        { MaSanPham: 'DC000006', TenSanPham: 'Bút chì', Gia: 5000, MoTa: 'Bút chì học sinh' },
        { MaSanPham: 'DC000007', TenSanPham: 'Gôm', Gia: 4000, MoTa: 'Gôm tẩy sạch' },
        { MaSanPham: 'DC000008', TenSanPham: 'Bút lông', Gia: 20000, MoTa: 'Bút lông màu đỏ' },
        { MaSanPham: 'DC000009', TenSanPham: 'Bảng con', Gia: 30000, MoTa: 'Bảng con để viết' },
        { MaSanPham: 'DC000010', TenSanPham: 'Kéo', Gia: 20000, MoTa: 'Kéo học sinh' }
      ];
      
      const sach = [
        { MaSanPham: 'SC000001', TenSanPham: 'Toán học', NhaXuatBan: 'NXB Giáo dục', NgayPhatHanh: '2021-09-01', TacGia: 'Nguyễn Quang Hùng', NguoiDich: 'N/A', DanhGia: 4.5, DinhDang: 'Bìa mềm', Size: 'A4', SoTrang: 180 },
        { MaSanPham: 'SC000002', TenSanPham: 'Vật lý', NhaXuatBan: 'NXB Khoa học và Kỹ thuật', NgayPhatHanh: '2020-12-15', TacGia: 'David Halliday', NguoiDich: 'Hoàng Minh Đức', DanhGia: 4.8, DinhDang: 'Bìa cứng', Size: 'A5', SoTrang: 400 },
        { MaSanPham: 'SC000003', TenSanPham: 'Tiểu thuyết', NhaXuatBan: 'NXB Văn học', NgayPhatHanh: '2021-06-20', TacGia: 'Jane Austen', NguoiDich: 'Nguyễn Thị Hằng', DanhGia: 4.7, DinhDang: 'Bìa mềm', Size: 'A5', SoTrang: 320 },
        { MaSanPham: 'SC000004', TenSanPham: 'Tiểu thuyết', NhaXuatBan: 'NXB Thanh Niên', NgayPhatHanh: '2020-11-10', TacGia: 'Stephen King', NguoiDich: 'Phạm Quỳnh Anh', DanhGia: 4.9, DinhDang: 'Bìa mềm', Size: 'A5', SoTrang: 280 },
        { MaSanPham: 'SC000005', TenSanPham: 'Tiểu thuyết', NhaXuatBan: 'NXB Thanh Niên', NgayPhatHanh: '2019-03-25', TacGia: 'J.R.R. Tolkien', NguoiDich: 'Nguyễn Quang Duy', DanhGia: 4.8, DinhDang: 'Bìa cứng', Size: 'A4', SoTrang: 350 },
        { MaSanPham: 'SC000006', TenSanPham: 'Khoa học viễn tưởng', NhaXuatBan: 'NXB Thanh Niên', NgayPhatHanh: '2018-05-15', TacGia: 'Isaac Asimov', NguoiDich: 'Nguyễn Đức Lợi', DanhGia: 4.9, DinhDang: 'Bìa cứng', Size: 'A5', SoTrang: 500 },
        { MaSanPham: 'SC000007', TenSanPham: 'Lịch sử', NhaXuatBan: 'NXB Thanh Niên', NgayPhatHanh: '2015-04-12', TacGia: 'Yuval Noah Harari', NguoiDich: 'Trần Huyền', DanhGia: 4.8, DinhDang: 'Bìa mềm', Size: 'A5', SoTrang: 460 },
        { MaSanPham: 'SC000008', TenSanPham: 'Tiểu thuyết', NhaXuatBan: 'NXB Thanh Niên', NgayPhatHanh: '2020-07-23', TacGia: 'Colson Whitehead', NguoiDich: 'Nguyễn Minh Tuấn', DanhGia: 4.6, DinhDang: 'Bìa cứng', Size: 'A5', SoTrang: 300 },
        { MaSanPham: 'SC000009', TenSanPham: 'Phát triển bản thân', NhaXuatBan: 'Random House', NgayPhatHanh: '2019-05-14', TacGia: 'Mark Manson', NguoiDich: 'Nguyễn Đức Nhân', DanhGia: 4.7, DinhDang: 'Bìa mềm', Size: 'A5', SoTrang: 220 },
        { MaSanPham: 'SC000010', TenSanPham: 'Chính trị', NhaXuatBan: 'Oxford University Press', NgayPhatHanh: '2018-08-01', TacGia: 'Noam Chomsky', NguoiDich: 'Trần Hữu Quyền', DanhGia: 4.5, DinhDang: 'Bìa mềm', Size: 'A5', SoTrang: 350 }
      ];
      
      
      const phuKienSach = [
        { MaSanPham: 'PK000001', TenSanPham: 'Bìa sách', Gia: 10000, MoTa: 'Bìa sách bảo vệ', CongDung: 'Bảo vệ sách', MauSac: 'Đỏ' },
        { MaSanPham: 'PK000002', TenSanPham: 'Dây đeo sách', Gia: 15000, MoTa: 'Dây đeo sách ', CongDung: 'Đeo sách dễ dàng', MauSac: 'Xanh' },
        { MaSanPham: 'PK000003', TenSanPham: 'Kẹp sách', Gia: 5000, MoTa: 'Kẹp sách ', CongDung: 'Giữ sách không bị rơi', MauSac: 'Vàng' },
        { MaSanPham: 'PK000004', TenSanPham: 'Sổ tay', Gia: 25000, MoTa: 'Sổ tay học sinh', CongDung: 'Ghi chép', MauSac: 'Đen' },
        { MaSanPham: 'PK000005', TenSanPham: 'Bút dạ quang', Gia: 20000, MoTa: 'Bút dạ quang ', CongDung: 'Vẽ và đánh dấu', MauSac: 'Cam' },
        { MaSanPham: 'PK000006', TenSanPham: 'Bao đựng sách', Gia: 15000, MoTa: 'Bao sách chống thấm', CongDung: 'Bảo vệ sách ', MauSac: 'Trắng' },
        { MaSanPham: 'PK000007', TenSanPham: 'Móc treo sách', Gia: 10000, MoTa: 'Móc sách gọn gàng', CongDung: 'Treo sách ', MauSac: 'Hồng' },
        { MaSanPham: 'PK000008', TenSanPham: 'Gáy sách', Gia: 20000, MoTa: 'Gáy sách bền', CongDung: 'Giúp sách không bị rách', MauSac: 'Xanh dương' },
        { MaSanPham: 'PK000009', TenSanPham: 'Bìa bảo vệ', Gia: 12000, MoTa: 'Bìa bảo vệ sách', CongDung: 'Bảo vệ bìa sách khỏi hư hại', MauSac: 'Xám' },
        { MaSanPham: 'PK000010', TenSanPham: 'Kẹp giấy', Gia: 5000, MoTa: 'Kẹp giấy văn phòng', CongDung: 'Giữ giấy gọn gàng', MauSac: 'Đỏ' }
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
        { IDHoaDon: 100002, GhiChu: 'Mua sách giáo khoa', ThueNhap: 30, ThoiGian: '2024-02-05 14:00:00', GiaTong: 3000000, TongGiaVon: 2700000, MaNhanVienPhuTrach: 'NV000002', MaNhaCungCap: 'NCC0002', MaChiNhanhNhanHang: '00002' },
        { IDHoaDon: 100003, GhiChu: 'Mua dụng cụ học tập', ThueNhap: 40, ThoiGian: '2024-03-15 10:00:00', GiaTong: 4000000, TongGiaVon: 3600000, MaNhanVienPhuTrach: 'NV000003', MaNhaCungCap: 'NCC0003', MaChiNhanhNhanHang: '00003' },
        { IDHoaDon: 100004, GhiChu: 'Nhập sách nghiên cứu', ThueNhap: 60, ThoiGian: '2024-04-10 09:30:00', GiaTong: 6000000, TongGiaVon: 5400000, MaNhanVienPhuTrach: 'NV000004', MaNhaCungCap: 'NCC0004', MaChiNhanhNhanHang: '00004' },
        { IDHoaDon: 100005, GhiChu: 'Mua sách tham khảo cho học sinh', ThueNhap: 20, ThoiGian: '2024-05-18 11:15:00', GiaTong: 2000000, TongGiaVon: 1800000, MaNhanVienPhuTrach: 'NV000005', MaNhaCungCap: 'NCC0005', MaChiNhanhNhanHang: '00005' },
        { IDHoaDon: 100006, GhiChu: 'Mua phụ kiện sách', ThueNhap: 70, ThoiGian: '2024-06-12 16:45:00', GiaTong: 7000000, TongGiaVon: 6300000, MaNhanVienPhuTrach: 'NV000006', MaNhaCungCap: 'NCC0001', MaChiNhanhNhanHang: '00001' },
        { IDHoaDon: 100007, GhiChu: 'Đặt sách học từ xa', ThueNhap: 80, ThoiGian: '2024-07-20 13:00:00', GiaTong: 8000000, TongGiaVon: 7200000, MaNhanVienPhuTrach: 'NV000007', MaNhaCungCap: 'NCC0002', MaChiNhanhNhanHang: '00002' },
        { IDHoaDon: 100008, GhiChu: 'Nhập dụng cụ học tập cho học sinh', ThueNhap: 25, ThoiGian: '2024-08-05 10:30:00', GiaTong: 2500000, TongGiaVon: 2250000, MaNhanVienPhuTrach: 'NV000008', MaNhaCungCap: 'NCC0003', MaChiNhanhNhanHang: '00003' },
        { IDHoaDon: 100009, GhiChu: 'Mua sách giáo khoa', ThueNhap: 15, ThoiGian: '2024-09-07 09:15:00', GiaTong: 1500000, TongGiaVon: 1350000, MaNhanVienPhuTrach: 'NV000009', MaNhaCungCap: 'NCC0004', MaChiNhanhNhanHang: '00004' },
        { IDHoaDon: 100010, GhiChu: 'Nhập sách chuyên ngành', ThueNhap: 50, ThoiGian: '2024-10-12 14:00:00', GiaTong: 5000000, TongGiaVon: 4500000, MaNhanVienPhuTrach: 'NV000010', MaNhaCungCap: 'NCC0005', MaChiNhanhNhanHang: '00005' },
        { IDHoaDon: 100011, GhiChu: 'Mua sách cho thư viện', ThueNhap: 90, ThoiGian: '2024-11-02 15:00:00', GiaTong: 9000000, TongGiaVon: 8100000, MaNhanVienPhuTrach: 'NV000001', MaNhaCungCap: 'NCC0001', MaChiNhanhNhanHang: '00001' },
        { IDHoaDon: 100012, GhiChu: 'Mua phụ kiện sách cho học sinh', ThueNhap: 45, ThoiGian: '2024-12-01 11:30:00', GiaTong: 4500000, TongGiaVon: 4050000, MaNhanVienPhuTrach: 'NV000002', MaNhaCungCap: 'NCC0002', MaChiNhanhNhanHang: '00002' }
    ];
    
    const hoaDonBanHang = [
        { 
            MaHoaDon: '0000001', 
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
            MaHoaDon: '0000002', 
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
            MaHoaDon: '0000003', 
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
            MaHoaDon: '0000004', 
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
            MaHoaDon: '0000005', 
            GhiChu: 'Bán dụng cụ học tập cho học sinh lớp 8', 
            HinhThucThanhToan: 'Chuyển khoản', 
            TrangThai: 'Đã thanh toán', 
            DiaChi: 'Số 654, Đường Hoàng Văn Thụ, Quận Tân Bình, TP.HCM', 
            GiaTong: 2000000, 
            MaKhachHang: 'KH000005', 
            MaNhanVienPhuTrach: 'NV000005', 
            MaChiNhanhIn: '00005', 
            NgayTaoDon: '2024-12-05 15:30:00', 
            ThanhTien: 2000000, 
            MaVoucher: 'VO000005'
        }
    ];


    const gioHang = [
        { MaKhachHang: 'KH000001', MaSanPham: 'PK000004', SoLuong: 2 },
        // { MaKhachHang: 'KH000002', MaSanPham: 'SC000005', SoLuong: 1 },
        { MaKhachHang: 'KH000002', MaSanPham: 'DC000008', SoLuong: 5 },
        { MaKhachHang: 'KH000003', MaSanPham: 'DC000006', SoLuong: 3 },
        { MaKhachHang: 'KH000004', MaSanPham: 'PK000003', SoLuong: 1 },
        // { MaKhachHang: 'KH000004', MaSanPham: 'DC000002', SoLuong: 4 },
        { MaKhachHang: 'KH000005', MaSanPham: 'SC000004', SoLuong: 2 },
        // { MaKhachHang: 'KH000005', MaSanPham: 'PK000007', SoLuong: 1 },
        { MaKhachHang: 'KH000006', MaSanPham: 'DC000008', SoLuong: 6 },
        // { MaKhachHang: 'KH000006', MaSanPham: 'SC000004', SoLuong: 3 }
    ];
    

    const workShifts = [
        { MaNhanVien: 'NV000001', ThoiDiemBatDau: '2024-12-01 08:00:00', ThoiDiemKetThuc: '2024-12-01 17:00:00' },
        { MaNhanVien: 'NV000002', ThoiDiemBatDau: '2024-12-01 08:00:00', ThoiDiemKetThuc: '2024-12-01 17:00:00' },
        { MaNhanVien: 'NV000003', ThoiDiemBatDau: '2024-12-01 08:00:00', ThoiDiemKetThuc: '2024-12-01 17:00:00' },
        { MaNhanVien: 'NV000004', ThoiDiemBatDau: '2024-12-01 08:00:00', ThoiDiemKetThuc: '2024-12-01 17:00:00' },
        { MaNhanVien: 'NV000005', ThoiDiemBatDau: '2024-12-01 08:00:00', ThoiDiemKetThuc: '2024-12-01 17:00:00' }
    ];
    
    const reviews = [
        { MaSanPham: 'SP000001', MaKhachHang: 'KH000001', SoSao: 5, BinhLuan: 'Sản phẩm tuyệt vời!' },
        { MaSanPham: 'SP000006', MaKhachHang: 'KH000002', SoSao: 4, BinhLuan: 'Chất lượng tốt, giao hàng nhanh.' },
        { MaSanPham: 'SP000002', MaKhachHang: 'KH000003', SoSao: 3, BinhLuan: 'Sản phẩm ổn, nhưng cần cải thiện.' },
        { MaSanPham: 'SP000004', MaKhachHang: 'KH000004', SoSao: 2, BinhLuan: 'Không đúng như mong đợi.' },
        { MaSanPham: 'SP000005', MaKhachHang: 'KH000005', SoSao: 1, BinhLuan: 'Rất tệ, tôi sẽ không mua lại.' }
    ];
    
    const danhSachSanPhamNhap = [
        { MaHoaDon: 100001, MaSanPham: 'DC000007', SoLuong: 100, GiaNhap: 50000 },
        { MaHoaDon: 100002, MaSanPham: 'SC000003', SoLuong: 200, GiaNhap: 45000 },
        { MaHoaDon: 100003, MaSanPham: 'PK000001', SoLuong: 150, GiaNhap: 35000 },
        { MaHoaDon: 100004, MaSanPham: 'DC000004', SoLuong: 50, GiaNhap: 70000 },
        { MaHoaDon: 100005, MaSanPham: 'SC000005', SoLuong: 75, GiaNhap: 55000 },
        { MaHoaDon: 100006, MaSanPham: 'PK000006', SoLuong: 120, GiaNhap: 60000 },
        { MaHoaDon: 100007, MaSanPham: 'DC000009', SoLuong: 90, GiaNhap: 40000 },
        { MaHoaDon: 100008, MaSanPham: 'SC000007', SoLuong: 200, GiaNhap: 30000 },
        { MaHoaDon: 100009, MaSanPham: 'PK000010', SoLuong: 180, GiaNhap: 25000 },
        { MaHoaDon: 100010, MaSanPham: 'DC000001', SoLuong: 60, GiaNhap: 90000 }
    ];
    
    const danhSachSanPhamKho = [
        { MaChiNhanh: '00001', MaSanPham: 'SC000006', SoLuong: 50 },
        { MaChiNhanh: '00002', MaSanPham: 'PK000005', SoLuong: 30 },
        { MaChiNhanh: '00003', MaSanPham: 'DC000010', SoLuong: 70 },
        { MaChiNhanh: '00004', MaSanPham: 'PK000008', SoLuong: 40 },
        { MaChiNhanh: '00005', MaSanPham: 'DC000002', SoLuong: 120 },
        // { MaChiNhanh: '00001', MaSanPham: 'SC000009', SoLuong: 80 },
        // { MaChiNhanh: '00002', MaSanPham: 'DC000005', SoLuong: 90 },
        // { MaChiNhanh: '00003', MaSanPham: 'PK000003', SoLuong: 100 },
        // { MaChiNhanh: '00004', MaSanPham: 'SC000004', SoLuong: 150 },
        // { MaChiNhanh: '00005', MaSanPham: 'SC000008', SoLuong: 60 }
    ];
    
    const danhSachSanPhamMua = [
        { MaHoaDon: 100001, MaSanPham: 'PK000009', SoLuong: 5, GiaKhiMua: 70000 },
        { MaHoaDon: 100002, MaSanPham: 'SC000002', SoLuong: 3, GiaKhiMua: 75000 },
        { MaHoaDon: 100003, MaSanPham: 'SC000010', SoLuong: 2, GiaKhiMua: 80000 },
        { MaHoaDon: 100004, MaSanPham: 'PK000004', SoLuong: 1, GiaKhiMua: 100000 },
        { MaHoaDon: 100005, MaSanPham: 'DC000003', SoLuong: 4, GiaKhiMua: 90000 },
        { MaHoaDon: 100006, MaSanPham: 'PK000007', SoLuong: 6, GiaKhiMua: 85000 },
        { MaHoaDon: 100007, MaSanPham: 'SC000001', SoLuong: 3, GiaKhiMua: 95000 },
        { MaHoaDon: 100008, MaSanPham: 'SC000005', SoLuong: 7, GiaKhiMua: 70000 },
        { MaHoaDon: 100009, MaSanPham: 'PK000002', SoLuong: 4, GiaKhiMua: 65000 },
        { MaHoaDon: 100010, MaSanPham: 'DC000008', SoLuong: 2, GiaKhiMua: 110000 }
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
        ('${removeVietnameseTones(customer.ID)}', '${removeVietnameseTones(customer.Ten)}', '${customer.SDT}', '${customer.NgaySinh}', '${removeVietnameseTones(customer.GioiTinh)}',
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
    for (let i = 0; i < employees.length; i++) {
      const employee = employees[i];
      const { email, password, userName} = generateEmailAndPassword(employee.Ten);
      const sdt = generateSDT();

      const employeeID = `NV${(i + 1).toString().padStart(6, '0')}`;

      await pool.request()
        .input('ID', sql.NVarChar, employeeID)
        .input('SoGioLam', sql.Int, employee.SoGioLam)
        .input('HeSoLuong', sql.Float, employee.HeSoLuong) // Thêm HeSoLuong
        .input('ThoiGianBatDau', sql.DateTime, employee.ThoiGianBatDau)
        .input('ChucVu', sql.NVarChar, employee.ChucVu)
        .input('Luong', sql.Int, employee.Luong)
        .input('SDT', sql.NVarChar, sdt)
        .input('NgaySinh', sql.Date, employee.NgaySinh)
        .input('GioiTinh', sql.NVarChar, employee.GioiTinh)
        .input('Email', sql.NVarChar, email)
        .input('Ten', sql.NVarChar, employee.Ten)
        .input('MatKhau', sql.NVarChar, password)
        .input('TenTaiKhoan', sql.NVarChar, userName)
        .input('MaNhanVienQuanLy', sql.Int, 1) 
        .input('MaChiNhanhLamViec', sql.Int, 2) 
        .query(`
          INSERT INTO [dbo].[NhanVien] (
            [ID], [LoaiNhanVien], [ChucVu], [HeSoLuong], [SDT], 
            [NgaySinh], [GioiTinh], [Email], [Ten], [TenTaiKhoan], 
            [MatKhau], [MaNhanVienQuanLy], [MaChiNhanhLamViec]
          )
          VALUES (
            @ID, 'Nhân viên', @ChucVu, @HeSoLuong, @SDT, 
            @NgaySinh, @GioiTinh, @Email, @Ten, @TenTaiKhoan, 
            @MatKhau, @MaNhanVienQuanLy, @MaChiNhanhLamViec
          )
        `);
       
    }
    
    async function addBranch(branch) {
        const query = `INSERT INTO ChiNhanh (MaChiNhanh, ThoiGianBatDau, ThoiGianKetThuc, Ten, SDT, DiaChi) VALUES
        ('${removeVietnameseTones(branch.MaChiNhanh)}', '${branch.ThoiGianBatDau}', '${branch.ThoiGianKetThuc}', '${removeVietnameseTones(branch.Ten)}', '${branch.SDT}', '${removeVietnameseTones(branch.DiaChi)}')`;
    
        try {
            await pool.request().query(query);
        } catch (error) {
            console.log('Lỗi khi thêm chi nhánh: ', error);
        }
    }
    
    // Thêm các chi nhánh vào cơ sở dữ liệu
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


      async function addProductToCart(cartItem) {
        const query = `INSERT INTO GioHang (MaKhachHang, MaSanPham, SoLuong) VALUES
            ('${cartItem.MaKhachHang}', '${cartItem.MaSanPham}', ${cartItem.SoLuong})
            `;
    
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
    
    async function addHoaDonBan(hoaDon) {
      const query = `INSERT INTO HoaDonBanHang (MaHoaDon, GhiChu, HinhThucThanhToan, TrangThai, DiaChi, GiaTong, MaKhachHang, MaNhanVienPhuTrach, MaChiNhanhIn, NgayTaoDon, ThanhTien, MaVoucher) 
      VALUES 
      ('${hoaDon.MaHoaDon}', '${hoaDon.GhiChu}', '${hoaDon.HinhThucThanhToan}', '${hoaDon.TrangThai}', '${hoaDon.DiaChi}', ${hoaDon.GiaTong}, '${hoaDon.MaKhachHang}', '${hoaDon.MaNhanVienPhuTrach}', '${hoaDon.MaChiNhanhIn}', '${hoaDon.NgayTaoDon}', ${hoaDon.ThanhTien}, '${hoaDon.MaVoucher}')`;
  
      try {
          await pool.request().query(query);
      } catch (error) {
          console.log('Lỗi khi thêm hóa đơn bán hàng: ', error);
      }
  }
  
  // Thêm các hóa đơn bán hàng vào cơ sở dữ liệu
  for (const hoaDon of hoaDonBanHang) {
      await addHoaDonBan(hoaDon);
  }
  
  async function addHoaDonNhap(hoaDon) {
    const query = `INSERT INTO HoaDonNhapHang (IDHoaDon, GhiChu, ThueNhap, ThoiGian, GiaTong, TongGiaVon, MaNhanVienPhuTrach, MaNhaCungCap, MaChiNhanhNhanHang) 
    VALUES 
    (${hoaDon.IDHoaDon}, '${hoaDon.GhiChu}', ${hoaDon.ThueNhap}, '${hoaDon.ThoiGian}', ${hoaDon.GiaTong}, ${hoaDon.TongGiaVon}, '${hoaDon.MaNhanVienPhuTrach}', '${hoaDon.MaNhaCungCap}', '${hoaDon.MaChiNhanhNhanHang}')`;

    try {
        await pool.request().query(query);
    } catch (error) {
        console.log('Lỗi khi thêm hóa đơn nhập hàng: ', error);
    }
}

// Thêm các hóa đơn nhập hàng vào cơ sở dữ liệu
for (const hoaDon of hoaDonNhapHang) {
    await addHoaDonNhap(hoaDon);
}


  } catch (err) {
    console.error('Lỗi kết nối hoặc truy vấn:', err);
  } finally {
    sql.close();
  }

  
}

resetAndAddMultipleEmployeeData();
