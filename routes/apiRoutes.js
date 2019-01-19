var db = require("../models");
let axios = require('axios');

module.exports = function(app) {
  // Get all Animals
  app.get("/api/animals", function(req, res) {
    db.Animal.findAll({}).then(function(dbAnimal) {
      res.json(dbAnimal);
    });
  });

  // Create a new Animal
  app.post("/api/animals", function(req, res) {
    db.Animal.create(req.body).then(function(dbAnimal) {
      res.json(dbAnimal);
    });
  });

  // Delete an Animal by id
  app.delete("/api/animals/:id", function(req, res) {
    db.Animal.destroy({ where: { id: req.params.id } }).then(function(dbAnimal) {
      res.json(dbAnimal);
    });
  });
};

//commented out for now to prevent tons of unneeded calls -bb

// axios.get('http://apiv3.iucnredlist.org/api/v3/speciescount?token=' + process.env.IUCN_REDLIST_KEY).then(
//   function(response) {
//     console.log(response.data);
//   }
// )
// .catch( function(err){
//   console.log(err)
// })
