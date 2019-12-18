<template>
  <v-layout justify-center text-xs-center style="margin-top:50px;width:100%;">
  <v-flex xs12 sm12 md10>
    <v-layout row wrap >
      <h1>Announcement</h1>
       <v-spacer></v-spacer>
       <v-btn color="primary" router to="/anouncementcreation" round class="mb-4" v-on="on"><v-icon>add</v-icon>Create Announcement</v-btn>
       <v-dialog v-model="dialog" max-width="700px">
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
                <v-flex xs12 sm6 md5>
                  <v-text-field v-model="edittitle" label="Title" :rules="titleRules"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md5>
                  <v-menu
                    ref="menu1"
                    v-model="model"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        @blur="date = parseDate(dateFormatted)"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="model = false"></v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex xs12 sm6 md5>
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                  <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-layout row warp>

                <v-flex xs12 sm6 md5>
                  <v-text-field 
                    v-model="editdescription" 
                    label="Description" 
                    :rules="descriptionRules"
                  >
                  </v-text-field>
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
    <br/>
    
   
    <v-data-table
      :headers="headers"
      :items="announcement_data"
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
        <td class="text-xs-center">{{ props.item.no }}</td>
        <td class="text-xs-center">{{ props.item.title }}</td>
        <td class="text-xs-center">{{ props.item.date }}</td>
        <td class="text-xs-center">{{ props.item.description }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" color="green" @click="editItem(props.item)">edit</v-icon>
          <v-icon small color="error" @click="deleteitem(props.item)" v-on="on">delete</v-icon>
        </td>
      </template>
    </v-data-table>
    
    <v-dialog v-model="dialog2" max-width="300px">
      <v-card>
        <v-card-text>Are you sure you want to delete this announcement?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog2 = false" v-on="on">Cancel</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="ok" v-on="on">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
  </v-layout>
</template>

<script>
// import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      dialog2: false,
      date:'',
      modal: false,
      menu2: false,
      id:'',
      edittitle:'',
      editdescription:'',
      titleRules: [
      (v) => !!v || 'title  is required'
      ],
      
      descriptionRules: [
      (v) => !!v || 'description  is required'
      ],

      headers: [
        { text: 'No', align: 'left', sortable: false, value: 'title' },
        { text: 'Title', align: 'left', sortable: false, value: 'title' },
        { text: 'Date', align: 'left', value: 'date'},
        { text: 'Description',align: 'left', value: 'description' },
        { text: 'Actions',align: 'center', value: 'title', sortable: false }
      ]
    }),

    computed: {
      formTitle () {
        return 'Edit Announcement'
      },
      announcement_data(){
        return this.$store.getters.announcement_data
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialog2 (val) {
        val || this.close()
      },
    },
    
    created () {
      this.$store.dispatch('SELECT_ANNOUNCEMENT_DATA')
    },

     methods: {
       deleteitem(item){
         this.dialog2 = true
         this.id = item.id
       },
       ok(){
         this.$store.dispatch('DELETE_ANNOUNCEMENT_DATA',this.id)
         this.dialog2 = false
       },
      editItem (item) {
        this.id = item.id
        this.edittitle = item.title
        this.editdescription = item.description
        this.date = item.date
        this.dialog = true
      },
      close () {
        this.dialog = false
      },
      save () {
        this.$store.dispatch('ANNOUNCEMENT_EDIT_ACTIONS',
        {
          id : this.id,
          title : this.edittitle,
          description : this.editdescription,
          date : this.date
        })
        this.close()
        this.$store.dispatch('SELECT_ANNOUNCEMENT_DATA')
      }
    }
  }
</script>

<style scoped>
  .title{
  padding-top:2px;
 
  }
</style>




