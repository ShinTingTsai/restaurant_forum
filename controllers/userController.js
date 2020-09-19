const bcrypt = require('bcryptjs')
const db = require('../models')
const { Restaurant, Comment, User, Favorite, Like } = db
const user = require('../models/user')
const imgur = require('imgur-node-api')
const restaurant = require('../models/restaurant')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },

  signUp: (req, res) => {
    // confirm password
    if(req.body.passwordCheck !== req.body.password){
      req.flash('error_messages', '兩次密碼輸入不同！')
      return res.redirect('/signup')
    } else {
       // confirm unique user
       User.findOne({where: {email: req.body.email}}).then(user => {
         if(user){
           req.flash('error_messages', '信箱重複！')
           return res.redirect('/signup')
         } else {
           User.create({
             name: req.body.name,
             email: req.body.email,
             password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
           }).then(user => {
             req.flash('success_messages', '成功註冊帳號！')
             return res.redirect('/signin')
           })
         }
       })
    }
  },

  signInPage: (req, res) => {
    return res.render('signin')
  },

  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/restaurants')
  },

  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },

  getUser: (req, res) => {
    let isOwner = false
    if (Number(req.params.id) === req.user.id) isOwner = true
    return User.findByPk(req.params.id).then(userChecked => {
      if (userChecked.image === null) userChecked.image = 'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-33.png'
      Comment.findAll({
        where: { UserId: req.params.id },
        attributes: ['RestaurantId'],
        group: ['RestaurantId'],
        include: [Restaurant],
        raw: true,
        nest: true
      }).then(restaurants => {
        return res.render('profile', {
          isOwner: isOwner,
          userChecked: userChecked.toJSON(),
          user: req.user,
          restaurants: restaurants
        })
      })
    })
  },
  editUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      return res.render('editprofile', {
        user: user.toJSON()
      })
    })
  },
  putUser: (req, res) => {
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        if (err) console.log('Error: ', err)
        return User.findByPk(req.params.id)
          .then(user => {
            user.update({
              name: req.body.name,
              image: file ? img.data.link : user.image
            })
          })
          .then(user => {
            req.flash('success_messages', 'Profile was successfully to update')
            return res.redirect(`/users/${req.user.id}`)
          })
          .catch(err => console.log(err))
      })
    } else {
      return User.findByPk(req.params.id)
        .then(user => {
          user.update({
            name: req.body.name,
            image: user.image
          })
        })
        .then(user => {
          req.flash('success_messages', 'Profile was successfully to update')
          return res.redirect(`/users/${req.user.id}`)
        })
        .catch(err => console.log(err))
    }
  },
  addFavorite: (req, res) => {
    return Favorite.create({
      UserId: req.user.id,
      RestaurantId: req.params.restaurantId
    })
      .then((restaurant) => {
        return res.redirect('back')
      })
  },

  removeFavorite: (req, res) => {
    return Favorite.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      }
    })
      .then((favorite) => {
        favorite.destroy()
          .then((restaurant) => {
            return res.redirect('back')
          })
      })
  },

  addLike: (req, res) => {
    return Like.create({
      UserId: req.user.id,
      RestaurantId: req.params.restaurantId
    })
      .then((restaurant) => {
        return res.redirect('back')
      })
  },

  removeLike: (req, res) => {
    return Like.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      }
    })
      .then(Like => {
        Like.destroy()
          .then((restaurant) => {
            return res.redirect('back')
          })
      })
  }
}

module.exports = userController