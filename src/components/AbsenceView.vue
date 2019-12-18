<template>

 <section
    id="welcome"
    class="hide-overflow"
  >
 <!-- <v-container fluid grid-list-md> -->

 <v-layout
          justify-center
          text-xs-center
  >

  <v-flex 
      xs12  sm12 md9
  ><br>

 

      <v-layout row wrap >
       <h1 class="headline">Absence</h1>
    <v-spacer></v-spacer><br>
<v-btn round color="primary" router to="/absence" dark class="mb-4">
            <v-icon>add</v-icon>
            Add Absence</v-btn>
      </v-layout>
      <v-divider></v-divider>

     <v-layout row wrap >
       

        <v-flex xs12 sm4 md3>
             <v-combobox 
                      v-model="branch_name" 
                      placeholder="Branch"
                      :rules="branchnameRules"
                      :items="branchname"
                      item-text="branch_name"
                      >
                  </v-combobox>
          </v-flex>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <v-flex xs12 sm4 md3>
           <v-combobox 
                      v-model="department_name" 
                      placeholder="Department"
                      :rules="departmentnameRules"
                      :items="departmentname"
                      item-text="dept_name"
                      >
                  </v-combobox>
          </v-flex>
     <v-container> 
<v-dialog v-model="dialog" max-width="400px">
 <v-card class="size">
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
       <v-divider></v-divider>
         
          <v-card-text>
     
                <v-layout wrap>
                   <v-flex xs12 sm3 md6 class="pt-4">
            <label class="dialog">Employee Number</label>                 
          </v-flex>
                <v-flex xs12 sm3 md6>
                 <v-text-field 
                    v-model="editedItem.employeeno" 
                    placeholder="employee number"
                    :rules="employeenumberRules"
                    >
                    </v-text-field>
                </v-flex>
              </v-layout>

               <v-layout wrap>
                   <v-flex xs12 sm3 md6 class="pt-4">
            <label class="dialog">Employee Name</label>                 
          </v-flex>
                <v-flex xs12 sm3 md6>
                 <v-text-field 
                    v-model="editedItem.employeename" 
                    placeholder="employee name"
                    :rules="employeenameRules"
                    >
                    </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout wrap>
                   <v-flex xs12 sm3 md6 class="pt-4">
            <label class="dialog">Date</label>                 
          </v-flex>

               <v-flex xs12 sm3 md6>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="editedItem.date"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="editedItem.date"
            label=""
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
    
    </v-flex>
              </v-layout>
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
              

               <v-layout wrap>
                   <v-flex xs12 sm3 md6 class="pt-4">
            <label class="dialog">Absence Type</label>                 
          </v-flex>
                <v-flex xs12 sm3 md6>
                 <v-combobox 
                    v-model="editedItem.absencetype" 
                    placeholder="absence type"
                    :rules="absencetypeRules"
                    :items="absencetype"
                    >
                 </v-combobox>
                </v-flex>
              </v-layout>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      
      </v-dialog>
     </v-container>
      
       
    </v-layout><br>
    <v-divider></v-divider>
   
    <v-data-table
      :headers="headers"
       :items="desserts"
      class="elevation-1"
    >

    
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.employeeno }}</td>
        <td class="text-xs-left">{{ props.item.employeename}}</td>
        <td class="text-xs-left">{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.absencetype }}</td>

        <td class="justify-center layout px-0">
           <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          

          <v-icon
          color="red"
            small
            @click="dialog2 = true"
            v-on="on"
           >
            delete
          </v-icon>
        </td>
       </template>
      </v-data-table>

       <v-dialog v-model="dialog2" max-width="300px">

           <v-card>
             <v-card-text>
         Are you sure you want to delete this absence? 
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog2 = false"
            v-on="on"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="deleteItem"
            v-on="on"
          >
            OK
          </v-btn>
        </v-card-actions>
           </v-card>
        </v-dialog>

     
    </v-flex>
   </v-layout>
  <!-- </v-container> -->
 </section>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      dialog2: false,
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      menu2: false,
       branchname: [
       'Alabama',
       'Alaska',
       'California'
    ],
     departmentname: [
          'department1',
          'department2',
          'department3'
        ],
         absencetype: [
          'unknown1',
          'unknown2',
          'unknown3'
        ],
        idRules: [
         (v) => !!v || 'No is required',

       ],
       employeenumberRules: [
         (v) => !!v || 'employee number is required',

       ],
       employeenameRules: [
         (v) => !!v || 'employee name is required',

       ],
       dateRules: [
         (v) => !!v || 'date is required',

       ],
      absencetypeRules: [
         (v) => !!v || 'absence type is required',

       ],
      
      headers: [
      { text: 'No', align: 'left', value: 'id' },
      { text: 'Employee Number', align: 'left', value: 'employeeno' },
      { text: 'Employee Name', align: 'left', value: 'employeename' },
      { text: 'Date', align: 'left', value: 'date' },
      { text: 'Absence Type', align: 'left', value: 'absencetype' },        
      { text: 'Action', align: 'center', value: 'id',sortable: false }, 
      ],
       desserts: [],
      editedIndex: -1,
      editedItem: {
       id: '',
       employeeno: '',
       employeename: '',
       date:'',
       absencetype: ''
       },
      defaultItem: {
       id: '',
       employeeno: '',
       employeename: '',
       date:'',
       absencetype: ''
      },
     }),
    
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Absence' : 'Edit Absence'
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
      this.initialize()
      this.$store.dispatch('CREATE_INITILIZE_BRANCH')
    },

     methods: {
     initialize () {
        this.desserts = [
           {
             id: 1,
             employeeno: 1,
             employeename:'Nay',
             date: '2015-02-12',
            absencetype: 'unknown',
          },
        {
          id: 2,
          employeeno: 2,
          employeename:'Nay',
          date: '2015-03-10',
          absencetype: 'unknown',
         
        },
        { 
          id: 3,
          employeeno: 3,
          employeename:'Nay',
          date: '2017-02-09',
          absencetype: 'unknown',
         
        },
        {
          id: 4,
          employeeno: 4,
          employeename:'Nay',
          date: '2018-06-11',
          absencetype: 'unknown',
         
          },
           { 
             id: 5,
             employeeno: 5,
             employeename:'Nay',
             date: '2019-07-04',
             absencetype: 'unknown',
          
          },
        ]
      },
     
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        this.dialog2 = false
         this.desserts.splice(index, 1) 
       
        //confirm('Are you sure you want to delete this announcement?') && this.desserts.splice(index, 1)
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
 .size{
  padding:10px;
}
.dialog{
  font-size: 15px;
 padding-left: 8px;
}

</style>




