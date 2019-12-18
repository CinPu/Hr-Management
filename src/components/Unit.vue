<template>
  <v-layout justify-center text-xs-center>
    <br/>
    <br/>
  <v-flex xs12 sm12 md10>
    <br/>
    <v-layout row wrap>
      <h1>Unit</h1> <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="400px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" class="mb-4" round v-on="on"><v-icon>add</v-icon>Add Unit</v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="headline">New Unit</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field 
                  v-model="unit_name" 
                  label="Name" 
                  :rules="nameRules"
                  required
                  >
                  </v-text-field>
                </v-flex>
              
                <v-flex xs12 sm6 md6>
                  <v-text-field 
                    v-model="unit_price" 
                    label="Price" 
                    :rules="priceRules"
                    required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row warp>
                <v-flex xs12 sm6 md6>
                  <v-text-field 
                    v-model="unit_remark" 
                    label="Remark" 
                    :rules="remarkRules"
                    required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="SaveInsert">Save</v-btn>
          </v-card-actions>
        </v-card>
      
      </v-dialog>
      <v-dialog v-model="edit_dialog" max-width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Unit</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field 
                  v-model="edit_unit_name" 
                  label="Name" 
                  :rules="nameRules"
                  required
                  >
                  </v-text-field>
                </v-flex>
              
                <v-flex xs12 sm6 md6>
                  <v-text-field 
                    v-model="edit_unit_price" 
                    label="Price" 
                    :rules="priceRules"
                    required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row warp>
                <v-flex xs12 sm6 md6>
                  <v-text-field 
                    v-model="edit_unit_remark" 
                    label="Remark" 
                    :rules="remarkRules"
                    required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="EditSave">Save</v-btn>
          </v-card-actions>
        </v-card>
      
      </v-dialog>
    </v-layout>

    <v-divider></v-divider>
    <v-layout row wrap >
      <!-- <v-card-title class="title">Unit</v-card-title> -->
      <v-flex></v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 sm8 md3>
       <v-text-field
       class="mb-3"
        v-model="search"
        append-icon="search"
        label="Unit Name"
        single-line
        hide-details
      ></v-text-field>
      </v-flex>
       

    </v-layout>
   
    <v-data-table
      :headers="headers"
      :items="unit_data"
      style="border:1px solid gray"
      class="elevation-1"
    >
    <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.no }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.price }}</td>
        <td class="text-xs-center">{{ props.item.remark }}</td>
        <td class="justify-center layout px-0">
          <v-icon color="green" small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon color="red" small @click="DeleteItem(props.item)" v-on="on">delete</v-icon>
        </td>
      </template>
    </v-data-table>
    
    <v-dialog v-model="delete_dialog" max-width="300px">
      <v-card>
        <v-card-text>Are you sure you want to delete this unit?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="delete_dialog = false" v-on="on">Cancel</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="ok" v-on="on">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  
  </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      edit_dialog: false,
      id : '',
      delete_dialog: false,
      search: '',
  
      modal: false,

      nameRules: [
      (v) => !!v || 'name is required'
      ],
      
      priceRules: [
      (v) => !!v || 'price  is required'
      ],
      remarkRules: [
      (v) => !!v || 'remark  is required'
      ],

      headers: [
        { text: 'N0', align: 'left', value: 'unit_no' },
        { text: 'Name', align: 'left', value: 'unit_name' },
        { text: 'Price', align: 'left', value: 'unit_price'},
        { text: 'Remark',align: 'left', value: 'unit_remark', sortable: false },
        { text: 'Actions',align: 'center', value: 'unit_name', sortable: false }
      ],
      dialog : false
    }),

    computed: {
      ...mapGetters([
        'unit_data'
      ]),
      unit_data(){
        return this.$store.getters.unit_data.filter(element=>{
          return element.name.includes(this.search)
        })
      }
    },
    created(){
      this.$store.dispatch('UNIT_DATA')
    },
    watch: {
      edit_dialog (val) {
        val || this.close()
      },
      delete_dialog (val) {
        val || this.close()
      }
    },
     methods: {
       EditSave(){
         this.$store.dispatch('Edit_Unit_data',{
           id : this.id ,
           name : this.edit_unit_name ,
           price : this.edit_unit_price ,
           remark : this.edit_unit_remark
         })
         this.edit_dialog = false 
       },
       DeleteItem(item){
         this.delete_dialog = true
         this.id = item.id
       },
     SaveInsert(){
       this.$store.dispatch('INSERT_DATA_UNIT',{
         unit_name : this.unit_name ,
         unit_price : this.unit_price ,
         unit_remark : this.unit_remark
       })
       this.dialog = false
     },
      editItem (item) {
        this.id = item.id
        this.edit_unit_name = item.name ,
        this.edit_unit_price = item.price ,
        this.edit_unit_remark = item.remark ,
        this.edit_dialog = true
      },
      ok(){
        this.$store.dispatch('Delete_Data',this.id)
        this.delete_dialog=false
      },
     close () {
        this.edit_dialog = false
        setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
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




