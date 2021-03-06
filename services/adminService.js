const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const db = require('../models')
const { Restaurant, Category, User } = db
const fs = require('fs')
const restaurant = require('../models/restaurant')


const adminService = {
  getRestaurants: (req, res, callback) => {
    // 用{ raw: true }將資料轉換成ＪＳ原生物件
    return Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    }).then(restaurants => {
      callback({ restaurants: restaurants })
    })
  },
  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(
      req.params.id,
      {
        raw: true,
        nest: true,
        include: [Category] 
      }).then(restaurant => {
        callback({ restaurant: restaurant })
      // callback({ restaurant: restaurant.toJSON() })
    })
  },
  createRestaurant: (req, res, callback) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      callback({ categories: categories })
    })
  },
  postRestaurant: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: 'name did not exist' })
    }
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        if (err) console.log('Error:', err)
        return Restaurant.create({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          image: file ? img.data.link : null,
          CategoryId: req.body.categoryId
        }).then((restaurant) => {
          callback({ status: 'success', message: 'restaurant was successfully created' })
        }).catch(err => console.log(err))
      })
    } else {
      return Restaurant.create({
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address,
        opening_hours: req.body.opening_hours,
        description: req.body.description,
        CategoryId: req.body.categoryId
      })
        .then((restaurant) => {
          callback({
            status: 'success',
            message: 'restaurant was successfully created',
            restaurant: restaurant
          })
        })
        .catch(err => console.log(err))
    }
  },
  editRestaurant: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return Restaurant.findByPk(req.params.id).then(restaurant => {
        return res.render('admin/create', {
          categories: categories,
          restaurant: restaurant.toJSON()
        })
      })
    })
  },
  putRestaurant: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: "name didn't exist" })
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.findByPk(req.params.id)
          .then((restaurant) => {
            restaurant.update({
              name: req.body.name,
              tel: req.body.tel,
              address: req.body.address,
              opening_hours: req.body.opening_hours,
              description: req.body.description,
              image: file ? img.data.link : restaurant.image,
              CategoryId: req.body.categoryId
            }).then((restaurant) => {
              callback({ status: 'success', message: 'restaurant was successfully to update' })
            })
          })
      })
    } else {
      return Restaurant.findByPk(req.params.id)
        .then((restaurant) => {
          restaurant.update({
            name: req.body.name,
            tel: req.body.tel,
            address: req.body.address,
            opening_hours: req.body.opening_hours,
            description: req.body.description,
            image: restaurant.image,
            CategoryId: req.body.categoryId
          }).then((restaurant) => {
            callback({ status: 'success', message: 'restaurant was successfully to update' })
          })
        })
    }
  },
  deleteRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id)
      .then((restaurant) => {
        restaurant.destroy()
          .then((restaurant) => {
            callback({ status: 'success', message: 'success' })
          })
      })
  },
  getUsers: (req, res, callback) => {
    return User.findAll({ raw: true })
      .then(users => {
        callback({ users: users })
        // return res.render('admin/users', { users: users })
      })
      .catch(err => console.log(err))
  },
  putUsers: (req, res, callback) => {
    const { id } = req.params
    return User.findByPk(id)
      .then(user => {
        user.update({
          isAdmin: !user.isAdmin
        }).then((user) => {
          callback({
            status: 'success',
            message: 'Update success'
          })
          // req.flash('success_messages', 'Update success')
          // return res.redirect('/admin/users')
        })
      })
  }
}

module.exports = adminService
