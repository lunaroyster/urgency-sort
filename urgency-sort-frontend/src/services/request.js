import axios from 'axios';
import Vue from 'vue';

class RequestService {
  constructor() {
    this.downloadedRequests = null;
    this.waitingReports = {};
    this.reportedRequests = [];
    this.eventCallbacks = {
      onDownloadProgress: [],
    };
  }
  async getRequests() {
    if(this.downloadedRequests) return this.downloadedRequests;
    let response = await axios.get('/static/data.json', {
      onDownloadProgress: (event)=> {this.fireDownloadProgress(event)}
    });
    this.downloadedRequests = response.data;
    return this.downloadedRequests;
  }
  onDownloadProgress(cb) {
    this.eventCallbacks.onDownloadProgress.push(cb);
  }
  fireDownloadProgress(event) {
    for(let cb of this.eventCallbacks.onDownloadProgress) {
      cb(event)
    }
  }
  async getRequestAtRandom() {
    let requests = await this.getRequests();
    let request = requests[Math.ceil(Math.random() * requests.length)];
    if(this.reportedRequests.indexOf(request.id)==-1) return request;
    return this.getRequestAtRandom();
  }
  async flushReports() {
    let data = JSON.parse(JSON.stringify({reports: this.waitingReports}));
    this.waitingReports = {};
    let url = 'https://us-central1-keralarescue-fef8e.cloudfunctions.net/makeReports';
    await axios.post(url, data);
    window.gtag('event', 'flush');
  }
  async setRequestReport(id, report) {
    if(typeof report !== "number") return;
    this.waitingReports[id] = report;
    this.reportedRequests.push(id);
    if (this.reportCount>=5) {
      await this.flushReports();
    }
  }
  get reportCount() {
    return Object.keys(this.waitingReports).length;
  }
}

export default new RequestService();