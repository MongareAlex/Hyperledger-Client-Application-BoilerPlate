const bnUtil = require('./bn-connection-util');

// #1 Connect to the landsys
bnUtil.cardName='admin@landsys09';
bnUtil.connect(main);
function main(err){
    if(err){
        console.log(error);
        process.exit(1);
    }
    return bnUtil.connection.query('allParcels').then((results)=>{

        console.log('Received parcels count:', results.length);
});
}