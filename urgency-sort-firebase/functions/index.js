const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const cors = require('cors');

const db = admin.firestore();
db.settings({
    timestampsInSnapshots: true
});

exports.test = functions.https.onRequest(async (req, res)=> {
    let request = await db.collection('requests').doc('11868').get();
    res.send(request.data());
});

exports.makeReports = functions.https.onRequest(async (req, res)=> {
   let reports = req.body.reports;
   let reportIDs = Object.keys(reports);
   for (let reportID of reportIDs) {
      let report = reports[reportID];
      if(typeof report != "number") continue;
      await db.collection('requests').doc(reportID).set({reports: {[Date.now()]: report}}, {merge: true});
   }
   res.status(201).send();
});

exports.getUrgencies = functions.https.onRequest(async (req, res)=> {
    
});