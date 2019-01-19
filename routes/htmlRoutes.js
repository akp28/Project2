var db = require('../models')
const auth = require('../auth')
// const helpers = require("../helpers");

module.exports = function (app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.animal.findAll({}).then(function(dbanimals) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       animals: dbanimals
  //     });
  //   });
  // });
  app.get('/', (req, res) => {
    if (req.userContext) {
      // res.send(`Hello ${req.userContext.userinfo.name}! <a href="logout">Logout</a>`);
      res.render('animal')
    } else {
    //   res.send('Please <a href="/login">login</a>');
      res.render('index')
    }
  })

  // Load animal page and pass in an animal by id
  app.get('/animal/:id', function (req, res) {
    db.Animal.findOne({ where: { id: req.params.id } }).then(function (dbAnimal) {
      res.render('animal', {
        animal: dbAnimal
      })
    })
  })

  // app.get("/animal",function(req,res){
  //   db.animal.findAll({}).then(function(dbanimal){
  //     res.render("animal",{
  //       animal: dbanimal
  //     });
  //   });
  // });

  app.get('/animal', auth.oidc.ensureAuthenticated(), (req, res) => {
    //console.log('userinfo: ' + JSON.stringify(req.userContext))
    res.render('animal', { user: req.userContext })
    // res.send('Top Secret');
  })

  // Render 404 page for any unmatched routes
  app.get('*', function (req, res) {
    res.render('index')
  })
}
