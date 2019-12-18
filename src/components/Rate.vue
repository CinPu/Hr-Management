<template>
<v-container>
           <v-layout row warp>
            <v-flex
              xs8
              sm8
              md12
              class="leave"
              > 
           <h1 >Rate</h1>
            </v-flex>

            <v-flex
              xs6
              sm4
              md2
              class="btn"
              
              >
              <v-btn round router to="/rateto" id="leavebtn"><v-icon>add</v-icon> Add Rate</v-btn>
            </v-flex>
        


           </v-layout>
           
<br>
      <v-divider></v-divider>
           
         <!-- </v-toolbar> -->

      <v-container>
         
        
       <v-form v-model="form" ref="form" >
    <v-layout row wrap>
<v-flex></v-flex>
<v-spacer></v-spacer>
      <v-flex
        xs7
        sm3
        md2
        class="emp"
        >          
          <v-text-field
          label="Name"
          append-icon="search"
          v-model="rate_name"
            ></v-text-field>
        </v-flex>
    </v-layout>
       </v-form>

<!-- for update  dialog box  -->
      <v-dialog v-model="dialog" max-width="500px">
       
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>


          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="edit_name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="edit_rate" label="Rate"></v-text-field>
                </v-flex>
               <v-flex xs12 sm6 md4>
                  <v-text-field v-model="edit_type" label="Type"></v-text-field>
                </v-flex>
                 <v-flex xs12 sm6 md4>
                  <v-text-field v-model="edit_description" label="Description"></v-text-field>
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
        <v-flex
        xs12 sm12 md12 >
        


            <v-data-table
            style="border:1px solid gray"
                    :headers="headers"
                    :items="rate_data"
                    :search="rate_name"
            >
            <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>

                <template slot="items" slot-scope="props">
                    <tr>
                        <td class="text-xs-left">{{ props.item.no }}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.rate}}</td>
                        <td class="text-xs-left">{{ props.item.type }}</td>
                        <td class="text-xs-left">{{ props.item.description }}</td>
                       
                        
                        <td class="text-xs-left">
            <v-icon small color="green" @click="editItem(props.item)">edit</v-icon>
            <v-icon small color="pink" @click="deleteItem(props.item)" >delete</v-icon>
        </td>
         </tr>
         </template>
      </v-data-table>
      <v-dialog v-model="dialog2" max-width="300px">
      <v-card>
        <v-card-text>Are you sure you want to delete it?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog2 = false" v-on="on">Cancel</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="ok" v-on="on">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-flex>
  </v-container>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
       dialog: false,
       edit_name : '',
       edit_rate : '',
       rate_name:'',
       rate:'',
      //  type:'',
      //  type_list:['fine','allowance'],
       description:'',
       edit_type : '',
       edit_description : '',
       id:'',
       dialog2 : false,
      headers: [
        {
          text: 'No',
          align: '',
          value: 'id',
          sortable: false
        },
        {
          text:'Name',
          value: 'name',
          align: 'left',
          sortable: false
        },
        { text: 'Rate', value: 'rate' },
        { text: 'Type', value: 'type' },
         { text: 'Description', value: 'description' },
         { text: 'Actions', value: 'name', sortable: false }
      ]
    }),

    computed: {
      formTitle () {//for dialog box title name
        return 'Edit Item'
      },
      ...mapGetters([
        'rate_data'
      ]),
      rate_data(){
        return this.$store.getters.rate_data.filter((element) => {
          return element.rate.includes(this.rate);
        })
      }
      
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.$store.dispatch('RATE_DATA')
    },
    methods: {
      editItem (item) {
        // alert(item.description)
        this.id = item.rateId
        this.edit_name = item.name,
        this.edit_rate = item.rate,
        this.edit_type = item.type,
        this.edit_description = item.description,
        this.dialog = true
      },
      ok(){
        this.$store.dispatch('DELETE_RATE_DATA',this.id)
        this.dialog2 = false
      },
      deleteItem (item) {
        this.id = item.rateId
        this.dialog2 = true
      },

      close () {
        this.dialog = false
      },

      save () {
        this.$store.dispatch('EDIT_RATE_DATA',{
          id : this.id,
          name : this.edit_name,
          rate : this.edit_rate,
          type : this.edit_type,
          description : this.edit_description
        })
        this.close()
      }



    }

  }
</script>
<style>

.leave{
  padding-left:3rem;
  padding-top:10px;
}
.btn{
  padding-top:10px;
}


#leavebtn{
   color:white;
   background-color:cornflowerblue;
   
}
#table{
  border:1px solid black;
}
#head{
  color:white;
  font-size:20px;
  text-align:left;
}
#form{
  text-align: center;
}
</style>

