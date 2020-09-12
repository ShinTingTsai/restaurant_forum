const db = require('../models')
const Restaurant = db.Restaurant

const adminController = {
  getRestaurants: (req, res) => {
    // 用{ raw: true }將資料轉換成ＪＳ原生物件
    console.log('[getRestaurants controllers]')
    return Restaurant.findAll({ raw: true }).then(restaurants => {
      return res.render('admin/restaurants', { restaurants: restaurants })
    })
  },
  getRestaurant: (req, res) => {
    console.log('[getRestaurant controllers]')
    return Restaurant.findByPk(req.params.id, { raw: true }).then(restaurant => {
      return res.render('admin/restaurant', {
        restaurant: restaurant
      })
    })
  },
  createRestaurant: (req, res) => {
    console.log('[createRestaurant controllers]')
    return res.render('admin/create')
  },
  postRestaurant: (req, res) => {
    console.log('[postRestaurant controllers]')
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }
    return Restaurant.create({
      name: req.body.name,
      tel: req.body.tel,
      address: req.body.address,
      opening_hours: req.body.opening_hours,
      description: req.body.description
    })
      .then((restaurant) => {
        req.flash('success_messages', 'restaurant was successfully created')
        res.redirect('/admin/restaurants')
      })
  },
  editRestaurant: (req, res) => {
    console.log('[editRestaurant controllers]')
    return Restaurant.findByPk(req.params.id, { raw: true }).then(restaurant => {
      return res.render('admin/create', { restaurant: restaurant })
    })
  },
  putRestaurant: (req, res) => {
    console.log('[putRestaurant controllers]')
    if (!req.body.name) {
      req.flash('error_messages', "name didn't exist")
      return res.redirect('back')
    }
    return Restaurant.findByPk(req.params.id)
      .then((restaurant) => {
        restaurant.update({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description
        })
          .then((restaurant) => {
            req.flash('success_messages', 'restaurant was successfully to update')
            res.redirect('/admin/restaurants')
          })
      })
  },
  deleteRestaurant: (req, res) => {
    console.log('[deleteRestaurant controllers]')
    return Restaurant.findByPk(req.params.id)
      .then((restaurant) => {
        restaurant.destroy()
          .then((restaurant) => {
            res.redirect('/admin/restaurants')
          })
      })
  }
}

module.exports = adminController
