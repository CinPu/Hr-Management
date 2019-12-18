<template>
        <v-form class="formdesign" ref="form" v-model="valid">
            <h1 class="pt-5" style="text-align:center">Employee Registration Form</h1><br>
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
                <!-- <v-flex xs12 sm6 md6>
                    <v-layout row wrap>
                        <v-flex xs12 sm4 md4 class="pt-4">
                            <label>Job roles</label>                 
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-combobox class="textbox" v-model="employee_role" :items="employee_role_list"></v-combobox>
                        </v-flex>
                    </v-layout>
                </v-flex> -->
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
                <!-- <v-flex xs12 sm6 md6>
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
                </v-flex> -->
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
            </v-layout>
            <br>
            <!-- Buttons layout -->
            <v-layout row wrap>                    
                <v-flex xs6 sm2 md2 offset-sm4>
                    <v-btn flat round class="primary" @click="submit">Submit</v-btn>
                </v-flex>
                <v-flex xs6 sm4 md4>
                    <v-btn flat round class="primary" @click="reset">Cancel</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
     data: ()=> ({

        date: new Date().toISOString().substr(0, 10),
        dateFormatted:'',
        dateOfbirthmenu: false,

        joindate:new Date().toISOString().substr(0, 10),
        joindateFormatted:'',
        joinDatemenu: false,

        employee_phone: '',

        employee_matritalstatus: 'Single',
        
        employee_nationality:'Burmese',
        employee_religion:'Buddhism',
        employee_state:'Employee state',
        employee_role:'CEO',
        employee_country: 'Myanmar',
        employee_city: 'Yangon',
        employee_township: 'Hlaing',
        employee_region: 'Region1',
        valid: false,
        employee_address_line_one:'',
        employee_address_line_two:'',
        employee_nrc:'',
        employee_number:'',
        employee_gender:[],
        employee_name: '',
        employee_homephone:'',
        employee_educational_background:'',
        employee_permanent_address:'',

        nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
        employee_email: '',
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
     }),
    watch:{
        date () {
        this.dateFormatted = this.formatDate(this.date)
      },
        joindate () {
            this.joindateFormatted = this.joinformatDate(this.joindate)
      }
     },
     computed:{
         ...mapGetters(['country_list','city_list','country_list','employee_state_list','region_list','township_list','marital_status_list',
                        'nationality_list','religion_list','employee_role_list'
         ])
     },
    methods:{
        formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      joinformatDate (joindate) {
        if (!joindate) return null
        const [year, month, day] = joindate.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null
        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      joinparseDate (joindate) {
        if (!joindate) return null
        const [month, day, year] = joindate.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },

      submit () {
          this.$store.dispatch('EMPLOYEE_CREATION_ACTIONS',
          {
              employee_No: this.employee_number,
        employee_Name: this.employee_name,
        email: this.employee_email,
        dob: this.dateFormatted,
        nrc: this.employee_nrc,
        phone_no_work: this.employee_phone,
        phone_no_personal: this.employee_homephone,
        gender: this.employee_gender,
        marital_status: this.employee_matritalstatus,
        nationality: this.employee_nationality,
        religion: this.employee_religion,
        permanent_address: this.employee_permanent_address,
        education_background: this.employee_educational_background,
        joined_date: this.joindateFormatted,
        employee_state: "Nof",
        addressId: 2,
        addresses: {
            "line_1": "Tamwe",
            "line_2": "3st",
            "township": "Tamwe",
            "city": "Yangon",
            "region": "Yangon",
            "country": "Myanmar"
        }
                // employee_No: this.employee_number,
                // employee_Name: this.employee_name,
                // email: this.employee_email,
                // dob: "2000-04-12T00:00:00",
                // nrc: this.employee_nrc,
                // phone_no_work: this.employee_phone,
                // phone_no_personal: this.employee_homephone,
                // gender: this.employee_gender,
                // marital_status: this.employee_state,
                // nationality: this.employee_nationality,
                // religion: this.employee_religion,
                // permanent_address: this.employee_permanent_address,
                // education_background: this.employee_educational_background,
                // joined_date: this.joindateFormatted,
                // employee_state: this.employee_state,
                // addresses: {
                //     line_1: this.employee_address_line_one,
                //     line_2: this.employee_address_line_two,
                //     township: this.employee_township,
                //     city: this.employee_city,
                //     region: this.employee_region,
                //     country: this.employee_country
                // }
          })
        this.$refs.form.reset()
      },
        reset () {
        this.$refs.form.reset()
      }
    }
}
    
</script>

<style scoped>
.label{
  font-size: 14px;
  padding-top:20px;
  border-spacing: 12px;
}
.textbox{
    font-size: 14px;
    /* width: 100%; */

}
.hover:hover{
  background-color: #2ecc71;
}
.hoverclear:hover{
  background-color: #f30b0b;
}
.formdesign{
    padding-top:10px;
    padding-left:10%;
    /* padding-right:5%; */
    /* width:70%; */
    /* border:1px solid blue; */
    /* background: hsla(198, 55%, 91%, 0.938) */
}
/* .background{
    padding-left:3%;
    spacing:12px;
    background-image: url("../assets/HR.jpg");
    background-attachment: fixed;
} */
</style>