const express = require('express')
const router = express.Router()

const Expense = require('../../models/Expense')

router.get('/', (req, res) => {
  Expense.find({})
    .lean()
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