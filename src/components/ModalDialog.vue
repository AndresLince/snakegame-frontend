<template>
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
            <top-scores :topScores="topScores"></top-scores>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary" 
            @click="$emit('restartGame')"
          > <v-icon dark>{{playImage}}</v-icon>
            Retry
          </v-btn>         
        </v-card-actions>
       
      </v-card>
    </v-dialog>  
</template>

<script> 

import { mdiPlay } from '@mdi/js'
import TopScores from './TopScores.vue'

export default 
  {
  components: { TopScores },
  data() {
    return {            
      playImage: mdiPlay,      
    }
  }, 
  props:['dialog','topScores','score']
}



  
</script>