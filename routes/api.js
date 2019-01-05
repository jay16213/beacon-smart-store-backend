const express = require('express')
const router = express.Router()

const Product = require('../models/product')
const Promotion = require('../models/promotion')

// route: /api/*

router.get('/products', (req, res) => {
  Product.find({}, (err, result) => {
    if (err) {
      console.log(err)
    }

    console.log(result)
    res.json(result)
  })
})

router.get('/products/:uuid', (req, res) => {
  Product.findOne({ 'beacon_uuid': req.params.uuid }, (err, result) => {
    if (err) {
      console.log(err)
    }

    res.json(result)
  })
})

router.get('/promotions', (req, res) => {
  Promotion.find({}, (err, result) => {
    if (err) {
      console.log(err)
    }

    res.json(result)
  })
})

module.exports = router
