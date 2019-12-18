<template>
<v-container fluid grid-list-md>
<v-form v-model= "valid" ref="form">
   <v-layout justify-center>
      <v-flex xs12 sm8 md7>
          <h1>Branch Creation Form</h1>
          <v-divider></v-divider>

          <!-- for label of text field and text field size-->
          <v-layout row wrap class="card-body-padding">
            <p class="part1-padding1">Branch Name</p>

            <v-flex xs12 sm12 md5>
              
                <v-text-field v-model="branch_creation_name" placeholder="" :rules="bnameRules" required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap class="card-body-padding">
            <p class="part1-padding2">Phone Number 1</p>
              <v-flex xs12 sm12 md5>
                  <v-text-field v-model="branch_creation_phone_one"  v-validate="'required'" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" :rules="phoneRules1"
                    placeholder=""
                    mask="##-### ### ###"
                    required
                  ></v-text-field>
                </v-flex>
          </v-layout>

          <v-layout row wrap class="card-body-padding">
            <p class="part1-padding2">Phone Number 2</p>

              <v-flex xs12 sm12 md5>
                <v-text-field
                v-model="branch_creation_phone_two"
                v-validate="'required'"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  :rules="phoneRules2"
                  placeholder=""
                  mask="##-### ### ###"
                  required
                ></v-text-field>
              </v-flex>
          </v-layout>

          <v-layout row wrap class="card-body-padding">
            <v-flex xs12 sm12 md12>
              <p class="part1-padding2" style="font-size:18px;">Addresses</p>
              <v-divider style="width:200px;"></v-divider>
            </v-flex>
            
          </v-layout>
          

            <v-layout row wrap class="card-body-padding">
              <p class="hidden-sm-down" style="padding-left:50px;"></p>
                <v-flex xs12 sm12 md5>
                    <v-text-field v-model="branch_creation_address_line_one" placeholder="Street Line 1 " :rules="addresslineRules1"
                    required 
                  ></v-text-field>
                  </v-flex>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <v-flex xs12 sm12 md5>
                    <v-text-field
                  v-model="branch_creation_address_line_two"
                  placeholder="Street Line 2 "
                  :rules="addresslineRules2"
                    required 
                  ></v-text-field>
                  </v-flex>
            </v-layout>

        <v-layout row wrap class="card-body-padding">
            <p class="hidden-sm-down" style="padding-left:50px;"></p>
            <v-flex xs12 sm12 md5>
                <v-select
                v-model="branch_creation_city"
                placeholder="City"
                :items="city_list"
                oninput="this.value = this.value.replace(/[^a-z.]/g, '').replace(/(\..*)\./g, '$1');"
                :rules="cityRules"
                item-text="city_name"
                @change="filterCity"
                required
              ></v-select>
              </v-flex>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           
              <v-flex xs12 sm612 md5>
                <v-select
                v-model="branch_creation_township"
                placeholder="Township"
                :items="township_list"
                oninput="this.value = this.value.replace(/[^a-z.]/g, '').replace(/(\..*)\./g, '$1');"
                :rules="townRules"
                item-text='name'
                  required
              ></v-select>
              </v-flex>
            <!--  -->
        </v-layout>

        <v-layout row wrap class="card-body-padding">
            <p class="hidden-sm-down" style="padding-left:50px;"></p>
            
             <v-flex xs12 sm612 md5>
                <v-select
                v-model="branch_creation_region"
                placeholder="Region"
                :items="region_list"
                oninput="this.value = this.value.replace(/[^a-z.]/g, '').replace(/(\..*)\./g, '$1');"
                :rules="regionRules"
                required
                ></v-select>
              </v-flex>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-flex xs12 sm12 md5>
            <v-select
              v-model="branch_creation_country"
              placeholder="Country"
            :items="country_list"
              oninput="this.value = this.value.replace(/[^a-z.]/g, '').replace(/(\..*)\./g, '$1');"
              :rules="countryRules"
              required
              ></v-select>
              </v-flex>
        </v-layout>
        <br>


        <!-- for submit button action in branch form -->
        <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on }">
            <v-btn class="white--text" round color="primary" :disabled="!valid" @click="BranchCreateAction" v-on="on">Submit</v-btn>
          </template>
          <v-card>
            <v-card-text>Are you sure to create a branch !!</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="dialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" flat @click="Dialog_OK_Actions">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
     
      <!-- for cancel button action in branch form -->
          <v-btn round color="primary" router to="/branchview" @click="BranchCreateCancel">Cancel</v-btn>
        </v-layout>
        </v-flex>
        </v-layout> 
      </v-form>
      </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data ()  {
     return {
       dialog:false,
       valid: false,
       result : this.$store.state.result ,
       branch_creation_name: '',
       bnameRules: [
         (v) => !!v || 'branch name is required',
       ],
        branch_creation_phone_one: '',
        phoneRules1: [
        (v) => !!v || 'phone number 1 is required',
        ],
        branch_creation_phone_two: '',
        phoneRules2: [
        (v) => !!v || 'phone number 2 is required',
        ],
      branch_creation_address_line_one: '',
      addresslineRules1: [
          (v) => !!v || 'street address line 1 is required',
        ],
      branch_creation_address_line_two: '',
      addresslineRules2: [
          (v) => !!v || 'street address line 2 is required',
        ],
        regionRules: [
          (v) => !!v || 'region is required',
        ],
        branch_creation_region: '',
       cityRules: [
         (v) => !!v || 'city is required',
       ],
         branch_creation_city: '',
       townRules: [
         (v) => !!v || 'township is required'
       ],
        branch_creation_township: '',
       countryRules: [
         (v) => !!v || 'country is required'
       ],
        branch_creation_country: '',
      }
    },
    methods: {
      // filterCity(val){
      //   // alert(val.cityId)
      //   this.$store.dispatch('CITY_SELECT',this.branch_creation_city)
      // },
        BranchCreateAction () {
          this.$refs.form.validate()
        },
        BranchCreateCancel () {
         this.$refs.form.reset()
        },
        Dialog_OK_Actions(){
          this.$store.dispatch('BRANCH_CREATION_ACTIONS',
            {
              "name": this.branch_creation_name,
              "phone_1": this.branch_creation_phone_one,
              "phone_2": this.branch_creation_phone_two,
              "addressId": 1,
              "addresses": {
                  "line_1": this.branch_creation_address_line_one,
                  "line_2": this.branch_creation_address_line_two,
                  "township": this.branch_creation_township,
                  "country": this.branch_creation_country
              }
            },
          this.dialog = false
          )
          this.$refs.form.reset()
        }
      },
      computed:{
         ...mapGetters(['country_list','township_list','city_list','region_list'])
      },
      created(){
        this.$store.dispatch('CITY_LIST')
        this.$store.dispatch('TOWNSHIP_LIST')
      }
    }
</script>

<style scoped>
.size{
  padding:10px;
 }
 .headline {
  padding-left:32px;
  padding-right:50px;
  padding-top: 10px;
}
.part1-padding1 {
  padding-left:5px;
  padding-right:32px;
  padding-top: 30px;
  font-size: 16px;
  color:#000;
  width:200px;
}
.card-body-padding{
  padding-left:40px;
  padding-right:30px;
}
.part1-padding2 {
  padding-left:5px;
  padding-right:10px;
  padding-top: 30px;
  font-size: 16px;
  color:#000;
  width:200px;
}

.part1-padding3{
 padding-left:20px;
 padding-top: 30px;
  padding-right: 15px;
  font-size: 16px;
  color:#000;
 }
.part2-padding1 {
  padding-left:5px;
  padding-right:65px;
  padding-top: 30px;
  font-size: 16px;
  color:#000;
  width:200px;
}

</style>