<template>
  <section id="welcome" class="hide-overflow">
  <v-container fluid grid-list-md>
      <v-form  v-model= "valid" ref="form">
  <v-layout justify-center text-xs-center>
  <v-flex xs12 sm8 md12>
    <br/>
    <v-layout row>
      <h1 align="left">Branch</h1>
 <v-spacer></v-spacer>
 <v-btn round color="primary" router to="/branchcreation"><v-icon>add</v-icon>Add Branch</v-btn>
    </v-layout>
 <br/>
      <v-divider></v-divider> 
      <br/>
      <br/> 
    <v-layout row wrap >
           
       <v-dialog v-model="dialog" max-width="500px" persistent="on" >
        <template v-slot:activator="{ on }">
        </template>

        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field 
                  v-model="edit_branch_view_name" 
                  label="Branch Name" 
                  :rules="branchnameRules"
                  required></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field 
                  v-model="edit_branch_view_phone_one" 
                  label="Phone No1" 
                  :rules="phone1Rules"
                  mask="##-### ### ###"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                  v-model="edit_branch_view_phone_two" 
                  label="Phone No2" 
                  :rules="phone2Rules"
                  mask="##-### ### ###"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  required></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field 
                  v-model="edit_branch_view_street1" 
                  label="Street Line 1" 
                  :rules="street1Rules"
                  required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field 
                  v-model="edit_branch_view_street2" 
                  label="Street Line 2" 
                  :rules="street2Rules"
                  required></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-select 
                  v-model="edit_branch_view_region" 
                  placeholder="Region" 
                  :items="region_list"
                  oninput="this.value = this.value.replace(/[^a-z.]/g, '').replace(/(\..*)\./g, '$1');" 
                  :rules="regionRules"
                  required></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-select 
                  v-model="edit_branch_view_city" 
                  placeholder="City" 
                  :items="city_list" 
                  :rules="cityRules"
                  item-text="city_name"
                  oninput="this.value = this.value.replace(/[^a-z.]/g, '').replace(/(\..*)\./g, '$1');" 
                  required></v-select>
                </v-flex>
              </v-layout>

              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-select 
                  v-model="edit_branch_view_town" 
                  placeholder="Township" 
                  :items="township_list" 
                  :rules="townRules"
                  oninput="this.value = this.value.replace(/[^a-z.]/g, '').replace(/(\..*)\./g, '$1');"
                  item-text="name" 
                  required></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-select 
                  v-model="edit_branch_view_country" 
                  placeholder="Country" 
                  :items="country_list" 
                  :rules="countryRules"
                  oninput="this.value = this.value.replace(/[^a-z.]/g, '').replace(/(\..*)\./g, '$1');" 
                  required></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      
      </v-dialog>

    </v-layout>
    <v-divider></v-divider>
   
    <v-data-table
      :headers="headers"
      :items="branch_data_detail"
      class="elevation-1"
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
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.phone_1 }}</td>
        <td class="text-xs-left">{{ props.item.phone_2 }}</td>
        <td class="text-xs-left">{{ props.item.line_1 }}</td>
        <td class="text-xs-left">{{ props.item.line_2 }}</td>
        <td class="text-xs-left">{{ props.item.region }}</td>
        <td class="text-xs-left">{{ props.item.country }}</td>
        <td class="justify-center layout px-0">
          <v-icon small color="green" class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small color="red" @click="deleteActions(props.item)" v-on="on">delete</v-icon>
        </td>
      </template>
    </v-data-table>
    
    <v-dialog v-model="dialog2" max-width="300px" persistent="on">
      <v-card>
        <v-card-text>Are you sure you want to delete this branch?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog2 = false" v-on="on">Cancel</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="ok" v-on="on">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
  </v-flex>
  </v-layout>
  </v-form>
  </v-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      addressId :'',
      delete_id:'',
      dialog: false,
      dialog2: false,
      id:'',
      valid: false,
      edit_branch_view_name:'',
      edit_branch_view_phone_one:'',
      modal: false,
      edit_branch_view_phone_two:'',
      branch_view_name: '',
      edit_branch_view_street1:'',
      edit_branch_view_street2:'',
       branchnameRules: [
         (v) => !!v || 'branch name is required',
       ],
       branch_view_phone_one: '',
        phone1Rules: [
        (v) => !!v || 'phone number 1 is required',
        ],
        branch_view_phone_two: '',
        phone2Rules: [
        (v) => !!v || 'phone number 2 is required',
        ],
        branch_view_street1: '',
        street1Rules: [
          (v) => !!v || 'street address line 1 is required',
        ],
        branch_view_street2: '',
        street2Rules: [
          (v) => !!v || 'street address line 2 is required',
        ],
        regionRules: [
          (v) => !!v || 'region is required',
        ],
        edit_branch_view_region: '',
        cityRules: [
         (v) => !!v || 'city is required',
        ],
        edit_branch_view_city: '',
        edit_branch_view_town: '',
        edit_branch_view_country: '',
      headers: [
        { text: 'No', align: 'left', value: 'no' },
        { text: 'Branch Name', align: 'left', value: 'branch_view_name' },
        { text: 'Phone No1', align: 'left', value: 'branch_view_phone_one'},
        { text: 'Phone No2',align: 'left', value: 'branch_view_phone_two' },
        { text: 'Street Line1',align: 'left', value: 'branch_view_street1', sortable: false },
        { text: 'Street Line2',align: 'left', value: 'branch_view_street2', sortable: false },
        { text: 'Region',align: 'center', value: 'branch_view_region', sortable: false },
        { text: 'City',align: 'left', value: 'branch_view_city', sortable: false },
        { text: 'Action',align: 'center', value: 'branch_view_name', sortable: false }


      ],

      desserts: [],
      editedIndex: -1,
      editedItem: {
        title: '',
        date: '',
        description: ''
      },
      defaultItem: {
        title: '',
        date: '',
        description: ''
      }
    }),

    computed: {
      ...mapGetters([
        'branch_data_detail','country_list','township_list','city_list','region_list'
      ]),
      formTitle () {
        return 'Edit Branch'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialog2 (val) {
        val || this.close()
      }
    },
    
    created () {
      this.$store.dispatch('SELECT_BRANCH_DATA_ALL')
    },

     methods: {
     deleteActions(item){
       this.delete_id = item.id
       this.dialog2 = true
     },
      editItem (item) {
        this.edit_branch_view_region = item.region,
        this.edit_branch_view_city = item.city,
        this.edit_branch_view_town = item.township,
        this.edit_branch_view_country = item.country,
        this.edit_branch_view_name = item.name,
        this.edit_branch_view_phone_one = item.phone_1,
        this.edit_branch_view_phone_two = item.phone_2,
        this.edit_branch_view_street1 = item.line_1,
        this.edit_branch_view_street2 = item.line_2,
        this.id = item.id,
        this.addressId = item.addressId,
        this.dialog = true
      },
      ok () {
        this.$store.dispatch('DELETE_BRANCH_DATA',this.delete_id)
        this.dialog2=false
      },
      close () {
        this.dialog = false
      },
      save () {
        this.$store.dispatch('BRANCH_EDIT_DATA',{
                id : this.id,
                name: this.edit_branch_view_name,
                phone_1: this.edit_branch_view_phone_one,
                phone_2: this.edit_branch_view_phone_two,
                addressId : this.addressId,
                line_1: this.edit_branch_view_street1,
                line_2: this.edit_branch_view_street2,
                township: this.edit_branch_view_town,
                city: this.edit_branch_view_city,
                region: this.edit_branch_view_region,
                country: this.edit_branch_view_country
        })
        this.close()
      }
    }
  }
</script>

<style scoped>
  .title{
  padding-top:2px;
 
  }
</style>




