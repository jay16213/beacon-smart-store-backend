const express = require('express')
const router = express.Router()

const Beacon = require('../models/beacon')

// route: /beacon/*

router.get('/create', (req, res) => {
  res.render('beacon', {
    title: 'Create Beacon'
  })
})

router.post('/create', (req, res) => {
  let newBeacon = new Beacon()

  newBeacon.uuid = req.body.uuid
  newBeacon.product_id = req.body.product_id
  newBeacon.product_name = req.body.product_name

  newBeacon.save((err) => {
    if (err) {
      console.log(err)
    }

    console.log(newBeacon)
    res.redirect('/beacons')
  })
})

router.get('/edit/:id', (req, res) => {
  Beacon.findById(req.params.id, (err, result) => {
    if (err) {
      console.log(err)
    }

    res.render('beacon-edit', {
      title: 'Edit Beacon',
      beacon: result
    })
  })
})

router.post('/edit/:id', (req, res) => {
  Beacon.findById(req.params.id, (err, result) => {
    if (err) {
      console.log(err)
    }

    result.uuid = req.body.uuid
    result.product_id = req.body.product_id
    result.product_name = req.body.product_name
    result.save((err) => {
      if (err) {
        console.log(err)
      }

      console.log(result)
      res.redirect('/beacons')
    })
  })
})

router.delete('/:id', (req, res) => {
  Beacon.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err)
    }
    console.log('Success delete')
    res.end('success')
  })
})

router.get('/', (req, res) => {
  Beacon.find({}, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
    res.render('beacons', {
      title: 'Beacons',
      beacons: result
    })
  })
})

module.exports = router
