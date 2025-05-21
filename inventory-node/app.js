const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Tambahkan router barang
const barangRoutes = require('./routes/barang');
app.use('/api/barang', barangRoutes);

app.get('/', (req, res) => {
  res.send('Server berjalan!');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
