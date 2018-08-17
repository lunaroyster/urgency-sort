import axios from 'axios';
import download from './download.json';

class RequestService {
  constructor() {
    this.downloadedRequests = null;
    this.waitingReports = {};
    this.reportedRequests = [];
  }
  async getRequests() {
    if(this.downloadedRequests) return this.downloadedRequests;
    this.downloadedRequests = download; //TODO: Switch with download URL
    return this.downloadedRequests;
  }
  async getRequestAtRandom() {
    let requests = await this.getRequests();
    let request = requests[Math.ceil(Math.random() * requests.length)];
    if(this.reportedRequests.indexOf(request.id)==-1) return request;
    return this.getRequestAtRandom();
  }
  async flushReports() {
    let url = 'https://us-central1-keralarescue-fef8e.cloudfunctions.net/makeReports';
    await axios.post(url, {reports: this.waitingReports});
    this.waitingReports = {};
  }
  setRequestReport(id, report) {
    if(typeof report !== "number") return;
    this.waitingReports[id] = report;
    this.reportedRequests.push(id);
    if (this.reportCount>=5) {
      this.flushReports();
    }
  }
  get reportCount() {
    return Object.keys(this.waitingReports).length;
  }
}

export default new RequestService();