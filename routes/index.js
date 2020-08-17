var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('demo')
});

router.get('/test', function(req, res, next) {
  res.render('demo');
});

router.get('/api', function(req, res, next) {
  res.json({'name':'vishnu'});
});

router.get('/newspaper', function(req, res, next) {
  res.render('news');
});

router.get('/orders', (req,res) => {
  res.json(['a','b','c'])
})

router.post('/new_order', (req,res) => {
  console.log(req.body)
  io.emit('message', req.body)
  res.json('data received')
})

module.exports = router;
