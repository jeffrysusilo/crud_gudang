const db = require('../models/db');

// GET semua barang
exports.getAllBarang = (req, res) => {
  db.query('SELECT * FROM barang', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// GET barang berdasarkan ID
exports.getBarangById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM barang WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json(result[0]);
  });
};

// POST barang baru
exports.createBarang = (req, res) => {
    const { nama_barang, jumlah, lokasi, tanggal_masuk } = req.body;
    const sql = 'INSERT INTO barang (nama_barang, jumlah, lokasi, tanggal_masuk) VALUES (?, ?, ?, ?)';
    db.query(sql, [nama_barang, jumlah, lokasi, tanggal_masuk], (err, result) => {
      if (err) {
        console.error('❌ INSERT error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Data berhasil ditambahkan', id: result.insertId });
    });
  };

// PUT update barang
exports.updateBarang = (req, res) => {
  const { id } = req.params;
  const { nama_barang, jumlah, lokasi, tanggal_masuk } = req.body;
  db.query(
    'UPDATE barang SET nama_barang=?, jumlah=?, lokasi=?, tanggal_masuk=? WHERE id=?',
    [nama_barang, jumlah, lokasi, tanggal_masuk, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Data diperbarui' });
    });
};

// DELETE barang
exports.deleteBarang = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM barang WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Data dihapus' });
  });
};

const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');

exports.exportBarangToCSV = (req, res) => {
  db.query('SELECT * FROM barang', (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const filePath = path.join(__dirname, '../exports/barang.csv');

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'nama_barang', title: 'Nama Barang' },
        { id: 'jumlah', title: 'Jumlah' },
        { id: 'lokasi', title: 'Lokasi' },
        { id: 'tanggal_masuk', title: 'Tanggal Masuk' }
      ]
    });

    csvWriter.writeRecords(results)
      .then(() => {
        res.download(filePath); // kirim file ke browser
      })
      .catch((err) => {
        res.status(500).json({ error: 'Gagal menulis CSV' });
      });
  });
};

// const fs = require('fs');
// const path = require('path');
const csv = require('csv-parser');

exports.importBarangFromCSV = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File tidak ditemukan' });
  }

  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push([
        data.nama_barang,
        parseInt(data.jumlah),
        data.lokasi,
        data.tanggal_masuk
      ]);
    })
    .on('end', () => {
      const sql = 'INSERT INTO barang (nama_barang, jumlah, lokasi, tanggal_masuk) VALUES ?';
      db.query(sql, [results], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Import berhasil', data: results.length });
      });

      // Hapus file setelah diproses
      fs.unlinkSync(filePath);
    });
};
