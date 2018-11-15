var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MediaSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    required: false
  },
  mediaName: {
    type: String,
    required: false
  },
  mediaImage: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Media', MediaSchema);
