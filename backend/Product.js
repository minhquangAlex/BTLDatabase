const express = require('express');
const sql = require('mssql');
const router = express.Router();

// API CRUD for Product
router.post('/product', async (req, res) => {
  console.log("Thêm sản phẩm", req.body);
  const { MaSanPham, Ten, GiaBan, GiaVonTrungBinh, HinhAnh, NhaCungCap, TinhTrang, MauSac, Loai, Size, 
          TheLoai, NhaXuatBan, NgayPhatHanh, TacGia, NguoiDich, DinhDang, SoTrang, CongDung, MoTa, LoaiSanPham
   } = req.body;

  const query = `
       EXEC addProduct @MaSanPham, @Ten, @GiaBan, @GiaVonTrungBinh, @HinhAnh, @NhaCungCap, 
       @TinhTrang, @MauSac, @Loai, @Size, @TheLoai, @NhaXuatBan, @NgayPhatHanh, @TacGia, @NguoiDich, 
       @DinhDang, @SoTrang, @CongDung, @MoTa, @LoaiSanPham
  `;
  
  try {
    const pool = req.app.locals.db;
    await pool.request()
        .input('MaSanPham', sql.VarChar, MaSanPham) 
        .input('Ten', sql.NVarChar, Ten)
        .input('GiaBan', sql.Int, GiaBan)
        .input('GiaVonTrungBinh', sql.Decimal, GiaVonTrungBinh)
        .input('HinhAnh', sql.VarBinary, HinhAnh)
        .input('NhaCungCap', sql.NVarChar, NhaCungCap)
        .input('TinhTrang', sql.NVarChar, TinhTrang)
        .input('MauSac', sql.NVarChar, MauSac)
        .input('Loai', sql.NVarChar, Loai)
        .input('Size', sql.NVarChar, Size)
        .input('TheLoai', sql.NVarChar, TheLoai)
        .input('NhaXuatBan', sql.NVarChar, NhaXuatBan)
        .input('NgayPhatHanh', sql.Date, NgayPhatHanh)
        .input('TacGia', sql.NVarChar, TacGia)
        .input('NguoiDich', sql.NVarChar, NguoiDich)
        .input('DinhDang', sql.NVarChar, DinhDang)
        .input('SoTrang', sql.Int, SoTrang)
        .input('CongDung', sql.NVarChar, CongDung)
        .input('MoTa', sql.NVarChar, MoTa)
        .input('LoaiSanPham', sql.NVarChar, LoaiSanPham)
        .query(query);
    res.send({ message: 'Sản phẩm đã được thêm!' });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).send({ message: 'Error adding product!' });
  }
});

router.get('/product', async (req, res) => {
    const query = 'SELECT * FROM SanPham';

  try {
    const pool = req.app.locals.db;

    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving product data:', err);
    res.status(500).send({ message: 'Error retrieving product data!' });
  }
});

router.get('/product/Sach', async (req, res) => {
    const query = `
        SELECT 
            p.*,
            s.TheLoai,
            s.NhaXuatBan,
            s.NgayPhatHanh,
            s.TacGia,
            s.NguoiDich,
            s.DanhGia,
            s.DinhDang,
            s.Size,
            s.SoTrang
        FROM Sach s
        INNER JOIN SanPham p ON s.MaSanPham = p.MaSanPham
        WHERE s.MaSanPham = p.MaSanPham
    `;

  try {
    const pool = req.app.locals.db;

    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving product data:', err);
    res.status(500).send({ message: 'Error retrieving product data!' });
  }
});

router.get('/product/DungCuHocTap', async (req, res) => {
    const query = `SELECT 
            p.*,
            s.MauSac,
            s.Loai, 
            s.Size
        FROM DungCuHocTap s
        INNER JOIN SanPham p ON s.MaSanPham = p.MaSanPham
        WHERE s.MaSanPham = p.MaSanPham
    `;

  try {
    const pool = req.app.locals.db;

    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving product data:', err);
    res.status(500).send({ message: 'Error retrieving product data!' });
  }
});

router.get('/product/PhuKienSach', async (req, res) => {
    const query =  `
        SELECT 
            p.*,
            s.CongDung,
            s.MoTa,
            s.MauSac
        FROM PhuKienSach s
        INNER JOIN SanPham p ON s.MaSanPham = p.MaSanPham
        WHERE s.MaSanPham = p.MaSanPham
    `;

  try {
    const pool = req.app.locals.db;

    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving product data:', err);
    res.status(500).send({ message: 'Error retrieving product data!' });
  }
});

router.get('/product/:id', async (req, res) => {
    const id = req.params.id;
  
    const query = `
      SELECT * FROM SanPham WHERE MaSanPham = @id
    `;
  
    try {
      const pool = req.app.locals.db;
      const result = await pool.request()
        .input('id', sql.VarChar, id)
        .query(query);
  
      res.json(result.recordset);
    } catch (err) {
      console.error('Error retrieving product data with ID :', err);
      res.status(500).send({ message: 'Error retrieving product data!' });
    }
  });

router.put('/product/:id', async (req, res) => {
  const { id } = req.params;
  
  const { Ten, GiaBan, GiaVonTrungBinh, HinhAnh, NhaCungCap, TinhTrang, LoaiSanPham, MauSac, Loai, Size, 
    TheLoai, NhaXuatBan, NgayPhatHanh, TacGia, NguoiDich, DinhDang, SoTrang, CongDung, MoTa
  } = req.body;
  const query = `
    EXEC updateProduct @MaSanPham, @Ten, @GiaBan, @GiaVonTrungBinh, @HinhAnh, @NhaCungCap,
    @TinhTrang, @LoaiSanPham, @MauSac, @Loai, @Size, @TheLoai, @NhaXuatBan, @NgayPhatHanh, @TacGia, @NguoiDich,
    @DinhDang, @SoTrang, @CongDung, @MoTa
    `;
    
    try {
        const pool = req.app.locals.db;
        await pool.request()
        .input('MaSanPham', sql.VarChar, id) 
        .input('Ten', sql.NVarChar, Ten)
        .input('GiaBan', sql.Int, GiaBan)
        .input('GiaVonTrungBinh', sql.Decimal, GiaVonTrungBinh)
        .input('HinhAnh', sql.VarBinary, HinhAnh)
        .input('NhaCungCap', sql.NVarChar, NhaCungCap)
        .input('TinhTrang', sql.NVarChar, TinhTrang)
        .input('LoaiSanPham', sql.NVarChar, LoaiSanPham)
        .input('MauSac', sql.NVarChar, MauSac)
        .input('Loai', sql.NVarChar, Loai)
        .input('Size', sql.NVarChar, Size)
        .input('TheLoai', sql.NVarChar, TheLoai)
        .input('NhaXuatBan', sql.NVarChar, NhaXuatBan)
        .input('NgayPhatHanh', sql.Date, NgayPhatHanh)
        .input('TacGia', sql.NVarChar, TacGia)
        .input('NguoiDich', sql.NVarChar, NguoiDich)
        .input('DinhDang', sql.NVarChar, DinhDang)
        .input('SoTrang', sql.Int, SoTrang)
        .input('CongDung', sql.NVarChar, CongDung)
        .input('MoTa', sql.NVarChar, MoTa)
        .query(query);

    res.send({ message: 'Sản phẩm đã được cập nhật!' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).send({ message: 'Error updating product!' });
  }
});

router.delete('/product/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'EXEC deleteProduct @MaSanPham';

  try {
    const pool = req.app.locals.db;
    await pool.request()
      .input('MaSanPham', sql.NVarChar, id)
      .query(query);

    res.send({ message: 'Sản phẩm đã bị xóa!' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).send({ message: 'Error deleting product!' });
  }
});

module.exports = router;