<template>
  <div id="home">
    <div class="container main">
      <div class="">
        {{request}}
      </div>
      <div class="">
        <button class="btn" v-on:click="newRequest">Skip request</button>
        <button class="btn" v-on:click="setRequestReport(-1)">Spam</button>
        <button class="btn" v-on:click="setRequestReport(0)">Not Urgent</button>
        <button class="btn" v-on:click="setRequestReport(1)">Urgent</button>
        <button class="btn" v-on:click="setRequestReport(2)">Very Urgent</button>
        <button class="btn" v-on:click="setRequestReport(3)">First Priority Urgent</button>
      </div>
    </div>
  </div>
</template>

<script>
import requestService from '@/services/request';

export default {
  name: 'Home',
  data() {
    return {
      request: null,
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
  },
  async mounted() {
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
