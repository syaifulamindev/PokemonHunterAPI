const express = require('express');
const app = express()
const port = 3000
const routes = require('./routes');
const { createTableIfNotExist } = require('./mypokemon');

app.use('/api', routes);

var staticFileOptions = {
  extensions: ['png'],
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
app.use(express.static('public', staticFileOptions))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  createTableIfNotExist()
});