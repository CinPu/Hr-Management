<template> 
<v-container class="page">
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2 align-center justify-center>
         <v-container>
             <h1 style="margin-bottom:20px; margin-top:20px; margin-right:5%; color:rgb(9, 55, 73);">Rank</h1>
        <!-- <hr style="margin-bottom:50px;margin-top:20px; margin-right:5%;"> -->
        <v-divider style="margin-bottom:20px;margin-top:20px; margin-right:5%;"></v-divider>
              <v-form class="form" ref="form" v-model="valid">
                  <v-container>
                  <v-layout row warp>
                      <!-- <v-flex
                        xs8
                        sm6
                        md3
                        class="align">
                      Id
                        </v-flex> -->

                         <!-- <v-flex
                        xs8
                        sm6
                        md4>
                        <v-text-field
                        v-model="id"
                        :rules="idRules"
                        >
                        </v-text-field>
                        </v-flex> -->
                  </v-layout>
                  <v-layout row warp>
                         <v-flex
                        xs8
                        sm6
                        md3
                        class="align">
                       Name
                        </v-flex>
                         <v-flex
                        xs8
                        sm6
                        md4>
                        <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        >
                        </v-text-field>
                        </v-flex>
                  </v-layout>
                 
                <v-layout row xs12>
                  <v-flex xs8 sm4 md3>
                    <v-btn @click="INSERTDATA"  id="btn_design" round flat>
                    Submit
                    </v-btn>
                  </v-flex>
                  <v-flex xs8 sm4 md3>
                     
                    <v-btn  round flat  id="btn_design" @click="$router.go(-1)">
                    Cancel
                    </v-btn>
                      
                  </v-flex>
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
     
      name:'',
      valid:false,
      nameRules:[ v => !!v || ' Name is required'],
      id:'',
      idRules:[v => !!v || 'Id is required'],
        }
      
        },
    methods: {
       
     reset(){
       this.$refs.form.reset()
       
     
     },
     INSERTDATA(){
       this.$store.dispatch('INSERT_RANK_DATA',this.name)
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

.form{
  background-color:#fff;
  font-size: 14px;
  color:#555;
  
  
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
