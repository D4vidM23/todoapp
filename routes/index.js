var express = require('express');
const {sequelize} = require("../models");
const {QueryTypes} = require("sequelize");
var router = express.Router();
const toDoController = require("../controllers/todo_controller.js")

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });




router.post('/add',toDoController.addNewItem);

router.get('/add',toDoController.renderAddForm)

router.get('/complete/:id',toDoController.markItemAsComplete );

router.get('/incomplete/:id',toDoController.markItemAsIncomplete);

router.get('/delete/:id',toDoController.deleteItem);

router.get('/edit/:id',toDoController.renderEditForm);

router.post ('/edit/:id',toDoController.updateItem);

router.get('/', toDoController.homeRoute)

module.exports = router;