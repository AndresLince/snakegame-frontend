<template>  
  <v-container>
    <user-form v-if="gameState==1" v-on:changeGameState="saveUser($event)"></user-form>
    <game v-else-if="gameState==2"></game>
  </v-container>
</template>


<script>
import Game from '../components/Game.vue'
import UserForm from '../components/UserForm.vue'
import store from '../store/index.js'
import { mapMutations } from 'vuex';
export default {
  components: { Game, UserForm },  
  computed: {
      gameState () {
          return store.state.gameState
      }
  },
  name: 'ViewMain', 
  methods: {
    ...mapMutations(['changeGameState','setUsername']),
    saveUser(data){
      this.setUsername(data.username)
      this.changeGameState(data.state)
    }
  }
  
}
</script>

