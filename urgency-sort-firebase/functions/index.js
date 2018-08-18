const admin = require('firebase-admin');
const functions = require('firebase-functions');

const wilson = require('wilson-interval').default;

admin.initializeApp(functions.config().firebase);

const cors = require('cors')({origin: true});

const db = admin.firestore();
db.settings({
    timestampsInSnapshots: true
});

exports.makeReports = functions.https.onRequest(async (req, res)=> {
   cors(req, res, () => {});
   let reports = req.body.reports;
   console.log(req.body);
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
    let avgScore = reports.reduce((a,b)=>a+b)/reports.length;
    let wilsonScore = wilson(reports.reduce((a,b)=>a+b), reports.length * 3, false, {confidence: 0.75});
    urgencies[doc.id] = {avg: avgScore, confidence: wilsonScore};
  });
  await db.collection('urgencyCaches').doc('cache').set({time: Date.now(), urgencies: JSON.stringify(urgencies)});
  return urgencies;
};

exports.getUrgencies = functions.https.onRequest(async (req, res)=> {
  cors(req, res, () => {});
  let cacheDoc = await db.collection('urgencyCaches').doc('cache').get();
  let cacheData = cacheDoc.data();
  if(!cacheData || ((Date.now() - (cacheData.time||0)) > 3600000)) return res.json(await generateUrgencies());
  res.json(JSON.parse(cacheData.urgencies));
});
