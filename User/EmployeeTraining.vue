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
                      <v-icon small>fa fa-plus</v-icon>
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
              <!-- Employee name field -->
              <v-flex xs12 sm4 md2 class="mr-3">
                <v-text-field placeholder="Employee Name"></v-text-field>
              </v-flex>
              <!-- Training name box -->
              <v-flex xs12 sm4 md2 class="mr-3">
                <v-combobox
                  v-model="TrainingSelect"
                  :items="training_list"
                  item-text="training_name"
                  placeholder="Training Name"
                ></v-combobox>
              </v-flex>
              <!-- Branch name box -->
              <v-flex xs12 sm4 md2 class="mr-3">
                <v-combobox
                  v-model="BranchSelect"
                  :items="branch_list"
                  item-text="branch_name"
                  placeholder="Branch"
                ></v-combobox>
              </v-flex>
              <!-- Department name box -->
              <v-flex xs12 sm4 md2 class="mr-3">
                <v-combobox
                  v-model="DepartmentSelect"
                  :items="department_list"
                  item-text="department_name"
                  placeholder="Department"
                ></v-combobox>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- From date -->
          <v-flex class="mr-3">
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
                      @blur="fromdate = fromparseDate(fromdateFormatted)"
                      v-on="on"
                      :rules="daterules"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    :max="new Date().toISOString().substr(0, 10)"
                    v-model="fromdate"
                    no-title
                    @input="fromdatemenu = false"
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
                      @blur="todate = toparseDate(todateFormatted)"
                      v-on="on"
                      :rules="daterules"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    :max="new Date().toISOString().substr(0, 10)"
                    v-model="todate"
                    no-title
                    @input="todatemenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- Table layout -->
        <v-layout>
          <v-flex>
            <v-data-table v-model="number" :headers="headers" :items="employee_data_detail">
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.employee_Name }}</td>
                <td class="text-xs-left">{{ props.item.trainingname }}</td>
                <td class="text-xs-left">{{ props.item.departments }}</td>
                <td class="text-xs-left">{{ props.item.branch }}</td>
                <td class="text-xs-right">{{ props.item.stdate }}</td>
                <td class="text-xs-right">{{ props.item.enddate }}</td>
                <td class="text-xs-left">{{props.item.jroles}}</td>
                <td class="justify-center layout px-0">
                  <v-btn class="green--text" v-show="!fav" icon @click="fav = !fav">
                    <v-icon>add_circle</v-icon>
                  </v-btn>
                  <v-btn icon v-if="fav == true" @click="fav = !fav">
                    <v-icon class="red--text">remove_circle</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
        <!-- Buttons layout -->
        <!-- <v-layout>
          <v-flex xs12 sm12 md12 style="text-align:center">
            <v-btn flat small round class="primary" @click="reset">Submit</v-btn>
            <v-btn flat small round class="primary" @click="reset">Cancel</v-btn>
          </v-flex>
        </v-layout>-->
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
    TrainingItems: [],
    TrainingSearch: null,
    TrainingSelect: null,
    TrainingStates: ["Alabama", "Alaska"],
    DeptLoading: false,
    DeptItems: [],
    DeptSearch: null,
    DeptSelect: null,
    DeptStates: ["California", "Colorado"],
    BranchLoading: false,
    BranchItems: [],
    BranchSearch: null,
    BranchSelect: null,
    BranchStates: ["Delaware", "Columbia"],
    headers: [
      { text: "No", value: "id", sortable: false },
      { text: "Employee name", sortable: false, value: "employeename" },
      { text: "Training name", sortable: false, value: "trainingname" },
      { text: "Department name", sortable: false, value: "departments" },
      { text: "Branch name", sortable: false, value: "branch" },
      { text: "Start Date", sortable: false, value: "stdate" },
      { text: "End Date", sortable: false, value: "enddate" },
      { text: "Job roles", sortable: false, value: "jroles" },
      { text: "Action", sortable: false, value: "action" }
    ],
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
      "training_list",
      "department_list",
      "branch_list",
      "employee_data_detail"
    ])
  },
  methods: {
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