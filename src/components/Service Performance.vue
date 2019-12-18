<template>
 <section id="welcome" class="hide-overflow">
  <v-layout justify-center>
  <v-flex xs12 sm10 md6><br><br>
    <h1 class="headline" style="padding-left:20px">Service Performance</h1><br>
    <v-divider></v-divider><br><br>
    <v-form v-model="valid" ref="form"> 
      <v-layout row wrap class="card-body-padding">
        <p class="part1-padding1 pt-4">Work Done</p>
          <v-flex xs10 sm6 md6>
            <v-text-field v-model="work_done" placeholder="work done" :rules="workdoneRules">
            </v-text-field>
          </v-flex>
      </v-layout><br>
       
      <v-layout row wrap class="card-body-padding">
        <p class="part1-padding2 pt-5">Remark</p>
          <v-flex xs10 sm6 md6>
            <v-textarea v-model="remark" name="input-3-1" placeholder="remark" :rules="remarkRules" outline></v-textarea>
          </v-flex>
      </v-layout>

      <v-layout row justify-center>

        <!-- "new_add_dialog" is to show comfirm message for creating this service performance -->
        <v-dialog v-model="new_add_dialog" persistent max-width="290">
        <template v-slot:activator="{ on }">
          <v-btn  round color="primary" :disabled="!valid" v-on="on" @click="new_add_dialog = true">Submit</v-btn>
          <v-btn  round color="primary" router to="/employyeeattendance">Cancel</v-btn>
        </template>
        <v-card><br>
        <v-card-text style="font-size:17px;">Are you sure want to create this service performance???</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <!-- "Cancel" button is to close "new_add_dialog" -->
          <v-btn color="green darken-1" flat  @click="new_add_dialog = false">Cancel</v-btn>
          <!-- "OK" button is to create service performance -->
          <v-btn color="green darken-1" flat  @click="save">OK</v-btn>
        </v-card-actions>
        </v-card>
        </v-dialog>
      </v-layout>
</v-form>
       <br>
    <v-divider></v-divider>
  </v-flex>
  </v-layout>
 </section>
</template>

<script>
  export default {
    data: () => ({
       delete_dialog: false,
       edit_dialog: false,
       new_add_dialog: false,
       work_done : '',
       remark:'',
        
       workdoneRules: [
         (v) => !!v || 'work done is required',
       ],
        remarkRules: [
         (v) => !!v || 'remark is required',

       ],
       workdone_dialogRules: [
         (v) => !!v || 'work done is required',
       ],
        remark_dialgRules: [
         (v) => !!v || 'remark is required',

       ],
      
      headers: [
      { text: 'No', align: 'left', value: 'id' },
      { text: 'Work Done', align: 'left', value: 'work_done' },
      { text: 'Remark', align: 'left', value: 'remark' },
      { text: 'Action', align: 'center', value: 'id',sortable: false }, 
      ],
      desserts: [], 
      editedIndex: -1,
      new_add_Item: {
      id: '',
      work_done: '',
      remark: ''
       },
      edit_Item: {
      id: '',
      work_done: '',
      remark: ''
       },
     
      defaultItem: {
       id: '',
      work_done: '',
      remark: ''
      },
      employee_id :'',
      employee_name :'',
      
    }),
    watch: {
      edit_dialog (val) {
        val || this.close()
      },
      delete_dialog (val) {
        val || this.close()
      }
    },
    

     methods: {
     save () {
       this.$store.dispatch('ADD_SERVICE_PERFORMANCE',{ employee_name : this.employee_name ,work_done : this.work_done , remarks : this.remark })
       this.$refs.form.reset()
       this.new_add_dialog = false
       
     },
    },
    created(){
      this.employee_id = this.$route.params.id
      this.employee_name = this.$route.params.name
      // alert()
    }
  }
</script>

<style scoped>
 .size{
  padding:10px;
}

.card-body-padding{
  padding-left: 40px;

}
.part1-padding1 {
  padding-right: 15px;
  font-size: 16px;
  width:150px;
}
.part1-padding2 {
  padding-right: 15px;
  font-size: 16px;
  width:150px;
}

.dialog{
  font-size: 16px;
}
.btn{
  margin-left: 150px;
}

</style>




