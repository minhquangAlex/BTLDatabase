const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const tableConfig = require('./tableConfig');
const dbConfig = require('./dbConfig');

const app = express();
const port = 3000;

// Kết nối cơ sở dữ liệu
sql.connect(dbConfig)
  .then(pool => {
    console.log('Connected to the database');
    app.locals.db = pool;
  })
  .catch(err => {
    console.error('Connection error:', err.stack);
    process.exit(1);
  });


app.use(bodyParser.json());

function getTableConfig(tableKey) {
  const config = tableConfig[tableKey];
  if (!config) throw new Error(`Table configuration for ${tableKey} not found`);
  return config;
}

function buildCompositeQueryParams(primaryKey, id) {
  if (Array.isArray(primaryKey)) {
    return primaryKey.map((key, index) => ({
      key,
      value: id[index]
    }));
  }
  return [{ key: primaryKey, value: id }];
}

app.post('/:table', async (req, res) => {
  try {
    const { table } = req.params;
    const { tableName } = getTableConfig(table);
    const data = req.body;

    const columns = Object.keys(data).join(', ');
    const values = Object.keys(data).map(key => `@${key}`).join(', ');

    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;

    const pool = req.app.locals.db;
    const request = pool.request();

    Object.keys(data).forEach(key => {
      request.input(key, data[key]);
    });

    await request.query(query);
    res.send({ message: `Record added to ${tableName}!` });
  } catch (err) {
    console.error(`Error inserting into ${req.params.table}:`, err);
    res.status(500).send({ message: `Error inserting into ${req.params.table}!` });
  }
});

app.get('/:table', async (req, res) => {
  try {
    const { table } = req.params;
    const { tableName } = getTableConfig(table);

    const query = `SELECT * FROM ${tableName}`;
    const pool = req.app.locals.db;
    const result = await pool.request().query(query);

    res.json(result.recordset);
  } catch (err) {
    console.error(`Error retrieving from ${req.params.table}:`, err);
    res.status(500).send({ message: `Error retrieving from ${req.params.table}!` });
  }
});

app.get('/:table/:id', async (req, res) => {
  try {
    const { table, id } = req.params;
    const { tableName, primaryKey } = getTableConfig(table);

    if (typeof id !== 'string' || id.trim() === '') {
      return res.status(400).send({ message: 'Invalid ID format' });
    }

    const ids = id.split(',');

    let queryParams = ids.map((idValue) => ({
      key: primaryKey,
      value: idValue.trim() 
    }));
    let query = `SELECT * FROM ${tableName} WHERE `;
    queryParams.forEach((param, index) => {
      query += `${param.key} = @${param.key}`;
      if (index < queryParams.length - 1) {
        query += ' OR ';
      }
    });

    const pool = req.app.locals.db;
    const request = pool.request();

    queryParams.forEach(param => {
      request.input(param.key, sql.VarChar, param.value); 
    });

    const result = await request.query(query);

    if (result.recordset.length === 0) {
      return res.status(404).send({ message: `No record found in ${tableName}` });
    }

    res.json(result.recordset);
  } catch (err) {
    console.error(`Error retrieving from ${req.params.table}:`, err);
    res.status(500).send({ message: `Error retrieving from ${req.params.table}!` });
  }
});

app.put('/:table/:id', async (req, res) => {
  try {
    const { table, id } = req.params;
    const { tableName, primaryKey } = getTableConfig(table);
    const data = req.body;

    const queryParams = buildCompositeQueryParams(primaryKey, id.split(','));

    const setString = Object.keys(data)
      .map(key => `${key} = @${key}`)
      .join(', ');

    let query = `UPDATE ${tableName} SET ${setString} WHERE `;
    queryParams.forEach((param, index) => {
      query += `${param.key} = @${param.key}`;
      if (index < queryParams.length - 1) {
        query += ' AND ';
      }
    });

    const pool = req.app.locals.db;
    const request = pool.request();

    queryParams.forEach(param => {
      request.input(param.key, sql.VarChar, param.value);
    });

    Object.keys(data).forEach(key => {
      request.input(key, data[key]);
    });

    await request.query(query);
    res.send({ message: `Record updated in ${tableName}!` });
  } catch (err) {
    console.error(`Error updating ${req.params.table}:`, err);
    res.status(500).send({ message: `Error updating ${req.params.table}!` });
  }
});

app.delete('/:table/:id', async (req, res) => {
  try {
    const { table, id } = req.params;
    const { tableName, primaryKey } = getTableConfig(table);

    const queryParams = buildCompositeQueryParams(primaryKey, id.split(','));

    let query = `DELETE FROM ${tableName} WHERE `;
    queryParams.forEach((param, index) => {
      query += `${param.key} = @${param.key}`;
      if (index < queryParams.length - 1) {
        query += ' AND ';
      }
    });

    const pool = req.app.locals.db;
    const request = pool.request();

    queryParams.forEach(param => {
      request.input(param.key, sql.VarChar, param.value);
    });

    await request.query(query);
    res.send({ message: `Record deleted from ${tableName}!` });
  } catch (err) {
    console.error(`Error deleting from ${req.params.table}:`, err);
    res.status(500).send({ message: `Error deleting from ${req.params.table}!` });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
