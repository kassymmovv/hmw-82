const path = require('path');

const express = require('express');
const Author = require('../models/Author');
const multer = require('multer');
const nanoid = require('nanoid');
const config = require('../config');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.get('/', async (req, res) => {
    const author = await Author.find();

    return res.send(author);
});

router.post('/',upload.single('image'), async (req, res) => {
    const Data = req.body;

    if (req.file) {
        Data.image = req.file.filename;
    }

    const author = new Author(Data);

    try {
        await author.save();

        return res.send({id: author._id});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;