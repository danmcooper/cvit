var express = require('express')
  , app = express.createServer()
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy
  , redis = require("redis")
  , client = redis.createClient()
  , mongoose = require('mongoose')
  , bcrypt = require("bcrypt-nodejs")
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



























var counter = new counters({
  _id: "group1",
  c: 0    
});
counter.save(function(err) {
  if (!err) {
    return console.log("created counters");
  }
});
var salt1 = bcrypt.genSaltSync(10);  
var hash1 = bcrypt.hashSync("Abi555", salt1);
var salt2 = bcrypt.genSaltSync(10);  
var hash2 = bcrypt.hashSync("Olivia555", salt2);
var salt3 = bcrypt.genSaltSync(10);  
var hash3 = bcrypt.hashSync("Haely555", salt3);
var salt4 = bcrypt.genSaltSync(10);  
var hash4 = bcrypt.hashSync("Lillian555", salt4);
var salt5 = bcrypt.genSaltSync(10);  
var hash5 = bcrypt.hashSync("Nancy555", salt5);
var salt6 = bcrypt.genSaltSync(10);
var hash6 = bcrypt.hashSync("Dan555", salt6);
var salt7 = bcrypt.genSaltSync(10);
var hash7 = bcrypt.hashSync("Holden555", salt7);

Dan = new aUser({
  username: "Dan",
  password: hash6,
  email: "haely@conversit.com",
  id: "47ffd7dc-733b-4f62-baf1-11289241db00",
  memberGroups: ['HaelysGroup', 'DansGroup', 'HoldensGroup'],
  ownerGroups: ['HaelysGroup'],
  settings: {}
});
Dan.save(function(err) {
  if (!err) {
    return console.log("User Dan created");
  }
});

Holden = new aUser({
  username: "Holden",
  password: hash7,
  email: "haely@conversit.com",
  id: "39276763-96df-4af8-92fd-917e7cbc6922",
  memberGroups: ['HaelysGroup', 'DansGroup', 'HoldensGroup'],
  ownerGroups: ['HaelysGroup'],
  settings: {}
});
Holden.save(function(err) {
  if (!err) {
    return console.log("User Holden created");
  }
});

Abi = new aUser({
  username: "Abi",
  password: hash1,
  email: "haely@conversit.com",
  id: "07cd7700-6d5b-487a-979b-1bc0b2e5e000",
  memberGroups: ['HaelysGroup', 'DansGroup', 'HoldensGroup'],
  ownerGroups: ['HaelysGroup'],
  settings: {}
});
Abi.save(function(err) {
  if (!err) {
    return console.log("User Abi created");
  }
});
Olivia = new aUser({
  username: "Olivia",
  password: hash2,
  email: "haely@conversit.com",
  id: "006921f0-da5f-4bdb-a0f4-329aa8ceb8e5",
  memberGroups: ['HaelysGroup', 'DansGroup', 'HoldensGroup'],
  ownerGroups: ['HaelysGroup'],
  settings: {}
});
Olivia.save(function(err) {
  if (!err) {
    return console.log("User Olivia created");
  }
});
Haely = new aUser({
  username: "Haely",
  password: hash3,
  email: "haely@conversit.com",
  id: "a09c20e3-d3d1-4bf1-97f1-ffe1bc8c1507",
  memberGroups: ['HaelysGroup', 'DansGroup', 'HoldensGroup'],
  ownerGroups: ['HaelysGroup'],
  settings: {}
});
Haely.save(function(err) {
  if (!err) {
    return console.log("User Haely created");
  }
});
Lillian = new aUser({
  username: "Lillian",
  password: hash4,
  email: "haely@conversit.com",
  id: "b48de855-18e5-447f-8121-0ecab1736c5a",
  memberGroups: ['HaelysGroup', 'DansGroup', 'HoldensGroup'],
  ownerGroups: ['HaelysGroup'],
  settings: {}
});
Lillian.save(function(err) {
  if (!err) {
    return console.log("User Lillian created");
  }
});
Nancy = new aUser({
  username: "Nancy",
  password: hash5,
  email: "haely@conversit.com",
  id: "8e181482-5426-4325-80cc-0ba67b918718",
  memberGroups: ['HaelysGroup', 'DansGroup', 'HoldensGroup'],
  ownerGroups: ['HaelysGroup'],
  settings: {}
});
Nancy.save(function(err) {
  if (!err) {
    return console.log("User Nancy created");
  }
});


client.hmset("Abi", "id", "07cd7700-6d5b-487a-979b-1bc0b2e5e000", "username", "Abi", "password", hash1, "email", "Holden@conversit.com");
client.set("07cd7700-6d5b-487a-979b-1bc0b2e5e000", "Abi");

client.hmset("Olivia", "id", "006921f0-da5f-4bdb-a0f4-329aa8ceb8e5", "username", "Olivia", "password", hash2, "email", "Holden@conversit.com");
client.set("006921f0-da5f-4bdb-a0f4-329aa8ceb8e5", "Olivia");

client.hmset("Haely", "id", "a09c20e3-d3d1-4bf1-97f1-ffe1bc8c1507", "username", "Haely", "password", hash3, "email", "Holden@conversit.com");
client.set("a09c20e3-d3d1-4bf1-97f1-ffe1bc8c1507", "Haely");

client.hmset("Lillian", "id", "b48de855-18e5-447f-8121-0ecab1736c5a", "username", "Lillian", "password", hash4, "email", "Holden@conversit.com");
client.set("b48de855-18e5-447f-8121-0ecab1736c5a", "Lillian");

client.hmset("Nancy", "id", "8e181482-5426-4325-80cc-0ba67b918718", "username", "Nancy", "password", hash5, "email", "Holden@conversit.com");
client.set("8e181482-5426-4325-80cc-0ba67b918718", "Nancy");

client.hmset("Dan", "id", "47ffd7dc-733b-4f62-baf1-11289241db00", "username", "Dan", "password", hash6, "email", "Holden@conversit.com");
client.set("47ffd7dc-733b-4f62-baf1-11289241db00", "Dan");

client.hmset("Holden", "id", "39276763-96df-4af8-92fd-917e7cbc6922", "username", "Holden", "password", hash7, "email", "Holden@conversit.com");
client.set("39276763-96df-4af8-92fd-917e7cbc6922", "Holden");



























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

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
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
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user, message: req.flash('error') });
});

app.get("/getPosts/:group/:from_order_num/:num_to_get", function(req, res) {
  if (req.params.from_order_num == 0) {
    return aPost.find({
      group: req.params.group   
    }).sort("date", -1).limit(req.params.num_to_get).execFind(function(err, posts) {  
      return res.send(posts);
    });
  }
  // else {
  //   return aPost.find({
  //     group: req.params.group,
  //     order: { $gt: req.params.from_order_num - req.params.num_to_get , $lte: req.params.from_order_num }    
  //   }).sort('date', -1).execFind(function(err, posts) {  
  //     return res.send(posts);
  //   });
  // }
});

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });
  
// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
/*
app.post('/login', function(req, res, next) {console.log("created");
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
*/

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3001);


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

// function counter(name) {
//     // var test = counters.find({_id:name});
//     // console.log("test: " + test);
//     counters.update({_id:name}, {$inc : {c:1}}, {"new":true, upsert:true});
//     // ret == { "_id" : "users", "next" : 1 }
//     console.log(counters.findOne({_id:name}));
//     return counters.findOne({_id:name}).c;
// }
