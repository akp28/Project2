var db = require('../models')
const auth = require('../auth')
// const helpers = require("../helpers");

module.exports = function (app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });
  app.get('/', (req, res) => {
    if (req.userContext) {
      // res.send(`Hello ${req.userContext.userinfo.name}! <a href="logout">Logout</a>`);
      res.render('homepage')
    } else {
    //   res.send('Please <a href="/login">login</a>');
      res.render('index')
    }
  })

  // Load example page and pass in an example by id
  app.get('/example/:id', function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render('example', {
        example: dbExample
      })
    })
  })

  // app.get("/example",function(req,res){
  //   db.Example.findAll({}).then(function(dbExample){
  //     res.render("example",{
  //       example: dbExample
  //     });
  //   });
  // });

  // app.get('/animal', auth.oidc.ensureAuthenticated(), (req, res) => {
  //   // console.log('userinfo: ' + JSON.stringify(req.userContext))
  //   res.render('animal', { user: req.userContext })
  //   // res.send('Top Secret');
  // })
  app.get('/animal', auth.oidc.ensureAuthenticated(), (req, res) => {
    // console.log('userinfo: ' + JSON.stringify(req.userContext))
    // db.Animal.findAll({ limit: 10 }).then(function (animal) {
    // console.log('getResult :' + JSON.stringify(dbAnimal))
    // res.json(dbAnimal)
    // console.log('userinfo: insidesq' + JSON.stringify(req.userContext))
    res.render('animal', { user: req.userContext })
  })

  app.get('/homepage', auth.oidc.ensureAuthenticated(), (req, res) => {
    // res.render('homepage', { user: req.userContext })
    res.render('homepage', { userCon: req.userContext})
    // console.log('usercontext :' + JSON.stringify(req.userContext));
  })

  // Render 404 page for any unmatched routes
  app.get('*', function (req, res) {
    res.render('index')
  })

  app.get('/logout', (req, res) => {
    // var context = req.userContext;
    // console.log("context :" + JSON.stringify(context));
    var idToken = req.userContext.tokens.id_token
  
    // Remove the local session
    req.logout()
    // Location to redirect to after the logout has been performed. (Must be whitelisted)
    const postLogoutUri = 'http://localhost:3000/'
  
    const endSessionEndpoint = `https://dev-524748.oktapreview.com/oauth2/default/v1/logout` +
        `?id_token_hint=${idToken}` +
        `&post_logout_redirect_uri=${postLogoutUri}`
  
    // Redirect the user to the endSessionEndpoint URL
    res.redirect(endSessionEndpoint)
  })
}
