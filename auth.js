// const okta = require("@okta/okta-sdk-nodejs");
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC
// var Sequelize = require("sequelize");

let oidc = new ExpressOIDC({
  issuer: process.env.OKTA_ORG_URL + '/oauth2/default',
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  redirect_uri: 'https://evening-beach-39870.herokuapp.com/authorization-code/callback',
  scope: 'openid profile',
  routes: {
    callback: { defaultRedirect: '/homepage' }
  }

})

// const client = new okta.Client({
//   orgUrl: process.env.OKTA_ORG_URL,
//   token: process.env.OKTA_TOKEN
// });

module.exports = { oidc }
