const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  PORT = 3005,
  dbURL = 'mongodb://localhost/profile_update',
  Nightmare = require('nightmare'),
  jQuery = require('jquery')

// import Nightmare from 'nightmare';

// const nightmare = Nightmare({show: true});

let nightmare = Nightmare()

mongoose.connect(dbURL)
app.use(bodyParser());
app.use(morgan('dev'));

nightmare.goto('https://profiles.generalassemb.ly/profiles')
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
    return document.querySelector('body > nav > div.nav__avatar.js-account-hover > ul > li:nth-child(2) > a').innerHTML;
  })
  .click('#edit_profile_8812 > div > input')
  .wait('body > div.form-page-container.new-profile > div.main-container > div > header > p')
  .click('body > div.form-page-container.new-profile > div.sidebar > div > div > nav > a')
  .end()
  .then((title) => {
    console.log(title);
  })

app.get('/', (req, res) => {

  res.send('Hello')
})

app.listen(PORT)
