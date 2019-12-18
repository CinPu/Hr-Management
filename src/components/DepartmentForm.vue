<template>
  <v-container  justify-center style=" max-width: 690px;">
    <!-- <v-card class="card"> -->
      <v-form class="form">
        <h1 style="text-align:left">New Department Creation</h1>
        <br />
        <v-divider style="color:gray"></v-divider>

        <br />
        <br />
        <!-- Form design -->

        <v-layout row wrap>
           <v-flex xs12 sm5 md5>
                  <v-subheader>Department Name  :</v-subheader>
                </v-flex>
          <v-flex xs12 sm5 md5  offset-md1>
            <v-text-field
              v-model="departmentname"
              v-validate="'required'"
              placeholder="Enter department name"
              name="Name"
              
            ></v-text-field>

            <span class="span1">{{ errors.first('Name') }}</span>
          </v-flex>
</v-layout>
           <v-layout row wrap>
           <v-flex xs12 sm5 md5>
                  <v-subheader>Priority:</v-subheader>
                </v-flex>
          <v-flex xs12 sm5 md5  offset-md1>
            <v-text-field
              v-model="priority"
              v-validate="'required'"
              placeholder="Enter priority"
              name="Priority"
              
            ></v-text-field>

            <span class="span1">{{ errors.first('Priority') }}</span>
          </v-flex>
        </v-layout>
        <br />
        <v-layout row wrap>
           <v-flex xs12 sm5 md5>
                  <v-subheader>Remark  :</v-subheader>
                </v-flex>
          <v-flex xs12 sm5 md5  offset-md1>
            <v-text-field
              v-model="remark"
              v-validate="'required'"
              placeholder="Enter remark"
              name="Remark"
              
            ></v-text-field>

            <span class="span1">{{ errors.first('Remark') }}</span>
          </v-flex>
</v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm5 md5>
                  <v-subheader>Phone Number:</v-subheader>
                </v-flex>
          <v-flex sm5 md5  offset-md1>
            <v-text-field
              v-model="phno"
              v-validate="'required|numeric|max:11'"
              placeholder="09*********"
              name="Ph no"
              
            ></v-text-field>

            <span class="span1">{{ errors.first('Ph no') }}</span>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
        <v-flex xs12 sm5 md5>
                  <v-subheader>Branch:</v-subheader>
                </v-flex>
          <v-flex xs12 sm5 md5  offset-md1>
            <v-combobox
              v-model="branch_name"
              v-validate="'required'"
              placeholder="Enter Branch"
              name="Branch Name"
              :items="branch_list"
              item-text="branch_name"
              item-value = "branch_id"
              item-key = "branch_id"
            ></v-combobox>

            <span class="span1">{{ errors.first('Branch Name') }}</span>
          </v-flex>
        </v-layout>
        <br />

       
        <v-layout row justify-center>
         
        
             <v-flex xs12 sm3>
            <v-btn small color="blue" round class="white--text" @click.prevent="create">Submit</v-btn>
          </v-flex>
           <v-dialog v-model="dialog4" persistent max-width="390">
           
            <v-card class="dlform">
              <h4>Do you want to create this department?</h4><br><br>
            
              <v-layout justify-end>
                <v-btn flat  class="blue--text" @click="ok">ok</v-btn>
              <v-btn flat @click="dialogCancel" class="blue--text">cancel</v-btn>
              </v-layout>
              
            </v-card>
             </v-dialog>

         
             <v-flex xs12 sm3>
            <v-btn small color="blue" round class="white--text" @click.prevent="Cancel">Cancel</v-btn>
          </v-flex>

        </v-layout>
       <br>
       <router-link to="/Department" style="text-decoration: none">  <v-icon large color="blue">reply</v-icon></router-link>
      </v-form>
    <!-- </v-card> -->
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    departmentname: "",
    priority: "",
    remark: "",
    phno: "",
    branch_name: "",
    dialog4:""
  }),
  created(){
    this.$store.dispatch('BRANCH_DATA')
  },
  computed:{
    ...mapGetters([
      'branch_list'
    ])
  },
  methods: {
 

   dialogCancel(){
     this.dialog4=false;
      this.departmentname = "";
            this.priority = "";
            this.remark = "";
            this.phno = "";
            this.branch = "";
            this.$validator.reset();
   },
   
    // To confirm
    // confirm() {
    //  
    //   this.$store.dispatch('department_create_actions',this.department_data)

    //   this.department_data = [];
    // },

    ok(){
      this.$store.dispatch('INSERT_DEPARTMENT_DATA',{
        dept_name : this.departmentname,
        priority : this.priority,
        remark : this.remark,
        phno:this.phno,
        branch_id: this.branch_name.branch_id,
      })
      this.$validator.reset();
          
    },

   

    // to create new department
    create() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
         this.dialog4=true;
        }
        
      });
    
    }
  }
};
</script>
<style scoped>
h1 {
  text-align: left;
}
.text1 {
  width: 200px;
}
.text2 {
  width: 60px;
}
.divider {
  color: black;
}
.dlform {
  padding: 30px;
}
.card {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 14px;
  max-width: 690px;
  border-spacing: 12px;
  background-color: #f5f5f5;
  
}
.form {
  padding: 35px;
}
.span1 {
  color: red;
  font-size: 10px;
}
/* body {
  max-width: 690px;
  margin-right: auto;
  margin-left: auto;
} */
</style>
