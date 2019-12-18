<template> 
  <v-flex xs12 md11 style="margin-left:20px;">
    <br/>
    <br/>
     <v-form >
        <v-flex xs12 md12>
             <v-layout row wrap>
                <v-flex >
                   <h1 style="text-align:left">Role</h1>
                  
                </v-flex>

                 <v-spacer/>
                <v-flex  style="padding-left:400px">
                   <div class="text-xs-right">
                   <v-dialog persistent="on" v-model="dialog" width="500">
                 <template v-slot:activator="{ on }">
                 
                    <v-btn color="blue" dark round class="white--text" v-on="on" >
                       
                    <v-icon>add</v-icon> &nbsp; Add New 
                      </v-btn>
                      
                      <br/>
                      
                 </template>
                  
                
               <v-card>
                 <v-container  justify-center  class="card" >
   
   
                <v-form class="form" >
                  <h1 style="text-align:left">Role</h1>
                  <br>
                  <v-divider style="color:gray"></v-divider>
               <br>
        <br>
        <v-layout column>
            <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-subheader>Name</v-subheader>
          </v-flex>
          <v-flex xs12 sm5 md5>
            <v-text-field
              v-model="name"
              placeholder="Name"
              style="width:300px"
              v-validate="'required'"
              name="Name"
            ></v-text-field>

            
            <span class="span1">{{ errors.first('Name') }}</span>
          </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-subheader>Priority</v-subheader>
          </v-flex>
          <v-flex xs12 sm5 md5>
           <v-text-field
              v-model="priority"
              placeholder="Priority"
              style="width:300px"
              v-validate="'required|numeric'"
              name="Priority"
            ></v-text-field>

            
            <span class="span1">{{ errors.first('Priority') }}</span>
          </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-subheader>Salary Range</v-subheader>
          </v-flex>
          <v-flex xs12 sm5 md5>
           <v-text-field
              v-model="salaryrange"
              placeholder="Salary Range"
              style="width:300px"
              v-validate="'required'"
              name="Salary Range"
            ></v-text-field>

            
            <span class="span1">{{ errors.first('Salary Range') }}</span>
          </v-flex>
          </v-layout>
          
        </v-layout>
        
        <br>
        <v-layout row style="padding-left:120px;">
           
          <v-btn small color="blue" round class="white--text" @click="submit">Submit</v-btn>
         
          <v-btn small color="blue" round class="white--text" @click="clear">Cancel</v-btn>
        </v-layout>
       
      </v-form>
   
  
  </v-container>
      </v-card>
    </v-dialog>
  </div>
</v-flex>
                 
</v-layout>
              
               
 </v-flex>
  <v-divider/>
  <v-layout row>
      <v-flex></v-flex>
   <v-spacer></v-spacer>
    <v-flex xs12 sm3 md3>
        
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Role Name"
        single-line
        hide-details
      ></v-text-field>
    
    </v-flex>
  </v-layout><br/>
  
                
               <v-flex> 
                 <v-data-table :headers="headers" style="border:1px solid gray;width:100%;" :items="role_data">
                   <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca;">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
                  <template v-slot:items="props">
                  <td>{{ props.item.no}}</td>
                  <td>
                    {{ props.item.name }}
                  </td>
                  <td >
                    {{ props.item.priority }}
                  </td>
                  <td>
                    {{ props.item.salary_range }}
                  </td>
                  <td>
                    <v-icon small class="icon_size" color="blue" @click="editItem(props.item)">edit</v-icon>
                    <v-icon small @click="deleteItem(props.item)" color="red"> delete </v-icon>
                  </td>
                </template>
              </v-data-table>
              </v-flex>
              <!-- for editing shift -->
              <v-dialog v-model="dialog1" max-width="550px" persistent="on">
                <v-card class="card">
                  <v-container>
                   <v-form class="form">
                    <h1 style="text-align:left">Editing Role</h1>
                    <br />
                    <v-divider style="color:gray"></v-divider>

                    <br />
                    <br />
                    <!-- Form design -->

                    <v-layout row wrap>
                      <v-flex xs12 sm4 md4>
                        <v-subheader> Name :</v-subheader>
                      </v-flex>
                      <v-flex xs12 sm5 md6>
                        <v-text-field
                          v-model="edit_name"
                          v-validate="'required'"
                          placeholder="Name"
                          name="Name"
                        ></v-text-field>

                        <span class="span1">{{ errors.first('Name') }}</span>
                      </v-flex>
                       <v-flex xs12 sm4 md4>
            <v-subheader>Priority</v-subheader>
          </v-flex>
          <v-flex xs12 sm5 md5>
           <v-text-field
              v-model="edit_priority"
              placeholder="Priority"
              style="width:300px"
              v-validate="'required'"
              name="Priority"
            ></v-text-field>

            
            <span class="span1">{{ errors.first('Priority') }}</span>
          </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-subheader>Salary Range</v-subheader>
          </v-flex>
          <v-flex xs12 sm4 md4>
           <v-text-field
              v-model="edit_salaryrange"
              placeholder="Salary Range"
              style="width:300px"
              v-validate="'required'"
              name="Salary Range"
            ></v-text-field>

            
            <span class="span1">{{ errors.first('Salary Range') }}</span>
          </v-flex>

                    </v-layout>
                    <br/>

                         <v-card-actions style="padding-left:150px">
                        
                         <v-btn color="blue" round class="white--text" @click="Submit"  >Submit</v-btn>
                         <v-btn color="blue" round class="white--text" @click="close" >Cancel</v-btn>
                       </v-card-actions>
                       <br/>
                   </v-form>
                  </v-container>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog2" max-width="400px" persistent="on" >
                     <v-card>
                          <h2 style="padding:20px;">Are You Sure to Delete item?</h2>
                            <v-divider style="color:gray"></v-divider><br/>
                               <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="success" flat @click="dialog2close">Cancel</v-btn>
                                  <v-btn color="success" flat @click="ok">Ok</v-btn>
                                   
                                   
                                </v-card-actions>
                                
                            
                </v-card>

             </v-dialog>
      </v-form>
</v-flex>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  data: () => ({
    search: '',
    dialog: false,
     dialog2: false,
    name: "",
    priority:"",
    edit_name: "",
    edit_priority:"",
    role:[],
    edit_salaryrange:"",
    salaryrange:"",
     e1: 0,
    dialog1: "",
     data: [],
      exitingdept: 0,
      editedIndex: -1,
       editedItem: {
        shiftname: "",
        starttime: "",
        endtime: "",
         priority:"",
         role:[],
        salaryrange:"",
      },
       headers: [
         { text: "No" , value : "no"},
        { text: " Name", value: "empname" },
        { text: "Priority", value: "id" },
        { text: "Salary Range", value: "id" },
        { text: "Action", value: "action", sortable: false }
      ],
      id : ''

  }),
  created(){
    this.$store.dispatch('ROLE_DATA')
  },
  computed:{
    ...mapGetters([
      'role_data'
    ]),
    role_data(){
      return this.$store.getters.role_data.filter(element=>{
        return element.name.includes(this.search)
      })
    }
  },
  
  methods:{
     submit() {
          this.$store.dispatch('INSERT_ROLE_DATA',{
            name : this.name ,
            priority : this.priority,
            salaryrange : this.salaryrange
          })
          this.name="",
          this.priority="",
          this.salaryrange="",
          this.dialog = false;
          this.$validator.reset();
    },
       
    deleteItem(item){
      this.id = item.role_Id
      this.dialog2=true
    },
    ok(item){
      this.$store.dispatch('DELETE_ROLE_DATA',this.id)
      this.dialog2=false
    },
    
    
      close() {
      this.dialog1 = false;
      
      
    },
    clear() {
      this.dialog = false;
    },
    dialog2close(){
       this.dialog2 = false;
    },
    
    editItem(item) {
      this.id = item.role_Id
      this.edit_name = item.name
      this.edit_priority = item.priority
      this.edit_salaryrange = item.salary_range
      this.dialog1 = true
    },

    add(item) {
      this.addemp.push(item);
      const index = this.employee.indexOf(item);

      this.employee.splice(index, 1);
    },
    Submit(){
      this.$store.dispatch('EDITING_ROLE_DATA',{
        role_Id : this.id,
        name : this.edit_name,
        priority : this.edit_priority,
        salary_range : this.edit_salaryrange
      })
      this.dialog1 = false
    }
  }
};
</script>
<style>
.form{
    width:100%;
}
</style>
