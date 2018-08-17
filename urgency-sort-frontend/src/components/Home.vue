<template>
  <div id="home">
    <div class="container main">
      <div class="py-4" v-if="request">
        <div class="text-muted">{{getFrom(request.dateadded)}}</div>
        <div v-if="request.needfood">
          Food needed:
          {{request.detailfood}}
        </div>
        <div v-if="request.needwater">
          Water needed:
          {{request.detailfood}}
        </div>
        <div v-if="request.needcloth">
          Clothing needed:
          {{request.detailcloth}}
        </div>
        <div v-if="request.needkit_util">
          Kitchen Utilities needed:
          {{request.detailkit_util}}
        </div>
        <div v-if="request.needtoilet">
          Toiletries needed:
          {{request.detailtoilet}}
        </div>
        <div v-if="request.needmed">
          Medications needed:
          {{request.detailmed}}
        </div>
        <div v-if="request.needrescue">
          Rescue needed:
          {{request.detailrescue}}
        </div>
        <div>
          Other needs: {{request.needothers}}
        </div>
        <div>
          <span v-if="request.is_request_for_others">Request for others</span>
          <span v-else>Request for self</span>
        </div>
      </div>
      <div class="py-4" v-else>Downloading requests: {{downloadMBs}} MBs</div>
      <div class="">
        <button class="btn" v-on:click="newRequest">Skip request</button>
        <button class="btn" v-on:click="setRequestReport(-1)">Spam</button>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button class="btn" v-on:click="setRequestReport(0)" style="background: lightgreen">Not Urgent</button>
          <button class="btn" v-on:click="setRequestReport(1)" style="background: #ffff84">Urgent</button>
          <button class="btn" v-on:click="setRequestReport(2)" style="background: #ffd27f">Very Urgent</button>
          <button class="btn" v-on:click="setRequestReport(3)" style="background: #ff9b9b">Critical</button>
        </div>
      </div>
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
