const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const dbConfig = require('./dbConfig');

const app = express();
const port = 3000;

sql.connect(dbConfig)
  .then(pool => {
    console.log('Connected to the database');
    app.locals.db = pool;
  })
  .catch(err => {
    console.error('Connection error: ', err.stack);
    process.exit(1);
  });

app.use(bodyParser.json());

app.post('/customer', async (req, res) => {
  const { ID, SDT, NgaySinh, GioiTinh, Email, Ten, TenTaiKhoan, MatKhau, DaiDienDoanhNghiep } = req.body;
  const query = `
    INSERT INTO KhachHang (ID, SDT, NgaySinh, GioiTinh, Email, Ten, TenTaiKhoan, MatKhau, DaiDienDoanhNghiep) 
    VALUES (@ID, @SDT, @NgaySinh, @GioiTinh, @Email, @Ten, @TenTaiKhoan, @MatKhau, @DaiDienDoanhNghiep)
  `;
  
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input('ID', sql.NVarChar, ID)
      .input('SDT', sql.NVarChar, SDT)
      .input('NgaySinh', sql.Date, NgaySinh)
      .input('GioiTinh', sql.NVarChar, GioiTinh)
      .input('Email', sql.NVarChar, Email)
      .input('Ten', sql.NVarChar, Ten)
      .input('TenTaiKhoan', sql.NVarChar, TenTaiKhoan)
      .input('MatKhau', sql.NVarChar, MatKhau)
      .input('DaiDienDoanhNghiep', sql.NVarChar, DaiDienDoanhNghiep)
      .query(query);
    res.send({ message: 'Khách hàng đã được thêm!' });
  } catch (err) {
    console.error('Error adding customer:', err);
    res.status(500).send({ message: 'Error adding customer!' });
  }
});

app.get('/customer', async (req, res) => {
  const query = 'SELECT * FROM KhachHang';
  
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving customer data:', err);
    res.status(500).send({ message: 'Error retrieving customer data!' });
  }
});

app.get('/customer/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM KhachHang WHERE ID = @ID';
  
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('ID', sql.NVarChar, id)
      .query(query);
    
    if (result.recordset.length === 0) {
      return res.status(404).send({ message: 'Khách hàng không tìm thấy!' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error retrieving customer data:', err);
    res.status(500).send({ message: 'Error retrieving customer data!' });
  }
});

app.put('/customer/:id', async (req, res) => {
  const { id } = req.params;
  const { SDT, NgaySinh, GioiTinh, Email, Ten, TenTaiKhoan, MatKhau, DaiDienDoanhNghiep } = req.body;
  const query = `
    UPDATE KhachHang 
    SET SDT = @SDT, NgaySinh = @NgaySinh, GioiTinh = @GioiTinh, Email = @Email, 
        Ten = @Ten, TenTaiKhoan = @TenTaiKhoan, MatKhau = @MatKhau, DaiDienDoanhNghiep = @DaiDienDoanhNghiep
    WHERE ID = @ID
  `;
  
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input('ID', sql.NVarChar, id)
      .input('SDT', sql.NVarChar, SDT)
      .input('NgaySinh', sql.Date, NgaySinh)
      .input('GioiTinh', sql.NVarChar, GioiTinh)
      .input('Email', sql.NVarChar, Email)
      .input('Ten', sql.NVarChar, Ten)
      .input('TenTaiKhoan', sql.NVarChar, TenTaiKhoan)
      .input('MatKhau', sql.NVarChar, MatKhau)
      .input('DaiDienDoanhNghiep', sql.NVarChar, DaiDienDoanhNghiep)
      .query(query);
    
    res.send({ message: 'Khách hàng đã được cập nhật!' });
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).send({ message: 'Error updating customer!' });
  }
});

app.delete('/customer/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM KhachHang WHERE ID = @ID';
  
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input('ID', sql.NVarChar, id)
      .query(query);
    
    res.send({ message: 'Khách hàng đã bị xóa!' });
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).send({ message: 'Error deleting customer!' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
