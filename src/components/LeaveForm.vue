<template>
  <v-container grid-list-md justify-center>
      <h1 style="margin-bottom:20px; margin-top:20px;  color:rgb(9, 55, 73);">Leave Form</h1>
      <v-divider style="margin-bottom:20px;"></v-divider>

       <v-layout row wrap>
          <v-flex xs12 sm4 md3>
            <p style="font-size:16px;padding-top:18px;">Branch Name</p>
          </v-flex>
          <v-flex xs12 sm4 md3>
            <v-combobox
            :rules="branchRules"
            v-model="branch_name"
            placeholder="Branch"
            :items="branch_list"
            item-text="branch_name"
            @change="filterBranch"
          ></v-combobox>
          </v-flex>
         </v-layout>

        <v-layout row wrap>
          <v-flex xs12 sm4 md3>
            <p style="font-size:16px;padding-top:18px;">Department Name</p>
          </v-flex>
          <v-flex xs12 sm4 md3>
            <v-combobox
            v-model="dept_name"
            :rules="deptRules"
            placeholder="Department"
            :items="department_list"
            item-text="dept_name"
            @change="filterDepartment"
          ></v-combobox>
          </v-flex>
        </v-layout>

        

         <v-layout row wrap>
          <v-flex xs12 sm4 md3>
            <p style="font-size:16px;padding-top:18px;">Leave Type</p>
          </v-flex>
          <v-flex xs12 sm4 md3>
             <v-combobox
             v-model="leave_type"
             placeholder="Leave Type"
            :rules="leaveRules"
            :items="leave_type_list"
            item-text="leave_type"
          ></v-combobox>
          </v-flex>
         </v-layout>

         <v-layout row wrap>
          <v-flex xs12 sm4 md3>
            <p style="font-size:16px;padding-top:18px;">Employee Name</p>
          </v-flex>
          <v-flex xs12 sm4 md3>
             <v-combobox
             v-model="employee_name"
             placeholder="Employee Name"
            :rules="empRules"
            :items="employee_list"
            item-text="employee_Name"
          ></v-combobox>
          </v-flex>
         </v-layout>

        <p></p>
        <div id="box_design">
          
        </div>

        <br />

        <!-- Calender start -->
        <v-layout row wrap>
          <v-flex xs12 sm6 md6 lg6 xl6>
            <p>From</p>
            <div style="width:70%;">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="date1"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                                                        v-model="date1"
                                                        placeholder="DD/MM/YYYY"
                                                        prepend-icon="event"

                                                        readonly
                                                        v-on="on"
                                                    ></v-text-field>
                </template>
                <v-date-picker v-model="date1" color="blue" header-color="blue" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn round color="primary" @click="menu1 = false">Cancel</v-btn>
                  <v-btn round color="primary" @click="$refs.menu1.save(date1)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </div>
          </v-flex>

          <v-flex xs12 sm6 md6 lg6 xl6>
            <p>To</p>
            <div style="width:70%">
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="date2"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date2"
                    placeholder="DD/MM/YYYY"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date2" color="blue" header-color="blue" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn round color="primary" @click="menu2 = false">Cancel</v-btn>
                  <v-btn round color="primary" @click="$refs.menu2.save(date2)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </div>
          </v-flex>
        </v-layout>
        <!-- Calender end -->

        <br />
        <br />

        <v-layout row wrap class="text-xs-center">
          
            <v-btn round color="primary" type="submit" @click="submit">Submit</v-btn>
          

            <v-btn round color="primary" router to="/leave">Cancel</v-btn>
          
        </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    // date1: new Date().toISOString().substr(0, 10),
    date1:null,
    menu1: false,
    branch_name:'',
    dept_name:'',
    employee_name :'',

    // date2: new Date().toISOString().substr(0, 10),
    date2:null,
    menu2: false,

    deptRules: [
        v => !!v || 'Department Name is required',
    ],

    branchRules: [
        v => !!v || 'Branch Name is required',
    ],

    leaveRules: [
        v => !!v || 'Leave Type is required',
    ],

    empRules: [
        v => !!v || 'Employee Name is required',
    ],
    leave_type_list:[
      { leave_type : 'casuel' , value : 1},
      { leave_type : 'Mental' , value : 2}
    ]

  }),
  computed:{
    ...mapGetters(
      ['department_list','branch_list','employee_list','employee_data_detail']
    )
  },
  methods:{
    filterBranch(){
      this.dept_name=''
      this.$store.dispatch('SELECT_BRANCH_FOR_DEPARTMENT',this.branch_name.branch_id)
    },
    filterDepartment(){
      this.$store.dispatch('SELECT_DEPARTMENT_FOR_EMPLOYEE',this.dept_name.dept_id)
    },
    submit(){
      this.$store.dispatch('INSERT_LEAVE_DATA',{
        leave_type: this.leave_type.leave_type,
        from_date: this.date1,
        to_date: this.date2,
        employee_id: this.employee_name.employee_id
      })
    }
  }
}
//   modal: false,
//   menu2: false
</script>

<style scoped>
#whole_div {
  width: 690px;
  align-content: left;
  font-family: "Lucida Grande";
  font-size: 17px;
  /* background-color: #f5f5f5; */
  color: #555;
  margin-left: 5%;
  /* border: 1px solid #555; */
}

#form_design {
  background-color: #fff;

  /* background-color:red; */
}

#spacing {
  margin-bottom: 20px;
}

#box_design {
  width: 100%;
  padding-bottom: 5px;
}

#btn_design {
  text-transform: none !important;
  /* background-color:#093749; */
  /* color: white; */
}

#box {
  height: 30px;
  width: 30%;
  border: 1px solid #000000;
}

.v-combobox.v-combobox--outline .v-input_control {
  min-height: 30px;
  background-color: red;
}

/* .box_height{
    max-height: 30px !important;
} */

.styled-select {
  background: url(http://i62.tinypic.com/15xvbd5.png) no-repeat 97% 0;
  /* background:rgb(221, 221, 221); */
  height: 30px;
  overflow: hidden;
  width: 240px;
  border: solid 1px;
  padding-left: 10px;
  border-radius: 5px;
}

.txt_style {
  height: 30px;
  overflow: hidden;
  width: 240px;
  border: solid 1px;
  padding-left: 10px;
  border-radius: 5px;
}
</style>
