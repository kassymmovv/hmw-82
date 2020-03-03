const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');

const Album = require('../models/Albums');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await Album.find();

  if (!req.query.artist){
    res.send(items);

  }else {
    const item = await Album.find({author: req.query.artist});
    res.send(item)
  }


  console.log(req.query.artist)
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Album.findById(req.params.id).populate('author');

    if (!item) {
      return res.status(404).send({message: 'Not found'});
    }

    res.send(item);
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const Data = req.body;

  if (req.file) {
    Data.image = req.file.filename;
  }

  const product = new Album(Data);

  try {
    await product.save();

    return res.send({id: product._id});
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;