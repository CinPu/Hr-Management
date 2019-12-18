<template>
  <v-container class="card">
    <!-- <v-card class="card"> -->
    <v-form>
      <h1 style="text-align:left">Department</h1>
      <br />
      <v-divider style="color:gray"></v-divider>

      <br />
      <br />
      <v-layout row wrap>
        <v-flex xs12 sm3 md3>
          <v-combobox v-model="branch_name" name="branch" label="Branch" @change="filterBranchName" item-text="branch_name" :items="branch_list"></v-combobox>
        </v-flex>
        <v-layout justify-end>
          <router-link to="/departmentform" style="text-decoration: none">
            <v-btn color="blue" round class="white--text">
              <v-icon>add</v-icon>New Department
            </v-btn>
          </router-link>
        </v-layout>
      </v-layout>
      <br />
      <v-data-table :headers="deptheader" :items="department_detail" style="border:1px solid gray" class="elevation-1">
        <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
        <template v-slot:items="props">
          <td>{{ props.item.dept_name }}</td>
          <td>
            <router-link :to="{ name: 'DepartmentView', params: { branch_id: props.item.branch_id , dept_id : props.item.dept_id } }" style="text-decoration: none">
            <v-icon
              color="blue"
              @click="ViewActions(props.item)"
            >supervisor_account</v-icon>
            </router-link>
          </td>
          <td>
            <v-icon  small class="icon_size" color="blue" @click="editItem(props.item)">edit</v-icon>
            <v-icon small class="icon_size" color="red" @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogdelete" max-width="300px">
        <v-card>
          <v-card-text>Are you sure you want to delete it?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="dialogdelete = false" v-on="on">Cancel</v-btn>
            <v-btn color="green darken-1" flat="flat" @click="ok" v-on="on">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
            <v-btn small color="blue" round class="white--text" @click="EditSave">Save</v-btn>
            <v-btn small color="blue" round class="white--text" @click="close">Cancel</v-btn>
          </v-form>
        </v-card>
      </v-dialog>
    </v-form>
    <!-- </v-card> -->
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      dialogdelete:false,
      employeerole_id: "",
      editbranch: "",
      editphno: "",
      editremark: "",
      branch_id: "",
      branchcombo: "",
      departmentcombo2: "",
      branchcombo2: "",

      select: null,
      editpriority: "",
      dialog1: "",

      search1: "",
      search2: "",

      editdepartment: "",

      editedIndex: -1,

      deptheader: [
        { text: "Department", value: "name" },
        { text: "Employee view", value: "view" },
        { text: "Action", value: "action", sortable: false }
      ],

      role_id: "",
      employee_id: 0,
      delete_id: "",
      delete_branch_id: "",
      delete_roleid: "",
      department_name: "",
      delete_department_id: "",
      department_id: "",
      dept_id: "",
      filters: {
        branch_name: ""
      }
    };
  },
  created(){
    this.$store.dispatch('Create_department_detail');
    this.$store.dispatch('EMPLOYEE_DATA_LIST')
  },
  computed:{

    ...mapGetters([
      'department_detail','department_list','branch_list','employee_list'
    ])
  },
  methods: {
    EditSave() {
      this.$store.dispatch("EDIT_DEPARTMENT_ACTIONS", {
        branch_id : this.branch_id,
        department_id: this.department_id,
        department_name: this.editdepartment,
        remark: this.editremark,
        phone_no: this.editphno,
        priority: this.editpriority
      });
    },
    filterBranchName() {
        this.$store.dispatch('SELECT_BRANCH_FOR_DEPARTMENT_LIST',this.branch_name.branch_id)
      },
      ok(){
        this.$store.dispatch("DEPARTMENT_DELETE_ACTIONS", this.dept_id );
        this.dialogdelete = false
      },
    //  To delete one row in the table
    deleteItem(item) {
      this.dialogdelete = true
      this.dept_id = item.dept_id
      
    },
    ViewActions(items) {
      (this.e1 = 3), (this.dept_id = items.dept_id);
      this.department_name = items.dept_name;
      (this.branchcombo = items.branch_name),
        (this.branch_id = items.branch_id);
      this.role_id = items.roleId;
      this.EmployeeFileter(items.dept_name);
    },

    // To close dialog box

    close() {
      this.dialog1 = false;
      this.$store.dispatch("EMPLOYEE_DATA_LIST");
      this.EmployeeFileter(this.department_name);
      this.$store.dispatch("CREATE_INITIALIZE");

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
    editItem(item) {
      this.branch_id = item.branch_id
      this.editdepartment = item.dept_name;
      this.editremark = item.remark;
      this.editphno = item.phone_no;
      this.editpriority = item.priority;
      this.department_id = item.dept_id;
      this.dialog1 = true;
    },

    add(item) {
      this.$store.dispatch("ADDITION_EMPLOYEE_DATA_TO_DEPARTMENT", {
        employee_id: item.employee_id,
        dept_id: this.dept_id,
        role_id: this.role_id
      });
      this.$store.dispatch("EMPLOYEE_DATA_LIST");
      this.EmployeeFileter(this.department_name);
    }
  }
};
</script>
<style scoped>
h1 {
  text-align: left;
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
  max-width: 1000px;
  border-spacing: 12px;
  color: #555;
}
.icon_size {
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
