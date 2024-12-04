const express = require('express');
const sql = require('mssql');
const router = express.Router();

router.get('/statistic', async (req, res) => {
  const { StartDate, EndDate } = req.body;
  const query = 'EXEC ThongKeDoanhThuTheoChiNhanh @NgayBatDau, @NgayKetThuc';

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
        .input('NgayBatDau', sql.Date, StartDate)
        .input('NgayKetThuc', sql.Date, EndDate)
        .query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving revenue statistics:', err);
    res.status(500).send({ message: 'Error retrieving revenue statistics' });
  }
});


module.exports = router;