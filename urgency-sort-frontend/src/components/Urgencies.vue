<template>
  <div id="urgencies">
    <div class="container">
      <div class="my-4">
        Click on the IDs to view the request on keralarescue.in
      </div>
      <div class="card my-2 border-0" v-for="(request, i) in urgentRequests">
        <div class="card-body">
          <h5 class="card-title"><a :href="getRequestUrl(request.id)" style="color: unset" target="_blank">#{{request.id}}</a></h5>
          <small class="card-subtitle mb-2 text-muted d-block">{{getFrom(request.dateadded)}}</small>
          <div v-if="request.needfood">
            <i class="fas fa-cookie mr-2"></i>Food: {{request.detailfood}}
          </div>
          <div v-if="request.needwater">
            <i class="fas fa-tint mr-2"></i>Water: {{request.detailwater}}
          </div>
          <div v-if="request.needcloth">
            <i class="fas fa-tshirt mr-2"></i>Clothing: {{request.detailcloth}}
          </div>
          <div v-if="request.needkit_util">
            <i class="fas fa-utensils mr-2"></i>Kitchen Utilities: {{request.detailkit_util}}
          </div>
          <div v-if="request.needtoilet">
            <i class="fas fa-shower mr-2"></i>Toiletries: {{request.detailtoilet}}
          </div>
          <div v-if="request.needmed">
            <i class="fas fa-briefcase-medical mr-2"></i>Medications: {{request.detailmed}}
          </div>
          <div v-if="request.needrescue">
            <i class="fas fa-people-carry mr-2"></i>Rescue: {{request.detailrescue}}
          </div>
          <div v-if="request.needothers">
            <i class="fas fa-info mr-2"></i>Other: {{request.needothers}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import requestService from '@/services/request';
import moment from 'moment';

export default {
  name: 'Urgencies',
  data() {
    return {
      urgencies: null,
      requests: null,
    };
  },
  async mounted() {
    this.urgencies = await requestService.getUrgencies();
    this.requests = await requestService.getRequests();
  },
  methods: {
    getFrom(timestamp) {
      return moment(timestamp).from();
    },
    getRequestUrl: id=>`https://keralarescue.in/request_details/${id}/`,
  },
  computed: {
    idUrgencyList() {
      if(!this.urgencies) return;
      let idUrgencyList = Object.entries(this.urgencies).sort((a, b)=> -(a[1].confidence.low - b[1].confidence.low));
      return idUrgencyList;
    },
    urgentRequests() {
      if(!this.requests || !this.urgencies) return;
      let idUrgencyList = this.idUrgencyList.slice(0, 100);
      let urgentRequests = [];
      idUrgencyList.forEach(idUrgency=> {
        let request = this.requests.find(r=>r.id==idUrgency[0]);
        request.urgencyScores = idUrgency[1];
        urgentRequests.push(request);
      });
      return urgentRequests;
    },
  },
};
</script>

<style scoped>
nav {
  font-size: 1.5em;
}
</style>
