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

            console.log("error: "+JSON.stringify(err))
            console.log("type of rows: "+ typeof(rows)+"\n"+JSON.stringify(rows))
            // "return" the result when the action finish
            resolve(rows);
        })
        db.close()
    })
}

export function createTableIfNotExist() {
    const tt = executeDB(
        `CREATE TABLE IF NOT EXISTS RenamedPokemon (
            PokemonID int NOT NULL,
            Nickname varchar(255) NOT NULL,
            RenameCount int,
            PRIMARY KEY (PokemonID)
        )`,
        []
    )

    tt.then((value) => {
        console.log('value: ' + JSON.stringify(value))
    })

}

async function insert(pokemonId: number, newNickname: string) {
    await executeDB('INSERT INTO RenamedPokemon (PokemonID, Nickname, RenameCount) VALUES (?, ?, ?)', [pokemonId, newNickname, 0])
}

async function rename(pokemonId: number, renameCount: number) {
    await executeDB('UPDATE RenamedPokemon SET RenameCount = ? WHERE PokemonID = ?', [renameCount, pokemonId])
}

async function getPokemon(pokemonId: number) {
    return await executeDB('SELECT RenameCount as renameCount, Nickname as nickname, PokemonID as pokemonId FROM renamedPokemon WHERE pokemonId=?', [pokemonId])
}

async function remove(pokemonId: number) {
    return await executeDB('DELETE FROM RenamedPokemon WHERE PokemonID=?', [pokemonId])
}


module.exports = { insert, createTableIfNotExist, getPokemon, rename, remove }