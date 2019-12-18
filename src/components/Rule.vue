<template>

  <v-layout justify-center text-xs-center>
    
  <v-flex xs12 sm12 md10>
    <br/>
    <br/>
    <br/>
    <v-layout row wrap>
      <h1>Rule</h1> <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="300px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" class="mb-4" round v-on="on"><v-icon>add</v-icon>Add Rule</v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="headline">New Rule</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field 
                  v-model="rule_no" 
                  label="Rule No" 
                  :rules="rule_noRules"
                  required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 sm6 md12>
                  <v-textarea
                    v-model="description" 
                    label="Description" 
                    :rules="descriptionRules"
                    outline
                    required
                  >
                  </v-textarea>
                </v-flex>
              </v-layout>

            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      
      </v-dialog>
    </v-layout>

    <v-divider></v-divider>
    <v-layout row wrap >
      <!-- <v-card-title class="title">Unit</v-card-title> -->
      <v-flex>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 sm8 md3>
       <v-text-field
       class="mb-3"
        v-model="search"
        append-icon="search"
        label="Rule No"
        single-line
        hide-details
      ></v-text-field>
      </v-flex>
       <v-dialog v-model="edit_dialog" max-width="300px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Rule</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field 
                  v-model="edit_rule_no" 
                  label="Rule No" 
                  :rules="rule_noRules"
                  required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 sm6 md12>
                  <v-textarea
                    v-model="edit_description" 
                    label="Description" 
                    :rules="descriptionRules"
                    outline
                    required
                  >
                  </v-textarea>
                </v-flex>
              </v-layout>

            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="edit_dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      
      </v-dialog>

    </v-layout> 
    <v-data-table
      :search="search"
      :headers="headers"
      style="border:1px solid gray"
      :items="rule_data"
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
        <td class="text-xs-center">{{ props.item.rule_no }}</td>
        <td class="text-xs-center">{{ props.item.description }}</td>
        <td class="justify-center layout px-0">
          <v-icon color="green" small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon color="red" small @click="DeleteRule(props.item)" v-on="on">delete</v-icon>
        </td>
      </template>
    </v-data-table>
    
    <v-dialog v-model="delete_dialog" max-width="300px">
      <v-card>
        <v-card-text>Are you sure you want to delete this rule?</v-card-text>
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
      delete_dialog: false,
      rule_no : '',
      description : '',
      edit_rule_no : '',
      edit_description : '',
      dialog : false,
      search: '',
  
      modal: false,

      rule_noRules: [
      (v) => !!v || 'rule no is required'
      ],
      
      descriptionRules: [
      (v) => !!v || 'description  is required'
      ],
      
      headers: [
        { text: 'No', align: 'left', value: 'no' },
        { text: 'Rule No', align: 'left', value: 'rule_no' },
        { text: 'Description', align: 'left', value: 'rule_description'},
        { text: 'Actions',align: 'center', value: 'no', sortable: false }
      ],
      id:''
    }),

    computed: {
      ...mapGetters([
        'rule_data'
      ])
    },
    
    created () {
      this.$store.dispatch('DATA_RANK_ALL_DATA')
    },

     methods: {
       DeleteRule(item){
         this.id = item.rule_Id
         this.delete_dialog = true
       },
      editItem (item) {
        this.id = item.rule_Id
        this.edit_rule_no = item.rule_no
        this.edit_description = item.description
        this.edit_dialog = true
      },
      ok () {
        this.$store.dispatch('DELETE_RULE_DATA',this.id)
        this.delete_dialog=false
      },
     close () {
        this.edit_dialog = false
      },
      save () {
        this.$store.dispatch('RULE_EDIT_DATA',{ id : this.id , rule_no : this.edit_rule_no , description : this.edit_description })
        this.edit_dialog = false
      },
      submit(){
        this.$store.dispatch('RULE_DATA_INPUT',{ rule_no : this.rule_no , description : this.description })
        this.dialog = false
      }
      
    }
  }
</script>

<style scoped>
  .title{
  padding-top:2px;
 
  }
  
</style>




