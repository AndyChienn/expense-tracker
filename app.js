const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const PORT = 3000


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/edit', (req, res) => {
  res.render('edit')
})

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})

