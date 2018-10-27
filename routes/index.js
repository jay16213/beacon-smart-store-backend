var express = require('express')
var router = express.Router()

const Beacon = require('../models/beacon')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/beacons', (req, res) => {
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
