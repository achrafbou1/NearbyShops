const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
var GeoJSON = require('mongoose-geojson-schema');

const Schema = mongoose.Schema;

const Shop = new Schema({
  picture: String,
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  city: String,
  location: mongoose.Schema.Types.Point
});

Shop.plugin(passportLocalMongoose);


module.exports = mongoose.model('Shop', Shop);