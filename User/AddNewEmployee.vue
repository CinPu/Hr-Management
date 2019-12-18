<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-layout row wrap>
          <v-flex xs10 md8>
            <h1>Employee From CV Form</h1>
          </v-flex>
          <v-flex xs2 md4>
            <div class="text-xs-right">
              <v-btn class="primary" round to="/newentry">
                <span>
                  <v-icon small>fa fa-plus</v-icon>
                </span>&nbsp;New Entry
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
        <v-divider class="mt-3 mb-2" />
        <v-layout row wrap>
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
                :max="new Date().toISOString().substr(0, 10)"
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
                :max="new Date().toISOString().substr(0, 10)"
                v-model="todate"
                no-title
                @input="todatemenu = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm4 md2 class="mr-3">
            <v-combobox
              v-model="AnnouncementSelect"
              :items="announcement_list"
              item-text="announcement_name"
              placeholder="Announcement"
            ></v-combobox>
          </v-flex>

          <v-flex xs2 md5>
            <div class="text-xs-right">
              <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
            </div>
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

        <v-layout row wrap>
          <v-flex xs12 sm4 md2 class="mr-3">
            <v-combobox
              v-model="BranchSelect"
              :items="branch_list"
              item-text="branch_name"
              placeholder="Branch"
            ></v-combobox>
          </v-flex>
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
    <v-layout>
      <v-flex>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12 style="text-align:center">
            <v-btn flat small round to="/allemployeeII" class="primary" @click="reset">Save</v-btn>
            <v-btn flat small round to="/allemployeeII" class="primary" @click="reset">Cancel</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
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
    }
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
    }
  }
};
</script>