<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs12 sm10 md12 offset-sm2 align-center justify-center>
           <v-layout row warp>
            <v-flex
              xs12
              sm10
              md10
              class="leave"
              > 
           <h1 >Rank</h1>
            </v-flex>

            <v-flex
              xs6
              sm4
              md2
              class="btn"
              
              >
              <v-btn round router to="/rankto" id="leavebtn"><v-icon>add</v-icon> Add Rank</v-btn>
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
        xs6
        sm4
        md4
        class="emp"
        >          
          <v-text-field
          label="Name"
          append-icon="search"
         @input="filterSearch"
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
        xs12 sm12 md12>
        

            
            <v-data-table
                    :headers="headers"
                    :items="rank_data"
                    item-key="name"
                    :search="filters"
                    style="border:1px solid gray" 
                    :custom-filter="customFilter"
            >
            <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
                <template slot="items" slot-scope="props">
                    <tr >
                        <td class="text-xs-left">{{ props.item.rank_Id}}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                       
                        
                        <td class="text-xs-left">
            <v-icon small color="teal" @click="editItem(props.item)">edit</v-icon>
            <v-icon small color="pink"  @click="deleteItem(props.item)">delete</v-icon>
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
          <v-btn color="green darken-1" flat="flat" @click="okDelete" v-on="on">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-flex>
         </v-container>
    </v-flex>
  </v-layout>
      </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      edit_id:'',
      edit_name : '',
       dialog: false,
      filters: {
        search: '',
        id: '',
       
       },
      headers: [
        {
          text: 'Id',
          align: '',
          value: 'id',
          sortable: false
        },
        {
          text:'name',
          value: 'id',
          align: 'left',
          sortable: false
        },
         { text: 'Actions', value: 'name', sortable: false }
      ],
      dialog2 : false,
       editedIndex: -1,
      editedItem: {
        id: '',
        name: 0,
      
      },
      defaultItem: {
        id: '',
         name: 0,
        payment: 0,
        remark: 0,
       
      }
    }),

    computed: {
      formTitle () {//for dialog box title name
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      ...mapGetters([
        'rank_data'
      ])
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.$store.dispatch('RANK_DATA')
    },

    

    methods: {

      customFilter(items, filters, filter, headers) {
        // Init the filter class.
        const cf = new this.$MultiFilters(items, filters, filter, headers);

        cf.registerFilter('search', function (searchWord, items) {
          if (searchWord.trim() === '') return items;

          return items.filter(item => {
            return item.name.toLowerCase().includes(searchWord.toLowerCase());
          }, searchWord);
     
           
        });
        return cf.runFilters();
      },


      filterSearch(val) {
    this.filters = this.$MultiFilters.updateFilters(this.filters, {search: val});
},

/**
* Handler when user  select some author at the "Author" select.
*/




 editItem (item) {
   this.edit_id = item.rank_Id,
   this.edit_name = item.name
        this.dialog = true
      },

      deleteItem (item) {
        this.edit_id = item.rank_Id
        this.dialog2 = true 
      },
      okDelete(){
        this.$store.dispatch('DELETE_RANK_DATA',this.edit_id)
        this.dialog2 = false
      },

      close () {
        this.dialog = false
      },

      save () {
        this.$store.dispatch('INSERT_DATA_RANK',{ id : this.edit_id , name : this.edit_name })
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
  text-transform: none !important;
   color:white;
   background-color:cornflowerblue;
   
}
#table{
  border:1px solid black;
 
}
.header{
  
  background-color:#0e4663;


}
#head{
  color:white;
  font-size:16px;
  text-align:left;
   background-color:#0e4663;
}
#form{
  text-align: center;
}


</style>




