const mongoose = require('mongoose')

var beaconSchema = mongoose.Schema({
  uuid: { type: String, required: true },
  product_id: { type: Number },
  product_name: { type: String }
})

module.exports = mongoose.model('Beacon', beaconSchema)
