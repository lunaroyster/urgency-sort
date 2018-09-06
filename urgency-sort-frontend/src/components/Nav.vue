<template>
  <nav class="navbar navbar-expand navbar-light">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item d-flex" style="align-items: center; font-size: 0.5em">
          <a class="nav-link" target="_blank" href="https://keralarescue.in">Kerala Rescue Main Site</a>
        </li>
        <li class="nav-item d-flex" style="align-items: center; font-size: 0.5em">
          <router-link class="nav-link" to="urgent">View Urgent Requests</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" target="_blank" href="https://github.com/lunaroyster/urgency-sort"><i class="fab fa-github"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" target="_blank" href="https://twitter.com/itsarnavb"><i class="fab fa-twitter"></i></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {};
  },
};
</script>

<style scoped>
nav {
  font-size: 1.5em;
}
</style>
