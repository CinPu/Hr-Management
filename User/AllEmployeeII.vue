<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-layout row wrap>
          <v-flex xs6 sm4 md4>
            <H1>All Employee</H1>
          </v-flex>
          <v-spacer />
          <!-- Button that is linked to router -->
          <v-flex xs6 sm3 md3>
            <div class="text-xs-right">
              <v-btn class="primary" round to="/addnewemployee">
                <span>
                  <v-icon small>fa fa-plus</v-icon>
                </span>&nbsp;Add_New_Employee
              </v-btn>
            </div>
          </v-flex>
        </v-layout><br>
        <v-divider/><br>
        
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
  </v-container>
</template>
<script>
export default {
  data: () => ({
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
  })
};
</script>