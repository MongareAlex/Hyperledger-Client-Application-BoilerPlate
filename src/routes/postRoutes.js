const bnUtil = require('./bn-connection-util');
var express = require('express');
var postRouter = express.Router();
postRouter.route('/updateLand')
    .post(function (req, res) {

        res.send(req.body);

    });
postRouter.route('/trackLand')
    .post(function (req, res) {
        console.log(req.body);
        res.send(req.body);

    });
postRouter.route('/makeOffer')
    .post(function (req, res) {
    var namespace = "org.land.landsys.offerAsset"; 
var transactionType = "makeOffer";
    let OfferID=req.body.offerId;

    let parcelID=req.body.deedNo;

// 1. Connect to landsys
var bnUtil = require('./bn-connection-util');
bnUtil.connect(main);

function main(error){
    
    // Check for error
    if(error){
        console.log(error);
        process.exit(1);
    }
    let bnDef =  bnUtil.connection.getBusinessNetwork();
    console.log("2. Received Definition from Runtime: ",
                   bnDef.getName(),"  ",bnDef.getVersion());

    // 3. Get the factory
    let factory = bnDef.getFactory();
    
    // 4. Lets create a new Resource of type = Transaction
 
    // 4. Create an instance of transaction
    let options = {
        generate: false,
        includeOptionalFields: false
    }

  

    let transaction = factory.newTransaction(namespace,transactionType);

    
    // 5. Set up the properties of the transaction object
    transaction.setPropertyValue('offerID',OfferID);

    transaction.setPropertyValue('parcelID',deedno);


    // 6. Submit the transaction
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")

        bnUtil.disconnect();

    }).catch((error)=>{
        console.log(error);

        bnUtil.disconnect();
    });
}

        console.log(req.body);
        res.send(req.body);

    });
postRouter.route('/createLand')
    .post(function (req, res) {
    
    
    
        console.log(req.body);
        var namespace = "org.land.landsys.landparcel";
        var transactionType = "createLand";
        var userid=req.body.ownerId;
        var Titledeedno = req.body.deedNo; //

        // 1. Connect to landsys

        bnUtil.connect(mainconnect);


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

            let participantkey=userid;
            var transaction = factory.newTransaction(namespace, transactionType);


            // 5. Set up the properties of the transaction object
            transaction.setPropertyValue('deedno', Titledeedno);
            transaction.setPropertyValue('newOwnerPartcipantkey', participantkey);


            // 6. Submit the transaction
            return bnUtil.connection.submitTransaction(transaction).then(() => {
                console.log("6. Transaction Submitted/Processed Successfully!!")

                bnUtil.disconnect();

            }).catch((error) => {
                console.log(error);

                bnUtil.disconnect();
            });
        }

        res.send(req.body);

    });

module.exports = postRouter;
