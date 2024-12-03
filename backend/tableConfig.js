module.exports = {
    KhachHang: { tableName: 'KhachHang', primaryKey: 'ID' },
    ChiNhanh: { tableName: 'ChiNhanh', primaryKey: 'MaChiNhanh' },
    NhaCungCap: { tableName: 'NhaCungCap', primaryKey: 'MaNhaCungCap' },
    SanPham: { tableName: 'SanPham', primaryKey: 'MaSanPham' },
    DungCuHocTap: { tableName: 'DungCuHocTap', primaryKey: 'MaSanPham' },
    Sach: { tableName: 'Sach', primaryKey: 'MaSanPham' },
    PhuKienSach: { tableName: 'PhuKienSach', primaryKey: 'MaSanPham' },
    NhanVien: { tableName: 'NhanVien', primaryKey: 'ID' },
    Voucher: { tableName: 'Voucher', primaryKey: 'Code' },
    BangLuong: { tableName: 'BangLuong', primaryKey: 'IDNhanVien' },
    DiaChiGiaoHang: { tableName: 'DiaChiGiaoHang', primaryKey: ['MaKhachHang', 'DiaChi'] },  // Composite PK
    HoaDonBanHang: { tableName: 'HoaDonBanHang', primaryKey: 'MaHoaDon' },
    HoaDonNhapHang: { tableName: 'HoaDonNhapHang', primaryKey: 'IDHoaDon' },
    GioHang: { tableName: 'GioHang', primaryKey: ['MaKhachHang', 'MaSanPham'] },  // Composite PK
    CaLamViec: { tableName: 'CaLamViec', primaryKey: 'MaNhanVien' },
    DanhGia: { tableName: 'DanhGia', primaryKey: ['MaSanPham', 'MaKhachHang'] },  // Composite PK
    DanhSachSanPhamNhap: { tableName: 'DanhSachSanPhamNhap', primaryKey: ['MaHoaDon', 'MaSanPham'] },  // Composite PK
    DanhSachSanPhamKho: { tableName: 'DanhSachSanPhamKho', primaryKey: ['MaChiNhanh', 'MaSanPham'] },  // Composite PK
    DanhSachSanPhamMua: { tableName: 'DanhSachSanPhamMua', primaryKey: ['MaHoaDon', 'MaSanPham'] }  // Composite PK
};
