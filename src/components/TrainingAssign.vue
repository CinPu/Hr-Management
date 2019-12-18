<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-layout row wrap>
          <v-flex xs8 sm8 md8>
            <h1>Assign your Training</h1>
          </v-flex>
          <!-- Button that is linked to router -->
          <v-flex xs3 sm4 md4>
            <div class="text-xs-right">
            <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on }">
                <v-btn right v-on="on" class="primary" round>
                  <span>
                    <v-icon>add</v-icon>
                  </span>&nbsp;Add Employee
                </v-btn>
              </template>
              <v-card>
                <v-toolbar flat dark color="primary">
                  <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Add employee to  training</v-toolbar-title>
                </v-toolbar>
                <v-card-text style="padding-left:100px;">
                  <v-layout row wrap>
                    <v-flex xs12 sm4 md2 class="mr-3">
                      <v-combobox
                        v-model="BranchSelect"
                        :items="branch_list"
                        item-text="branch_name"
                        placeholder="Branch"
                        @change="filterBranch"
                      ></v-combobox>
                    </v-flex>
                    <v-flex xs12 sm4 md2 class="mr-3">
                      <v-combobox
                        v-model="DepartmentSelect"
                        :items="department_list"
                        item-text="dept_name"
                        placeholder="Department"
                        @change="fiterDepartment"
                      ></v-combobox>
                    </v-flex>
                  </v-layout>
                  <!-- Table layout -->
                  <v-layout>
                    <v-flex md8>
                      <v-data-table
                        v-model="number"
                        :headers="headers"
                        :items="employee_data_dialog"
                        style="width:100%;border:1px solid gray"
                        
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
                          <td class="text-xs-left">{{ props.item.employee_Name }}</td>
                          <!-- <td class="text-xs-left">{{ props.item.dept_name }}</td> -->
                          <!-- <td class="text-xs-left">{{ props.item.branch_name }}</td> -->
                          <td class="text-xs-left">{{props.item.role_name}}</td>
                          <td>
                            <v-btn class="green--text" v-show="!fav" icon @click="AddEmployeeToTraining(props.item,props.index)">
                              <v-icon>add_circle</v-icon>
                            </v-btn>
                          </td>
                        </template>
                      </v-data-table>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-dialog>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout><br>
    <v-divider />
    <br />
    <v-layout row wrap>
      <v-flex>
        <v-layout row wrap>
          <v-flex xs12 sm4 md2 class="mr-3">
            <v-combobox
              v-model="TrainingSelect"
              :items="training_list"
              item-text="training"
              placeholder="Training Name"
            ></v-combobox>
          </v-flex>
          <!-- From date layout -->
          <v-flex xs12 sm4 md2 class="mr-3">
            <v-menu
              ref="menu1"
              v-model="fromdatemenu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  class="textbox"
                  v-model="fromdateFormatted"
                  placeholder="From date"
                  @blur="fromdate = fromparseDate(fromdateFormatted)"
                  v-on="on"
                  :rules="daterules"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="fromdate"
                no-title
                @input="fromdatemenu = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <!-- To date layout -->
          <v-flex xs12 sm4 md2 class="mr-3">
            <v-menu
              ref="menu1"
              v-model="todatemenu"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  class="textbox"
                  v-model="todateFormatted"
                  placeholder="To date"
                  @blur="todate = toparseDate(todateFormatted)"
                  v-on="on"
                  :rules="daterules"
                ></v-text-field>
              </template>
              <v-date-picker
                :min="fromdateFormatted"
                v-model="todate"
                no-title
                @input="todatemenu = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-spacer />
        </v-layout>
      </v-flex>
      <!--Data table layout -->
      <v-flex md12>
        <v-layout row wrap>
          <v-flex>
            <v-data-table v-model="number" :headers="headers" :items="employee_data_assign"
            style="width:100%;border:1px solid gray">
            <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.employee_Name }}</td>
                <td class="text-xs-left">{{props.item.role_name }}</td>
                <td>
                  <v-btn class="green--text" icon>
                    <v-icon>add_circle</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- Buttons layout -->
      <v-flex>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12 style="text-align:center">
            <v-btn flat class="primary" round @click="AddEmployeeAssignTraining">Save</v-btn>
            <v-btn flat round to="/employeetraining" class="primary" @click="reset">Cancel</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    employee_data_assign : [],
    // from date picker
    fromdate: new Date().toISOString().substr(0, 10),
    fromdateFormatted: "",
    fromdatemenu: false,
    // to date picker
    todate: new Date().toISOString().substr(0, 10),
    todateFormatted: "",
    todatemenu: false,
    employee_data_dialog:[],
    // headers that are in data table
    headers: [
      { text: "No", value: "id", sortable: false },
      { text: "Employee Name", sortable: false, value: "employeename" },
      { text: "Job roles", sortable: false, value: "jroles" },
      { text: "Action", sortable: false, value: "action" }
    ],
    TrainingSelect:'',
  }),
  watch: {
    // from date picker
    fromdate() {
      this.fromdateFormatted = this.fromformatDate(this.fromdate);
    },
    //to date picker
    todate() {
      this.todateFormatted = this.toformatDate(this.todate);
    }
  },
  computed:{
    ...mapGetters([
      'training_list','branch_list','department_list'
    ]),
    employee_data_assign(){
      return this.$store.getters.employee_data_detail_for_dialog
    }
  },
  created(){
    this.$store.dispatch('TRANING_LIST')
    this.$store.dispatch('INITIALIZE_DATA_FOR_EMPLOYEE_FOR_DIALOG')
    this.Dialog()
    
  },
  methods: {
    Dialog(){
      this.employee_data_dialog = this.$store.getters.employee_data_detail_for_dialog
    },
    AddEmployeeAssignTraining(){
      // alert("a")
      this.$store.dispatch('ADD_ASSIGN_TRAINING_EMPLOYEE',{ id : this.TrainingSelect.id , from_date : this.fromdateFormatted , to_date : this.todateFormatted , data : this.employee_data_assign})
    },
    AddEmployeeToTraining(item,index){
      this.employee_data_assign.push({
        no : item.no ,
        employee_Name : item.employee_Name,
                employee_id : item.employee_id,
                role_name : item.role_name,
                dept_id : item.dept_id
      })
      this.employee_data_dialog.splice(index,1)
    },
    filterBranch(){
      this.$store.dispatch('SELECT_BRANCH_FOR_EMPLOYEE',this.BranchSelect.branch_id)
    },
    fiterDepartment(){
      this.$store.dispatch('SELECT_DEPRTMENT_FOR_EMPLOYEE_FOR_DIALOG',this.DepartmentSelect.dept_id)
      this.Dialog()
    },

    //from date picker
    fromformatDate(fromdate) {
      if (!fromdate) return null;
      const [year, month, day] = fromdate.split("-");
      return `${day}/${month}/${year}`;
    },
    //to date picker
    toformatDate(todate) {
      if (!todate) return null;
      const [year, month, day] = todate.split("-");
      return `${day}/${month}/${year}`;
    },
    //from date picker
    fromparseDate(fromdate) {
      if (!fromdate) return null;
      const [month, day, year] = fromdate.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    //to date picker
    toparseDate(todate) {
      if (!todate) return null;
      const [month, day, year] = todate.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>