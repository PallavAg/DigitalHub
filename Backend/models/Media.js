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
  }
});

module.exports = mongoose.model('Media', MediaSchema);
