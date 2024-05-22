const express = require('express');
const multer = require('multer');
const Art = require('../models/Art');
const router = express.Router();
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

router.get('/',(req,res)=>{
    res.render("index")
})

const upload = multer({ storage: storage });

// Route to display gallery
router.get('/gallery', async (req, res) => {
    const arts = await Art.find();
    res.render('gallery', { arts });
});

// Route to upload art
router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload', upload.single('artImage'), async (req, res) => {
    const { title, description, artist } = req.body;
    const art = new Art({
        title,
        description,
        artist,
        imageUrl: '/uploads/' + req.file.filename
    });
    // await art.save();
    res.redirect('/gallery');
});

module.exports = router;
