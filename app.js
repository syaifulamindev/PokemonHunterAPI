const express = require('express');
const app = express()
const port = 3000
const routes = require('./routes')

app.use('/api', routes);

var staticFileOptions = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['png'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
app.use(express.static('public', staticFileOptions))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});