const express = require('express')
const router = express.Router()

const Beacon = require('../models/beacon')

// route: /api/*

router.get('/beacons', (req, res) => {
  Beacon.find({}, (err, result) => {
    if (err) {
      console.log(err)
    }

    console.log(result)
    res.json(result)
  })
})

router.get('/beacon/:uuid', (req, res) => {
  Beacon.findOne({ 'uuid': req.params.uuid }, (err, result) => {
    if (err) {
      console.log(err)
    }

    res.json(result)
  })
})

module.exports = router
