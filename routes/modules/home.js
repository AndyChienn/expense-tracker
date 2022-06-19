const express = require('express')
const router = express.Router()

const Expense = require('../../models/Expense')

router.get('/', (req, res) => {
  const userId = req.user._id
  Expense.find({ userId })
    .lean()
    .sort({ date: 'asc' })
    .then(expenses => {
      let totalAmount = 0
      expenses.forEach(expense => {
        totalAmount += expense.cost
      })
      res.render('index', { expenses, totalAmount })
    })
    .catch(error => console.log(error))
})


module.exports = router