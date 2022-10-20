var express = require('express');
const {sequelize} = require("../models");
const {QueryTypes} = require("sequelize");
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

router.get('/',async function(req,res, next){
  const {sequelize} = require("../models/index");
  const {QueryTypes} = require("sequelize");

  let toDoItems = await sequelize.query('select * from todo', {type: QueryTypes.SELECT});
  res.render('index', {toDoItems});
})


router.post('/add',async function(req,res, next){
  const {sequelize} = require("../models/index");
  const {QueryTypes} = require("sequelize");
  await sequelize.query('insert into todo (description) values (:description)', {
    type: QueryTypes.INSERT,
    replacements: {
      description:req.body.description
    }
  })
  let toDoItems= await sequelize.query('select * from todo', {type: QueryTypes.SELECT})
  res.redirect('/');
});

router.get('/add', function(req,res){
  res.render('create_todo');
})

module.exports = router;

router.get('/complete/:id', async function(req,res){
  const {sequelize} = require("../models/index");
  const {QueryTypes} = require('sequelize');
  await sequelize.query('update todo set completed = true where id = :id', {
    type: QueryTypes.UPDATE,
    replacements: {
      id: req.params.id
    }
  })
  res.redirect('/');
})

router.get('/incomplete/:id', async function(req,res){
  const {sequelize} = require("../models/index");
  const {QueryTypes} = require('sequelize');
  await sequelize.query('update todo set completed = false where id = :id', {
    type: QueryTypes.UPDATE,
    replacements: {
      id: req.params.id
    }
  });
  res.redirect('/');
})

router.get('/delete/:id', async function(req,res){
  const {sequelize} = require("../models/index");
  const {QueryTypes} = require('sequelize');
  await sequelize.query('delete from todo where id = :id', {
    type: QueryTypes.DELETE,
    replacements: {
      id: req.params.id
    }
  });
  res.redirect('/');
})

router.get('/edit/:id', async function(req,res){
  const {sequelize} = require("../models/index");
  const {QueryTypes} = require('sequelize');
  await sequelize.query('select * from todo where id = :id', {
    type: QueryTypes.SELECT,
    replacements: {
      id: req.params.id
    }
  });
  const item = results[0];
  console.log(results);
  res.render('edit_todo',{item});
})
