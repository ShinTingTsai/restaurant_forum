const db = require('../../models')
const { Restaurant, Category, User } = db


const adminController = {
  getRestaurants: (req, res) => {
    // 用{ raw: true }將資料轉換成ＪＳ原生物件
    return Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    }).then(restaurants => {
      console.log(restaurants)
      return res.json({ restaurants: restaurants })
    })
  }
}

module.exports = adminController
