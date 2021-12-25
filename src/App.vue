<template>
  <div class="appWrap">
    <Index></Index>
  </div>
</template>

<script>
import Index from "./components/Index";
export default {
  name: "App",

  components: {
    Index,
  },

  mounted() {
    this.$store.commit('getUserMess')
  },
};
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
  overflow: hidden;
}

.appWrap {
  height: 100%;
}
</style>
