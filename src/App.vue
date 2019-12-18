<template>
  <v-app>
    <v-content>
      <HRHome/>
    </v-content>
  </v-app>
</template>

<script>
 import HRHome from './components/HRHome'

export default {
  name: 'App',
  components: {
    HRHome
  },
  data () {
    return {
      //
    }
  },
  created(){
    this.$store.dispatch('CREATE_INITIALIZE')
    this.$store.dispatch('SELECT_ANNOUNCEMENT_DATA')
    this.$store.dispatch('EMPLOYEE_DATA_LIST')
  }
}
</script>
