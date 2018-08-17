<template>
  <div id="home">
    <div class="container main">
      <div class="py-4" v-if="request">
        <h5 class="text-muted">Request #{{request.id}}</h5>
        <div class="text-muted">{{getFrom(request.dateadded)}} for <span v-if="request.is_request_for_others">someone else</span><span v-else>self</span></div>
        <div class="row">
          <div class="col-12 col-6-md">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col-3">Need</th>
                  <th scope="col-9">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="request.needfood">
                  <th scope="row"><i class="fas fa-cookie mr-2"></i>Food</th>
                  <td>{{request.detailfood}}</td>
                </tr>
                <tr v-if="request.needwater">
                  <th scope="row"><i class="fas fa-tint mr-2"></i>Water</th>
                  <td>{{request.detailwater}}</td>
                </tr>
                <tr v-if="request.needcloth">
                  <th scope="row"><i class="fas fa-tshirt mr-2"></i>Clothing</th>
                  <td>{{request.detailcloth}}</td>
                </tr>
                <tr v-if="request.needkit_util">
                  <th scope="row"><i class="fas fa-utensils mr-2"></i>Kitchen Utilities</th>
                  <td>{{request.detailkit_util}}</td>
                </tr>
                <tr v-if="request.needtoilet">
                  <th scope="row"><i class="fas fa-shower mr-2"></i>Toiletries</th>
                  <td>{{request.detailtoilet}}</td>
                </tr>
                <tr v-if="request.needmed">
                  <th scope="row"><i class="fas fa-briefcase-medical mr-2"></i>Medications</th>
                  <td>{{request.detailmed}}</td>
                </tr>
                <tr v-if="request.needrescue">
                  <th scope="row"><i class="fas fa-people-carry mr-2"></i>Rescue</th>
                  <td>{{request.detailrescue}}</td>
                </tr>
                <tr v-if="request.needothers">
                  <th scope="row"><i class="fas fa-info mr-2"></i>Other</th>
                  <td>{{request.needothers}}</td>
                </tr>
                <tr v-if="request.requestee_phone">
                  <th scope="row"><i class="fas fa-phone mr-2"></i>Phone</th>
                  <td>{{request.requestee_phone}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="py-4" v-else>Downloading requests: {{downloadMBs}} MBs</div>
      <div class="">
        <button class="btn" v-on:click="newRequest">Skip request</button>
        <!--<button class="btn" v-on:click="setRequestReport(-1)">Spam</button>-->
        <div class="btn-group" role="group" aria-label="Basic example">
          <button class="btn" v-on:click="setRequestReport(0)" style="background: lightgreen">Not Urgent</button>
          <button class="btn" v-on:click="setRequestReport(1)" style="background: #ffff84">Urgent</button>
          <button class="btn" v-on:click="setRequestReport(2)" style="background: #ffd27f">Very Urgent</button>
          <button class="btn" v-on:click="setRequestReport(3)" style="background: #ff9b9b">Critical</button>
        </div>
      </div>
      <div class="text-muted py-2" style="font-size: 1em">Sourced from keralarescue.in</div>
    </div>
  </div>
</template>

<script>
import requestService from '@/services/request';
import moment from 'moment';

export default {
  name: 'Home',
  data() {
    return {
      request: null,
      bytesDown: 0
    };
  },
  methods: {
    async newRequest() {
      this.request = await requestService.getRequestAtRandom();
    },
    async setRequestReport(report) {
      requestService.setRequestReport(this.request.id, report);
      await this.newRequest();
    },
    getFrom(timestamp) {
      return moment(timestamp).from();
    }
  },
  computed: {
    downloadMBs() {
      return parseFloat(this.bytesDown/1024**2).toFixed(2);
    }
  },
  async mounted() {
    requestService.onDownloadProgress(progressEvent=> {
      this.bytesDown = progressEvent.loaded;
    });
    await this.newRequest();
  },
};

</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
