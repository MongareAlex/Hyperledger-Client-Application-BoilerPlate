var express = require('express');
var homeRouter = express.Router();
// Constant values - change as per your needs

// 1. Connect to landsys
const {
    ensureAuthentication
} = require('../config/auth')

var landParcels = [{
        Link: '/Order',
        Text: 'View Order'
                    },

    {
        Link: '/Parcel',
        Text: 'View Parcels'
                    }
                       ,
    {
        Link: '/Parcel',
        Text: 'View Parcels'
                    }
                       ,
    {
        Link: '/Parcel',
        Text: 'View Parcels'
                    }
                       ,
    {
        Link: '/Parcel',
        Text: 'View Parcels'
                    }
                       ,
    {
        Link: '/Parcel',
        Text: 'View Parcels'
                    }
                       ,
    {
        Link: '/Parcel',
        Text: 'View Parcels'
                    }
                       ,
    {
        Link: '/Parcel',
        Text: 'View Parcels'
                    }];
homeRouter.get('/', (req, res) =>
    res.render('index', {
        name: req.user.username,
        tabletitle: 'Parcels',
        landparcels: landParcels
    }));
homeRouter.route('/createOffer')
    .get(function (req, res) {
        userid = req.user.username;
    
    
        console.log('the loggged in user is ' + userid);
        res.render('createOfferForm');

    });
homeRouter.route('/trackLandForm')
    .get(function (req, res) {
        res.render('trackLandForm');

    });
homeRouter.route('/updateLandForm')
    .get(function (req, res) {
        res.render('updateLandForm');

    });
homeRouter.route('/createLandForm')
    .get(function (req, res) {
        res.render('createLandForm');

    });
homeRouter.route('/createParticipantForm')
    .get(function (req, res) {
        res.render('createParticipantForm');

    });
homeRouter.route('/viewBidsPlaced')
    .get(function (req, res) {
        res.render('bidsPlaced');

    });
homeRouter.route('/viewMyOffers')
    .get(function (req, res) {
        res.render('offers');

    });
homeRouter.route('/viewMyLandAssets')
    .get(function (req, res) {
        res.render('myLandAssets');
    });;
module.exports = homeRouter;
