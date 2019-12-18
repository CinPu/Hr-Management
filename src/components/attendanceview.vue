<template>
  <v-app class="card">
    <v-container justify-center grid-list-md>
      <!-- form design -->

      <v-form class="form">
        <h1 style="text-align:left">Attendance View</h1>
        <br />
        <v-divider style="color:gray"></v-divider>
        <br />
        <v-layout row wrap>
          <v-flex md2 sm4 xs12>
            <v-combobox
            v-model="year"
            :items="years"
            label="Years"
            item-text="name"
          ></v-combobox>
          </v-flex>
           <v-flex md2 sm4 xs12>
            <v-combobox
            style="width:100px;"
            v-model="month"
            :items="months"
            item-text="name"
            @change="filterMonths"
            label="Months"
          ></v-combobox>
          </v-flex>
        </v-layout>
        
        <br />
        <v-data-table :headers="headers" :items="employee_data_attendance">
          <template v-slot:items="props">
            <td>{{ props.item.employee_name }}</td>
            <!-- <td><v-icon color="green">{{props.item.icon}}</v-icon>{{ props.item.icon }}</td> -->
            <td><v-icon :id="`${props.item.status}`">{{props.item.icon }}</v-icon></td>
             <!-- <td><v-icon color="green">{{props.item.icon1}}</v-icon></td> -->
            <!-- <td><v-icon color="red">{{props.item.icon2}}</v-icon></td> -->
          </template>
        </v-data-table>
      </v-form>
    </v-container>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({

    month:'',
    year:'',
    months: [
      { name:'January' , value:'1'},
      { name:'February' , value:'2'},
      { name:'March' , value:'3'},
      { name:'April' , value:'4'},
      { name:'May' , value:'5'},
      { name:'June' , value:'6'},
      { name:'July' , value:'7'},
      { name:'August' , value:'8'},
      { name:'September' , value:'9'},
      { name:'October' , value:'10'},
      { name:'November' , value:'11'},
      { name:'December' , value:'12'},
    ],
    years:[
      { name:'2019'},{ name:'2018' },{ name:'2017'}
    ] ,
    headers:[
     
    ],
  }),
  methods: {
    filterMonths(val){
      let months = [31,28,31,30,31,30,31,31,30,31,30,31]
      let count = months[parseInt(val.value)-1]
      this.headers.push(
        { text:'Employee Name' }
      )
      for( var i = 1 ; i <= count ; i++){
        this.headers.push({
          text: i.toString()
        })
      }
    }
  },
  computed:{
    ...mapGetters([
      'employee_data_attendance'
    ]),
    employee_data_attendance(){
      return this.$store.getters.employee_data_attendance.filter( element=>{
          return  element.year.indexOf(this.year) !== -1 || element.month.indexOf(this.month.value) !== -1
      })
    }
  }
};
</script>
<style scoped>
.card {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 14px;
  border-spacing: 12px;
  width: 100%;
}
.v-icon#done{
  color:green
}
.v-icon#clear{
  color:red;
}
.form {
  padding: 35px;
}
.table{
  column-width: 0.1%
}
</style>
