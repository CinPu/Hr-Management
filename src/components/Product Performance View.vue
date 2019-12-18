<template>
<v-flex>
  <br/>
    <v-layout row warp>
            <v-flex
              xs8
              sm8
              md12
              class="leave"
              > 
           <h1 >Product-Performance</h1>
            </v-flex>

            
        


           </v-layout>
           
<br>
      <v-divider></v-divider>
           
         <!-- </v-toolbar> -->

      <v-container>
         
        
       <v-form v-model="form" ref="form" >

        
       <v-container>
    <v-layout row wrap>
      <v-flex>
      </v-flex>
      <v-flex
        xs7
        sm3
        md2
        class="emp"
        >          
          <v-text-field
          label="Name"
          v-model="emp"
         @input="filterSearch"
         append-icon="search"
            ></v-text-field>
        </v-flex>

      <!-- <v-btn -->
        <!-- v-model="search" -->
        <!-- @click="search" -->
        <!-- value="search" -->
       <!-- >Search</v-btn> -->
         
     
    </v-layout>
    </v-container>
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
                 <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.name" label="Emp-Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.date" label="Date"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.unit" label="Unit"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                </v-flex>
               <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.finished" label="Finished"></v-text-field>
                </v-flex>
                 <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.amt" label="Amount"></v-text-field>
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
                    :headers="headers"
                    :items="product_performance_data"
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
                    <tr>
                        <td class="text-xs-left">{{ props.item.employee_name }}</td>
                        <td class="text-xs-left">{{ props.item.date }}</td>
                        <td class="text-xs-left">{{ props.item.unit}}</td>
                        <td class="text-xs-left">{{ props.item.price }}</td>
                        <td class="text-xs-left">{{ props.item.finish }}</td>
                       <td class="text-xs-left">{{ props.item.amount }}</td>
                       
                       
                        
                        
       
                        
                    </tr>
                </template>
                

            </v-data-table>
            

        </v-flex>

      </v-container>
      </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
         date1: new Date().toISOString().substr(0, 10),
                menu1: false,
       dialog: false,
      filters: {
        search: '',
        unit: '',
        date:'',
        
       
       },

      authors: ['Admin', 'Editor'],
      
      
      headers: [
        {
          text: 'Name',
          align: '',
          value: 'name',
          sortable: false
        },
        {
          text:'Date',
          value: 'date',
          align: 'left',
          sortable: false
        },
        { text: 'Unit', value: 'unit' },
        { text: 'Price', value: 'price' },
        { text: 'Finished-good', value: 'finished' },
        { text: 'Amount', value: 'amt' },
         
      ],

       editedIndex: -1,
      editedItem: {
        name: '',
        date: 0,
        unit: 0,
        price:0,
        finished: 0,
        amt:0
      
      },
      defaultItem: {
       name: '',
        date: 0,
        unit: 0,
        price:0,
        finished: 0,
        amt:0
      }
    }),

    computed: {
      formTitle () {//for dialog box title name
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      ...mapGetters([
        'product_performance_data'
      ])
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
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
        /*cf.registerFilter('date', function (searchWord, items) {
          if (searchWord.trim() === '') return items;

          return items.filter(item => {
            return item.date.toLowerCase().includes(searchWord.toLowerCase());
          }, searchWord);


        });*/


        cf.registerFilter('date', function (start, items) {
          if (start.trim() === '') return items;

          return items.filter(item => {
            return item.date.toLowerCase() === start.toLowerCase();
          }, start);

        });


         cf.registerFilter('unit', function (end, items) {
          if (end.trim() === '') return items;

          return items.filter(item => {
            return item.unit.toLowerCase() === end.toLowerCase();
          }, end);

        });
        return cf.runFilters();
      },


      filterSearch(val) {
          this.filters = this.$MultiFilters.updateFilters(this.filters, {search: val});
      },
      filterdate(val) {
          this.filters = this.$MultiFilters.updateFilters(this.filters, {date: val});
      },




 editItem (item) {
        this.editedIndex = this.rows.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.rows.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.rows.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.rows[this.editedIndex], this.editedItem)
        } else {
          this.rows.push(this.editedItem)
        }
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
  margin-right:25px;
}


#leavebtn{
    text-transform: none !important;
   color:white;
   background-color:cornflowerblue;
   
}
#table{
  border:1px solid black;
}
#header{
  
  background-color:#0e4663;


}
#head{
  color:white;
  font-size:16px;
  text-align:left;
}
#form{
  text-align: center;
}
</style>

