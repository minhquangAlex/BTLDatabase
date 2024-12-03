const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const dbConfig = require('./dbConfig');
const customerApi = require('./Customer');
const employeeApi = require('./Employee');
const branchApi = require('./Branch');
const supplierApi = require('./Supplier');
const voucherApi = require('./Voucher');
const salaryApi = require('./Salary');
const app = express();
const port = 3000;

// Kết nối cơ sở dữ liệu
sql.connect(dbConfig)
  .then(pool => {
    console.log('Connected to the database');
    app.locals.db = pool; // Lưu kết nối vào app.locals
  })
  .catch(err => {
    console.error('Connection error: ', err.stack);
    process.exit(1);
  });

// Middleware
app.use(bodyParser.json());

// Đăng ký các API
app.use(customerApi);
app.use(employeeApi);
app.use(branchApi);
app.use(supplierApi);
app.use(voucherApi);
app.use(salaryApi);
// Khởi chạy server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
