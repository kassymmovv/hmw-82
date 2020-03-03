const express = require('express');

const Tracks = require('../models/Tracks');


const router = express.Router();


router.get('/', async (req, res) => {
  const tracks = await Tracks.find();

  if(req.query.album){
    const track = await Tracks.find({album:req.query.album});
    res.send(track)
  }

  return res.send(tracks);
});



router.post('/', async (req, res) => {
  const tracks = new Tracks(req.body);

  await tracks.save();

  return res.send(tracks);
});

module.exports = router;