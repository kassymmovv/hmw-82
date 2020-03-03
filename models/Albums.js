const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  image: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
});

const Album = mongoose.model('Album', ProductSchema);

module.exports = Album;