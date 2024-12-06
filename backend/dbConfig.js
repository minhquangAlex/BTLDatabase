// dbConfig.js

module.exports = {
    server: 'JERRYHALLWELL-L\\SQLEXPRESS', // Tên máy chủ
    database: 'Book_database', // Tên database
    options: {
      encrypt: false, // Nếu không dùng SSL
      trustServerCertificate: true, // Tin tưởng chứng chỉ máy chủ 
    },
    authentication: {
      type: 'ntlm', // Dùng Windows Authentication
      options: {
        domain: 'JERRYHALLWELL-L', // Để trống nếu không có domain
        userName: 'ACER', // Tài khoản Windows (nếu chạy dưới quyền local service thì để trống)
        password: '', // Không cần nếu dùng tài khoản của user hiện tại
      },
    },
  };
  