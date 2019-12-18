<template>
 <v-container grid-list-md style="padding-top:30px;">
  <v-flex 
      xs12  sm12 md12
  >
    <h1 class="headline">Duty Roster</h1>
    <br/>

<v-divider></v-divider>

      <v-layout row wrap class="card-body-padding">
            <v-flex xs10 sm6 md3>
            <v-combobox 
            placeholder="Branch"
              v-model="branch_name"
              item-text="branch_name"
              :items="branch_list" 
              @change="filterBranch"
            >
            </v-combobox>
          </v-flex>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <v-flex xs10 sm6 md3>
            <v-combobox  v-model="dept_name" :items="department_list" item-text="dept_name" 
        @change="filterDepartment"
              placeholder="Department"
              >
            </v-combobox>
          </v-flex>
      
<v-dialog v-model="dialog" max-width="400px">
    <v-card class="size">
          <v-card-title>
            <span class="headline">Shift Schedule</span>
          </v-card-title>
       <v-divider></v-divider>
          <v-card-text>
        
              <v-layout wrap>
                   <v-flex xs12 sm3 md4 class="pt-4">
            <label class="dialog">Shift name</label>                 
          </v-flex>
                <v-flex xs12 sm6 md7>
                  <v-combobox 
                      v-model="shift" 
                      placeholder="Shift"
                      :rules="shiftnameRules"
                      :items="shift_list"
                      item-text="shift_name"
                      >
                  </v-combobox>
                </v-flex>
              </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm3 md4 class="pt-4">
            <label class="dialog">From Date</label>                 
          </v-flex>
          <v-flex xs12 sm4 md7 class="pt-2">
            <v-menu v-model="FromDate" :close-on-content-click="false" :nudge-right="40"
              lazy transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                <v-text-field v-model="StartDate" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker no-title :max="new Date().toISOString().substr(0, 10)" v-model="StartDate" @input="FromDate = false"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
          
        <v-layout row wrap>
          <v-flex xs12 sm3 md4 class="pt-4">
            <label  class="dialog">To Date</label>                 
          </v-flex>
          <v-flex xs12 sm4 md7 class="pt-2">
            <v-menu v-model="ToDate" :close-on-content-click="false" :nudge-right="40"
              lazy transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                <v-text-field v-model="EndDate" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker no-title :min="new Date().toISOString().substr(0, 10)" v-model="EndDate" @input="ToDate = false"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      
      </v-dialog>

    </v-layout><br>
    <v-divider></v-divider>
   
    <v-data-table
                    style="border:1px solid gray"
                    :headers="headers"
                    :items="employee_data_shift"
                    item-key="employee_Name"
            >
            <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.no }}</td>
        <td class="text-xs-left">{{ props.item.employee_Name}}</td>
        <td class="text-xs-left">{{ props.item.role_name }}</td>
        <td class="text-xs-left">{{ props.item.shift_name }}</td>
        <td class="text-xs-left">
          <v-icon
            color="blue" 
            medium
            class="ml-3"
            @click="editItem( props.item )"
            v-on="on"
          >
            add_circle
          </v-icon>
        </td>
       </template>
      </v-data-table>
    </v-flex>
  </v-container>
</template>

<script>
// import { mapGettter } from 'vuex'
  export default {
    data: () => ({
      filters:{
        branch_name:'',
        dept_name:''
      },
      shift:'',
      employee_id:'',
      dialog: false,
       Branchsearch: '',
     FromDate:false,
     ToDate:false,
     StartDate: new Date().toISOString().substr(0, 10),
     EndDate:new Date().toISOString().substr(0, 10),
      modal: false,
      menu2: false,
       shiftnameRules: [
         (v) => !!v || 'shift name is required',

       ],
      
      headers: [
      { text: 'No', align: 'left', value: 'id' },
      { text: 'EmployeeName', align: 'left', value: 'employeename' },   
       { text: 'Job Role', align: 'left', value: 'role' },     
      { text: 'Shift name', align: 'left', value: 'shiftname' },
      { text: 'Add Shift', align: 'left', value: 'id',sortable: false }, 
      ], 
      editedIndex: -1,
      editedItem: {
       shiftname: ''
       },
      defaultItem: {
       shiftname: ''
      },
      
     
    }),
    created(){
      this.$store.dispatch('SHIFT_INITIALIZE')
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    computed:{
      department_list(){
        return this.$store.getters.department_list
      },
      employee_data_shift(){
        return this.$store.getters.employee_data_detail
      },
      branch_list(){
        return this.$store.getters.branch_list
      },
      shift_list(){
        return this.$store.getters.shift_list
      }
    },
     methods: {
      editItem (item) {
        this.employee_id = item.employee_id
        this.dialog  = true
      },
      close () {
        this.dialog = false
      },
      save () {
        // alert(this.employee_id)
        this.$store.dispatch('ADD_SHIFT_EMPLOYEE',
        {
          employee_id : this.employee_id,
          id : this.shift.id,
          shift_name : this.shift.shift_name,
          from_date : this.StartDate,
          to_date : this.EndDate
        })
        this.close()
      },
      customFilter(items, filters, filter, headers) {
        // Init the filter class.
        const cf = new this.$MultiFilters(items, filters, filter, headers);

        


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
        return cf.runFilters();
      },

      filterDepartment() {
          this.$store.dispatch('SELECT_EMPLOYEE_DATA_FOR_DEPARTMENT',{ dept_id : this.dept_name.dept_id })
      },

      filterBranch() {
        this.dept_name = ''
        // alert("haaa")
        this.$store.dispatch('SELECT_EMPLOYEE_DATA_DETAIL_OF_BRANCH',this.branch_name.branch_id)
      }
    }
  }
</script>

<style scoped>
 .size{
  padding:10px;
}
.card-body-padding{
  padding-left: 40px;
}
.part1-padding1 {
  padding-left:0px;
   padding-top: 30px;
  padding-right: 15px;
  font-size: 16px;
  color:#000;
}
.dialog{
  font-size: 16px;
}

</style>




