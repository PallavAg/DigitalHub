var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var Book = require("../models/book");
var Media = require("../models/media");
var jwt_decode = require('jwt-decode');
const rp = require('request-promise');
const $ = require('cheerio');
const URL = require('url').URL;


//Signing up and registering
router.post('/signup', function (req, res) {
  console.log(req.body);
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'Please pass username and password.' });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: 'Username already exists.' });
      }
      res.json({ success: true, msg: 'Successful created new user.' });
    });
  }
});

//Login for signing in
router.post('/signin', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
});

//Router for add new media that only accessible to authorized user
router.post('/media', passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {

    const urlMedia = req.body.url;

    rp(urlMedia)
      .then(function (html) {
        //success!
        // console.log(html);

        const theURL = new URL(urlMedia);
        var website = theURL.host;
        console.log(website);

        var title = "DIDN'T WORK";
        var poster = "DIDN'T WORK";
        var type = "Movies";
        if (website == 'www.imdb.com') {
          title = $('.title_wrapper > h1', html)[0].children[0].data;
          poster = $('.poster > a > img', html)[0].attribs.src;
          type = "Movies";
        } else if (website == 'www.goodreads.com') {

        } else if (website == 'www.youtube.com') {

        }

        console.log(req.body);
        var newMediaItem = new Media({
          url: req.body.url,
          userId: req.body.userId,

          mediaType: type,
          mediaName: title,
          mediaImage: poster
        });

        newMediaItem.save(function (err) {
          if (err) {
            return res.json({ success: false, msg: 'Media could not be added' });
          }
          res.json({ success: true, msg: 'Successful added the item' });
        });

      })
      .catch(function (err) {
        console.log("Error is: " + err);
        return res.status(400).send({ success: false, msg: "Unable to parse website" });
      });

  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized Access' });
  }
});


router.get('/media', passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  var decoded = jwt_decode(token);
  var userId = decoded._id;

  if (token) {

    Media.find({ "userId": userId }, function (err, media) {
      if (err) return next(err);
      res.json(media);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

//Parsing auth tokens
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};


module.exports = router;
