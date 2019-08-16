var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const bnUtil = require('./bn-connection-util');

authRouter.route('/admin/createparticipant')
    .post(function (req, res) {

        const userName = req.body.userName;
        const passWord = req.body.password;
        /** var url = 'mongodb://localhost:27017/landsysClientApp';
        MongoClient.connect(url, {
             useNewUrlParser: true
         }, function (err, client) {
             var db = client.db('landsysClientApp');
             var user = {
                 username: req.body.userName,
                 password: req.body.password
             };
             db.collection('user').insertOne(user, function (err, results) {
                 console.log('Success participant' + req.body.userName + ' Has been created');
                 res.render('createParticipantForm');
             });

         }); */
        const participantkey = req.body.userName;
        const fname = req.body.fName;
        const lname = req.body.lName;
        const email = req.body.email;
        const namespace = "org.land.landsys.participant";
        const transactionType = "createParticipant";
        
        bnUtil.connect(mainconnect);



        User.findOne({
            username: userName
        }).then(user => {
            if (user) {
                console.log('User Already exists');
            } else {
                const newUser = new User({
                    username: userName,
                    password: passWord


                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/admin/profile');

                                console.log('You are now registered and can log in');

                            });
                    });
                });
            }
        }).catch(err => console.log(err));
    

function mainconnect(error) {

    // Check for error
    if (error) {
        console.log(error);
        process.exit(1);
    }
    let bnDef = bnUtil.connection.getBusinessNetwork();
    console.log("2. Received Definition from Runtime: ",
        bnDef.getName(), "  ", bnDef.getVersion());

    // 3. Get the factory
    let factory = bnDef.getFactory();

    // 4. Lets create a new Resource of type = Transaction

    // 4. Create an instance of transaction
    let options = {
        generate: false,
        includeOptionalFields: false
    }


    let transaction = factory.newTransaction(namespace, transactionType);


    // 5. Set up the properties of the transaction object
    transaction.setPropertyValue('participantkey', participantkey);
    transaction.setPropertyValue('fname', fname);
    transaction.setPropertyValue('lname', lname);
    transaction.setPropertyValue('email', email);


    // 6. Submit the transaction
    return bnUtil.connection.submitTransaction(transaction).then(() => {
        console.log("6. Transaction Submitted/Processed Successfully!!")

        bnUtil.disconnect();

    }).catch((error) => {
        console.log(error);

        bnUtil.disconnect();
    });
};
    });
authRouter.route('/').get(function (req, res) {
    res.render('startpage');
});
authRouter.post('/user/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});

authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

authRouter.route('/admin/profile').get(function (req, res) {
    res.render('createParticipantForm');
});
authRouter.route('/admin/login').post(function (req, res) {
    var username = 'admin';
    var password = 'adminpw';
    if (req.body.adminUserName === username && req.body.adminPassWord === password) {
        res.render('createParticipantForm')
    } else {
        console.log(req.body.adminUserName);
        res.redirect('/');
    }
})
module.exports = authRouter;
