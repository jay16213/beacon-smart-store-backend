const mongoose = require('mongoose')

let promotionSchema = mongoose.Schema({
  type: { type: Number, required: true },
  product1_name: { type: String, required: true },
  product2_name: { type: String, default: '' },
  discount: { type: Number, default: 1 } // discount price = original price * discount
})

module.exports = mongoose.model('Promotion', promotionSchema)
