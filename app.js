var express = require('express')
  , app = express.createServer()
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy
  , mongoose = require('mongoose')
  , bcrypt = require("bcrypt")
  , io = require('socket.io').listen(app);
 

 /*DB configuration*/
mongoose.connect('mongodb://localhost/Conversit');
var aPost = mongoose.model('aPost', new mongoose.Schema({
  "uid": String,
  "order": Number,
  "user": String,
  "group": String,
  "type": String,
  "theATs": Array,
  "theHASHes": Array,
  "date": { type: Date, default: Date.now },
  "content": String
}));
var aUser = mongoose.model('aUser', new mongoose.Schema({
  "username": String,
  "password": String,
  "email": String,
  "id": String,
  "memberGroups": Array,
  "ownerGroups": Array,
  "settings": {}
}));
var counters = mongoose.model('counters', new mongoose.Schema({
  "_id": String,
  "c": Number
}));

function findById(id, fn) {
  aUser.findOne({id: id}, function(err, user) {
    if (user) {
      console.log("found by id");
      fn(null, user)
    } else {
      fn(new Error('User ' + id + ' does not exist'))
    }
  });
}

function findByUsername(username, fn) {
  aUser.findOne({username: username}, function(err, user) {
    if (user) {
      console.log("found by username");      
      return fn(null, user);
    } else {
      return fn(null, null);
    }
  });
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      findByUsername(username, function(err, user) {
        console.log("got here");
        if (err) { return done(err); }
        console.log("got here2");
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        console.log("password: " + password + ", user.password: " + user.password);
        if (!bcrypt.compareSync(password, user.password)) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));




//var app = express.createServer();

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


app.get('/', function(req, res){
  res.render('index', { user: req.user, message: req.flash('error') });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

// app.get('/login', function(req, res){
//   res.render('login', { user: req.user, message: req.flash('error') });
// });

app.get("/getPosts/:group/:from_order_num/:num_to_get", function(req, res) {
  if (req.params.from_order_num == 0) {
    return aPost.find({
      group: req.params.group   
    }).sort("date", -1).limit(req.params.num_to_get).execFind(function(err, posts) {  
      return res.send(posts);
    });
  }
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(80);


//  route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

io.sockets.on('connection', function (socket) {
  //console.log(socket);
  socket.on('GroupServer', function (data) {

    // look up user
    //user = aUser.findOne({username: socket.request.user})

    // see if user belongs to group

    // if so, add post then send
    //counters.updateOne({_id:"group1"}, {$inc : {c:1}}, {"new":true, upsert:true}, function(item, err) {
      var post;
      var newguid = guidGenerator();
      post = new aPost({
        order: 1, // todo: fix!
        user: data.user,
        group: 'group1',
        type: 'private',
        theATs: [],
        theHASHes: [],
        date: new Date(),
        content: data.chat      
      });
      post.save(function(err) {
        if (!err) {
          return console.log("created");
        }
      });

      io.sockets.emit('GroupClient', data);      
    //});
  });
});

function guidGenerator() {
  var S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
