<template>
      <v-container >
    <!-- <v-card class="card"> -->
    <v-form class="dlform" >
      <v-layout row wrap>
      <v-flex md10>
         <h1>Department</h1>
      </v-flex>
         <v-spacer></v-spacer>
                <v-flex>
                  <v-btn color="primary" round class="white--text" @click="addemployee" v-on="on"><v-icon>add</v-icon> Add Employee</v-btn>
                </v-flex>
      </v-layout>
              <br />
              <v-divider style="color:gray"></v-divider>
              <br />
              <v-layout row wrap>
                <v-flex xs12 sm5 md3>
                  <v-text-field
                    v-model="branchcombo"
                    style="font-size:20px;"
                    name="Branch"
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex sm3 xs12 md3>
                  <v-text-field v-model="search" label="Employee Name" append-icon="search"  >
                  </v-text-field>
                </v-flex>
                
                <v-dialog v-model="dialog2" max-width="550px" persistent>
                  <v-card>
                    <v-layout>
                      <h2>Employee Table</h2>
                     <v-layout justify-end>  <v-icon
                        large
                        color="red"
                        round
                        class="white--text"
                        @click="dialog2close"
                      >highlight_off</v-icon></v-layout>
                      </v-layout>
                    <v-form class="dlform">
                     
                    
                    
                      <v-divider style="color:gray"></v-divider>
                      <br />
                      <v-layout>
                        <v-data-table  :headers="headersemployee" :items="employee_list" style="border:1px solid gray" class="elevation-1">
                          <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
                          
                          <template v-slot:items="props">
                            <td>{{ props.item.no}}</td>
                            <td>{{ props.item.employee_Name}}</td>
                            <td>
                              <v-icon  color="green" class="mr-2" @click="add(props.item)">add_circle</v-icon>
                            </td>
                          </template>
                        </v-data-table>
                      </v-layout>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-layout>
              <!-- for remove button -->

              
                <v-data-table
                    :headers="headers"
                    :items="employee_data_detail"
                    item-key="employee_Name"
                    style="border:1px solid gray"
            >
            <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
                  <template v-slot:items="props">
                    <td>{{ props.item.no }}</td>
                    <td>{{ props.item.employee_Name }}</td>
                    <td>{{ props.item.role_name }}</td>
                    <td>
                      <v-icon
                        color="red"
                        @click="RemoveEmployee(props.item)"
                      >cancel</v-icon>
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

                          <v-radio label="Depart from organization" value="2" color="blue"></v-radio>
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
               <router-link to="/Department" style="text-decoration: none"> <v-icon large color="blue">reply</v-icon></router-link>
                
                <!-- <v-btn small color="blue" round class="white--text" @click="dialog1close">Cancel</v-btn> -->
              </v-layout>
    </v-form>
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
      search:'',
      branch_id:'',
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
        { text:"No", value:"no"},
        { text: "Employee Name", value: "empname" },
        { text: "Job Roles" , value:"job"},
        { text: "Action", value: "action", sortable: false }
      ],
      headersemployee:[
        { text:"No", value:"no"},
        { text: "Employee Name", value: "empname" },
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
      route_dept_id : '',
      route_branch_id : '',
      filters: {
        search: '',
        leave_type: '',
        dept_name:'',
        branch_name:''
       },
    };
  },
  created(){
    this.route_dept_id = this.$route.params.dept_id;
    this.route_branch_id = this.$route.params.branch_id;
    this.$store.dispatch('EMPLOYEE_DATA_DETAILS', { dept_id : this.route_dept_id, branch_id : this.route_branch_id })
    this.$store.dispatch('SELECT_BRANCH_NAME',{ dept_id : this.route_dept_id, branch_id : this.route_branch_id })
  },
  computed:{
    
    ...mapGetters([
      'department_detail','department_list','branch_list','employee_list'
    ]),
    branchcombo(){
      return this.$store.getters.department_name
    },
    employee_data_detail(){
      return this.$store.getters.employee_data_detail.filter( element=>{
        return element.employee_Name.includes(this.search)
      })
    }
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
        // this.$store.dispatch('REMOVE_EMPLOYEE_OTHERS',{ employee_id : this.employee_id , role_id : this.role_id , department_id : this.departmentcombo2.department_id , branch_id : this.branchcombo2.branch_id , id : this.employeerole_id })
        // this.$store.dispatch('CREATE_INITIALIZE')
      }else{
        // this.$store.dispatch('REMOVE_EMPLOYEE_FROM_COMPANY',this.employee_id)
        // this.$store.dispatch('CREATE_INITIALIZE')
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
      // this.$store.dispatch('CREATE_INITIALIZE')
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
      this.dialog2 = true
      this.$store.dispatch('EMPLOYEE_DATA_LIST')
    },

    close() {
      this.dialog1 = false;
      this.$store.dispatch('EMPLOYEE_DATA_LIST')
      this.EmployeeFileter(this.department_name)
      this.$store.dispatch('CREATE_INITIALIZE')
    },
    
    editItem(item) {
      this.editdepartment = item.dept_name
      this.editremark = item.remark
      this.editphno = item.phone_no
      this.editpriority = item.priority
      this.department_id = item.dept_id
      this.dialog1 = true;
    },

    add(item) {
      // this.$store.dispatch('ADDITION_EMPLOYEE_DATA_TO_DEPARTMENT',{ employee_id:item.employee_id,dept_id:this.dept_id,role_id:this.role_id})
      // this.$store.dispatch('EMPLOYEE_DATA_LIST')
      // this.EmployeeFileter(this.department_name)
      // alert(item.employee_id)
      this.$store.dispatch('ADD_EMPLOYEE_TO_DEPARTMENTS',{ dept_id : this.route_dept_id , branch_id : this.route_branch_id , employee_id : item.employee_id , start_date : new Date().toISOString().substring(0,10) })
    }
  }

}
</script>
<style scoped>

h2 {
  text-align: left;
  padding-left: 30px;
  padding-top: 20px;

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
  max-width: 690px;
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
