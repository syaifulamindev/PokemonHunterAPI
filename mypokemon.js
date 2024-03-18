const sqlite3 = require('sqlite3').verbose()

function openDB() {
    const file = new sqlite3.Database('mypokemon.db', (err) => {
        if (err) {
            console.error(err.message)
        }
        console.log('Connected to the mypokemon database.')
    })

    return file
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

function createTableIfNotExist() {
    const tt = executeDB(
        'CREATE TABLE IF NOT EXISTS renamedPokemon (\
            PokemonId int NOT NULL,\
            Nickname varchar(255) NOT NULL,\
            RenameCount int,\
            PRIMARY KEY (PokemonId)\
        )'
    )

    tt.then((value) => {
        console.log('value: '+ JSON.stringify(value))
    })

}

function insert(pokemonId, newNickname, renameCount) {
    executeDB('INSERT INTO renamedPokemon (pokemonId, newNickname, renameCount) VALUES (?, ?, ?)')
}

function update(pokemonId, newNickname, renameCount) {
    executeDB('INSERT INTO renamedPokemon (pokemonId, newNickname, renameCount) VALUES (?, ?, ?)')
}

async function renameCount(pokemonId) {
    
    var renameCount = new Number(-2)
    try {
        const result = await executeDB('SELECT renameCount FROM renamedPokemon WHERE pokemonId=?', [pokemonId])
        console.log('result from renameCount id: ' + pokemonId + ': '+JSON.stringify(result))
      } catch (err) {
        return console.error(err.message);
      }

    
}
module.exports = { insert, renameCount, createTableIfNotExist }