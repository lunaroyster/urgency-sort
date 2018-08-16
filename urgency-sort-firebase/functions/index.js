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
   res.send(req.body);
});