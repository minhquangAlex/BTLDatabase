const express = require('express');
const sql = require('mssql');
const router = express.Router();

// API CRUD for Salary
router.post('/salary', async (req, res) => {
  const { IDNhanVien, ThoiGianLamViec, ThangVaNam, TongLuong, ThuongThem, IDNhanVienCapNhat, ThoiGianCapNhat } = req.body;
  const query = `
    INSERT INTO BangLuong (IDNhanVien, ThoiGianLamViec, ThangVaNam, TongLuong, ThuongThem, IDNhanVienCapNhat, ThoiGianCapNhat)
    VALUES (@IDNhanVien, @ThoiGianLamViec, @ThangVaNam, @TongLuong, @ThuongThem, @IDNhanVienCapNhat, @ThoiGianCapNhat)
  `;

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('IDNhanVien', sql.NVarChar, IDNhanVien)
      .input('ThoiGianLamViec', sql.Decimal, ThoiGianLamViec)
      .input('ThangVaNam', sql.NVarChar, ThangVaNam)
      .input('TongLuong', sql.Int, TongLuong)
      .input('ThuongThem', sql.Int, ThuongThem)
      .input('IDNhanVienCapNhat', sql.NVarChar, IDNhanVienCapNhat)
      .input('ThoiGianCapNhat', sql.DateTime, ThoiGianCapNhat)
      .query(query);

    res.send({ message: 'Bảng lương đã được thêm!' });
  } catch (err) {
    console.error('Error adding salary record:', err);
    res.status(500).send({ message: 'Error adding salary record!' });
  }
});

router.get('/salary', async (req, res) => {
  const query = 'SELECT * FROM BangLuong';

  try {
    const pool = req.app.locals.db;
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving salary records:', err);
    res.status(500).send({ message: 'Error retrieving salary records!' });
  }
});

router.get('/salary/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM BangLuong WHERE IDNhanVien = @IDNhanVien';

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('IDNhanVien', sql.NVarChar, id)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).send({ message: 'Bảng lương không tìm thấy!' });
    }
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving salary record:', err);
    res.status(500).send({ message: 'Error retrieving salary record!' });
  }
});

router.put('/salary/:id', async (req, res) => {
  const { id } = req.params;
  const { ThoiGianLamViec, ThangVaNam, TongLuong, ThuongThem, IDNhanVienCapNhat, ThoiGianCapNhat } = req.body;
  const query = `
    UPDATE BangLuong 
    SET ThoiGianLamViec = @ThoiGianLamViec, ThangVaNam = @ThangVaNam, TongLuong = @TongLuong, 
        ThuongThem = @ThuongThem, IDNhanVienCapNhat = @IDNhanVienCapNhat, ThoiGianCapNhat = @ThoiGianCapNhat
    WHERE IDNhanVien = @IDNhanVien
  `;

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('IDNhanVien', sql.NVarChar, id)
      .input('ThoiGianLamViec', sql.Decimal, ThoiGianLamViec)
      .input('ThangVaNam', sql.NVarChar, ThangVaNam)
      .input('TongLuong', sql.Int, TongLuong)
      .input('ThuongThem', sql.Int, ThuongThem)
      .input('IDNhanVienCapNhat', sql.NVarChar, IDNhanVienCapNhat)
      .input('ThoiGianCapNhat', sql.DateTime, ThoiGianCapNhat)
      .query(query);

    res.send({ message: 'Bảng lương đã được cập nhật!' });
  } catch (err) {
    console.error('Error updating salary record:', err);
    res.status(500).send({ message: 'Error updating salary record!' });
  }
});

router.delete('/salary/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM BangLuong WHERE IDNhanVien = @IDNhanVien';

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('IDNhanVien', sql.NVarChar, id)
      .query(query);

    res.send({ message: 'Bảng lương đã bị xóa!' });
  } catch (err) {
    console.error('Error deleting salary record:', err);
    res.status(500).send({ message: 'Error deleting salary record!' });
  }
});

module.exports = router;