var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { spawn } = require("child_process");

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// // app.use('/users', usersRouter);

app.get('/', function(req, res, next) {
  res.render('demo')
});

app.post('/update', function(req, res, next) {
  const ls = spawn("python3", ["update.py"]);
  
  ls.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
  });

  ls.stderr.on("data", data => {
      console.log(`stderr: ${data}`);
  });

  ls.on('error', (error) => {
      console.log(`error: ${error.message}`);
  });

  ls.on("close", code => {
      console.log(`child process exited with code ${code}`);
  });

  res.json({'status':'updated'})

});

app.get('/newspaper', function(req, res, next) {
  res.render('news');
});

app.get('/orders', (req,res) => {
  res.json(['a','b','c'])
})

app.post('/new_order', (req,res) => {
  console.log(req.body)
  io.emit('message', req.body)
  res.json('data received')
})

app.get('/api', function(req, res, next) {
  res.json({'boom':'web-hooks-added'});
});

io.on('connection', (socket) =>{
  console.log('user connected')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 5000

http.listen(PORT, () => console.log(`Server up on port ${PORT}`))

module.exports = app;
