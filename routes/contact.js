var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET About page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res) {
	// create reusable transporter object using SMTP transport
	var transporter = nodemailer.createTransport({
    	service: 'Gmail',
	    auth: {
	        user: 'devon.kelly3@gmail.com',
	        pass: 'KA1865!ga'
	    }
	});
	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'Devon Kelly<devon.kelly3@gmail.com>', // sender address
	    to: 'Dorcha Mahone<dorcha.mahone@gmail.com>', // list of receivers
	    subject: 'Website Submission', // Subject line
	    text: 'You have a submission with the following details... Name: '+req.body.name+', Email: '+req.body.email+', Message: '+req.body.message, // plaintext body
	    html: '<p>You have a submission with the following details.</p><ul><li><b>Name: </b>'+req.body.name+'</li><li><b>Email: </b>'+req.body.email+'</li><li><b>Message: </b>'+req.body.message+'</li></ul>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	        res.redirect('/');
	    }
	    console.log('Message sent: ' + info.response);
	    res.redirect('/');
	});
});

module.exports = router;