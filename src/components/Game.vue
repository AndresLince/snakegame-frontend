<template>
  <v-container>
    <v-card
      elevation="2"
    >
    <v-card-title>
    <v-row>
      <v-col>
        <v-icon>{{ userImage }}</v-icon>
        {{username}}         
          <v-btn
            class="ma-2"
            color="primary"
            dark
            @click="editUserName"
          >
            <v-icon dark>
             {{ AccountEditImage }}
            </v-icon>
      </v-btn>
      </v-col>
      <v-col class="align-right">
         Score: {{score}}
      </v-col>
    </v-row></v-card-title>
    <v-card-text v-if="downloaded" :id="containerId" >   
     
    </v-card-text>
    <v-card-text class="placeholder text-center mt-10" v-else>          
      <v-progress-circular
        :size="200"       
        color="primary"
        indeterminate
      ></v-progress-circular>
    
      </v-card-text>  
  </v-card>  
  <modal-dialog 
    :dialog="dialog"
    :score="score"
    :topScores="topScores"
    v-on:restartGame="restartGame($event)"
  >        
  </modal-dialog>
  </v-container>
</template>
<script> 

import { changeEmitter } from '../game/scenes/PlayScene';
import { mapActions,mapMutations } from 'vuex'
import store from '../store/index.js'
import ModalDialog from './ModalDialog.vue';
import { mdiAccount } from '@mdi/js'
import { mdiAccountEdit } from '@mdi/js'
export default {
  components: { ModalDialog },
  name: 'Game',
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: 'game-container',  
      dialog:false,
      score:0,    
      userImage: mdiAccount,
      AccountEditImage: mdiAccountEdit
    }
  }, 
  async mounted() {
    const game = await import('@/game/game')
    this.downloaded = true
    changeEmitter.on('finishedGame', this.finishedGame);
    changeEmitter.on('changeScore', this.changeScore);
    this.$nextTick(() => {      
      this.gameInstance = game.launch(this.containerId)
    })
  },
  destroyed() {
    this.gameInstance.destroy(false)
  },  
  computed: {
    topScores () {
      return store.state.topScores
    },
    username(){
      return store.state.username
    }
  },
  methods: {
     ...mapActions(['fetchTopScores','addScore']),
     ...mapMutations(['changeGameState']),
    finishedGame: async function () {
      this.dialog=true;      
      await this.addScore({username:this.username,score:this.score});
      this.fetchTopScores();
    },
    changeScore: function (score) {
      this.score=score;
    },
    restartGame: function () {
      this.dialog = false;
      this.score=0;
      changeEmitter.emit('restartGame');   
    },
    editUserName:function(){
      
      this.changeGameState(1);
    }
  }
}
</script>

<style lang="scss" scoped>
.placeholder {
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
}
</style>
