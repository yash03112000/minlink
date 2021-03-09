const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  title: {
    type: String
  },
  uniqueid: {
    type: String
  },
  status: {
    type: String
  },
  password: {
    type: String
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId
  },
  link: {
    type: String
  }
});

module.exports = mongoose.model('Link', LinkSchema);
