<template>
  <v-container class="card">
    <!-- <v-card class="card"> -->
    <v-form >
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">List</v-stepper-step>

        <v-stepper-step :complete="e1 > 2" step="2">View</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="card">
            <v-form>
              <h1 style="text-align:left">Department</h1>
              <br />
              <v-divider style="color:gray"></v-divider>

              <br />
              <br />

              <v-layout justify-end>
                <router-link  to="/departmentform" style="text-decoration: none"> 
                <v-btn
                  color="blue"
                  round
                  class="white--text"><v-icon>add</v-icon> Add New Department</v-btn>
                  </router-link>
               
              </v-layout>
              <br />
              <v-data-table :headers="deptheader" :items="department_detail" class="elevation-1">
                <template v-slot:items="props">
                  <td>{{ props.item.dept_name}}</td>
                  <td>{{ props.item.branch_name }}</td>
                  <td>
                    <v-btn small color="blue" round class="white--text" @click="ViewActions(props.item)">View</v-btn>
                  </td>
                  <td >
                    <v-icon class="icon_size" color="blue" @click="editItem(props.item)">edit</v-icon>
                    <v-icon class="icon_size" color="red" @click="deleteItem(props.item)">delete</v-icon>
                  </td>
                </template>
              </v-data-table>
              <!-- for editing department -->
              <v-dialog v-model="dialog1" max-width="550px">
                <v-card class="card">
                  <v-form class="form">
                    <h1 style="text-align:left">Editing Department</h1>
                    <br />
                    <v-divider style="color:gray"></v-divider>

                    <br />
                    <br />
                    <!-- Form design -->

                    <v-layout row wrap>
                      <v-flex xs12 sm5 md5>
                        <v-subheader>Department Name :</v-subheader>
                      </v-flex>
                      <v-flex xs12 sm5 md5 offset-md1>
                        <v-text-field
                          v-model="editdepartment"
                          v-validate="'required'"
                          placeholder="Enter department name"
                          name="Name"
                        ></v-text-field>

                        <span class="span1">{{ errors.first('Name') }}</span>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm5 md5>
                        <v-subheader>Priority:</v-subheader>
                      </v-flex>
                      <v-flex xs12 sm5 md5 offset-md1>
                        <v-text-field
                          v-model="editpriority"
                          v-validate="'required'"
                          placeholder="Enter priority"
                          name="Priority"
                        ></v-text-field>

                        <span class="span1">{{ errors.first('Priority') }}</span>
                      </v-flex>
                    </v-layout>
                    <br />
                    <v-layout row wrap>
                      <v-flex xs12 sm5 md5>
                        <v-subheader>Remark :</v-subheader>
                      </v-flex>
                      <v-flex xs12 sm5 md5 offset-md1>
                        <v-text-field
                          v-model="editremark"
                          v-validate="'required'"
                          placeholder="Enter remark"
                          name="Remark"
                        ></v-text-field>

                        <span class="span1">{{ errors.first('Remark') }}</span>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm5 md5>
                        <v-subheader>Phone Number:</v-subheader>
                      </v-flex>
                      <v-flex sm5 md5 offset-md1>
                        <v-text-field
                          v-model="editphno"
                          v-validate="'required|numeric|max:11'"
                          placeholder="09*********"
                          name="Ph no"
                        ></v-text-field>

                        <span class="span1">{{ errors.first('Ph no') }}</span>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm5 md5>
                        <v-subheader>Branch:</v-subheader>
                      </v-flex>
                      <v-flex xs12 sm5 md5 offset-md1>
                        <v-combobox
                          v-model="editbranch"
                          v-validate="'required'"
                          placeholder="Enter Branch"
                          name="Branch Name"
                          :items="branch_list"
                          item-text = "branch_name"
                        ></v-combobox>

                        <span class="span1">{{ errors.first('Branch Name') }}</span>
                      </v-flex>
                    </v-layout>
                    <v-btn small color="blue" round class="white--text" @click="EditSave">Save</v-btn>
                    <v-btn small color="blue" round class="white--text" @click="close">Cancel</v-btn>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-form>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card>
            <v-form class="dlform">
              <h1>Department View</h1>
              <br />
              <v-divider style="color:gray"></v-divider>
              <br />
              <v-layout row wrap>
                <v-flex xs12 sm5 md5>
                  <v-text-field
                    v-model="branchcombo"
                    name="Branch"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <!-- for remove button -->

              
                <v-data-table
                    :headers="headers"
                    :items="employee_data_detail"
                    item-key="employee_Name"
  
                    :search="filters"
                    :custom-filter="customFilter"
            >
                    <template slot="headers" slot-scope="props">
                    <tr  >
                        <th   v-for="header in props.headers" :key="header.text">
                            {{ header.text }}
                        </th>
                    </tr>
                </template>
                  <template v-slot:items="props">
                    <td>{{ props.item.employee_Name }}</td>
                    <td>{{ props.item.employee_id }}</td>
                    <td>
                      <v-btn
                        style="background-color:red;color:white;text-align:center"
                        small
                        @click="RemoveEmployee(props.item)"
                      >X</v-btn>
                    </td>
                  </template>
                </v-data-table>

                <v-layout row justify-center>
                  <v-dialog v-model="dialog3" persistent max-width="490">
                    <v-card>
                      <v-form class="dlform">
                        <h3 style="text-align:left">Why do you want to leave?</h3>
                        <br />
                        <br />
                        <v-radio-group v-model="radios" :mandatory="false">
                          <v-radio label="Department Transfer" color="blue" value="1"></v-radio>

                          <v-layout row wrap>
                            <v-flex xs12 sm5 md5>
                              <v-combobox
                                v-model="branchcombo2"
                                name="Branch"
                                label="Branch"
                                :items="branch_list"
                                item-text = "branch_name"
                                :search="search1"
                              ></v-combobox>
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex xs12 sm5 md5 offset-md2>
                              <v-combobox
                                v-model="departmentcombo2"
                                name="Department"
                                label="Department"
                               :items="department_list"
                               item-text = "department_name"
                                :search="search2"
                                single-line
                              ></v-combobox>
                            </v-flex>
                          </v-layout>

                          <v-radio label="Depart from Company" value="2" color="blue"></v-radio>
                        </v-radio-group>
                        <v-layout row justify-end>
                          <v-btn flat @click="deleteItem1" class="blue--text">ok</v-btn>
                          <v-btn flat @click="dialog3close" class="blue--text">Cancel</v-btn>
                        </v-layout>
                      </v-form>
                    </v-card>
                  </v-dialog>
                </v-layout>
              
              <br />
              <br />
              <!-- for adding employee -->
              <v-layout row wrap>
                <v-icon large color="blue" v-on:click="gostep1()" @click="e1 = 1">arrow_back</v-icon>

                <v-spacer></v-spacer>
                <v-dialog v-model="dialog2" max-width="550px" persistent>
                  <template v-slot:activator="{ on }">
                    <v-btn small color="blue" round class="white--text" @click="addemployee" v-on="on"><v-icon>add</v-icon> Add Employee</v-btn>
                  </template>
                  <v-card>
                    <v-form class="dlform">
                      <h1>Employee Table</h1>
                      <br />
                      <v-divider style="color:gray"></v-divider>
                      <br />
                      <v-layout>
                        <v-data-table :headers="headers" :items="employee_list" class="elevation-1">
                          <template v-slot:items="props">
                            <td>{{ props.item.employee_Name}}</td>
                            <td>{{ props.item.employee_No }}</td>
                            <td>
                              <v-icon small class="mr-2" @click="add(props.item)">add</v-icon>
                            </td>
                          </template>
                        </v-data-table>
                      </v-layout>
                      <br />
                      <v-btn
                        small
                        color="blue"
                        round
                        class="white--text"
                        @click="dialog2close"
                      >Close</v-btn>
                    </v-form>
                  </v-card>
                </v-dialog>
                <!-- <v-btn small color="blue" round class="white--text" @click="dialog1close">Cancel</v-btn> -->
              </v-layout>
            </v-form>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    </v-form>
    <!-- </v-card> -->
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      employeerole_id : '',
      e1: 0,
      editbranch:'',
      editphno:'',
      editremark:'',
      branch_id:'',
      branchcombo: "",
      departmentcombo2: "",
      branchcombo2: "",
      radios: "1",
      select: null,
      editpriority:'',
      dialog1: "",
      dialog3: false,
      dialog2: false,
      data: [],
      show: [],
      addemp: [],
      search1: "",
      search2: "",
      exitingdept: 0,
      editdepartment:'',
      count: 0,
      editedIndex: -1,
      headers: [
        { text: "Employee Name", value: "empname" },
        { text: "Employee ID", value: "id" },
        { text: "Action", value: "action", sortable: false }
      ],
      deptheader: [
        { text: "Department", value: "name" },
        { text:"Branch", value:"branch_name"},
        { text: "View", value: "view" },
        { text: "Action", value: "action", sortable: false }
      ],
      deptdata: [
        { name: "Software", value: "1" },
        { name: "Softwre", value: "1" },
        { name: "Sotware", value: "1" },
        { name: "Sotware", value: "1" },
        { name: "Softwre", value: "1" }
      ],
      employee: [
        { name: "Ma Hla Hla", empid: "emp1" },
        { name: "Ma Hla Hla", empid: "emp1" },
        { name: "Ma Hla Hla", empid: "emp1" },
        { name: "Ma Hla Hla", empid: "emp1" },
        { name: "Ma Hla Hla", empid: "emp1" },
        { name: "Ma Hla Hla", empid: "emp1" },
        { name: "Ma H", empid: "emp2" },
        { name: "Ma Hla Hla", empid: "emp3" }
      ],
      role_id:'',
      employee_id:0,
      delete_id:'',
      delete_branch_id:'',
      delete_roleid:'',
      department_name:'',
      delete_department_id:'',
      department_id:'',
      dept_id:'',
      filters: {
        search: '',
        leave_type: '',
        dept_name:'',
        branch_name:''
       },
    };
  },
  created(){
    this.$store.dispatch('Create_department_detail');
    this.$store.dispatch('EMPLOYEE_DATA_LIST')
  },
  computed:{
    
    ...mapGetters([
      'department_detail','employee_data_detail','department_list','branch_list','employee_list'
    ])
  },
  methods: {
    EditSave(){
      this.$store.dispatch('EDIT_DEPARTMENT_ACTIONS',
      {
        department_id : this.department_id,
        branch_id : this.editbranch.branch_id,
        department_name : this.editdepartment,
        remark : this.editremark,
        phone_no : this.editphno,
        priority :this.editpriority

      })
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
        return cf.runFilters();
    },
    //  To delete one row in the table
    deleteItem(item) {
      this.$store.dispatch('DEPARTMENT_DELETE_ACTIONS',item.dept_id)
    },
    ViewActions(items){
      this.e1 = 3,
      this.dept_id = items.dept_id
      this.department_name = items.dept_name
      this.branchcombo = items.branch_name,
      this.branch_id = items.branch_id
      this.role_id = items.roleId
      this.EmployeeFileter(items.dept_name)
    },
    deleteItem1() {
      if( this.radios === "1"){
        alert(this.radios)
        this.$store.dispatch('REMOVE_EMPLOYEE_OTHERS',{ employee_id : this.employee_id , role_id : this.role_id , department_id : this.departmentcombo2.department_id , branch_id : this.branchcombo2.branch_id , id : this.employeerole_id })
        this.$store.dispatch('CREATE_INITIALIZE')
      }else{
        this.$store.dispatch('REMOVE_EMPLOYEE_FROM_COMPANY',this.employee_id)
        this.$store.dispatch('CREATE_INITIALIZE')
      }
        this.dialog3=false;
    },
    
    EmployeeFileter(val){
      this.filters = this.$MultiFilters.updateFilters(this.filters, {dept_name: val});
      alert(val)
    },
    // To close dialog box
    RemoveEmployee(row){
      this.dialog3 = true
      this.employee_id = parseInt(row.employee_id)
      this.role_id = row.roleid
      this.employeerole_id = row.id
      this.$store.dispatch('CREATE_INITIALIZE')
    },

    gostep1() {
      this.branchcombo = "";
    },
    dialog2close() {
      this.dialog2 = false;
    },
    dialog3close() {
      this.dialog3 = false;
      this.branchcombo2 = "";
      this.departmentcombo2 = "";
    },
    //  dialog1close() {
    //   this.dialog1 = false;
    //   //  this.branchcombo2= "";
    //   // this.departmentcombo2 = "";
    //    this.departmentname= "",
    //    this.priority= "",
    //    this.remark= "",
    //    this.phno= "",
    //    this.branch= ""
    // },
    addemployee(){
      this.$store.dispatch('EMPLOYEE_DATA_LIST')
    },

    close() {
      this.dialog1 = false;
      this.$store.dispatch('EMPLOYEE_DATA_LIST')
      this.EmployeeFileter(this.department_name)
      this.$store.dispatch('CREATE_INITIALIZE')

      // setTimeout(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      // }, 300);
    },
    // // To save the edited data
    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.show[this.editedIndex], this.editedItem);
    //   } else {
    //     this.show.push(this.editedItem);
    //   }
    //   this.close();
    // },
    // // To update the department
    editItem(item) {
      this.editdepartment = item.dept_name
      this.editremark = item.remark
      this.editphno = item.phone_no
      this.editpriority = item.priority
      this.department_id = item.dept_id
      this.dialog1 = true;
    },

    add(item) {
      this.$store.dispatch('ADDITION_EMPLOYEE_DATA_TO_DEPARTMENT',{ employee_id:item.employee_id,dept_id:this.dept_id,role_id:this.role_id})
      this.$store.dispatch('EMPLOYEE_DATA_LIST')
      this.EmployeeFileter(this.department_name)
    }
  }
};
</script>
<style scoped>

h1 {
  text-align: left;
}
.text1 {
  width: 200px;
}
.text2 {
  width: 60px;
}
.divider {
  color: black;
}
.dlform {
  padding: 30px;
}
.card {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 14px;
  max-width: 1200px;
  border-spacing: 12px;
  color: #555;
  background-color: #fff;
}
.icon_size{
  size: 15px;
}

.form {
  padding: 35px;
}
.span1 {
  color: red;
  font-size: 10px;
}
body {
  max-width: 690px;
  margin-right: auto;
  margin-left: auto;
}
</style>
