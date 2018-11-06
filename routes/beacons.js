const express = require('express')
const router = express.Router()

const Beacon = require('../models/beacon')

// route: /beacons/*

router.get('/', (req, res) => {
  Beacon.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render('beacons', {
      title: 'Beacons',
      beacons: data
    })
  })
})

router.get('/create', (req, res) => {
  res.render('beacons-new', {
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
  Beacon.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err)
    }

    res.render('beacons-edit', {
      title: 'Edit Beacon',
      beacon: data
    })
  })
})

router.post('/edit/:id', (req, res) => {
  Beacon.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err)
    }

    data.uuid = req.body.uuid
    data.product_id = req.body.product_id
    data.product_name = req.body.product_name

    data.save((err) => {
      if (err) {
        console.log(err)
      }

      console.log(data)
      res.redirect('/beacons')
    })
  })
})

router.delete('/destroy/:id', (req, res) => {
  Beacon.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err)
    }
    res.status(200).end()
  })
})

module.exports = router
