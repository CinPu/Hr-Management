<template>
<v-container>
           <v-layout row warp>
            <v-flex
              xs8
              sm8
              md12
              class="leave"
              > 
           <h1 >Award-Punishment</h1>
            </v-flex>

            <v-flex xs6 sm4 md2 class="btn">
           
              <v-btn to="/award" round id="leavebtn" ><span><v-icon small>add</v-icon></span>&nbsp;Add New Award</v-btn>
          
            </v-flex>
        


           </v-layout>
           
<br>
      <v-divider></v-divider>
           
         <!-- </v-toolbar> -->

      <v-container>
         
        
       <v-form v-model="form" ref="form" >

        
       <v-container>
    <v-layout row wrap>
       <v-flex
        xs7
        sm5
        md4
        class="branch"
        >
        <v-text-field
        v-model="search"
        label="Employee Name"
        single-line
        hide-details
      ></v-text-field>
        </v-flex>
         <v-flex
        xs7
        sm5
        md4
        class="branch"
        >
        <v-combobox
        v-model="branch_name"
        :rules="branchRules"
        :items="branch_list"
        label="Branch"
        item-text="branch_name"
        @change="filterBranch"
        ></v-combobox>
        </v-flex>
         <v-flex
        xs7
        sm5
        md4
        class="dep"
        >
        <v-combobox
        :rules="depRules"
        :items="department_list"
        v-model="dept_name"
        item-text="dept_name"
        label="Department"
        
        @change="filterDepartment"

        ></v-combobox>
        </v-flex>

       
         
    </v-layout>
    </v-container>
       </v-form>
       
     <v-data-table :headers="deptheader" :items="award_data" style="border:1px solid gray">
       <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
                <template v-slot:items="props">
                  <td>{{ props.item.no }}</td>
                  <td>{{ props.item.employee_Name }}</td>
                  <td>
                    {{ props.item.role_name }}
                  </td>
                  <td>
                    {{ props.item.prize }}
                  </td>
                  <td>
                    {{ props.item.date }}
                  </td>
                  <td>
                    {{ props.item.description }}
                  </td>
                  <td>
                    {{ props.item.remark }}
                  </td>
                  <td >
                    <v-icon class="icon_size" color="blue" @click="editItem(props.item)" small>edit</v-icon>
                    <v-icon class="icon_size" color="red" @click="deleteItem(props.item)" small>delete</v-icon>
                  </td>
                </template>
              </v-data-table>
<!-- for update  dialog box  -->
 <v-dialog v-model="dialog1" max-width="550px" persistent="on">
        <v-card class="card" justify-center>
            <v-container >
            <v-form class="form">
                <h1 style="text-align:left">Editing </h1>
            <br />
            <v-divider style="color:gray"></v-divider>

           <br />
           <br />
                      <v-layout row wrap>
                      <v-flex xs12 sm5 md3 offset-sm1 style="margin-top:5px;">
                        <v-subheader>Prize :</v-subheader>
                      </v-flex>
                      <v-flex xs12 sm5 md5>
                        <v-radio-group v-model="edit_prize" :mandatory="false" style="margin-top:10px;" row>
                         <v-radio small label="Award" value="award"></v-radio>
                        <v-radio  small label="Punish" value="punish"></v-radio>
                        </v-radio-group>
                        </v-flex>
                        </v-layout>
                         <v-layout row wrap>
                      <v-flex xs12 sm5 md3  offset-sm1 style="margin-top:10px;">
                        <v-subheader>Date :</v-subheader>
                      </v-flex>
                      <v-flex xs12 sm5 md4 >
                        <!-- for date format -->
                         <div style="width:210px">
                    <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="date1"
                        lazy
                        transition="scale-transition"
                        offset-y
                        
                    >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="date1"
                           
                            placeholder="Select the date"
                            readonly
                            v-on="on"     
                        ></v-text-field>
                        </template>
                        <v-date-picker v-model="date1" color="blue" header-color="blue" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="SaveEdit">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                    </div>
                        </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                      <v-flex xs12 sm5 md3  offset-sm1  style="margin-top:10px;">
                        <v-subheader>Remark :</v-subheader>
                      </v-flex>
                      <v-flex xs12 sm5 md5>
                        <v-text-field
                         v-model="edit_remark"
                          label="remark"
                          single-line
                          hide-details
                        ></v-text-field>
                        </v-flex>
                        </v-layout>
                        <br />
                        <v-layout row wrap>
                      <v-flex xs12 sm5 md3  offset-sm1 >
                        <v-subheader>Description :</v-subheader>
                      </v-flex>
                      <v-flex xs12 sm5 md5 style="margin-top:5px;">
                        <v-textarea
                        outline
                        style="width:100%;"
                        v-model="edit_description"
                        ></v-textarea>
                        </v-flex>
                        </v-layout>
                        <v-layout>
                         <v-flex xs12 sm3 offset-sm3>
                        <v-btn small color="blue" round class="white--text" @click="Save" >Save</v-btn>
                         </v-flex>
                         <v-flex xs12 sm4 >
                        <v-btn small color="blue" round class="white--text" @click="close">Cancel</v-btn>
                         </v-flex>
                        </v-layout>
                  </v-form>
            </v-container>
      

        </v-card>    
 </v-dialog>
 <!-- for close dialog -->
 <v-dialog v-model="dialog2" max-width="400px" persistent="on">
     <v-card>
       <v-card-title>
        <h2 style="text-align:left">Are You Sure to Delete it?</h2>
       </v-card-title>
            <v-divider style="color:gray"></v-divider>
        <v-layout class="text-xs-right">
          <v-spacer></v-spacer>
          <v-card-actions>
                <v-btn  flat class="green--text darken-1" @click="OK">Ok</v-btn>
               <v-btn flat class="green--text darken-1" @click="dialog2close">Cancel</v-btn>
          </v-card-actions>
          </v-layout>
     </v-card>
 </v-dialog>
      </v-container>
      </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
       date1: new Date().toISOString().substr(0, 10),
                menu1: false,
                valid: false,
                award_punishment_Id:'',
                employee_id:'',
       selected: [],
       branch_name:'',
        search: '',
      authors: ['Admin', 'Editor'],
      depItems:['1','2','3'],
      branchItems:['A','B','C'],
      dialog: false,
       e1: 0,

      dialog1: "",
      dialog2: false,

      exitingdept: 0,
      count: 0,
      editedIndex: -1,

      editedItem: {
        prize: "",
        remark: "",
        description: "",
      },
      headers: [
        { text: "Employee Name", value: "empname" },
        { text: "Employee ID", value: "id" },
        { text: "Action", value: "action", sortable: false }
      ],
      award_date:'',
      deptheader: [
        { text: "No", value: "no" },
        { text: "Employee Name", value: "ename" },
        { text:'Job Roles', value:'role'},
         { text: "Prize", value: "prize" },
        { text: "Date", value: " " },
         { text: "Description", value: "description" },
          { text: "Remark", value: "remark" },
        { text: "Action", value: "action", sortable: false }
      ],
      employee: [
        { name: "Ma Hla Hla", empid: "emp1" },
        { name: "Ma Hla Hla", empid: "emp1" },
        { name: "Ma Hla Hla", empid: "emp1" },
        { name: "Ma Hla Hla", empid: "emp1" },
        { name: "Ma Hla Hla", empid: "emp1" },
        { name: "Ma Hla Hla", empid: "emp1" },
        { name: "Ma H", empid: "emp2" },
        { name: "Ma Hla Hla", empid: "emp3" }
      ]
     
     
    }),
  computed:{
    ...mapGetters([
      'branch_list','department_list','award_data'
    ]),
    award_data(){
      return this.$store.getters.award_data.filter(element=>{
        return element.employee_Name.includes(this.search)
      })
    }
  },
  created(){
    this.$store.dispatch('SELECT_BRANCH_DATA_INITIALIZE')
    this.$store.dispatch('INITIALIZATION_FOR_BRANCH_AND_FOR_AWARD_DATA')
  },
 methods: {
    //  To delete one row in the table
   filterBranch(){
     this.dept_name=''
    //  this.$store.dispatch('SELECT_BRANCH_FOR_DEPARTMENT',this.branch_name.branch_id)
        this.$store.dispatch('SELECT_BRANCH_FOR_DEPARTMENT',this.branch_name.branch_id)
   },
   filterDepartment(){
     this.$store.dispatch('SELECT_EMPLOYEE_DATA_AWARD_DATA',this.dept_name.dept_id)
   },
     Save(){
      //  alert(this.employee_id)
       this.$store.dispatch('EDIT_AWARD_DATA',{
         award_punishment_Id : this.award_punishment_Id,
         employee_id : this.employee_id,
         prize : this.edit_prize,
         date : this.date1,
         description : this.edit_description,
         remark : this.edit_remark
       })
       
       this.dialog1 = false
     },
    
    deleteItem(item) {
      this.employee_id = item.employee_id
      this.award_punishment_Id = item.award_punishment_Id
      this.award_date = item.date
      this.dialog2=true
     },

     OK(){
       this.$store.dispatch('DELETE_AWARD_DATA',{
         employee_id : this.employee_id,
         award_punishment_Id : this.award_punishment_Id,
         date : this.award_date
       })
        this.dialog2=false
       },
   
    // deleteItem1(item) {
    //   const index = this.addemp.indexOf(item);
   
    //     this.addemp.splice(index, 1);
    //     this.dialog3=false;
    // },
    
    // To close dialog box
    
    dialog2close() {
      this.dialog2 = false;
    },

    close() {
      this.dialog1 = false
    },
    editItem(item) {
      // alert(item.employee_id)
      this.employee_id = item.employee_id
      this.award_punishment_Id = item.award_punishment_Id
      this.edit_prize = item.prize
      this.edit_remark = item.remark
      this.edit_description = item.description
      this.dialog1 = true;
    },

    add(item) {
      this.addemp.push(item);
      const index = this.employee.indexOf(item);

      this.employee.splice(index, 1);
    },
   
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

