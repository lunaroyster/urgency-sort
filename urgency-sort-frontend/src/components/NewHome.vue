<template>
  <div id="home">
    <div class="container" style="margin-top: 2em;">
      <h1 class="display-4">What's this?</h1>
      <p>In August 2018, floods decimated the state of Kerala. Requests for help began to arrive quick at keralarescue.in, which was the official portal for disaster response.</p>
      <p>I discovered that there wasn't a good way to find urgent requests since there were so many. So I built a platform that made use of the power of crowds to determine the urgency of requests. This site let volunteers rate the urgency of requests on a scale from 0 to 3.</p>
      <p>Hundreds of volunteers began using this tool as a triage platform. We were able to classify about 6800 requests, and made the data available to the rescue authorities. You can read the full story here:</p>
      <a class="linkButton btn d-flex align-items-center my-2" href="https://medium.freecodecamp.org/how-i-used-crowdsourcing-to-help-kerala-floods-rescue-operations-12dc97c9a24b" target="_blank">
        <div class="p-2 mr-2">
          <i class="fab fa-medium-m" style="font-size: 3em;"></i>
        </div>
        <div style="overflow: hidden; text-align: left">
          <div>How I used crowdsourcing to help Kerala floods rescue operations</div>
          <div class="text-muted">Overnight, I made a website that let people discover urgent requests</div>
        </div>
      </a>
      <h1 class="display-4">What now?</h1>
      <p>As a prototype, this site couldn't have been more successful. In the article above, I touch upon the aspects that people found most useful.</p>
      <p>I've learnt many things building and operating this, and speaking to its users. I'm convinced a lot more can be done. If you can help in any way, DM me:</p>
      <a class="linkButton btn d-flex align-items-center my-2" href="https://twitter.com/itsarnavb" target="_blank">
        <i class="fab fa-twitter p-2 mr-2" style="font-size: 3em;"></i>
        <span>Follow me on Twitter.</span>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
  },
  async mounted() {
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
.linkButton {
  color: unset;
  &:hover {
    box-shadow: 2px 2px 2 2;
  }
}
</style>
