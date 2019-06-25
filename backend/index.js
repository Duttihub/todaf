const express = require('express')
const sqlite = require('sqlite')
const bodyParser = require('body-parser')
const { check, validationResult, body } = require('express-validator');

const dbPromise = sqlite.open('./db.sqlite', { Promise });
dbPromise.then((db) => {

  db.migrate({ force: 'last' })


  const app = express()
  app.use(bodyParser.json())

  // Return all movies with filter
  // @TODO: Filter implementieren
  app.get('/', async (req, res) => {
    const result = await db.all('SELECT * FROM Movie')
    res.json(result);
  })

  // Categories
  app.get('/categories', async (req, res) => {
    const result = await db.all('SELECT * FROM Category')
    res.json(result);
  })

  // Single Movie
  app.get('/:id', async (req, res) => {
    const result = await db.get('SELECT * FROM Movie WHERE id = ?', req.params.id)
    if (result === undefined) {
      return res.json({ error: 'Movie does not exist.' })
    }

    return res.json(result);
  })

  // Create new Movie
  app.post('/',
    [
      check('categoryId').isNumeric(),
      check('title').isString(),
      check('descriptionText').isString(),
      body('title').custom(async (value) => {
        const result = await db.get('SELECT * FROM Movie WHERE title = ?', value)
        if (result !== undefined) {
          return Promise.reject('Movie already exists');
        }
      })

    ], async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      await db.run('INSERT INTO Movie (categoryId, title, descriptiontext) VALUES (?,?,?)', req.body.categoryId, req.body.title, req.body.descriptionText)
      return res.status(201).send();
    })

  // Update Movie
  app.post('/:id', [
    check('descriptionText').isString(),
    check('categoryId').isNumeric(),
    check('title').isString(),
    check('id').isNumeric()
  ], async (req, res) => {
    const resp = await db.run('UPDATE Movie SET title = ?, categoryId = ?, descriptionText = ? WHERE id = ?', req.body.title, req.body.categoryId, req.body.descriptionText, req.params.id)
    res.status(200).json();
  })

  // Delete Movie
  app.delete('/:id',
    [
      check('id').isNumeric()
    ], async (req, res) => {
      const stm = await db.run('DELETE FROM Movie WHERE id = ?', req.params.id)
      res.send('Hello World')
    })





  app.listen(3000)
})

