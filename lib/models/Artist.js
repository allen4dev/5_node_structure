const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArtistSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
