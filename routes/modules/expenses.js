const express = require('express')
const Expense = require('../../models/Expense')
const Category = require('../../models/Category')
const router = express.Router()



router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  res.render('new', { categories })
})

router.post('/', async (req, res) => {
  const userId = req.user._id
  const { name, date, cost } = req.body
  console.log('req.body', req.body)
  const category = await Category.findOne({ name: req.body.category })
  const categoryId = category._id
  console.log('categoryId', categoryId)
  await Expense.create({ name, date, cost, userId, categoryId })
    .then(console.log('new expense added', req.body))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Expense.findOne({ _id, userId })
    .lean()
    .then((expense) => {
      console.log(expense)
      res.render('edit', { expense })
    })
    .catch(error => console.log(error))
})

router.put('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, cost, category } = req.body
  return Expense.findOne({ _id, userId })
    .then((expense) => {
      expense.name = name
      expense.date = date
      expense.cost = cost
      expense.category = category
      return expense.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Expense.findOne({ _id, userId })
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router