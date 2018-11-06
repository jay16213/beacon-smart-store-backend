const mongoose = require('mongoose')

var productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  expiration: { type: Date }
})

module.exports = mongoose.model('Product', productSchema)
