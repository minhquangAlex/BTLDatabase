const express = require('express');
const sql = require('mssql');
const router = express.Router();

router.get('/filter', async (req, res) => {
  const query = 'EXEC LocSanPhamTheoGia 50000';

  try {
    const pool = req.app.locals.db;
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving product records after filter:', err);
    res.status(500).send({ message: 'Error retrieving product records after filter!' });
  }
});


module.exports = router;