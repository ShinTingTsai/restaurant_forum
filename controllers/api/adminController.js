const { database } = require('faker')
const db = require('../../models')
const { Restaurant, Category, User } = db
const adminService = require('../../services/adminService.js')


const adminController = {
  // getRestaurants: (req, res) => {
  //   // 用{ raw: true }將資料轉換成ＪＳ原生物件
  //   return Restaurant.findAll({
  //     raw: true,
  //     nest: true,
  //     include: [Category]
  //   }).then(restaurants => {
  //     console.log(restaurants)
  //     return res.json({ restaurants: restaurants })
  //   })
  // }

  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.json(data)
    })
  }
}

module.exports = adminController
