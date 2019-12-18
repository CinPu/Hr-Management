<template> 
<v-container>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2 align-center justify-center>
            <v-container>
              <h1 style="margin-bottom:20px; margin-top:20px; margin-right:5%; color:rgb(9, 55, 73);">Rate</h1>
        <!-- <hr style="margin-bottom:50px;margin-top:20px; margin-right:5%;"> -->
        <v-divider style="margin-bottom:20px;margin-top:20px; margin-right:5%;"></v-divider>
              <v-form ref="form" v-model="valid">
                  <v-container>
                  <v-layout row warp>
                         <v-flex
                        xs8
                        sm6
                        md3
                        class="align">
                       Rate Name
                        </v-flex>
                         <v-flex
                        xs8
                        sm6
                        md4>
                        <v-text-field
                        placeholder="Name"
                        v-model="rate_name"
                        :rules="nameRules"
                        >
                        </v-text-field>
                        </v-flex>
                  </v-layout>

                   <v-layout row warp>
                      <v-flex
                        xs8
                        sm6
                        md3
                        class="align">
                      Rate
                        </v-flex>

                         <v-flex
                        xs8
                        sm6
                        md4>
                        <v-text-field
                        v-model="rate"
                        :rules="rateRules"
                        placeholder="Rate"
                        >
                        </v-text-field>
                        </v-flex>
                  </v-layout>

                   <v-layout row warp>
                      <v-flex
                        xs8
                        sm6
                        md3
                        class="align">
                      Rate Type
                        </v-flex>

                         <v-flex
                        xs8
                        sm6
                        md4>
                        <v-combobox
                        v-model="type"
                        :items="typeList"
                        :rules="typeRules"
                        placeholder="Rate Type"
                        >
                        </v-combobox>
                        </v-flex>
                  </v-layout>
                   <v-layout row warp>
                      <v-flex
                        xs8
                        sm6
                        md3
                        class="align">
                      Description
                        </v-flex>

                         <v-flex
                        xs8
                        sm6
                        md4>
                        <v-text-field
                        v-model="description"
                        :rules="dRules"
                        placeholder="description.."
                        >
                        </v-text-field>
                        </v-flex>
                  </v-layout>
                  <br/>
                 
                <v-layout row xs12>
                  <v-tab></v-tab>
                  <!-- <v-flex xs8 sm4 md3> -->
                    <v-btn @click="InsertIntoRateData" color="primary" round>
                    Submit
                    </v-btn>
                  <!-- </v-flex> -->
                  <!-- <v-flex xs8 sm4 md3> -->
                     
                    <v-btn  round color="primary" router to="/rate">
                    Cancel
                    </v-btn>
                      
                  <!-- </v-flex> -->
                </v-layout>
                  </v-container>
              </v-form>
            </v-container>
          
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data (){
        return{
     
      rate_name:'',
      valid:false,

      typeList:['Leave','Allowance','Late','Fine','Absent','Bonus','Salary'],
      nameRules:[ v => !!v || ' Name is required'],
      id:'',
      idRules:[v => !!v || 'Id is required'],
      rateRules:[v => !!v || 'Rate is required'],
      typeRules:[v => !!v || 'Type is required'],
      dRules:[v => !!v || 'Description is required'],
        }
      
        },
    methods: {
       InsertIntoRateData(){
         this.$store.dispatch('INSERT_DATA_OF_RATE',{
           name:this.rate_name,
           rate:this.rate,
           type:this.type,
           description: this.description
         })
         this.$refs.form.reset()
       },
     validate(){
       if(this.$refs.form.validate()){
         this.snackbar=true;
       }
     }
    }
  }
</script>



<style>

  
  

.align{
    margin-top:20px;
}
.prize{
  margin-top:22px;
}


.class{
  background-color:#f5f5f5;
}
#btn_design{
    text-transform: none !important;
    background-color:blue;
    color:white;
    margin-top:20px;
}
</style>
