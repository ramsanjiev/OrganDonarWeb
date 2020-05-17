//REQUIRED FILES
var express = require('express');
var router = express.Router();
var donator = require('../Models/donorModel');
var User = require('../Models/users');
var { body } = require('express-validator');
//GET REQUESTS
router.get('/donor/show', isLoggenIn, (req, res) => {
    donator.find({}, function (err, dbs) {
        if (err) {
            console.log(err);
        } else {
            res.render('donor', {
                dbs: dbs
            });
        }
    });
});

router.get('/donor/new', isLoggenIn, (req, res) => {
    res.render('details');
});

router.get('/donor/show/User', isLoggenIn, (req, res) => {
    User.findById(req.user._id).populate('donors').exec(function (err, dbs) {
        if (err) {
            console.log(err);
        } else {
            res.render('show', {
                dbs: dbs.donors
            })

        }
    });
});

router.get('/donor/edit/:id', isLoggenIn, (req, res) => {
    donator.findById(req.params.id, function (err, dbs) {
        if (err) {
            console.log(err);
        } else {
            res.render('edit', {
                dbs: dbs
            });
        }
    })

})

//POST REQUESTS
router.post('/donor', [
    body('form[FirstName]').not().isEmpty().withMessage('Must Fill This'),
    body('form[LastName]').not().isEmpty().withMessage('Must Fill This'),
    body('form[Address]').not().isEmpty().withMessage('Must Fill This'),
    body('form[Address1]').not().isEmpty().withMessage('Must Fill This'),
    body('form[City]').not().isEmpty().withMessage('Must Fill This'),
    body('form[State]').not().isEmpty().withMessage('Must Fill This'),
    body('form[Zip]').not().isEmpty().withMessage('Must Fill This'),
    body('form[Organs]').not().isEmpty().withMessage('Must Fill This'),
    body('form[Blood]').not().isEmpty().withMessage('Must Fill This'),
], isLoggenIn, function (req, res) {
    donator.create(req.body.form, function (err, dbs) {
        if (err) {
            console.log(err);
        } else {
            User.findById(req.user._id, function (err, db) {
                if (err) {
                    console.log(err);
                } else {
                    db.donors.push(dbs);
                    db.save(function (err, dbb) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('donor/show');
                        }
                    })
                }
            })
        }
    });
});


router.put('/donor/edit/:id', isLoggenIn, function (req, res) {
    donator.findByIdAndUpdate(req.params.id, req.body.form, function (err, dbs) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
});

router.delete('/donor/edit/:id', isLoggenIn, function (req, res) {
    donator.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    })
})

//function
function validation(req, res, next) {

}

//CHECK FUNCTION
function isLoggenIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}


//EXPORTS
module.exports = router;