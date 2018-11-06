const mongoose = require('mongoose')

let productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  expiration: Date,
  beacon_uuid: String
})

module.exports = mongoose.model('Product', productSchema)
