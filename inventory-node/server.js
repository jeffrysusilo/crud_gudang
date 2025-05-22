//require('dotenv').config();

const express = require('express');
const app = express();
// const port = 3000;
const PORT = process.env.PORT ;
const path = require('path');


// ✅ Ini membuat folder 'public' bisa diakses langsung
app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true })); // untuk form biasa

// app.get('/', (req, res) => {
//   res.send('API is running 🚀');
// });


// Menyajikan file HTML/CSS/JS dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Arahkan root "/" ke index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sisanya...
const barangRoutes = require('./routes/barang');
app.use('/api/barang', barangRoutes);


// app.listen(port, () => console.log(`Server jalan di http://localhost:${port}`));
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));

