var request = require('sync-request');
const fs = require('fs');

var res = request('GET', 'https://keralarescue.in/data/');
let data = res.getBody('utf-8')

fs.writeFileSync('static/data.json', data, 'utf-8');