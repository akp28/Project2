var db = require('../models')
const auth = require('../auth')
// let axios = require('axios')

module.exports = function (app) {
  // Get all Animals

  app.get('/api/userInfo', auth.oidc.ensureAuthenticated(),function (req, res) {
    db.User.findOne({ where: {user_name: req.userContext.userinfo.preferred_username} }).then(function (dbAnimal) {
      // console.log('getResult :' + JSON.stringify(dbAnimal))
      res.json(dbAnimal);
      // res.render('homepage' )
      // res.render('homepage', { user: req.userContext })
    })
  })


  app.get('/api/addUser', auth.oidc.ensureAuthenticated(), async (req, res) => {
    
    // const data={
    //       user_name : req.userContext.userinfo.preferred_username,
    //       favorite_animals: 'california codor'
    //     }
    // let {user_name, favorite_animals} = data;
    db.User.findOrCreate({
      where:{ user_name: req.userContext.userinfo.preferred_username},
      defaults: {
        favorite_animals: 'california condor'
      }
    }).then(function (result){
      var user = result[0],
      created = result[1];
      // console.log("user created" + user);
      // console.log("bool" +created);
      if(created){
        // console.log('Created user');
        // res.json(user)
        // res.json(user)
        res.redirect('/homepage')
      }else {
        console.log('user already exists');
        // res.render('homepage',{user})
        res.redirect('/homepage')
        // res.json(user)
      }
    })
  })

  app.get('/api/animals', auth.oidc.ensureAuthenticated(),function (req, res) {
    db.Animal.findAll({ limit: 10 }).then(function (dbAnimal) {
      // console.log('getResult :' + JSON.stringify(dbAnimal))
      res.json(dbAnimal);
    })
  })

  // Create a new Animal
  app.post('/api/animals', function (req, res) {
    db.Animal.create(req.body).then(function (dbAnimal) {
      res.json(dbAnimal)
    })
  })

  // Delete an Animal by id
  app.delete('/api/animals/:id', function (req, res) {
    db.Animal.destroy({ where: { id: req.params.id } }).then(function (dbAnimal) {
      res.json(dbAnimal)
    })
  })
  
}

// commented out for now to prevent tons of unneeded calls -bb

// axios.get('http://apiv3.iucnredlist.org/api/v3/speciescount?token=' + process.env.IUCN_REDLIST_KEY).then(
//   function(response) {
//     console.log(response.data);
//   }
// )
// .catch( function(err){
//   console.log(err)
// })
