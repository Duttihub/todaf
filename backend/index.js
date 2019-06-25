const express = require('express')
const app = express()

// Return all movies with filter
// @TODO: Filter implementieren
app.get('/', function (req, res) {
  res.send('Hello World')
})

// Single Movie
app.get('/:id', function (req, res) {
  res.send('Hello World ' + req.params.id)
})

// Create new Movie
app.post('/', function (req, res) {
  res.send('Hello World')
})

// Update Movie
app.post('/:id', function (req, res) {
  res.send('Hello World')
})

// Delete Movie
app.delete('/:id', function (req, res) {
  res.send('Hello World')
})

// Categories
app.get('/categories', function (req, res) {
  res.send('Hello World')
})



app.listen(3000)