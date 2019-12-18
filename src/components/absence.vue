<template>
  <v-container text-xs-left>
<!-- form design -->
      <v-form>
        <h1 style="text-align:left">Absence Form</h1>
        <br>
        <v-divider style="color:gray"></v-divider>
        <br>
        <br>
        <v-layout row wrap>
          <v-flex xs12 sm4 md3>
            <v-subheader style="color:#555;padding-top:10px;">Branch Name :</v-subheader>
          </v-flex>

          <v-flex xs12 sm4 md3>
            <v-combobox
              v-model="branch_name"
              v-validate="'required'"
              name="Branch Name"
              :items="branch_list"
              placeholder="Branch"
              item-text="branch_name"
              @change="filterBranch"
              single-line
            ></v-combobox>
            <span class="span1">{{ errors.first('Branch Name') }}</span>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12 sm4 md3>
            <v-subheader style="color:#555;padding-top:10px;">Department Name :</v-subheader>
          </v-flex>

          <v-flex xs12 sm4 md3>
            <v-combobox
              v-model="dept_name"
              v-validate="'required'"
              name="Department Name"
              placeholder="Department"
              :items="department_list"
              item-text="dept_name"
              @change="filterDepartment"
              single-line
            ></v-combobox>
            <span class="span1">{{ errors.first('Department Name') }}</span>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12 sm4 md3>
            <v-subheader style="color:#555;padding-top:10px;">Employee Name :</v-subheader>
          </v-flex>

          <v-flex xs12 sm4 md3>
            <v-combobox
              v-model="employee_name"
              v-validate="'required'"
              name="Employee Name"
              :items="employee_list"
              placeholder="Employee Name"
              item-text="employee_Name"
              single-line
            ></v-combobox>
            <span class="span1">{{ errors.first('Employee Name') }}</span>
          </v-flex>
        </v-layout>

 <!-- To show date/month picker with dialog -->

        <v-layout row wrap>
          <v-flex xs12 sm4 md3>
            <v-subheader style="color:#555;padding-top:10px;">Date :</v-subheader>
          </v-flex>
          <v-flex xs12 sm4 md3>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="dd-mm-yyyy"
                  :max="new Date().toISOString().substr(0, 10)"
                  color="blue"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable color="blue lighten-1">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm4 md3>
            <v-subheader style="color:#555;padding-top:10px;">Absence Type :</v-subheader>
          </v-flex>

          <v-flex xs12 sm4 md3>
            <v-combobox
              v-model="type" overflow
              v-validate="'required'"
              name="Absence Type"
              placeholder="Absence Type"
              :items="types"
              item-text="name"
              item-value="item"
              single-line
            ></v-combobox>
            
            <span class="span1">{{ errors.first('Absence Type') }}</span>
          </v-flex>
        </v-layout>
        <br>
        <br>
        <v-layout row>
          <v-btn small color="blue" round class="white--text" @click="submit">Submit</v-btn>
          <v-btn small color="blue" round class="white--text" @click="clear">Cancel</v-btn>
        </v-layout>
      </v-form>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    dept_name: "",
    branch_name: "",
    employee_name: "",
    type: [],
    select: "",
    absence: [],
    date: "",
    modal: false,
    types: [
      { name: "Sick", value: "1" },
      { name: "Late", value: "2" },
      { name: "Other", value: "3" }
    ]
  }),
  methods: {
    submit() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.$store.dispatch('ABSENCE_EMPLOYEE',{
            employee_id : this.empname.employee_id,
            date : this.date
          }),
       (this.department = ""),
        (this.branch = ""),
        (this.empname = ""),
        (this.type = ""),
        this.date="",
        this.$validator.reset();
        }
      });
    },

    filterBranch(){
      this.dept_name =''
      this.$store.dispatch('SELECT_BRANCH_FOR_DEPARTMENT',this.branch_name.branch_id)
    },
    filterDepartment(){
      this.$store.dispatch('SELECT_DEPARTMENT_FOR_EMPLOYEE',this.dept_name.dept_id)
    },
    // for clear
    clear() {
      (this.department = ""),
        (this.branch = ""),
        (this.empname = ""),
        (this.type = ""),
        this.date="",
        this.$validator.reset();
    }
   
  },
  computed:{
    ...mapGetters(
      [
        'department_list',,'branch_list','employee_list'
      ]
    )
  }
};
</script>
<style scoped>
.card {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 14px;
  max-width: 690px;
  border-spacing: 12px;
  color: #555;
  background-color: #f5f5f5;
}
.span1 {
  color: red;
  font-size: 10px;
}
.form {
  padding: 35px;
}
body {
  max-width: 690px;
  margin-right: auto;
  margin-left: auto;
}
</style>
