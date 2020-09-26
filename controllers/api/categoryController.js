const db = require('../../models')
const Category = db.Category
const categoryService = require('../../services/categoryServices')

let categoryController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, (data) => {
      return res.json(data)
    })
  },
  postCategory: (req, res) => {
    categoryService.postCategory(req, res, (data) => {
      return res.json(data)
    })
    // if (!req.body.name) {
    //   req.flash('error_messages', 'name didn\'t exist')
    //   return res.redirect('back')
    // } else {
    //   return Category.create({
    //     name: req.body.name
    //   })
    //     .then((category) => {
    //       res.redirect('/admin/categories')
    //       // res.redirect('back') 回到原本的頁面
    //     })
    // }
  },
  putCategory: (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', 'name didn\'t exist')
      return res.redirect('back')
    } else {
      return Category.findByPk(req.params.id)
        .then((category) => {
          category.update(req.body)
            .then((category) => {
              res.redirect('/admin/categories')
            })
        })
    }
  },
  deleteCategory: (req, res) => {
    return Category.findByPk(req.params.id)
      .then((category) => {
        category.destroy()
          .then((category) => {
            res.redirect('/admin/categories')
          })
      })
  }
}
module.exports = categoryController
