<template>
  <v-app id="inspire">    
    <v-main>
       <view-main></view-main>
    </v-main>
  </v-app>
</template>


<script>

import ViewMain from './views/ViewMain.vue'
export default {
  components: { ViewMain },
  name: 'App',

}
</script>


<style lang="scss">
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
.container_button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.align-right {
  display: flex;
  align-items: right;
  justify-content: right;
}
</style>
