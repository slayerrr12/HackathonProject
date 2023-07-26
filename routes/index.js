var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Code4Share - a platform for sharing code.' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'Code4Share - a platform for sharing code.' });
});

router.route('/contact')
  .get(function (req, res, next) {
    res.render('contact', { title: 'Code4Share - a platform for sharing code.' });
  })
  .post(function (req, res, next) {
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty message').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
      res.render('contact', {
        title: 'Code4Share - a platform for sharing code.',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      const mailoptions = {
        from: 'StreamScript no-reply@gmail.com',
        to: "eyeamarinsharma@gmail.com",
        subject: 'StreamScript Visitor Message',
        text: req.body.message
      }
      transporter.sendMail(mailoptions, function (error, info) {
        if (error) {
          return console.log(error)

        }
        res.render('thank', { title: 'Code4Share - a platform for sharing code.' });
      })


    }
  });


  render.get('/login', function (req , res ,next) {
    res.render('login', {
      title : 'login'
    })
  })
  render.get('/registor', function (req , res ,next) {
    res.render('registor', {
      title : 'registor'
    })
  })

module.exports = router;
