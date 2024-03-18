const sqlite3 = require('sqlite3').verbose()

function openDB() {
    const file = new sqlite3.Database('mypokemon.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message)
        }
        console.log('Connected to the mypokemon database.')
    })

    return file
}

function insert() {
    executeDB('INSERT INTO renamedPokemon (pokemonId, newNickname, renameCount) VALUES (2, "my pokemon 3", -1)')
}

function executeDB(query, params) {
    return new Promise((resolve, reject) => {
        const db = openDB()
        db.all(query, params, (err, rows) => {

            if(err) {
                
                // case error
                reject(err);
            }

            // "return" the result when the action finish
            resolve(rows);
        })
        db.close()
    })
}

async function renameCount(pokemonId) {
    
    var renameCount = new Number(-2)
    try {
        const result = await executeDB('SELECT renameCount FROM renamedPokemon WHERE pokemonId=?', [pokemonId])
        console.log('result from renameCount: '+JSON.stringify(result))
      } catch (err) {
        return console.error(err.message);
      }

    
}
module.exports = { insert, renameCount }