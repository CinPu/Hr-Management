<template>
<div>
    <v-container >
         <v-layout justify-center row fill-height text-xs-center wrap style="border:1px solid black">
           <v-flex>
               
                <center>
                 <!-- <v-container id="container"> -->
                   <center><h2 style="padding-top:20px;margin-bottom:20px;color:rgb(23, 48, 94);">CV Form</h2></center>
                   <!-- <v-divider></v-divider> -->
                   <br><br>
                   <!-- <div style="margin-left:5%; margin-right:5%" id="div_style"> -->
                    <v-form ref="form" v-model="valid" lazy-validation 
                    style="margin-left:10%; margin-right:5%" >
                   <h3 class="text-xs-left" id="header_design">Personal Information</h3>
                   <br><br>
                    <v-layout column fill-height >
                        <!-- Name and NRC start -->
                       <v-flex>
                           <v-layout row wrap>
                               <v-flex xs12 sm12 md6 lg6 xl6>
                                    <v-layout row wrap>

                                    <v-flex xs12 sm3 md3 text-xs-left>
                                    <p id="text_design">Name :</p>
                                    </v-flex>

                                    <v-flex xs12 sm9 md9 text-xs-left >
                                    <v-text-field
                                    v-model="name"
                                    :rules="nameRules"
                                    v-validate="'required|alpha'"
                                    id="txt"      
                                    style="width:80%;" 
                                    required 
                                    >
                                    </v-text-field>
                                    <!-- <span>{{errors.first('Phone no')}}</span> -->
                                    </v-flex>

                                    </v-layout>
                               </v-flex>

                               <v-flex xs12 sm12 md6 lg6 xl6>
                                   <v-layout row wrap>

                                   <v-flex xs12 sm3 md3 text-xs-left>
                                   <p id="text_design">NRC :</p>
                                   </v-flex>

                                   <v-flex xs12 sm9 md9 text-xs-left>
                                   <v-text-field
                                    v-model="nrc"
                                   :rules="nrcRules"
                                   
                                   style="width:80%"
                                   id="txt"   
                                   required                            
                                   >
                                   </v-text-field>
                                    </v-flex>
                                    
                                </v-layout>
                               </v-flex>
                           </v-layout>
                       </v-flex>
                        <!-- Name and NRC end -->

                       <!-- DateOfBirth and Marital start -->
                       <v-flex>
                           <v-layout row wrap>
                                <v-flex xs12 sm12 md6 lg6 xl6 >
                                  <v-layout row wrap>

                                   <v-flex xs12 sm3 md3 text-xs-left>
                                   <p id="text_design">Date of Birth :</p>
                                   </v-flex>

                                  
                                   <v-flex xs12 sm9 md9 text-xs-left> 

                                    <div  style="width:80%;">
                                            <v-menu
                                                    ref="menu"
                                                    v-model="menu"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    :return-value.sync="date"
                                                    lazy
                                                    transition="scale-transition"
                                                    offset-y
                                                    full-width
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        v-model="date"
                                                        label="DD/MM/YYYY"
                                                        
                                                        readonly
                                                        v-on="on"
                                                    ></v-text-field>
                                                    </template>
                                                <v-date-picker v-model="date" color="blue" header-color="blue" no-title>
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                                </v-date-picker>

                                                </v-menu>                                          
                                    </div>



                                </v-flex>                                   
                                </v-layout>
                            </v-flex>

                               <v-flex xs12 sm12 md6 lg6 xl6 >
                                   
                                   <v-layout row wrap>
                                    <v-flex xs12 sm3 md3 text-xs-left>
                                    <p id="text_design">Marital Status :</p>
                                    </v-flex>

                                    <v-flex xs12 sm9 md9 text-xs-left>
                                        <v-combobox
                                            v-model="maritalSelect"
                                            :rules="maritalRules"
                                            :items="items"
                                            style="width:80%"
                                        ></v-combobox>
                                    </v-flex>
                                   </v-layout>
                                   <!-- <v-text-field
                                   solo
                                   placeholder="Email"
                                   style="width:80%"
                                   >
                                   </v-text-field> -->
                               </v-flex>
                           </v-layout>
                       </v-flex>
                       <!-- Date and Marital end -->

                       <!-- Religion and Gender row start-->
                       <v-flex>
                           <v-layout row wrap>
                               <v-flex xs12 sm12 md6 lg6 xl6>
                                    <v-layout row wrap>

                                    <v-flex xs12 sm3 md3 text-xs-left>
                                    <p id="text_design">Religion :</p>
                                    </v-flex>

                                    <v-flex xs12 sm9 md9 text-xs-left>
                                    <v-combobox
                                    :rules="religionRules"
                                    :items="item"
                                    
                                    style="width:80%" 
                                    required                              
                                    >
                                    </v-combobox>
                                    </v-flex>

                                    </v-layout>
                               </v-flex>

                               <v-flex xs12 sm12 md6 lg6 xl6>
                                   <v-layout row wrap>

                                   <v-flex xs12 sm3 md3 text-xs-left style="padding-top:7px">
                                   <p id="text_design">Gender :</p>
                                   </v-flex>

                                   <v-flex xs12 sm9 md9 text-xs-left style="padding-left:0px; padding-top:20px">
                                        <v-radio-group row mandatory="true" style="width:80%; margin-top:0px;" > 
                                        <v-radio label="Male" value="blue1" color="blue"></v-radio>
                                        <v-radio label="Female" value="blue2" color="blue"></v-radio>
                                        </v-radio-group>
                                    </v-flex>
                                    
                                </v-layout>
                               </v-flex>
                           </v-layout>
                       </v-flex>
                       <!-- Religion and Gender end -->

                       <!-- Qualification and Status start -->
                        <v-flex>
                           <v-layout row wrap>

                                <v-flex xs12 sm12 md6 lg6 xl6>
                                   <v-layout row wrap>
                                        <v-flex xs12 sm3 md3 text-xs-left>
                                           <p id="text_design">Qualification :</p>
                                        </v-flex>

                                        <v-flex xs12 sm9 md9 text-xs-left>
                                            <!-- <v-text-field
                                            solo
                                            style="width:80%"                               
                                            > -->

                                            <v-textarea
                                                v-model="bio"
                                                :rules="qualificationRules"
                                                auto-grow
                                                
                                                style="width:80%"                               
                                                color="deep-purple"
                                               
                                                rows="1"
                                            ></v-textarea>
                                            <!-- </v-text-field> -->
                                        </v-flex>

                                    </v-layout>
                                </v-flex>

                                <v-flex xs12 sm12 md6 lg6 xl6>
                                   <v-layout row wrap>
                                        <v-flex xs12 sm3 md3 text-xs-left>
                                           <p id="text_design">Status :</p>
                                        </v-flex>

                                        <v-flex xs12 sm9 md9 text-xs-left>
                                            <v-text-field
                                            :rules="statusRules"
                                            :items="item1"
                                            
                                            style="width:80%"                               
                                            >
                                            </v-text-field>
                                        </v-flex>

                                    </v-layout>
                                </v-flex>
                           </v-layout>
                       </v-flex>
                       <!-- Qualification and Status end  -->

                    <br><br>

                        <!-- <hr> -->
                        <!-- <v-divider id="divider"></v-divider> -->
                        <br><br>
                    <h2 class="text-xs-left" id="header_design">Contact Information</h2>
                    <br><br>
                       <!--  Phone No start -->
                       <v-flex>
                           <v-layout row wrap>


                                <v-flex xs12 sm12 md6 lg6 xl6>

                                   <v-layout row wrap>

                                        <v-flex xs12 sm3 md3 text-xs-left>
                                            <p id="text_design">Home Phone :</p>
                                        </v-flex>

                                        <v-flex xs12 sm9 md9 text-xs-left>
                                                <v-text-field
                                                v-model="hphone"
                                                :rules="hphoneRules"
                                                
                                                v-validate="'required|numeric'"
                                                style="width:80%" 
                                                name="pno"   
                                                required                           
                                                >
                                                </v-text-field>
                                        </v-flex>
                                        <!-- <span>{{errors.first('pno')}}</span> -->
                                    </v-layout> 
                               </v-flex>

                               <v-flex xs12 sm12 md6 lg6 xl6 >
                                    <v-layout row wrap>

                                        <v-flex xs12 sm3 md3 text-xs-left>
                                            <p id="text_design">Personal Phone:</p>
                                        </v-flex>

                                        <v-flex xs12 sm9 md9 text-xs-left>
                                            <v-text-field
                                            required
                                            v-model="phone"
                                            :rules="phoneRules"
                                            style="width:80%"                               
                                            >
                                            </v-text-field>
                                        </v-flex>

                                    </v-layout>                         
                               </v-flex>

                           </v-layout>
                       </v-flex>
                       <!-- Phone No end -->

                       <!-- Email row start -->
                       <v-flex>
                           <v-layout row wrap>
                                <v-flex xs12 sm12 md6 lg6 xl6>
                                   <v-layout row wrap>
                                        <v-flex xs12 sm3 md3 text-xs-left>
                                            <p id="text_design">Email :</p>
                                        </v-flex>

                                        <v-flex xs12 sm9 md9 text-xs-left>
                                                <v-text-field
                                                 v-model="email"
                                                :rules="[rules.required, rules.email]"
                                                
                                                style="width:80%" 
                                                required                              
                                                >
                                                </v-text-field>
                                        </v-flex>

                                    </v-layout>
                               </v-flex>
                               
                           </v-layout>
                       </v-flex>
                       <!-- Email row end-->

                    </v-layout><br><br>

                    

                    <!-- <hr> -->
                    <br><br>
                    <!-- address start -->
                    <h2 class="text-xs-left" id="header_design">Address</h2>
                    <br>
                    
                       <!-- First address row end -->
                       <v-flex>
                           <v-layout row wrap>

                                <v-flex xs12 sm12 md6 lg6 xl6>
                                   <v-layout row wrap>
                                        <v-flex xs12 sm3 md3 text-xs-left>
                                           <p id="text_design">Street Line 1 :</p>
                                        </v-flex>

                                        <v-flex xs12 sm9 md9 text-xs-left>
                                            <v-text-field
                                            v-model="street1"
                                            :rules="street1Rules"
                                            
                                            required
                                            style="width:80%"                               
                                            >
                                            </v-text-field>
                                        </v-flex>

                                    </v-layout>
                                </v-flex>

                                <v-flex xs12 sm12 md6 lg6 xl6>
                                   <v-layout row wrap>
                                        <v-flex xs12 sm3 md3 text-xs-left>
                                           <p id="text_design">Street Line 2 :</p>
                                        </v-flex>

                                        <v-flex xs12 sm9 md9 text-xs-left>
                                            <v-text-field
                                            v-model="street2"
                                            :rules="street2Rules"
                                            
                                            required
                                            style="width:80%"                               
                                            >
                                            </v-text-field>
                                        </v-flex>

                                    </v-layout>
                                </v-flex>
                           </v-layout>
                       </v-flex>
                       <!-- First address row end -->

                       <!-- Second address row start -->
                       <v-flex>
                           <v-layout row wrap>

                                <v-flex xs12 sm12 md6 lg6 xl6>
                                   <v-layout row wrap>
                                        <v-flex xs12 sm3 md3 text-xs-left>
                                           <p id="text_design">Township :</p>
                                        </v-flex>

                                        <v-flex xs12 sm9 md9 text-xs-left>
                                            <v-text-field
                                            v-model="township"
                                            :rules="townRules"
                                            required
                                            
                                            style="width:80%"                               
                                            >
                                            </v-text-field>
                                        </v-flex>

                                    </v-layout>
                                </v-flex>

                               <v-flex xs12 sm12 md6 lg6 xl6>
                                   <v-layout row wrap>
                                        <v-flex xs12 sm3 md3 text-xs-left>
                                           <p id="text_design">Region :</p>
                                        </v-flex>

                                        <v-flex xs12 sm9 md9 text-xs-left>
                                            <v-text-field
                                             v-model="region"
                                            :rules="regionRules"
                                            
                                            required
                                            style="width:80%"                               
                                            >
                                            </v-text-field>
                                        </v-flex>

                                    </v-layout>
                                </v-flex>
                           </v-layout>
                       </v-flex>
                       <!-- Second address row end -->

                       <!-- Third address row start -->
                       <v-flex>
                           <v-layout row wrap>

                                <v-flex xs12 sm12 md6 lg6 xl6>
                                   <v-layout row wrap>
                                        <v-flex xs12 sm3 md3 text-xs-left>
                                           <p id="text_design">Country :</p>
                                        </v-flex>

                                        <v-flex xs12 sm9 md9 text-xs-left>
                                            <!-- <v-text-field
                                            solo
                                            style="width:80%"                               
                                            >
                                            </v-text-field> -->

                                            <v-autocomplete
                                                ref="country"
                                                v-model="country"
                                                :rules="[() => !!country || 'Country is required']"
                                                :items="countries"
                                                placeholder="Country"
                                               
                                                
                                                required
                                                style="width:80%"
                                            ></v-autocomplete>
                                        </v-flex>

                                    </v-layout>
                                </v-flex>

                               <v-flex xs12 sm12 md6 lg6 xl6>
                                   <v-layout row wrap>
                                        <v-flex xs12 sm3 md3 text-xs-left>
                                           <p id="text_design">City :</p>
                                        </v-flex>

                                        <v-flex xs12 sm9 md9 text-xs-left>
                                            <v-text-field
                                            ref="city"
                                            v-model="city"
                                            :rules="[() => !!city || 'City is required']"
                                            
                                            style="width:80%"                               
                                            >
                                            </v-text-field>
                                        </v-flex>

                                    </v-layout>
                                </v-flex>
                           </v-layout>
                       </v-flex>
                       <!-- Third address row end-->

                       <!-- address end -->
                       <br><br>

                     <center>
                         <v-layout row wrap justify-center>
                            <v-flex text-xs-right>
                               <v-btn round color="primary" @click="validate">Send</v-btn>
                            </v-flex>


                        <v-flex text-xs-left>
                          <v-btn 
                            v-on="on"
                            @click="reset"
                            color="primary"
                            round
                            >
                            Cancel
                            </v-btn>
                        </v-flex>
                         </v-layout>

            <br/>
                     </center>

                            <!-- <v-btn id="send_btn" round>Send</v-btn>
                            <v-btn id="clear_btn" round>Clear</v-btn></center> -->
                                                            
                   <!-- </div> -->
                       </v-form>
                  
                <!-- </v-container> -->
                </center>
 
            </v-flex>
        </v-layout>
    </v-container>
<!-- whole page container end -->
</div>
</template>

<script>
export default{
  data () {
  return{
        valid: false,
        dialog: false,
        country: null,
        
        menu: false,
        date: null,
    
        item1:['Inernship','Job Training'],
        items: ['Single', 'Married', 'Widowed', 'Divorced'],
        item:['Buddhism','Christianity','Islam','Hinduism','Tribal religions','Other','No religion'],
      
        
        countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
        name: '',
        nameRules: [
        v => !!v || 'Name is required',
      ],

      nrc:'',
      nrcRules:  [
        v => !!v || 'nrc is required'

      ],
      email: '',
      rules: {
          required: value => !!value || 'Email is required',
          
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
  },


  create(){
    this.$validator.validateAll().then(valid=>{
        if(valid){
          alert("Complete");
        }
        else{
          alert("please fill")
        }
    });
  },
  
  


      pphone:'',
      phoneRules:[
         v => !!v || 'Personal Phone is required'
      ],
      hphone:'',
      hphoneRules:[
         v => !!v || 'Home Phone is required'

      ],
      maritalRules:[
         v => !!v || 'Marital Status is required'],
        
      religionRules:[v => !!v || 'Religion is required'],
      qualificationRules:[v => !!v || 'Qualification is required' ],  
      statusRules:[v => !!v || ' Status is required'],

      street1Rules:[v => !!v || 'Street Line 1 is required'],
      street2Rules:[v => !!v || 'Street Line 2 is required'],
      townRules:[v => !!v || 'Township is required'],
      regionRules:[v => !!v || 'Region is required'],

    }  
  },
   watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
   },
   methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
            alert("Complete");
        }

        // else {
        //   alert("Please fill the information correctly!");
        // }
      },
      
      reset () {
        this.$refs.form.reset()
      },
  
  save (date) {
    this.$refs.menu.save(date)
  }

}
}

</script>

<style scoped>
#header_design{
    color:rgb(23, 48, 94);
    text-transform: none !important;
    font-family: "Istokn Web", "sans-serif";
    font-size: 20px;
}

#text_design{
    color:rgb(23, 48, 94);
    text-transform: none !important;
    font-family: "Istokn Web", "sans-serif";
    font-size: 16px;
    padding-top:20px;
}

#address{
    width:85%;
    outline:solid 0.5px rgb(23, 48, 94);
    padding-top:20px;
}

#send_btn{
    text-transform: none !important;
    /* background-color:rgb(18, 110, 80); */
    /* color:white; */
}

#clear_btn{
    text-transform: none !important;
    /* background-color:rgb(9, 55, 73); */
    /* color:white; */
}

#whole_page{
    background: #f5f5f5;
    /*background-image: linear-gradient(rgb(50, 9, 148), rgb(81, 162, 209)); */
}

#container{
    background: #fff;
    /* background:rgb(241, 239, 239); */
    /* border:1px solid rgb(23, 48, 94); */
    /* box-shadow: 5px #b0aeb3; */
    padding-top:0px; 
    padding-left: 0px;
    padding-right:0px;
    /* width:850px; */
    width:70%;
    
    /* line-height: px; */
}

#title{
    background:rgb(15, 80, 124);
    color:white;
}

#layout_bg{
    background:rgb(235, 236, 236);
    padding-left:20px;
    padding-right:20px;
    padding-top:20px;
}

.v-text-field.v-text-field--solo .v-input-control{max-height:2px;}

.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: rgb(136, 104, 57);
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #0a0a0a;
}


@media only screen and (max-width: 800px) {
    #container{
        width:95%;
    }

    #dialog{
        width:70%;
    }
}

@media only screen and (max-width: 700px) {
    #container{
        width:100%;

    }

    #div_style{
        margin-left:0%; 
        margin-right:0%
    }

    #txt{
        width:100%;
    }
}

</style>
