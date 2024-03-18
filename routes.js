const express = require('express')
const router = express.Router()

// CATCH
router.get('/catch', (req, res) => {
  res.send('catch: random boolean ')
})

// RELEASE
router.delete('/release', (req, res) => {
    res.send('release: random number ')
})

//RENAME
router.post('/rename', (req, res) => {
    res.send('')
})

module.exports = router