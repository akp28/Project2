require('dotenv').config()
var express = require('express')
var exphbs = require('express-handlebars')
const session = require('express-session')
var auth = require('./auth')
var db = require("./models");

var app = express()
var PORT = process.env.PORT || 3000

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

// app.use('/homepage',require(''))

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
)
app.set('view engine', 'handlebars')

console.log('start of first use session')
app.use(session({
  cookie: { httpOnly: true },
  secret: 'q9Y_uGy7JzHAh6SHoONKBdJjBwUUZJaO0JBFdstt',
  resave: true,
  saveUninitialized: false
}))

console.log('start of second use session')
app.use(auth.oidc.router)

// app.get('/', (req, res) => {
//   if (req.userContext) {
//     res.render('animal', { user: req.userContext })
//   } else {
//   //   res.send('Please <a href="/login">login</a>');
//     res.render('index')
//   }
// })
require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)
var syncOptions = { force: false }

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true
}

// Starting the server, syncing our models ------------------------------------/
// auth.oidc.on('ready', () => {
//   app.listen(PORT, function () {
//     console.log(`==> 🌎  Listening on port. Visit http://localhost:${PORT}/ in your browser.`)
//   })
// })

// auth.oidc.on('error', err => {
//   console.error(err)
// })

db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

module.exports = { app }
