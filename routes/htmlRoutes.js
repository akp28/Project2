var db = require('../models')
const auth = require('../auth')

module.exports = function (app) {
  app.get('/', (req, res) => {
    if (req.userContext) {
      db.User.findOne({ where: {user_name: req.userContext.userinfo.preferred_username} }).then(function (dbAnimal) {
      const user = { userCon: req.userContext, userPref: dbAnimal};
      res.render('homepage', user)
      })
    } else {
      // res.send('Please <a href="/login">login</a>');
      res.render('index')
    }
  })

  app.get('/homepage', auth.oidc.ensureAuthenticated(), (req, res) => {
    db.User.findOrCreate({
      where:{ user_name: req.userContext.userinfo.preferred_username},
      defaults: {
        favorite_animals: 'california condor'
      }
    }).then(function (result){
      // var user = result[0];
      var created = result[1];
      const user = { userCon: req.userContext, userPref: result[0]};
      if(created){  
        res.render('homepage', user)
      }else {
        console.log('user already exists');
        res.render('homepage', user)
        // res.json(user)
      }
    })
  })

  app.get('/animal', auth.oidc.ensureAuthenticated(), (req, res) => {
    db.Animal.findAll({ limit: 10 }).then(function (dbAnimal) {
      res.render('animal', {
        animal: dbAnimal
      })
    })
  })

  app.get("/animalsearch/:animalInput",auth.oidc.ensureAuthenticated(), function(req, res) {
    db.Animal.findAll(
    {
      where : {
        animal_name_common: { $like: '%' + req.params.animalInput + '%'}
      }
    }
    ).then(function(dbAnimal) {
      // console.log ("animal search :" + JSON.stringify(dbAnimal));
      // res.json(dbAnimal);
      const user = { userCon: req.userContext, animal: dbAnimal};
      res.render('animalsearch',user)
    });
  });
  
  app.get('/logout', (req, res) => {
    
    // get the token info from userContext of the request 
    var idToken = req.userContext.tokens.id_token
  
    // Remove the local session
    req.logout()
    // Location to redirect to after the logout has been performed. (Must be whitelisted)
    const postLogoutUri = process.env.OKTA_LOGOUT || 'http://localhost:3000/'
  
    const endSessionEndpoint = `https://dev-524748.oktapreview.com/oauth2/default/v1/logout` +
        `?id_token_hint=${idToken}` +
        `&post_logout_redirect_uri=${postLogoutUri}`
  
    // Redirect the user to the endSessionEndpoint URL
    res.redirect(endSessionEndpoint)
  })
    // Render 404 page for any unmatched routes
  app.get('*', function (req, res) {
    res.render('homepage')
  })
}


  

  