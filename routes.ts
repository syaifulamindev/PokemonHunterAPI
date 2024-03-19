import express, { Express, Request, Response } from "express"
const router = express.Router()

// CATCH
router.get('/catch', (req, res) => {
  const isCatched = Math.random() < 0.5
  const result = {
    catch: isCatched
  }
  res.send(JSON.stringify(result))
})

// RELEASE
//FIXME: change to delete or post
router.get('/release', (req, res) => {
  const randomInt = getRandomInt(100)
  const isPrime = checkPrime(randomInt)

  if (isPrime) {
    
  }
  
    // res.send(JSON.stringify(result))
})

//RENAME
//FIXME: change to put or post
router.get('/rename', (req, res) => {
  const mypokemon = require('./MyPokemon')
  const id1 = mypokemon.getRenameCount(1)
  const id2 = mypokemon.getRenameCount(2)
  console.log("id 1: "+JSON.stringify(id1))
  console.log("id 2: "+JSON.stringify(id2))

  res.send('lorem')
})

// O(1) fibbonanci using Binet's formula
function fib(n: number) { 
  let phi = (1 + Math.sqrt(5)) / 2; 
  return Math.round(Math.pow(phi, n) / Math.sqrt(5)); 
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

function checkPrime(n: number) { 
  // Corner case 
  if (n <= 1) 
      return false

  // Check from 2 to n-1 
  for (let i = 2; i < n; i++) 
      if (n % i == 0) 
          return false

  return true
} 

export default router