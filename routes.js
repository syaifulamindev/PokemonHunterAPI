const express = require('express')
const router = express.Router()

// CATCH
router.get('/catch', (req, res) => {
  const isCatched = Math.random() < 0.5
  const result = {catch: isCatched}
  res.send(JSON.stringify(result))
})

// RELEASE
//FIXME: change to delete or post
router.get('/release', (req, res) => {
    res.send('release: random number ')
})

//RENAME
//FIXME: change to put or post
router.get('/rename', (req, res) => {
  const mypokemon = require('./mypokemon')
  const id1 = mypokemon.renameCount(1)
  const id2 = mypokemon.renameCount(2)
  console.log("id 1: "+JSON.stringify(id1))
  console.log("id 2: "+JSON.stringify(id2))

  res.send('lorem')
})

// O(1) fibbonanci using Binet's formula
function fib(n) { 
  let phi = (1 + Math.sqrt(5)) / 2; 
  return Math.round(Math.pow(phi, n) / Math.sqrt(5)); 
}
module.exports = router