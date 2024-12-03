const express = require('express');
const sql = require('mssql');
const router = express.Router();

// API CRUD for Supplier
router.post('/supplier', async (req, res) => {
  const { MaNhaCungCap, TenNhaCungCap, DiaChi, SDT } = req.body;
  const query = `
    INSERT INTO NhaCungCap (MaNhaCungCap, TenNhaCungCap, DiaChi, SDT)
    VALUES (@MaNhaCungCap, @TenNhaCungCap, @DiaChi, @SDT)
  `;

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('MaNhaCungCap', sql.NVarChar, MaNhaCungCap)
      .input('TenNhaCungCap', sql.NVarChar, TenNhaCungCap)
      .input('DiaChi', sql.NVarChar, DiaChi)
      .input('SDT', sql.NVarChar, SDT)
      .query(query);

    res.send({ message: 'Nhà cung cấp đã được thêm!' });
  } catch (err) {
    console.error('Error adding supplier:', err);
    res.status(500).send({ message: 'Error adding supplier!' });
  }
});

router.get('/supplier', async (req, res) => {
  const query = 'SELECT * FROM NhaCungCap';

  try {
    const pool = req.app.locals.db;
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving suppliers:', err);
    res.status(500).send({ message: 'Error retrieving suppliers!' });
  }
});

router.get('/supplier/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM NhaCungCap WHERE MaNhaCungCap = @MaNhaCungCap';

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('MaNhaCungCap', sql.NVarChar, id)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).send({ message: 'Nhà cung cấp không tìm thấy!' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error retrieving supplier:', err);
    res.status(500).send({ message: 'Error retrieving supplier!' });
  }
});

router.put('/supplier/:id', async (req, res) => {
  const { id } = req.params;
  const { TenNhaCungCap, DiaChi, SDT } = req.body;
  const query = `
    UPDATE NhaCungCap 
    SET TenNhaCungCap = @TenNhaCungCap, DiaChi = @DiaChi, SDT = @SDT
    WHERE MaNhaCungCap = @MaNhaCungCap
  `;

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('MaNhaCungCap', sql.NVarChar, id)
      .input('TenNhaCungCap', sql.NVarChar, TenNhaCungCap)
      .input('DiaChi', sql.NVarChar, DiaChi)
      .input('SDT', sql.NVarChar, SDT)
      .query(query);

    res.send({ message: 'Nhà cung cấp đã được cập nhật!' });
  } catch (err) {
    console.error('Error updating supplier:', err);
    res.status(500).send({ message: 'Error updating supplier!' });
  }
});

router.delete('/supplier/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM NhaCungCap WHERE MaNhaCungCap = @MaNhaCungCap';

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('MaNhaCungCap', sql.NVarChar, id)
      .query(query);

    res.send({ message: 'Nhà cung cấp đã bị xóa!' });
  } catch (err) {
    console.error('Error deleting supplier:', err);
    res.status(500).send({ message: 'Error deleting supplier!' });
  }
});

module.exports = router;
