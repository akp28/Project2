var db = require("../models");
const express = require("express");
const auth = require("../auth");
// const helpers = require("../helpers");



module.exports = function(app) {
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
      res.render("example");
    } else {
    //   res.send('Please <a href="/login">login</a>');
        res.render("index");
    }
});

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // app.get("/example",function(req,res){
  //   db.Example.findAll({}).then(function(dbExample){
  //     res.render("example",{
  //       example: dbExample
  //     });
  //   });
  // });

  app.get("/example", auth.oidc.ensureAuthenticated(), (req, res) => {
    console.log("userinfo: " + JSON.stringify(req.userContext) );
    res.render("example",{ user: req.userContext });
    // res.send('Top Secret');
    });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("index");
  });
};
