require('dotenv').config();

const express = require('express');
const app = express();
// const port = 3000;
const PORT = process.env.PORT || 3000;


// ✅ Ini membuat folder 'public' bisa diakses langsung
app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true })); // untuk form biasa

// Sisanya...
app.use('/api/barang', require('./routes/barang'));

// app.listen(port, () => console.log(`Server jalan di http://localhost:${port}`));
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));

