const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangController');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // untuk form biasa

// CRUD routes
router.get('/', barangController.getAllBarang);
router.get('/:id', barangController.getBarangById);
router.post('/', barangController.createBarang);
router.put('/:id', barangController.updateBarang);
router.delete('/:id', barangController.deleteBarang);
router.get('/export/csv', barangController.exportBarangToCSV);

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/import/csv', upload.single('file'), barangController.importBarangFromCSV);

module.exports = router;
