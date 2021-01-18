import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameState:1,//1:without start,2:In proccess
    topScores:[
     
    ],
    username:''
  },
  mutations: {
    changeGameState (state,newGameState) {
      state.gameState=newGameState;
    },
    setUsername (state,username) {
      state.username=username;
    },
    setTopScores(state,topScores){
      state.topScores=topScores
    }
  },
  actions: {
    async fetchTopScores({commit}) {
      try {
        const {data} = await Vue.axios({
          url: '/scores?limit=5'
        })    
        commit('setTopScores', data)        
      } catch (e) {      
        commit('setTopScores', [])
      } 
    },
    async addScore ({commit}, userData) {  
      
      try {        
        const {data} = await Vue.axios({
          method: 'POST',
          url: '/scores',
          data: {        
            username:userData.username,score:userData.score    
          }
        })        
        
      } catch (e) {
        
      } 
    }
  },
  modules: {
  }
})
