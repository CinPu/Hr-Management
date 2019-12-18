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
              <v-btn class="primary" round to="/employeeregistration">
                <span>
                  <v-icon>add</v-icon>
                </span>&nbsp;New Entry
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
        <v-divider class="mt-3 mb-2" />
        <v-layout row wrap>

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
                  placeholder="Post Date"
                  @blur="todate = toparseDate(todateFormatted)"
                  v-on="on"
                  :rules="daterules"
                  @input="dateChange"
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
              :items="announcement_data"
              item-text="title"
              placeholder="Announcement"
              @change="AnnouncementChange"
            ></v-combobox>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 md3>
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
            <v-data-table v-model="number" :headers="headers" :items="employee_cv_list" style="border:1px solid gray">
              <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.no }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.title }}</td>
                <td class="text-xs-left">{{ props.item.date }}</td>
                <td class="text-xs-left">{{ props.item.gender }}</td>
                <td class="text-xs-left">{{ props.item.qualification }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{props.item.dob}}</td>
                <td class="text-xs-left">{{props.item.ph_no_work}}</td>
                <td class="justify-center layout px-0">
                  <v-btn class="green--text" icon @click="AddEmployeeActions(props.item,props.index)">
                    <v-icon>add_circle</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12 sm4 md2 class="mr-3">
            <v-combobox
              v-model="branch_name"
              :items="branch_list"
              item-text="branch_name"
              placeholder="Branch"
              @change="filterBranch"
            ></v-combobox>
          </v-flex>
          <v-flex xs12 sm4 md2 class="mr-3">
            <v-combobox
              v-model="dept_name"
              :items="department_list"
              item-text="dept_name"
              placeholder="Department"
            ></v-combobox>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 sm4 md2 class="mr-3">
            <v-combobox
              v-model="role_name"
              :items="role_data"
              item-text="role_name"
              placeholder="Role"
            ></v-combobox>
      </v-flex>
      <v-flex xs12 sm4 md2 class="mr-3">
            <v-combobox
              v-model="rank_name"
              :items="rank_data"
              item-text="rank_name"
              placeholder="Rank"
            ></v-combobox>
      </v-flex>
    </v-layout>
    <!-- Table layout -->
    <v-layout>
      <v-flex>
        <v-data-table v-model="number" :headers="headers" style="border:1px solid gray" :items="branch_department_add_employee">
          <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
          <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.no }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.title }}</td>
                <td class="text-xs-left">{{ props.item.date }}</td>
                <td class="text-xs-left">{{ props.item.gender }}</td>
                <td class="text-xs-left">{{ props.item.qualification }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{props.item.dob}}</td>
                <td class="text-xs-left">{{props.item.ph_no_work }}</td>
            <td class="justify-center layout px-0">
              <v-btn class="green--text" icon @click="RemoveEmployee(props.item,props.index)">
                <v-icon color="red">cancel</v-icon>
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
            <v-btn flat small round class="primary" @click="SaveAction">Save</v-btn>
            <v-btn flat small round to="/allemployee" class="primary" @click="reset">Cancel</v-btn>
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
    AnnouncementSelect:'',
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
      { text: "Employee name",  value: "employeename" },
      { text: "Title", sortable: false, value: "title" },
      { text: "Date", sortable: false, value: "date" },
      { text: "Gender", sortable: false, value: "gender" },
      { text: "Qualification", sortable: false, value: "qualification" },
      { text: "Email", sortable: false, value: "email" },
      { text: "DOB", sortable: false, value: "dob" },
      { text: "Phone No", sortable: false, value: "ph" },
      { text: "Action", sortable: false, value: "action" }
    ],
    branch_department_add_employee : [],
    employee_cv_list : [],
    branch_name :'',
    dept_name : ''
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
    AddEmployeeActions(item,index){
      this.branch_department_add_employee.push({
        id: item.id,
                no : item.no,
                date: item.date,
                name: item.name,
                email: item.email,
                dob: item.dob,
                nrc: item.nrc,
                ph_no_work: item.ph_no_work,
                ph_no_personal: item.ph_no_personal,
                gender: item.gender,
                marital_status: item.marital_status,
                nationality: item.nationality,
                religion: item.religion,
                permanent_address: item.permanent_address,
                qualification: item.qualification,
                joined_date: item.joined_date,
                status:item.status,
                address_id: item.address_id,
                announcement_id: item.announcement_id,
                // title: item.announcement.title
      })
      this.employee_cv_list.splice(index,1)
    },
    SaveAction(){
      // alert("on")
      this.$store.dispatch('ADDING_EMPLOYEE_TO_DEPARTMENT_OF_BRANCH',{ array : this.employee_cv_list , dept_id : this.dept_name.dept_id , role_Id : this.role_name.role_Id , rank_Id : this.rank_name.rank_Id})
      // this.reset()
    },
    RemoveEmployee(item,index){
      this.employee_cv_list.push({
        id: item.id,
                no : item.no,
                date: item.date,
                name: item.name,
                email: item.email,
                dob: item.dob,
                nrc: item.nrc,
                ph_no_work: item.ph_no_work,
                ph_no_personal: item.ph_no_personal,
                gender: item.gender,
                marital_status: item.marital_status,
                nationality: item.nationality,
                religion: item.religion,
                permanent_address: item.permanent_address,
                qualification: item.qualification,
                joined_date: item.joined_date,
                status:item.status,
                address_id: item.address_id,
                announcement_id: item.announcement_id,
                // title: item.announcement.title
      })
      this.branch_department_add_employee.splice(index,1)
    },
    filterBranch() {
        this.dept_name = ''
        this.$store.dispatch('SELECT_BRANCH_FOR_DEPARTMENT',this.branch_name.branch_id)
      },
    dateChange(){
      let [d,m,y] = this.todateFormatted.split('/')
      this.$store.dispatch('DATE_FOR_ANNOUNCEMENT',{
        d : d,
        m : m,
        y : y
      })
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
    AnnouncementChange(){
      if(this.AnnouncementSelect.title === 'ALL'){
        this.$store.dispatch('EMPLOYEE_CV_FORM')
      }else{
        this.$store.dispatch('SELECT_ANNOUNCEMENT_DATA_FOR_CV',this.AnnouncementSelect.id)
      }
    },
    AddingEmployee(){
      this.employee_cv_list = []
      this.employee_cv_list = this.$store.getters.employee_cv_form
    }
  },
  computed:{
    ...mapGetters([
      'announcement_data','branch_list','department_list','employee_cv_form','role_data','rank_data'
    ])
  },
  created(){
    this.$store.dispatch('EMPLOYEE_CV_FORM')
    this.AddingEmployee()
  }
};
</script>