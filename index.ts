import express, { Express, Request, Response, NextFunction } from "express"
import routes from './routes'
import "express-async-errors"

const app = express()
const port = 3000

const { createTableIfNotExist } = require('./MyPokemon');

app.use('/api', routes);

var staticFileOptions = {
  extensions: ['png'],
  setHeaders: function (res: { set: (arg0: string, arg1: number) => void }, path: any, stat: any) {
    res.set('x-timestamp', Date.now())
  }
}
app.use(express.static('public', staticFileOptions))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  createTableIfNotExist()
});
