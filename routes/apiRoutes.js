var db = require("../models");
let axios = require('axios');

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};

axios.get('http://apiv3.iucnredlist.org/api/v3/speciescount?token=' + process.env.IUCN_REDLIST_KEY).then(
  function(response) {
    console.log(response.data);
  }
)
.catch( function(err){
  console.log(err)
})
