var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Your Ultimate Code-Sharing Haven' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'Your Ultimate Code-Sharing Haven' });
});

router.route('/contact')
  .get(function (req, res, next) {
    res.render('contact', { title: 'Your Ultimate Code-Sharing Haven' });
  })
  .post(expressValidator.body("name").isLength({ min: 3 })
    , expressValidator.body("email").isLength({ min: 6 }),
    body('username').isEmail(), function (req, res, next) {

      const errors = validationErrors(req);

      if (errors) {
        res.render('contact', {
          title: 'Your Ultimate Code-Sharing Haven',
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
          res.render('thank', { title: 'Your Ultimate Code-Sharing Haven' });
        })


      }
    });


router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'login'
  })
})
router.get('/register', function (req, res, next) {
  res.render('register', {
    title: 'register'
  })
})

module.exports = router;
