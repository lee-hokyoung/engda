var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let tutor_list = [
    {
      name: 'Clare',
      introduce: 'hello ! I`m jake I have 5 year experience in teaching industry'
    }, {
      name: 'Clare',
      introduce: 'hello ! I`m jake I have 5 year experience in teaching industry'
    }, {
      name: 'Clare',
      introduce: 'hello ! I`m jake I have 5 year experience in teaching industry'
    }
  ]
  res.render('index', 
    {
      title: '잉다', 
      tutor_list:tutor_list
    }
  );
});
module.exports = router;
