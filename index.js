const
  express = require('express'),
  app = express(),
  PORT = 3005,
  dbURL = 'mongodb://localhost/profile_update',
  Nightmare = require('nightmare'),
  dotenv = require('dotenv').load(),
  jQuery = require('jquery')

let nightmare = Nightmare()

var currentdate = new Date();
var datetime = "Last Ran: " + (currentdate.getMonth()+1) + "/"
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

var repeat = function() {
  nightmare
  .goto('https://profiles.generalassemb.ly/profiles')
  .wait('body > nav > div.nav__login-ctas.js-signed-out > a.nav__login-ctas__sign-in.emphasis.js-sign-in-nav-bar')
  .click('body > nav > div.nav__login-ctas.js-signed-out > a.nav__login-ctas__sign-in.emphasis.js-sign-in-nav-bar')
  .wait('#user_email')
  .type('#user_email', process.env.username)
  .type('#user_password', process.env.password)
  .click('#new_user > input.button.-fluid')
  .wait('body > nav > div.nav__avatar.js-account-hover > ul > li:nth-child(2) > a')
  .click('body > nav > div.nav__avatar.js-account-hover > ul > li:nth-child(2) > a')
  .wait('#profile_title')
  .evaluate(() => {
    if(document.querySelector('#profile_title').innerHTML[document.querySelector('#profile_title').innerHTML.length - 1] === ' ') {
      console.log('make it');
      document.querySelector('#profile_title').innerHTML = 'Web Developer | Javascript | MERN Stack | Future NBA Player'
    } else {
      console.log('make it');
      document.querySelector('#profile_title').innerHTML = 'Web Developer | Javascript | MERN Stack | Future NBA Player '
    }
    return document.querySelector('#profile_title').innerHTML;
  })
  .click('#edit_profile_8812 > div > input')
  .wait('body > div.form-page-container.new-profile > div.main-container > div > header > p')
  .click('body > div.form-page-container.new-profile > div.sidebar > div > div > nav > a')
  .click('body > nav > a.nav__logo')
  .wait('body > nav > div.nav__avatar.js-account-hover > ul > li:nth-child(3) > a')
  .click('body > nav > div.nav__avatar.js-account-hover > ul > li:nth-child(3) > a')
  .then(function(err, nightmare) {
    if (err) {
      console.log(err);
    } else {
      console.log('Done ' + datetime);
    }
  })
}

setInterval(repeat, 3600000)

// var hello = function() {
//   console.log('hfsdf');
// }
//
// setInterval(hello, 3000)

app.get('/', (req, res) => {

  res.send('Hello')
})

app.listen(PORT)
