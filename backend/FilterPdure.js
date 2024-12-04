const express = require('express');
const sql = require('mssql');
const router = express.Router();

router.get('/filter', async (req, res) => {
  const { maxPrice } = req.body;
  const query = 'EXEC LocSanPhamTheoGia @maxPrice';

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
        .input('maxPrice', sql.Int, maxPrice)
        .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving product records after filter:', err);
    res.status(500).send({ message: 'Error retrieving product records after filter!' });
  }
});


module.exports = router;