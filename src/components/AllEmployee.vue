<template>

  <v-container>
    <v-layout style=" width:100%" >
      <v-form class="pt-4" style="width:100%;padding-left:3%;font-style:Lucida Grande;font-size:14px">
        <v-layout row wrap>
          <v-flex xs12 sm3 md3>
         <h1 >Employee</h1>
          </v-flex> 

          <v-spacer/>
          <v-flex xs12 sm3 md3>
         
          <div class="text-xs-right">
              <v-btn class="primary" round to="/employeeregistration">
              <span><v-icon small>add</v-icon></span>&nbsp;Add Employee
                <!-- <v-chip color="primary" dark><i class="fas fa-plus"></i>&nbsp; Add Employee</v-chip> -->
              </v-btn>
        </div>
        
        
          </v-flex>
       
        </v-layout><br/>
        <v-divider></v-divider>
        
        <v-layout row wrap>
        
          <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="employee_number"
        append-icon=""
        placeholder="Employee Number"
        single-line
        hide-details
        @imput="filterEmployeeNumber"
        
        
      ></v-text-field>
          </v-flex><v-spacer/>
            <v-flex xs12 sm2 md2>
      <v-text-field
        v-model="employee_name"
        append-icon=""
        placeholder="Employee Name"
        single-line
        hide-details
        @input="filterSearch"
        
      ></v-text-field>
          </v-flex><v-spacer/>
          <v-flex xs12 sm2 md3>
             <v-select
      v-model="dept_name"
      :items="employee_data_detail"
      item-text="dept_name"
      label="Department"
      required
    ></v-select>
      
          </v-flex><v-spacer/>
          
             <v-flex xs12 sm2 md3>
             <v-select
      v-model="branch_name"
      :items="employee_data_detail"
      @change="filterBranch"
      item-text="branch_name"
      label="Branch"
      required
    ></v-select>
      
          </v-flex>
      
          
          <v-spacer></v-spacer>
        </v-layout><br/>
          <v-container  class="my-5">
        <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="person in employee_data_list" :key="person.employee_Name" :search="filters"
                    :custom-filter="customFilter">
       <v-card flat class="text-xs-center ma-3;square" >
        
         
            <v-responsive class="pt-4">
                     <v-avatar size="100" class="grey lighten-2">
                       <img src="../assets/logo.png">
                     </v-avatar>
                  </v-responsive>
                  <v-card-text>
                    <div class="subheading">{{ person.employee_Name}}</div>
                    <div class="grey--text" style="font-size:12px">{{person.role_name}}</div>
                   
                     <v-chip class="white--text" color="primary" style="height:30px" >Details</v-chip>
                    
                  </v-card-text>
                  
        </v-card>

      </v-flex>
    </v-layout>
 </v-container>
        
      </v-form>
    </v-layout>
    
  </v-container>
  
</template>

<script>
import { mapGetters } from 'vuex'
 
  export default {
   data() {
     return {
       filters:{
          employee_name: '',
          employee_number:'',
          leave_type: '',
          dept_name:'',
          branch_name:'',
       },
        employee_name: '',
        employee_number:'',
        leave_type: '',
        dept_name:'',
        branch_name:'',
       empid: '',
       empname: '',
       dept: '',
       branch: '',
      //  dropdown_font: ['Gucci', 'YSL', 'Bella', 'NYX'],
      //  dropdown_font1: ['Arial', 'Calibri', 'Courier', 'Verdana'],
       team:[
           { name: 'Chan Chan', role: 'Web developer', avatar: '/avatar1.png'},
            { name: 'Mark Jason', role: 'Andriod developer', avatar: '/avatar2.png'},
            { name: 'Min Min', role: 'Graphic designer', avatar: '/avatar3.png'},
            { name: 'Yoshi', role: 'Social mdeia maverick', avatar: '/avatar4.png'},
            { name: 'Chan Chan', role: 'Web developer', avatar: '/avatar1.png'},
            { name: 'Mark Jason', role: 'Andriod developer', avatar: '/avatar2.png'},
            { name: 'Min Min', role: 'Graphic designer', avatar: '/avatar3.png'},
            { name: 'Yoshi', role: 'Social mdeia maverick', avatar: '/avatar4.png'}
       ],
       select: null

     }
   },
   methods:{
     customFilter(items, filters, filter, headers) {
        // Init the filter class.
        const cf = new this.$MultiFilters(items, filters, filter, headers);

        cf.registerFilter('search', function (employee_number, items) {
          if (employee_number.trim() === '') return items;

          return items.filter(item => {
            return item.employee_number.toLowerCase().includes(employee_number.toLowerCase());
          }, employee_number);

        });

        cf.registerFilter('search', function (searchWord, items) {
          if (searchWord.trim() === '') return items;

          return items.filter(item => {
            return item.employee_Name.toLowerCase().includes(searchWord.toLowerCase());
          }, searchWord);

        });


        cf.registerFilter('leave_type', function (leave_type, items) {
          if (leave_type.trim() === '') return items;

          return items.filter(item => {
            return item.leave_type.toLowerCase() === leave_type.toLowerCase();
          }, leave_type);

        });


        cf.registerFilter('dept_name', function (dept_name, items) {
          if (dept_name.trim() === '') return items;

          return items.filter(item => {
            return item.dept_name.toLowerCase() === dept_name.toLowerCase();
          }, dept_name);

        });

         cf.registerFilter('branch_name', function (branch_name, items) {
          if (branch_name.trim() === '') return items;

          return items.filter(item => {
            return item.branch_name.toLowerCase() === branch_name.toLowerCase();
          }, branch_name);

        });


        // Its time to run all created filters.
        // Will be executed in the order thay were defined.
        return cf.runFilters();
      },


      filterSearch(val) {
        this.filters = this.$MultiFilters.updateFilters(this.filters, {search: val});
      },
      filterLeave(val) {
    this.filters = this.$MultiFilters.updateFilters(this.filters, {leave_type: val});
},

filterEmployeeNumber(val){
   this.filters = this.$MultiFilters.updateFilters(this.filters, {employee_number: val});
},
filterDepartment(val) {
    this.filters = this.$MultiFilters.updateFilters(this.filters, {dept_name: val});
},

filterBranch(val) {
    this.filters = this.$MultiFilters.updateFilters(this.filters, {branch_name: val});
},
   },
   created(){
     this.$store.dispatch('CREATE_INITIALIZE')
   },
   computed:{
     employee_data_list(){
       return this.$store.getters.employee_data_detail.filter((element)=>{
          if(this.employee_name){
                    element = element.employee_Name.indexOf(this.employee_name) != -1
          }
          if(this.employee_number){
                    element = element.employee_No.indexOf(this.employee_number) != -1
          }
          if(this.dept_name){
            element = element.dept_name.indexOf(this.dept_name ) != -1
          }
          if(this.branch_name){
            element = element.branch_name.indexOf(this.branch_name ) != -1
          }
          return element
       })

     },
     ...mapGetters(
       [
         'department_list','branch_list','employee_data_detail'
       ]
     )
   }

  }
</script>

<style>

</style>