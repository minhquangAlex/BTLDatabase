const express = require('express');
const sql = require('mssql');
const router = express.Router();

// API CRUD for Employee
router.post('/employee', async (req, res) => {
  const { ID, LoaiNhanVien, ChucVu, HeSoLuong, SDT, NgaySinh, GioiTinh, Email, Ten, TenTaiKhoan, MatKhau, MaNhanVienQuanLy, MaChiNhanhLamViec } = req.body;
  const query = `
    INSERT INTO NhanVien (ID, LoaiNhanVien, ChucVu, HeSoLuong, SDT, NgaySinh, GioiTinh, Email, Ten, TenTaiKhoan, MatKhau, MaNhanVienQuanLy, MaChiNhanhLamViec)
    VALUES (@ID, @LoaiNhanVien, @ChucVu, @HeSoLuong, @SDT, @NgaySinh, @GioiTinh, @Email, @Ten, @TenTaiKhoan, @MatKhau, @MaNhanVienQuanLy, @MaChiNhanhLamViec)
  `;

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('ID', sql.NVarChar, ID)
      .input('LoaiNhanVien', sql.NVarChar, LoaiNhanVien)
      .input('ChucVu', sql.NVarChar, ChucVu)
      .input('HeSoLuong', sql.Decimal, HeSoLuong)
      .input('SDT', sql.NVarChar, SDT)
      .input('NgaySinh', sql.Date, NgaySinh)
      .input('GioiTinh', sql.NVarChar, GioiTinh)
      .input('Email', sql.NVarChar, Email)
      .input('Ten', sql.NVarChar, Ten)
      .input('TenTaiKhoan', sql.NVarChar, TenTaiKhoan)
      .input('MatKhau', sql.NVarChar, MatKhau)
      .input('MaNhanVienQuanLy', sql.NVarChar, MaNhanVienQuanLy)
      .input('MaChiNhanhLamViec', sql.Int, MaChiNhanhLamViec)
      .query(query);

    res.send({ message: 'Nhân viên đã được thêm!' });
  } catch (err) {
    console.error('Error adding employee:', err);
    res.status(500).send({ message: 'Error adding employee!' });
  }
});

router.get('/employee', async (req, res) => {
  const query = 'SELECT * FROM NhanVien';

  try {
    const pool = req.app.locals.db;
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving employees:', err);
    res.status(500).send({ message: 'Error retrieving employees!' });
  }
});

router.get('/employee/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM NhanVien WHERE ID = @ID';

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('ID', sql.NVarChar, id)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).send({ message: 'Nhân viên không tìm thấy!' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error retrieving employee:', err);
    res.status(500).send({ message: 'Error retrieving employee!' });
  }
});

router.put('/employee/:id', async (req, res) => {
  const { id } = req.params;
  const { LoaiNhanVien, ChucVu, HeSoLuong, SDT, NgaySinh, GioiTinh, Email, Ten, TenTaiKhoan, MatKhau, MaNhanVienQuanLy, MaChiNhanhLamViec } = req.body;
  const query = `
    UPDATE NhanVien 
    SET LoaiNhanVien = @LoaiNhanVien, ChucVu = @ChucVu, HeSoLuong = @HeSoLuong, SDT = @SDT, NgaySinh = @NgaySinh, 
        GioiTinh = @GioiTinh, Email = @Email, Ten = @Ten, TenTaiKhoan = @TenTaiKhoan, MatKhau = @MatKhau, 
        MaNhanVienQuanLy = @MaNhanVienQuanLy, MaChiNhanhLamViec = @MaChiNhanhLamViec
    WHERE ID = @ID
  `;

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('ID', sql.NVarChar, id)
      .input('LoaiNhanVien', sql.NVarChar, LoaiNhanVien)
      .input('ChucVu', sql.NVarChar, ChucVu)
      .input('HeSoLuong', sql.Decimal, HeSoLuong)
      .input('SDT', sql.NVarChar, SDT)
      .input('NgaySinh', sql.Date, NgaySinh)
      .input('GioiTinh', sql.NVarChar, GioiTinh)
      .input('Email', sql.NVarChar, Email)
      .input('Ten', sql.NVarChar, Ten)
      .input('TenTaiKhoan', sql.NVarChar, TenTaiKhoan)
      .input('MatKhau', sql.NVarChar, MatKhau)
      .input('MaNhanVienQuanLy', sql.NVarChar, MaNhanVienQuanLy)
      .input('MaChiNhanhLamViec', sql.Int, MaChiNhanhLamViec)
      .query(query);

    res.send({ message: 'Nhân viên đã được cập nhật!' });
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).send({ message: 'Error updating employee!' });
  }
});

router.delete('/employee/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM NhanVien WHERE ID = @ID';

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('ID', sql.NVarChar, id)
      .query(query);

    res.send({ message: 'Nhân viên đã bị xóa!' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).send({ message: 'Error deleting employee!' });
  }
});

module.exports = router;
