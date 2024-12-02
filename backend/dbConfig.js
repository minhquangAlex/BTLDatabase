// dbConfig.js

module.exports = {
    server: 'HUYPHAM-DELLINS', // Tên máy chủ
    database: 'shop2', // Tên database
    options: {
      encrypt: false, // Nếu không dùng SSL
      trustServerCertificate: true, // Tin tưởng chứng chỉ máy chủ 
    },
    authentication: {
      type: 'ntlm', // Dùng Windows Authentication
      options: {
        domain: 'HUYPHAM-DELLINS', // Để trống nếu không có domain
        userName: 'DELL', // Tài khoản Windows (nếu chạy dưới quyền local service thì để trống)
        password: '', // Không cần nếu dùng tài khoản của user hiện tại
      },
    },
  };
  