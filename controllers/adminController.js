const db = require('../models')
const Restaurant = db.Restaurant

const adminController = {
  getRestaurants: (req, res) => {
    return Restaurant.findAll({raw: true}).then(restaunants => {
      return res.render('admin/restaurants', { restaunants: restaunants })
    })
  }
}

module.exports = adminController
