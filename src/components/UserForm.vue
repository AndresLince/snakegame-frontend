<template>  
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >      
      <v-card>
        <v-card-title>
          Snake Game
        </v-card-title>
        <v-form v-model="valid" v-on:submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="username"
            :rules="nameRules"
            :counter="20"
            label="Username"
            required
          ></v-text-field>
        </v-col>       
      </v-row>
    </v-container>
     <v-container v-ripple="{ center: true }">
      <v-row>
        <v-col
          cols="12"
          md="12"
          class="container_button"
        >
       <v-btn
        block
        color="primary"
        :disabled="!valid"
        elevation="2"
        large        
        @click="$emit('change-game-state', {state:2,username:username})"
        >PLAY<v-icon dark>{{playImage}}</v-icon></v-btn>
        </v-col>
      </v-row>
     </v-container>
  </v-form>
      </v-card>
    </v-dialog>
  
</template>

<script> 

import { mdiPlay } from '@mdi/js'
export default {  
    data: () => ({     
      playImage: mdiPlay,     
      valid: false,
      dialog:true,
      username: '',      
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'Name must be less than 10 characters',
        v => v.length > 3 || 'Name must be more than 3 characters',
      ],      
    }),
    mounted(){
      if (localStorage.username) {
        this.username = localStorage.username;
      }
    },
    name: 'UserForm',
   
}
</script>

