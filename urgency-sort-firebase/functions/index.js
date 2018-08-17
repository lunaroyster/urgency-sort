const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const cors = require('cors')({origin: true});

const db = admin.firestore();
db.settings({
    timestampsInSnapshots: true
});

exports.makeReports = functions.https.onRequest(async (req, res)=> {
   cors(req, res, () => {});
   let reports = req.body.reports;
   let reportIDs = Object.keys(reports);
   for (let reportID of reportIDs) {
      let report = reports[reportID];
      if(typeof report != "number") continue;
      await db.collection('requests').doc(reportID).set({reports: {[Date.now()]: report}}, {merge: true});
   }
   res.status(201).send();
});

const generateUrgencies = async ()=> {
  let snapshot = await db.collection('requests').get();
  let urgencies = {};
  snapshot.forEach(doc=> {
    let reports = Object.values(doc.data().reports);
    for(let i in reports) {
      if(reports[i]==-1) reports[i] = 0; //Ignoring spam reports
    }
    let score = reports.reduce((a,b)=>a+b)/reports.length; //Using averages. Switch with Wilson Score when there's enough data.
    urgencies[doc.id] = score;
  });
  await db.collection('urgencyCaches').doc('cache').set({time: Date.now(), urgencies});
  return urgencies;
};

exports.getUrgencies = functions.https.onRequest(async (req, res)=> {
  cors(req, res, () => {});
  let cacheDoc = await db.collection('urgencyCaches').doc('cache').get();
  let urgencies = cacheDoc.data().urgencies;
  if((Date.now() - (cacheDoc.data().time||0)) > 3600000) {
    urgencies = await generateUrgencies();
  }
  res.json(urgencies);
});
