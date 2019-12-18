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
                  <v-icon>add</v-icon>
                </span>&nbsp;Add_New_Employee
              </v-btn>
            </div>
          </v-flex>
        </v-layout><br>
        <v-divider/><br>
        
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
              v-model="department_name"
              :items="department_list"
              item-text="dept_name"
              placeholder="Department"
              @change="filterDepartment"
            ></v-combobox>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm4 md2>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Employee Name"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <!-- Table layout -->
    <br>
    <v-layout>
      <v-flex>
        <v-data-table style="border:1px solid gray" :headers="headers" :items="employee_data_details">

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
            <td class="text-xs-left">{{ props.item.role_name }}</td>
            <td class="text-xs-left"> {{ props.item.salary_range }}</td>
            <td class="text-xs-left"> {{ props.item.rank }}</td>
            <td >
                <v-icon small class="green--text darken-1" v-on="on" @click="dialog = true">edit</v-icon>
                <!-- <v-icon small class="red--text">delete</v-icon> -->
            </td>
          </template>
        </v-data-table>
      </v-flex>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar flat dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Edit Employee Data</v-toolbar-title>
          </v-toolbar>
          <v-container>
            <v-form class="formdesign" ref="form" v-model="valid">
              <h3 class="pt-3">Personal Information</h3><br>
              <!-- Employee Number & Employee Name layout -->
              <v-layout row wrap>
                  <v-flex md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Employee Number</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-text-field v-model="employee_number" v-validate="'required'" class="textbox"
                              placeholder="Employee Number"  :error-messages="errors.collect('Employee Number')" data-vv-name="Employee Number" required>
                              </v-text-field>
                          </v-flex>
                      </v-layout>                    
                  </v-flex>

                  <v-flex md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Employee Name</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-text-field  v-model="employee_name" v-validate="'required'" class="textbox"
                              placeholder="Employee Name"  :error-messages="errors.collect('Employee Name')" data-vv-name="Employee Name" required>
                              </v-text-field>
                          </v-flex>
                      </v-layout>   
                  </v-flex>
              </v-layout>
              <!-- NRC & DOB layout -->
              <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>NRC</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-flex>
                              <v-text-field v-model="employee_nrc" v-validate="'required'" :error-messages="errors.collect('NRC')"
                                  data-vv-name="NRC" placeholder="NRC number" class="textbox"></v-text-field>
                              </v-flex>
                          </v-flex>
                      </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 md6>  
                      <v-layout row wrap>    
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Date of Birth</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-menu ref="menu1" v-model="dateOfbirthmenu" :close-on-content-click="false" :nudge-right="40"
                              lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                  <template v-slot:activator="{ on }">
                                      <v-text-field class="textbox" v-model="dateFormatted" placeholder="dd/mm/yy"
                                      @blur="date = parseDate(dateFormatted)" v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-model="date" no-title @input="dateOfbirthmenu = false"></v-date-picker>
                              </v-menu>
                          </v-flex>
                      </v-layout>
                  </v-flex>
              </v-layout>
              <!-- Educational Background & Job roles -->
              <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Educational Background</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-flex>
                              <v-text-field v-model="employee_educational_background" placeholder="Educational background" class="textbox"></v-text-field>
                              </v-flex>
                          </v-flex>
                      </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Job roles</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-combobox class="textbox" v-model="employee_role" :items="employee_role_list"></v-combobox>
                          </v-flex>
                      </v-layout>
                  </v-flex>
              </v-layout>

              <v-layout row wrap>
                  <v-flex xs12 sm2 md2 style="padding-top:20px">
                      <label>Gender</label>                 
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                      <v-radio-group v-model="employee_gender" row>
                          <v-radio label="Male" value="male"></v-radio>
                          <v-radio label="Female" value="female"></v-radio>
                      </v-radio-group>
                  </v-flex>
              </v-layout>
              <!-- Marital Status & Nationality layout -->
              <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Marital-Status</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-flex>
                              <v-combobox class="textbox" v-model="employee_matritalstatus" :items="marital_status_list"></v-combobox>
                              </v-flex>
                          </v-flex>
                      </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 md6 >
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="label">
                              <label>Nationality</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-flex>
                              <v-combobox class="textbox" v-model="employee_nationality" :items="nationality_list"></v-combobox>
                              </v-flex>
                          </v-flex>
                      </v-layout>
                  </v-flex>
              </v-layout>
              <!-- Religion & Employee State layout -->
              <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="label">
                              <label>Religion</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-flex>
                              <v-combobox class="textbox" v-model="employee_religion" :items="religion_list"></v-combobox>
                              </v-flex>
                          </v-flex>
                      </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Employee State</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-flex>
                              <v-combobox class="textbox" v-model="employee_state" :items="employee_state_list"></v-combobox>
                              </v-flex>
                          </v-flex>
                      </v-layout>
                  </v-flex>
              </v-layout><br>
              <v-divider /><br>

              <h3>Contact Information</h3><br>               
              
              <v-layout row wrap>
                <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="label">
                              <label>Phone</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-text-field mask="##-#########" class="textbox" v-model="employee_phone" v-validate="'required|numeric'"
                              placeholder="09-"  :error-messages="errors.collect('phone')" data-vv-name="phone" required>
                              </v-text-field>
                          </v-flex>
                      </v-layout>
                </v-flex>
                <v-flex xs12 sm6 md6>
                    <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Home Phone</label>               
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-text-field class="textbox" v-model="employee_homephone" mask="##-#########" placeholder="01-"  :error-messages="errors.collect('homephone')" data-vv-name="homephone" required>
                              </v-text-field>
                          </v-flex>
                    </v-layout>
                </v-flex>
              </v-layout>
              <!-- Email & Join Date layout -->
              
              <v-layout row wrap>                
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Email</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                                  <v-text-field class="textbox" v-model="employee_email" :rules="emailRules" placeholder="E-mail" required>
                                  </v-text-field>
                          </v-flex>
                      </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Join date</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-menu ref="menu1" v-model="joinDatemenu" :close-on-content-click="false" :nudge-right="40"
                              lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                  <template v-slot:activator="{ on }">
                                      <v-text-field class="textbox" v-model="joindateFormatted" placeholder="dd/mm/yy"
                                      @blur="joindate = joinparseDate(joindateFormatted)" v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker :min="new Date().toISOString().substr(0, 10)" v-model="joindate" no-title @input="joinDatemenu = false"></v-date-picker>
                              </v-menu>
                          </v-flex>
                      </v-layout>
                  </v-flex>              
              </v-layout><br>
              <v-divider /><br>
              <h3>Address Information</h3><br>
              <!-- Address line 1 & 2 layout -->
              <v-layout row wrap>                    
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Address Line:1</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-textarea rows="1" v-model="employee_address_line_one" auto-grow placeholder="Address" class="textbox" clear-icon='$vuetify.icons.clear'></v-textarea>
                          </v-flex>
                      </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Address Line:2</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-textarea rows="1" v-model="employee_address_line_two" auto-grow placeholder="Address" class="textbox" clear-icon='$vuetify.icons.clear'></v-textarea>
                          </v-flex>
                      </v-layout>
                  </v-flex>
              </v-layout>
              <!-- Permanent Address & County layout -->
              <v-layout row wrap>                
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Permanent Address</label>                 
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                              <v-textarea rows="1" v-model="employee_permanent_address" auto-grow placeholder="Address" class="textbox" clear-icon='$vuetify.icons.clear'></v-textarea>
                          </v-flex>
                      </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Country</label>                 
                          </v-flex>                    
                          <v-flex xs12 sm6 md6>
                              <v-flex>
                              <v-combobox class="textbox" v-model="employee_country" :items="country_list"></v-combobox>
                              </v-flex>
                          </v-flex>
                      </v-layout>
                  </v-flex>
              </v-layout>
              <!-- City & Township layout -->
              <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>City</label>                 
                          </v-flex>                    
                          <v-flex xs12 sm6 md6>
                              <v-flex>
                              <v-combobox class="textbox" v-model="employee_city" :items="city_list"></v-combobox>
                              </v-flex>
                          </v-flex>
                      </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Township</label>                 
                          </v-flex>                    
                          <v-flex xs12 sm6 md6>
                              <v-flex>
                              <v-combobox class="textbox" v-model="employee_township" :items="township_list"></v-combobox>
                              </v-flex>
                          </v-flex>
                      </v-layout>
                  </v-flex>
              </v-layout>
              <!-- Region layout -->
              <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                      <v-layout row wrap>
                          <v-flex xs12 sm4 md4 class="pt-4">
                              <label>Region</label>                 
                          </v-flex>                    
                          <v-flex xs12 sm6 md6>                           
                              <v-flex>
                              <v-combobox class="textbox" v-model="employee_region" :items="region_list"></v-combobox>
                              </v-flex>
                          </v-flex>
                      </v-layout>
                  </v-flex>
              </v-layout><br>
              <!-- Buttons layout -->
              <v-layout row wrap>                    
                  <v-flex xs6 sm2 md2 offset-sm4>
                      <v-btn  round class="primary" @click="submit">Save</v-btn>
                  </v-flex>
                  <v-flex xs6 sm4 md4>
                      <v-btn round class="primary" @click="reset">Cancel</v-btn>
                  </v-flex>
              </v-layout>
          </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    branch_name:'',
    dialog:false,
    department_name : '',
    headers: [
      { text: "No", value: "id", sortable: false },
      { text: "Employee Name", value: "employeename" },
      { text: "Job roles", sortable: false, value: "jobroles" },
      { text: "Basic Salary", sortable: false, value: "salary" },
      { text: "Rank", sortable: false, value: "rank" },
      { text: "Action", sortable: false, value: "action" }
    ],
    search:'',
    table:[
      { no :'1' , employee_Name : 'Thian Lian Ben' , job_roles : 'Manager', duty_name:'Daily' ,join_date : '2019-02-23'}
    ]
  }),
  methods:{
    filterBranch(){
      this.department_name =''
      this.$store.dispatch('SELECT_BRANCH_FOR_DEPARTMENT',this.branch_name.branch_id)
    },
    filterDepartment(){
        // alert(this.department_name.dept_id)
        this.$store.dispatch('SELECT_DEPARTMENT_FOR_EMPLOYEE_ALL',this.department_name.dept_id)
    }
  },
  computed:{
    ...mapGetters([
      'department_list','branch_list','employee_data_details'
    ]),
    employee_data_details(){
        return this.$store.getters.employee_data_details.filter( element=>{
            return element.employee_Name.includes(this.search)
        })
    }
  },
  created(){
      this.$store.dispatch('EMPLOYEE_ALL_DATA')
    
  }
}
</script>