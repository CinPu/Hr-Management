<template> 
<!-- <v-container class="page"> -->
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2 align-center justify-center>
        
        
            <h1 style="margin-bottom:20px; margin-top:20px; margin-right:5%; color:rgb(9, 55, 73);">Product-Performance</h1>
        <!-- <hr style="margin-bottom:50px;margin-top:20px; margin-right:5%;"> -->
        <v-divider style="margin-bottom:20px;margin-top:20px; margin-right:5%;"></v-divider>
                 <!-- <h1>Product-Performance</h1> -->
        <!-- <v-divider id="divider"></v-divider> -->
              <!-- <v-form class="form" ref="form" v-model="valid"> -->
                  
                  <v-container>
                   <v-layout row wrap>
                      <v-flex
                        xs8
                        sm3
                        md3
                        class="align"
                        offset-sm1>
                    <b>  Employee-Name</b>
                        </v-flex>
                         <v-flex
                        xs8
                        sm6
                        md5>
                        <v-text-field
                        v-model="ename"
                        placeholder="Employee-Name"
                        :rules="enameRules"
                        >
                        </v-text-field>
                        </v-flex>
                   </v-layout>

                     <v-layout row wrap>
                         <v-flex
                        xs8
                        sm3
                        md3
                        class="align"
                        offset-sm1>
                     <b> Unit</b>
                        </v-flex>
                         <v-flex
                        xs8
                        sm6
                        md5>
                        <v-select
                        v-model="unit"
                        :rules="unitRules"
                        placeholder="Unit"
                        item-text="name"
                        item-key="price"
                        :items="Unit"
                        @change="filterUnit"
                        >
                        </v-select>
                        </v-flex>
                     </v-layout>


                        
                         <v-layout row wrap>

                         <v-flex
                        xs8
                        sm3
                        md3
                        class="align"
                        offset-sm1>
                    <b>  Price</b>
                        </v-flex>
                         <v-flex
                        xs8
                        sm6
                        md5>
                        <v-text-field
                        v-model="price"
                        placeholder="Price"
                        :rules="priceRules"
                        >
                        </v-text-field>
                        </v-flex>
                         </v-layout>
                          <v-layout row wrap>

                        <v-flex
                        xs8
                        sm3
                        md3
                        class="align"
                        offset-sm1>
                     <b> Finished Goods</b>
                        </v-flex>
                         <v-flex
                        xs8
                        sm6
                        md5>
                        <v-text-field
                        v-model="finished"
                        placeholder="Finished Goods"
                        :rules="finishedRules"
                        @input="changeInput"
                        >
                        </v-text-field>
                        </v-flex>
                          </v-layout>
                           <v-layout row wrap>
                        <v-flex
                        xs8
                        sm3
                        md3
                        class="align"
                        offset-sm1>
                     <b> Amount</b>
                        </v-flex>
                         <v-flex
                        xs8
                        sm6
                        md5>
                        <v-text-field
                        v-model="amt"
                        placeholder="Amount"
                        :rules="amtRules"
                        >
                        </v-text-field>
                        </v-flex>

                           </v-layout>

                
<!-- 
                <v-layout row wrap> -->
                  <v-flex xs8 sm4  offset-sm5 align-center justify-center >
                    <v-btn round @click="ADDPERFORMANCE" id="btn">
                        Submit
                    </v-btn>
                    <v-btn round router to="/employyeeattendance" id="btn">
                        Cancel
                    </v-btn>
                  </v-flex>
                <!-- </v-layout> -->
                  </v-container>   
              <!-- </v-form> -->

             <v-dialog v-model="dialog" max-width="500px">
       
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>


          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.ename" label="Emp-Name"></v-text-field>
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

        
      </v-flex>
    </v-layout>
  <!-- </v-container> -->
</template>

<script>
  export default {
    data() {
return{
      ename:'',
      valid:false,
     // enameRules:[ v => !!v || 'Employee Name is required'],
      unit:'',
      unitRules:[v => !!v || 'Unit is required'],
      price:'',
      //priceRules:[v => !!v || 'Price is required'],
      id:'',
      finished:'',
    finishedRules:[  v => !!v || 'Finish Goods is required'],
     // amt:'',
     // amtRules:[ v => !!v || 'Amount is required'],
     unit:'',
        headers: [
        {
          text: 'Employee Name',
          align: '',
          value: 'ename',
          sortable: false
        },
        {
          text:'Unit',
          value: 'unit',
          align: 'left',
          sortable: false
        },
        { text: 'Price', value: 'price' },
        { text: 'Finished Goods', value: 'finished' },

          
         { text: 'Amount', value: 'amt', sortable: false },
          { text: 'Actions', value: 'name', sortable: false }
         
      ],
      Unit:[
        { id :1 , name : 'Feet' , price : '3000' , remark : 'it is goood'},
        { id :2 , name : 'GM' , price : '2000' , remark : 'it is goood'},
        { id :3 , name : 'Mile' , price : '100' , remark : 'it is goood'},
        { id :4 , name : 'Meters' , price : '1000' , remark : 'it is goood'},
        { id :5 , name : 'Hi' , price : '5000' , remark : 'it is goood'},
      ],
      rows: [
        {
          ename: 'Marcelo Tosco',
          unit: 'Mile',
          price:'100',
          finished:'1',
          amt:'100'
        },
        {
         ename: 'MTosco',
          unit: 'KM',
          price:'3000',
          finished:'2',
          amt:'6000'

        },
        {
         ename: 'Brcelo Tosco',
          unit: 'GM',
          price:'2000',
          finished:'3',
          amt:'6000'
        },
        {
          ename: 'Marcelo Tosco',
          unit: 'Meters',
          price:'1000',
          finished:'4',
          amt:'4000'
        },
        {
         ename: 'Kay Tosco',
          unit: 'Miles',
          price:'100',
          finished:'5',
          amt:'500'
        }

      ],

       editedIndex: -1,
      editedItem: {
        name: '',
        quantity: 0,
        payment: 0,
        remark: 0,
      
      },
      defaultItem: {
        name: '',
         quantity: 0,
        payment: 0,
        remark: 0,
       
      }
      
        }
    },
    
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },
    created(){
      this.id = this.$route.params.id
      this.ename = this.$route.params.name
    },
   
   

    

   methods: {

    /*  customFilter(items, filters, filter, headers) {
        // Init the filter class.
        const cf = new this.$MultiFilters(items, filters, filter, headers);

        cf.registerFilter('search', function (searchWord, items) {
          if (searchWord.trim() === '') return items;

          return items.filter(item => {
            return item.name.toLowerCase().includes(searchWord.toLowerCase());
          }, searchWord);
     
           
        });

         cf.registerFilter('quantity', function (searchWord, items) {
          if (searchWord.trim() === '') return items;

          return items.filter(item => {
            return item.quantity.toLowerCase().includes(searchWord.toLowerCase());
          }, searchWord);
     
           
        });
       
        
         cf.registerFilter('payment', function (searchWord, items) {
          if (searchWord.trim() === '') return items;

          return items.filter(item => {
            return item.payment.toLowerCase().includes(searchWord.toLowerCase());
          }, searchWord);
     
           
        });
       

       
        


        // Its time to run all created filters.
        // Will be executed in the order thay were defined.
        return cf.runFilters();
      },


      filterSearch(val) {
    this.filters = this.$MultiFilters.updateFilters(this.filters, {search: val});
},*/

/**
* Handler when user  select some author at the "Author" select.
*/
/*filterquantity(val) {
    this.filters = this.$MultiFilters.updateFilters(this.filters, {quantity: val});
},


filterpayment(val) {
    this.filters = this.$MultiFilters.updateFilters(this.filters, {payment: val});
},*/
changeInput(val){
  if( val === 0 ){
    this.amt = this.price
  }else{
    this.amt = parseInt(val) * parseInt(this.price)
  }
},
filterUnit(val){
  this.Unit.forEach( element=>{
    if(element.name === val){
      this.price = element.price
    }
  })
},
ADDPERFORMANCE(){
  this.$store.dispatch('ADDPRODUCTPERFORMANCE',{
      employee_name : this.ename ,
      unit : this.Unit.name , 
      price : this.price ,
      finish : this.finished ,
      amount : this.amt
  })
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






#btn{
     color:white;
   background-color:cornflowerblue;
   margin-top:30px;
   margin-bottom:20px;
   
}
#h{
    text-align: left;
}


#divider{
    margin-bottom:30px;
    
}


</style>

    
      
         
      
    

   