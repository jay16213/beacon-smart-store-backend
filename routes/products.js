const express = require('express')
const router = express.Router()

const moment = require('moment')
const Product = require('../models/product')

router.get('/', (req, res) => {
  Product.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }

    res.render('products/show', {
      title: 'Products',
      products: data,
      moment: moment
    })
  }).sort('expiration')
})

router.get('/create', (req, res) => {
  res.render('products/new', {
    title: 'Create Product'
  })
})

router.post('/create', (req, res) => {
  let newProduct = new Product()
  newProduct.name = req.body.name
  newProduct.price = req.body.price
  newProduct.expiration = req.body.expiration
  newProduct.beacon_uuid = req.body.beacon_uuid

  newProduct.save((err) => {
    if (err) {
      console.log(err)
    }

    console.log(newProduct)
    res.redirect('/products')
  })
})

router.get('/edit/:id', (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err)
    }

    res.render('products/edit', {
      title: 'Edit Product',
      product: data,
      moment: moment
    })
  })
})

router.post('/edit/:id', (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err)
    }

    data.name = req.body.name
    data.price = req.body.price
    data.expiration = req.body.expiration
    data.beacon_uuid = req.body.beacon_uuid

    data.save((err) => {
      if (err) {
        console.log(err)
      }
      res.redirect('/products')
    })
  })
})

router.delete('/destroy/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err)
    }
    res.status(200).end()
  })
})

module.exports = router
