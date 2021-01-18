<template>  
  <v-form v-model="valid">
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
        :disabled="!valid"
        elevation="2"
        large
        v-on:click="$emit('changeGameState', {state:2,username:username})"
        >PLAY</v-btn>
        </v-col>
      </v-row>
     </v-container>
  </v-form>
</template>

<script> 

export default {  
    data: () => ({      
      valid: false,
      username: '',      
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'Name must be less than 10 characters',
        v => v.length > 3 || 'Name must be more than 3 characters',
      ],      
    }),
    name: 'UserForm',
   
}
</script>

