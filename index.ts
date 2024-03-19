import express, { Express, Request, Response } from "express"

const app = express()
const port = 3000
import routes from './routes'
// const bodyParser = require('body-parser')

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

// const jsonErrorHandler = (err: any, req: any, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { error: any }): void; new(): any } } }, next: any) => {
//   res.status(500).send({ error: err });
// }

// app.use(bodyParser.json())
// app.use(jsonErrorHandler)