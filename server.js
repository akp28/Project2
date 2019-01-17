require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const session = require("express-session");
var auth = require('./auth');
// const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;
// const 
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

console.log("start of first use session");
app.use(session({
  cookie: { httpOnly: true },
  secret: "q9Y_uGy7JzHAh6SHoONKBdJjBwUUZJaO0JBFdstt",
  resave: true,
  saveUninitialized: false
}));

// const oidc = new ExpressOIDC();
// const oidc = new ExpressOIDC({
//   issuer: process.env.OKTA_ORG_URL + "/oauth2/default",
//   client_id: process.env.OKTA_CLIENT_ID,
//   client_secret: process.env.OKTA_CLIENT_SECRET,
//   redirect_uri: "http://localhost:3000/authorization-code/callback",
//   scope: "openid profile",
//   routes: {
//     callback: {
//       defaultRedirect: "/example"
//     }
//   }
// });

console.log("start of second use session");
app.use(auth.oidc.router);

// app.use((req, res, next) => {
//   if (!req.userinfo) {
//     return next();
//   }

//   auth.client.getUser(req.userinfo.sub)
//     .then(user => {
//       req.user = user;
//       res.locals.user = user;
//       next();
//     });
// });

app.get('/', (req, res) => {
  if (req.userContext) {
    res.render("example",{user: req.userContext});
  } else {
  //   res.send('Please <a href="/login">login</a>');
      res.render("index");
  }
});

// app.get("/example", auth.oidc.ensureAuthenticated(), (req, res) => {
// console.log("userinfo: " + JSON.stringify(req.userContext) );
// res.render("example",{ user: req.userContext });
// // res.send('Top Secret');
// });

app.get("/logout", (req, res) => {

    
  // var context = req.userContext;
  // console.log("context :" + JSON.stringify(context));
  var idToken = req.userContext.tokens.id_token;

  // Remove the local session
  req.logout();
      
  // Location to redirect to after the logout has been performed. (Must be whitelisted)
  const postLogoutUri = 'http://localhost:3000/';

  const endSessionEndpoint = `https://dev-524748.oktapreview.com/oauth2/default/v1/logout` +
      `?id_token_hint=${idToken}` +
      `&post_logout_redirect_uri=${postLogoutUri}`;

  // Redirect the user to the endSessionEndpoint URL
  res.redirect(endSessionEndpoint);  
  // req.logout();
  // res.redirect("/");
});
// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
auth.oidc.on("ready", () => {
  app.listen(3000, function (){
    console.log(  "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.");
  });
});

auth.oidc.on("error", err => {
  console.error(err);
});
// db.sequelize.sync(syncOptions).then(function() {
//   app.listen(PORT, function() {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });/

module.exports = {app};
