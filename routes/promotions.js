const express = require('express')
const router = express.Router()

const Product = require('../models/product')
const Promotion = require('../models/promotion')

const promotionType = [
  'Buy one get one free',
  'Discount price',
  'Promotion combination',
  'Second discount'
]

router.get('/', (req, res) => {
  Promotion.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }

    res.render('promotions/show', {
      title: 'Promotion',
      promotions: data,
      promotionType: promotionType
    })
  })
})

router.get('/create', (req, res) => {
  // distinct will return a list of product name
  Product.distinct('name', (err, data) => {
    if (err) {
      console.log(err)
    }

    data.sort()
    res.render('promotions/new', {
      title: 'New Promotion',
      products: data,
      promotionType: promotionType
    })
  })
})

router.post('/create', (req, res) => {
  let newPromotion = new Promotion()
  newPromotion.type = req.body.promotion_type
  newPromotion.product1_name = req.body.product1_name
  newPromotion.product2_name = req.body.product2_name
  newPromotion.discount = req.body.discount || 1

  console.log(newPromotion)
  newPromotion.save((err) => {
    if (err) {
      console.log(err)
    }

    res.redirect('/promotions')
  })
})

router.get('/edit/:id', (req, res) => {
  Promotion.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err)
    }

    Product.distinct('name', (err, prouctData) => {
      if (err) {
        console.log(err)
      }

      prouctData.sort()

      res.render('promotions/edit', {
        title: 'Edit Promotion',
        products: prouctData,
        promotion: data,
        promotionType: promotionType
      })
    })
  })
})

router.post('/edit/:id', (req, res) => {
  Promotion.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err)
    }

    data.type = req.body.promotion_type
    data.product1_name = req.body.product1_name
    data.product2_name = req.body.product2_name
    data.discount = req.body.discount || 0

    data.save((err) => {
      if (err) {
        console.log(err)
      }
      res.redirect('/promotions')
    })
  })
})

router.delete('/destroy/:id', (req, res) => {
  Promotion.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err)
    }
    res.status(200).end()
  })
})

module.exports = router
