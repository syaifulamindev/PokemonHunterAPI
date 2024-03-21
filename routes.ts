import express, { Express, Request, Response } from "express"
// import { APIError } from "./ErrorHandler"
import { APIError, HttpStatusCode } from "./ErrorHandler"
const mypokemon = require('./MyPokemon')
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
router.delete('/release', async (req, res) => {
  const randomInt = getRandomInt(100)
  const isPrime = checkPrime(randomInt)

  const pokemonId = req.query.pokemonId
  if (isPrime && !isEmpty(pokemonId)) {
    try {
      await mypokemon.remove(pokemonId).then(
        () => {
          // not called
          console.log('release')
        },
        (error: any) => {
          console.log('release error: ')
          console.error(error)
          
        },
      )
    } catch(err) {
      console.log(err)
    }
    
    res.send({
      success: true,
      message: "pokemon released"
    })
  } else {
    res.send({
      success: false,
      message: "can't release pokemon righ now, please try again later"
    })
  }
})

//RENAME
router.post('/rename', async (req, res) => {
  


  const pokemons: [any] = await mypokemon.getPokemon(1)
  const pokemon = pokemons[0]
  const reqPokemonId = req.query.pokemonId
  const reqNickname = req.query.nickname

  if (isEmpty(pokemon) && reqNickname != undefined) {
    await mypokemon.insert(reqPokemonId, reqNickname)
    const newNumber = fib(0)
    res.send(
      { 
        nickname: reqNickname + "-" + newNumber,
        message: "your new pokemon added, and renamed"
      }
    )
  } else if (!isEmpty(pokemon)) {
    const updatedRenameCount: number = pokemon.renameCount + 1
    await mypokemon.rename(reqPokemonId, updatedRenameCount)
    const newNumber = fib(updatedRenameCount)

    res.send(
      { 
        nickname: reqNickname + "-" + newNumber,
        message: "rename count: " + updatedRenameCount  
      }
    )
  } else {

    res.status(400).send(
      new APIError("pokemon is not found, please input your nickname", HttpStatusCode.BAD_REQUEST)
    )
  }


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

function isEmpty(val: any) {
  return (val === undefined || val == null || val.length <= 0) ? true : false;
}

export default router