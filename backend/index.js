const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'db_crud2'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Conectado a la base de datos MySQL');
});

// Rutas para productos
app.get('/productos', (req, res) => {
  connection.query('SELECT * FROM productos', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/productos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM productos WHERE id = ?', [id], (error, result) => {
    if (error) throw error;
    res.json(result[0]);
  });
});

app.post('/productos', (req, res) => {
  const producto = req.body;
  connection.query('INSERT INTO productos SET ?', producto, (error, result) => {
    if (error) throw error;
    res.status(201).json(result.insertId);
  });
});

app.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const producto = req.body;
  connection.query('UPDATE productos SET ? WHERE id = ?', [producto, id], (error, result) => {
    if (error) throw error;
    res.status(200).json({ id });
  });
});

app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM productos WHERE id = ?', [id], (error, result) => {
    if (error) throw error;
    res.status(200).json({ id });
  });
});

// Rutas para usuarios
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, result) => {
    if (error) throw error;
    res.json(result[0]);
  });
});

app.post('/usuarios', (req, res) => {
  const usuario = req.body;
  connection.query('INSERT INTO usuarios SET ?', usuario, (error, result) => {
    if (error) throw error;
    res.status(201).json(result.insertId);
  });
});

app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const usuario = req.body;
  connection.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, id], (error, result) => {
    if (error) throw error;
    res.status(200).json({ id });
  });
});

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, result) => {
    if (error) throw error;
    res.status(200).json({ id });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
