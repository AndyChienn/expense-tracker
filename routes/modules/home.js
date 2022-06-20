const express = require('express')
const Expense = require('../../models/Expense')
const Category = require('../../models/category')
const router = express.Router()



router.get('/', async (req, res) => {

  const userId = req.user._id
  const categoryName = req.query.category
  const expenses = await Expense.find({ userId }).lean().sort({ date: 'asc' })
  const categories = await Category.find({}).lean()
  let choosenExpenses = expenses
  let totalAmount = 0
  expenses.forEach(expense => {
    const categoryId = expense.categoryId
    // expense.icon = categories.filter(category => categoryId.equals(category._id))[0].icon

    expense.icon = categories.find(category => categoryId.toString() === category._id.toString()).icon

    totalAmount += expense.cost
  })
  if (categoryName) {
    const categoryId = categories.find(category => category.name === categoryName)._id
    totalAmount = 0
    choosenExpenses = expenses.filter(expense => expense.categoryId.toString() === categoryId.toString())
    choosenExpenses.forEach(choosenExpense => {
      choosenExpense.icon = categories.find(category => categoryId === category._id).icon
      totalAmount += choosenExpense.cost
    })
  }
  return res.render('index', {
    expenses: choosenExpenses,
    categories: categories,
    totalAmount,
    categoryName
  })
})


// router.get('/', async (req, res) => {

//   const userId = req.user._id
//   const categoryName = req.query.category
//   console.log("req.query", req.query)
//   Expense.find({ userId })
//     .lean()
//     .sort({ date: 'asc' })
//     .then(expenses => {
//       let totalAmount = 0
//       expenses.forEach(expense => {
//         totalAmount += expense.cost
//       })
//       res.render('index', { expenses, totalAmount })
//     })
//     .catch(error => console.log(error))
// })





module.exports = router