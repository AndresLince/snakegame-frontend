<template>
    <v-container>
        <strong>Top scores:</strong>
        <v-simple-table>
            <template>                               
            <tbody>
                <tr
                v-for="(user) in topScores" :key="user.id"
                >                
                <td>{{user.username}} {{user.icon}}</td>
                <td>{{user.score}}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-container> 
</template>

<script>
export default {  
  props:['topScores']
}
</script>