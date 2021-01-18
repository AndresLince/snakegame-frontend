<template>
  <v-container>
    <v-card
      elevation="2"
    >
    <v-card-title>
    <v-row>
      <v-col>
        {{username}}
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
  <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >      
      <v-card>
        <v-card-title class="headline container_button">
         GAME OVER
        </v-card-title>
         <v-card-text>
           Score: {{score}}
         </v-card-text>
        <v-card-text v-if="topScores.length>0">    
            <strong>Top scores:</strong>
            <v-simple-table>
              <template>                               
                <tbody>
                  <tr
                    v-for="(user) in topScores" v-bind:key="user.id"
                  >
                    <td>{{user.username}} </td>
                    <td>{{user.score}}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="restartGame"
          >
            Retry
          </v-btn>         
        </v-card-actions>
      </v-card>
    </v-dialog>  
  </v-container>
</template>
<script> 

import { changeEmitter } from '../game/scenes/PlayScene';
import { mapActions } from 'vuex'
import store from '../store/index.js'
export default {
  name: 'Game',
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: 'game-container',  
      dialog:false,
      score:0    
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
