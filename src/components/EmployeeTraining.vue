<template>
  <v-container>
    <v-layout justify-center>
      <!-- Form Creation... -->
      <v-form
        ref="form"
        style="width:100%;padding-left:3%;font-color:#fff;font-style:Lucida Grande;
        font-size:14px"
      >
        <v-layout row wrap>
          <v-flex>
            <v-layout row wrap>
              <!-- Heading... -->
              <v-flex xs8 sm3 md9>
                <h1>Employee Training</h1>
              </v-flex>
              
              <!-- Button that is linked to router -->
              <v-flex xs3 sm3 md3>
                <div class="text-xs-right">
                  <v-btn class="primary" round to="/trainingassign">
                    <span>
                      <v-icon>add</v-icon>
                    </span>&nbsp;Training Assign
                  </v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <br />
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex>
            <v-layout row wrap>

              <v-flex >
            <v-layout>
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
                      v-on="on"
                      :rules="daterules"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="fromdate"
                    no-title
                    @input="ChangeDate"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <!-- To date layout -->
              <v-flex xs12 sm4 md2>
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
                      v-on="on"
                      :rules="daterules"
                      
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    :min="fromdateFormatted"
                    v-model="todate"
                    no-title
                    @input="ChangeDate"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
               <!-- Training name box -->
              <v-flex xs12 sm4 md3 class="ml-3 mr-3">
                <v-combobox
                  v-model="TrainingSelect"
                  :items="training_list_data"
                  item-text="training"
                  placeholder="Training Name"
                  @change="filterTraining"
                ></v-combobox>
              </v-flex>
                       
              <!-- Branch name box -->
              <!-- <v-flex xs12 sm4 md2 class="mr-3">
                <v-combobox
                  v-model="BranchSelect"
                  :items="branch_list"
                  item-text="branch_name"
                  placeholder="Branch"
                  @change="filterBranch"
                ></v-combobox>
              </v-flex> -->
              <!-- Department name box -->
              <!-- <v-flex xs12 sm4 md2 class="mr-3">
                <v-combobox
                  v-model="DepartmentSelect"
                  :items="department_list"
                  item-text="dept_name"
                  placeholder="Department"
                  @change="filterDepartment"
                ></v-combobox>
              </v-flex> -->
            </v-layout>
          </v-flex>

            </v-layout>
          </v-flex>
          <!-- From date -->
          
        </v-layout>
        <v-layout><v-flex></v-flex><v-spacer></v-spacer>
          <!-- Employee name field -->
              <v-flex xs12 sm4 md3 class="mr-3">
                <v-text-field v-model="search" placeholder="Employee Name" append-icon="search" ></v-text-field>
              </v-flex>
        </v-layout>
        <!-- Table layout -->
        <v-layout>
           
          <v-flex>
            <v-data-table v-model="number" :headers="headers" style="border:1px solid gray"  :items="employee_data_detail">
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
                <td class="text-xs-left">{{ props.item.role_name}}</td>
                <td class="text-xs-left">{{ props.item.dept_name }}</td>
                <td class="text-xs-left">{{ props.item.branch_name }}</td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-form>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    // from date picker
    fromdate: new Date().toISOString().substr(0, 10),
    fromdateFormatted: "",
    fromdatemenu: false,
    // to date picker
    todate: new Date().toISOString().substr(0, 10),
    todateFormatted: "",
    todatemenu: false,

    fav: false,
    toggle_exclusive: 2,
    TrainingLoading: false,
    DepartmentSelect:'',
    TrainingItems: [],
    TrainingSearch: '',
    TrainingSelect: '',
    TrainingStates: ["Alabama", "Alaska"],
    DeptLoading: false,
    DeptItems: [],
    DeptSearch: '',
    DeptSelect: '',
    DeptStates: ["California", "Colorado"],
    BranchLoading: false,
    BranchItems: [],
    BranchSearch: '',
    BranchSelect: '',
    BranchStates: ["Delaware", "Columbia"],
    headers: [
      { text: "No", value: "id", sortable: false },
      { text: "Employee Name", sortable: false, value: "employeename" },
      { text: "Department Name", sortable: false, value: "departments" },
      { text: "Job roles", sortable: false, value: "jroles" },
      { text: "Branch Name", sortable: false, value: "branch" }
    ],
    search:'',
    desserts: [
      {
        id: "1",
        employeename: "A",
        departments: "A",
        trainingname: "A",
        branch: "A",
        stdate: "1",
        enddate: "2",
        jroles: "A"
      },
      {
        id: "2",
        employeename: "B",
        departments: "B",
        trainingname: "B",
        branch: "B",
        stdate: "3",
        enddate: "4",
        jroles: "B"
      }
    ]
  }),
  watch: {
    // from date picker
    fromdate() {
      this.fromdateFormatted = this.fromformatDate(this.fromdate);
    },
    // to date picker
    todate() {
      this.todateFormatted = this.toformatDate(this.todate);
    },
    TrainingSearch(val) {
      val && val !== this.TrainingSelect && this.TrainingquerySelections(val);
    },
    DeptSearch(val) {
      val && val !== this.DeptSelect && this.DeptquerySelections(val);
    },
    BranchSearch(val) {
      val && val !== this.BranchSelect && this.BranchquerySelections(val);
    }
  },
  computed: {
    ...mapGetters([
      "training_list_data",
      "department_list",
      "branch_list",
      'employee_data_detail'
    ]),
    employee_data_detail(){
      return this.$store.getters.employee_data_detail.filter((element)=>{
        return element.employee_Name.includes(this.search)
      })
    }
  },
  created(){
    // alert("g")
    this.$store.dispatch('INITIALIZE_DATA_FOR_EMPLOYEE')
    this.$store.dispatch('TRAINING_LIST_DATA')
  },
  methods: {
    // filterDepartment(){
    //   this.$store.dispatch('SELECT_DEPRTMENT_FOR_EMPLOYEE',this.DepartmentSelect.dept_id)
    // },
    // filterBranch(){
    //   this.$store.dispatch('SELECT_BRANCH_FOR_EMPLOYEE',this.BranchSelect.branch_id)
    // },
    filterTraining(){
      this.$store.dispatch('SELECT_TRAINING_FOR_EMPLOYEE_DATA',this.TrainingSelect.trainingId)
    },
    ChangeDate(){
      this.todatemenu = false
      this.fromdatemenu = false
      // alert("on")
      if( this.fromdateFormatted !== '' && this.todateFormatted !== ''){
        let [d,m,y] = this.fromdateFormatted.split("/")
        let [dd,mm,yy] = this.todateFormatted.split("/")
        // alert( d + "+" + m + "+" + y + "+" + dd + "+" + mm + "+" + yy)
        this.$store.dispatch('SELECT_DATE_FOR_TRAINING_NAME', { d : d , m : m , y : y , dd : dd , mm : mm , yy : yy })
      }
    },
    // from date picker
    fromformatDate(fromdate) {
      if (!fromdate) return null;
      const [year, month, day] = fromdate.split("-");
      return `${day}/${month}/${year}`;
    },
    // to date picker
    toformatDate(todate) {
      if (!todate) return null;
      const [year, month, day] = todate.split("-");
      return `${day}/${month}/${year}`;
    },
    // from date picker
    fromparseDate(fromdate) {
      if (!fromdate) return null;
      const [month, day, year] = fromdate.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // to date picker
    toparseDate(todate) {
      if (!todate) return null;
      const [month, day, year] = todate.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    TrainingquerySelections(v) {
      this.TrainingLoading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.TrainingItems = this.TrainingStates.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.TrainingLoading = false;
      }, 500);
    },
    DeptquerySelections(v) {
      this.DeptLoading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.DeptItems = this.DeptStates.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.DeptLoading = false;
      }, 500);
    },
    BranchquerySelections(v) {
      this.BranchLoading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.BranchItems = this.BranchStates.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.BranchLoading = false;
      }, 500);
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style scoped>
.label {
  font-size: 14px;
  padding-top: 20px;
  border-spacing: 12px;
  text-emphasis-color: black;
}
</style>