const express = require('express')
const router = express.Router()

const Expense = require('../../models/Expense')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name, date, cost, category } = req.body
  return Expense.create({ name, date, cost, category })
    .then(console.log('new expense added', req.body))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Expense.findById(id)
    .lean()
    .then((expense) => {
      console.log(expense)
      res.render('edit', { expense })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, cost, category } = req.body
  return Expense.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Expense.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router