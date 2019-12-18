<template>
<v-container>
           <v-layout row warp>
            <v-flex
              xs8
              sm8
              md12
              class="leave"
              > 
           <h1 >Leave</h1>
            </v-flex>

            <v-flex
              xs6
              sm4
              md2
              class="btn"
              >
              <v-btn round router to="/leaveform" color="primary"><v-icon>add</v-icon> Add Leave</v-btn>
            </v-flex>
        


           </v-layout>
           
<br>
      <v-divider></v-divider>
           
         <!-- </v-toolbar> -->

      <v-container>
         
        
       <v-form v-model="form" ref="form" >

        
       <v-container>
    <v-layout row wrap>

      <v-flex
        xs7
        sm3
        md3
        class="emp"
        >          
          <v-text-field
          label="Emp-name"
          v-model="emp"
         @input="filterSearch"
            ></v-text-field>
        </v-flex>

        <v-flex
        xs7
        sm3
        md3
        class="leave"
        >
            <v-select
                    :items="leave_type_list"
                    item-text="leave_type"
                    label="Leave-Type"
                    @change="filterLeave"
            ></v-select>
        </v-flex>

        

        <v-flex
        xs7
        sm3
        md3
        class="branch"
        >
        <v-combobox
        :rules="branchRules"
        :items="branch_list"
        v-model="branch_name"
        label="Branch"
        item-text="branch_name"
        @change="filterBranch"
        ></v-combobox>
        </v-flex>

         <v-flex
        xs7
        sm3
        md3
        class="dep"
        >
        <v-combobox
        
        :rules="depRules"
        :items="department_list"
        v-model="dept_name"
        label="Department"
        item-text="dept_name"
        @change="filterDepartment"

        ></v-combobox>
        </v-flex>

    </v-layout>
    </v-container>
       </v-form>

<!-- for update  dialog box  -->
      <v-dialog v-model="dialog" max-width="500px">
       
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>


          <v-card-text>
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <v-flex xs12 sm12 md6>
                  <v-combobox
                  v-model="edit_leave_type"
                    :items="leave_type_list"
                    placeholder="Leave Type"
                    item-text="leave_type"
                    label="Leave Type"
                  >
                  </v-combobox>
                </v-flex>
              </v-layout>
               <v-layout row wrap>
                <v-flex xs12 sm12 md6>
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        label="Leave From"
                        placeholder="yyyy-mm-dd"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date1"
                        label="Leave to"
                        placeholder="yyyy-mm-dd"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date1" no-title @input="menu1 = false"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
        
      </v-dialog>



        <v-flex
        xs12 sm12 md12 >
        


            <v-data-table
                    :headers="headers"
                    :items="leave_employee_data"
                    item-key="employee_Name"
                    style="border:1px solid gray"
                    :search="filters"
                    :custom-filter="customFilter"
            >
            <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
                <template slot="items" slot-scope="props">
                    <tr>
                        <td class="text-xs-left">{{ props.item.no }}</td>
                        <td class="text-xs-left">{{ props.item.employee_Name }}</td>
                        <td class="text-xs-left">{{ props.item.leave_type }}</td>
                        <td class="text-xs-left">{{ props.item.leave_from }}</td>
                        <td class="text-xs-left">{{ props.item.leave_to }}</td>
                        <td class="text-xs-left">
                          <v-icon small class="mr-2" @click="editItem(props.item)">
                            edit
                          </v-icon>
                          <v-icon small color="error" @click="deleteItem(props.item)">
                            delete
                          </v-icon>
                        </td>
                      </tr>
                </template>
                

            </v-data-table>
            <v-dialog v-model="dialogdelete" max-width="300px">
              <v-card>
                <v-card-text>Are you sure you want to delete this announcement?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat="flat" @click="dialogdelete = false" v-on="on">Cancel</v-btn>
                  <v-btn color="green darken-1" flat="flat" @click="ok" v-on="on">OK</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

        </v-flex>

      </v-container>
      </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      employee_id:'',
      date: '',
      dialogdelete : false,
      menu2: false,
      date1: '',
      edit_leave_type:'',
      id:'',
      menu1: false,
       dialog: false,
      filters: {
        search: '',
        leave_type: '',
        dept_name:'',
        branch_name:''
       },
      headers: [
        {
          text:'No',
          value:'no'
        },
        {
          text: 'Employee Name',
          align: '',
          value: 'employee_Name',
          sortable: false
        },
        {
          text: 'Leave-Type',
          value: 'leave_type',
          align: 'left',
          sortable: false
        },
        { text: 'From', value: 'from' },
          { text: 'To', value: 'to' },
         { text: 'Actions', value: 'name', sortable: false }
         
      ]
    }),
    

    computed: {
      formTitle () {//for dialog box title name
        return 'Edit Item'
      },
      ...mapGetters([
        'department_list','branch_list','leave_type_list','leave_employee_data'
      ])
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      
    },
    created () {
      this.$store.dispatch('EMPLOYEE_DATA_FOR_LEAVE')
    },

    

    methods: {

      customFilter(items, filters, filter, headers) {
        // Init the filter class.
        const cf = new this.$MultiFilters(items, filters, filter, headers);

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
          // alert(this.dept_name.depth_name)
          
          if (dept_name.trim() === '') return items;

          return items.filter(item => {
            return item.dept_name.dept_name.toLowerCase() === dept_name.toLowerCase();
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

      ok(){
        this.$store.dispatch('DELETE_LEAVE',this.id)
        this.dialogdelete = false
      },

      filterSearch(val) {
    this.filters = this.$MultiFilters.updateFilters(this.filters, {search: val});
},

/**
* Handler when user  select some author at the "Author" select.
*/
filterLeave(val) {
    this.filters = this.$MultiFilters.updateFilters(this.filters, {leave_type: val});
},


filterDepartment(val) {
    this.filters = this.$MultiFilters.updateFilters(this.filters, {dept_name: val});
},

filterBranch(val) {
    this.dept_name=''
    this.$store.dispatch('SELECT_BRANCH_FOR_DEPARTMENT',this.branch_name.branch_id)
},


 editItem (item) {
   this.employee_id = item.employee_id
        this.dialog = true
        this.id = item.leave_id
        // alert(this.id)
        this.date = item.leave_from
        this.date1 = item.leave_to
      },

      deleteItem (item) {
        this.id = item.leave_id
        this.dialogdelete = true
      },

      save () {
        // alert(this.edit_leave_type.leave_id)
        this.$store.dispatch('EDIT_LEAVE_INFO',{
          leave_type : this.edit_leave_type.leave_type,
          leave_from : this.date,
          leave_to : this.date1,
          leave_id : this.id,
          employee_id : this.employee_id
        })
        this.menu2 = false
      }



    }

  }
</script>
<style>

.leave{
  padding-left:3rem;
  padding-top:10px;
}
.btn{
  padding-top:10px;
}


#leavebtn{
   color:white;
   background-color:cornflowerblue;
   
}
#table{
  border:1px solid black;
}
#header{
  
  background-color:#0e4663;


}
#head{
  color:white;
  font-size:16px;
  text-align:left;
}
#form{
  text-align: center;
}
</style>

