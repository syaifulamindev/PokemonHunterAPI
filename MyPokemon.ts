const sqlite3 = require('sqlite3').verbose()
const { APIError, HttpStatusCode } = require('./ErrorHandler')

function openDB() {
    const file = new sqlite3.Database('MyPokemon.db', (err: { message: any }) => {
        if (err) {
            console.error(err.message)
        }
        console.log('Connected to the mypokemon database.')
    })

    return file
}

function executeDB(query: string, params: any[]) {
    return new Promise((resolve, reject) => {
        const db = openDB()
        db.all(query, params, (err: any, rows: unknown) => {

            if (err) {

                // case error
                reject(err);
            }

            // "return" the result when the action finish
            resolve(rows);
        })
        db.close()
    })
}

export function createTableIfNotExist() {
    const tt = executeDB(
        `CREATE TABLE IF NOT EXISTS RenamedPokemon (
            PokemonId int NOT NULL,
            Nickname varchar(255) NOT NULL,
            RenameCount int,
            PRIMARY KEY (PokemonId)
        )`,
        []
    )

    tt.then((value) => {
        console.log('value: ' + JSON.stringify(value))
    })

}

async function insert(pokemonId: number, newNickname: string) {
    const renameCount = await getRenameCount(pokemonId)
    if (renameCount == -2) {
        const aaa = await executeDB('INSERT INTO RenamedPokemon (PokemonId, Nickname, RenameCount) VALUES (?, ?, ?)', [pokemonId, newNickname, renameCount])
        console.log('insert: ' + JSON.stringify(aaa))
    } else {
        throw new APIError(
        'ALREADY FOUND',
        HttpStatusCode.BAD_REQUEST
        )
    }
    
}

async function update(pokemonId: number, renameCount: number) {
    await executeDB('UPDATE RenamedPokemon SET RenameCount = ? WHERE PokemonID = ?', [renameCount, pokemonId])
}

async function getRenameCount(pokemonId: number) {
    var renameCount = new Number(-2)
    try {
        const result = await executeDB('SELECT renameCount FROM renamedPokemon WHERE pokemonId=?', [pokemonId])
    } catch (err) {
        throw err
    }
    return renameCount
}


module.exports = { insert, createTableIfNotExist, getRenameCount, update }