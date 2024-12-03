const express = require('express');
const sql = require('mssql');
const router = express.Router();

// API CRUD for Branch
router.post('/branch', async (req, res) => {
  const { MaChiNhanh, ThoiGianBatDau, ThoiGianKetThuc, Ten, SDT, DiaChi } = req.body;
  const query = `
    INSERT INTO ChiNhanh (MaChiNhanh, ThoiGianBatDau, ThoiGianKetThuc, Ten, SDT, DiaChi)
    VALUES (@MaChiNhanh, @ThoiGianBatDau, @ThoiGianKetThuc, @Ten, @SDT, @DiaChi)
  `;

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('MaChiNhanh', sql.Int, MaChiNhanh)
      .input('ThoiGianBatDau', sql.Time, ThoiGianBatDau)
      .input('ThoiGianKetThuc', sql.Time, ThoiGianKetThuc)
      .input('Ten', sql.NVarChar, Ten)
      .input('SDT', sql.NVarChar, SDT)
      .input('DiaChi', sql.NVarChar, DiaChi)
      .query(query);

    res.send({ message: 'Chi nhánh đã được thêm!' });
  } catch (err) {
    console.error('Error adding branch:', err);
    res.status(500).send({ message: 'Error adding branch!' });
  }
});

router.get('/branch', async (req, res) => {
  const query = 'SELECT * FROM ChiNhanh';

  try {
    const pool = req.app.locals.db;
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving branches:', err);
    res.status(500).send({ message: 'Error retrieving branches!' });
  }
});

router.get('/branch/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM ChiNhanh WHERE MaChiNhanh = @MaChiNhanh';

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('MaChiNhanh', sql.Int, id)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).send({ message: 'Chi nhánh không tìm thấy!' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error retrieving branch:', err);
    res.status(500).send({ message: 'Error retrieving branch!' });
  }
});

router.put('/branch/:id', async (req, res) => {
  const { id } = req.params;
  const { ThoiGianBatDau, ThoiGianKetThuc, Ten, SDT, DiaChi } = req.body;
  const query = `
    UPDATE ChiNhanh 
    SET ThoiGianBatDau = @ThoiGianBatDau, ThoiGianKetThuc = @ThoiGianKetThuc, 
        Ten = @Ten, SDT = @SDT, DiaChi = @DiaChi
    WHERE MaChiNhanh = @MaChiNhanh
  `;

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('MaChiNhanh', sql.Int, id)
      .input('ThoiGianBatDau', sql.Time, ThoiGianBatDau)
      .input('ThoiGianKetThuc', sql.Time, ThoiGianKetThuc)
      .input('Ten', sql.NVarChar, Ten)
      .input('SDT', sql.NVarChar, SDT)
      .input('DiaChi', sql.NVarChar, DiaChi)
      .query(query);

    res.send({ message: 'Chi nhánh đã được cập nhật!' });
  } catch (err) {
    console.error('Error updating branch:', err);
    res.status(500).send({ message: 'Error updating branch!' });
  }
});

router.delete('/branch/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM ChiNhanh WHERE MaChiNhanh = @MaChiNhanh';

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('MaChiNhanh', sql.Int, id)
      .query(query);

    res.send({ message: 'Chi nhánh đã bị xóa!' });
  } catch (err) {
    console.error('Error deleting branch:', err);
    res.status(500).send({ message: 'Error deleting branch!' });
  }
});

module.exports = router;
