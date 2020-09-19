const restController = require('../controllers/restController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')
const categoryController = require('../controllers/categoryController.js')
const commentController = require('../controllers/commentController.js')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

module.exports = (app, passport) => {
  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
  }
  const authenticatedAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) { return next() }
      return res.redirect('/')
    }
    res.redirect('/signin')
  }
  const isOwner = (req, res, next) => {
    if (Number(req.params.id) === req.user.id) {
      return next()
    }
    req.flash('error_messages', 'You are not authorized to do the action.')
    return res.redirect(`/users/${req.user.id}`)
  }
  // Profile
  app.get('/users/:id', authenticated, userController.getUser)
  app.get('/users/:id/edit', authenticated, isOwner, userController.editUser)
  app.put('/users/:id', authenticated, isOwner, upload.single('image'), userController.putUser)

  // Comment
  app.post('/comments', authenticated, commentController.postComment)
  app.delete('/comments/:id', authenticatedAdmin, commentController.deleteComment)

  // Read
  app.get('/', authenticated, (req, res) => res.redirect('/restaurants'))
  app.get('/restaurants', authenticated, restController.getRestaurants)
  app.get('/restaurants/feeds', authenticated, restController.getFeeds)
  app.get('/restaurants/:id', authenticated, restController.getRestaurant)

  // Admin
  app.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/restaurants'))
  app.get('/admin/restaurants', authenticatedAdmin, adminController.getRestaurants)
  // create
  app.get('/admin/restaurants/create', authenticatedAdmin, adminController.createRestaurant)
  app.post('/admin/restaurants', authenticatedAdmin, upload.single('image'), adminController.postRestaurant)
  // Update
  app.get('/admin/restaurants/:id/edit', authenticatedAdmin, adminController.editRestaurant)
  app.put('/admin/restaurants/:id', authenticatedAdmin, upload.single('image'), adminController.putRestaurant)
  app.get('/admin/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)
  // Delete
  app.delete('/admin/restaurants/:id', authenticatedAdmin, adminController.deleteRestaurant)

  // Category
  app.get('/admin/categories', authenticatedAdmin, categoryController.getCategories)
  app.post('/admin/categories', authenticatedAdmin, categoryController.postCategory)
  app.get('/admin/categories/:id', authenticatedAdmin, categoryController.getCategories)
  app.put('/admin/categories/:id', authenticatedAdmin, categoryController.putCategory)
  app.delete('/admin/categories/:id', authenticatedAdmin, categoryController.deleteCategory)

  app.get('/admin/users', authenticatedAdmin, adminController.getUsers)
  app.put('/admin/users/:id', authenticatedAdmin, adminController.putUsers)
  // SignIn/SignUp
  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)
  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  // SignOut
  app.get('/logout', userController.logout)
}
