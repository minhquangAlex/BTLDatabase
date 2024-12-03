const express = require('express');
const sql = require('mssql');
const router = express.Router();

// API CRUD for Voucher
router.post('/voucher', async (req, res) => {
  const { Code, SoLanApDungToiDa, TiLeGiam, GiaTriGiam, NgayBatDau, NgayKetThuc } = req.body;
  const query = `
    INSERT INTO Voucher (Code, SoLanApDungToiDa, TiLeGiam, GiaTriGiam, NgayBatDau, NgayKetThuc)
    VALUES (@Code, @SoLanApDungToiDa, @TiLeGiam, @GiaTriGiam, @NgayBatDau, @NgayKetThuc)
  `;

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('Code', sql.NVarChar, Code)
      .input('SoLanApDungToiDa', sql.Int, SoLanApDungToiDa)
      .input('TiLeGiam', sql.Decimal, TiLeGiam)
      .input('GiaTriGiam', sql.Int, GiaTriGiam)
      .input('NgayBatDau', sql.Date, NgayBatDau)
      .input('NgayKetThuc', sql.Date, NgayKetThuc)
      .query(query);

    res.send({ message: 'Voucher đã được thêm!' });
  } catch (err) {
    console.error('Error adding voucher:', err);
    res.status(500).send({ message: 'Error adding voucher!' });
  }
});

router.get('/voucher', async (req, res) => {
  const query = 'SELECT * FROM Voucher';

  try {
    const pool = req.app.locals.db;
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving vouchers:', err);
    res.status(500).send({ message: 'Error retrieving vouchers!' });
  }
});

router.get('/voucher/:code', async (req, res) => {
  const { code } = req.params;
  const query = 'SELECT * FROM Voucher WHERE Code = @Code';

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('Code', sql.NVarChar, code)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).send({ message: 'Voucher không tìm thấy!' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error retrieving voucher:', err);
    res.status(500).send({ message: 'Error retrieving voucher!' });
  }
});

router.put('/voucher/:code', async (req, res) => {
  const { code } = req.params;
  const { SoLanApDungToiDa, TiLeGiam, GiaTriGiam, NgayBatDau, NgayKetThuc } = req.body;
  const query = `
    UPDATE Voucher 
    SET SoLanApDungToiDa = @SoLanApDungToiDa, TiLeGiam = @TiLeGiam, GiaTriGiam = @GiaTriGiam, 
        NgayBatDau = @NgayBatDau, NgayKetThuc = @NgayKetThuc
    WHERE Code = @Code
  `;

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('Code', sql.NVarChar, code)
      .input('SoLanApDungToiDa', sql.Int, SoLanApDungToiDa)
      .input('TiLeGiam', sql.Decimal, TiLeGiam)
      .input('GiaTriGiam', sql.Int, GiaTriGiam)
      .input('NgayBatDau', sql.Date, NgayBatDau)
      .input('NgayKetThuc', sql.Date, NgayKetThuc)
      .query(query);

    res.send({ message: 'Voucher đã được cập nhật!' });
  } catch (err) {
    console.error('Error updating voucher:', err);
    res.status(500).send({ message: 'Error updating voucher!' });
  }
});

router.delete('/voucher/:code', async (req, res) => {
  const { code } = req.params;
  const query = 'DELETE FROM Voucher WHERE Code = @Code';

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('Code', sql.NVarChar, code)
      .query(query);

    res.send({ message: 'Voucher đã bị xóa!' });
  } catch (err) {
    console.error('Error deleting voucher:', err);
    res.status(500).send({ message: 'Error deleting voucher!' });
  }
});

module.exports = router;
