const request = require("then-request");
const fse = require("fs-extra");

async function getDump() {
  let allData = [];
  let offset = 0;
  while(true) {
    let url = `https://keralarescue.in/data/?offset=${offset}`;
    console.log(url)
    let response = await request('GET', url);
    let body = JSON.parse(response.getBody('utf-8'));
    let data = body.data;
    let lastID = data[data.length-1].id;
    allData.push(...data);
    if(lastID == body.meta.last_record_id) break;
    offset = lastID;
  }
  return allData;
}

async function init() {
    let allData = await getDump();
    await fse.writeJson(`data/allData-${Date.now()}.json`, allData);
}
init();