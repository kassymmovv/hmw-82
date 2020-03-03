const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authors = require('./app/authors');
const albums = require('./app/albums');
const tracks = require('./app/tracks');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect('mongodb://localhost/radio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  app.use('/authors', authors);
  app.use('/albums', albums);
  app.use('/tracks', tracks);

  app.listen(port, () => {
    console.log(`HTTP Server started on ${port} port!`);
  });
};

run().catch(e => {
  console.error(e);
});