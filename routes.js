const express = require('express')
const router = express.Router()

// CATCH
router.get('/catch', (req, res) => {
  const isCatched = Math.random() < 0.5
  const result = {catch: isCatched}
  res.send(JSON.stringify(result))
})

// RELEASE
router.delete('/release', (req, res) => {
    res.send('release: random number ')
})

//RENAME
//FIXME: change to post
router.get('/rename', (req, res) => {
  const sqlite3 = require('sqlite3').verbose()
  const db = new sqlite3.Database('mypokemon.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message)
    }
    console.log('Connected to the mypokemon database.')
  })
  
  db.serialize(() => {
    // db.run('CREATE TABLE renamedPokemon (pokemonId INT, newNickname TEXT, renameCount INT)')
    db.run('INSERT INTO renamedPokemon (pokemonId, newNickname, renameCount) VALUES (2, "my pokemon 3", -1)')

  
    db.each('SELECT * FROM renamedPokemon', (err, row) => {
      console.log(JSON.stringify(row))
    })
  })
  
  db.close()

  res.send('lorem')
})

// O(1) fibbonanci using Binet's formula
function fib(n) { 
  let phi = (1 + Math.sqrt(5)) / 2; 
  return Math.round(Math.pow(phi, n) / Math.sqrt(5)); 
}
module.exports = router