const Category = require('../Category')
const User = require('../User')
const Expense = require('../Expense')
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USERS = [
  {
    name: '野原廣志',
    email: 'user1@example.com',
    password: '12345678',
    records: [
      {
        name: '午餐',
        date: '2019-04-23',
        cost: 60,
        category: "餐飲食品"
      },
      {
        name: '晚餐',
        date: '2019-04-23',
        cost: 60,
        category: "餐飲食品"
      },
      {
        name: '捷運',
        date: '2019-04-23',
        cost: 120,
        category: "交通出行"
      },
      {
        name: '租金',
        date: '2015-04-01',
        cost: 25000,
        category: "家居物業"
      }
    ]
  },
  {
    name: '野原小新',
    email: 'user2@example.com',
    password: '12345678',
    records: [
      {
        name: '電影：驚奇隊長',
        date: '2019-04-19',
        cost: 220,
        category: "休閒娛樂"
      }
    ]
  }
]


db.once('open', () => {
  Promise.all(
    SEED_USERS.map((SEED_USER) => {
      const records = SEED_USER.records
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => {
          return User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
          }).then((user) => {
            return Promise.all(
              records.map(record => {
                return Category.findOne({ name: record.category })
                  .then(category => {
                    return Expense.create({
                      name: record.name,
                      date: record.date,
                      cost: record.cost,
                      userId: user._id,
                      categoryId: category._id
                    })
                  })
              })
            )
          })
        })
    })

  ).then(() => {
    console.log('all created!')
    process.exit()
  })
})