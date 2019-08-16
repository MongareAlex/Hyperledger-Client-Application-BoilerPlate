const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

async function identityIssue() {
    let businessNetworkConnection = new BusinessNetworkConnection();
    try {
        await businessNetworkConnection.connect('admin@landsys09');
        let result = await businessNetworkConnection.issueIdentity('org.land.landsys.participant.LANDSYSClient#0005', 'Aleki5')
        console.log(`userID = ${result.userID}`);
        console.log(`userSecret = ${result.userSecret}`);
        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

identityIssue();
