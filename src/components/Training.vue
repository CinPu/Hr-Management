<!-- Ei Thiri Zaw & Myat Myint Zuu & Hnin Wutt Ye Oo-->
<template>
  <v-container justify-center>
    <v-layout row wrap>
      <v-form ref="form" style="width:100%;padding-left:3%;font-style:Lucida Grande;font-size:14px">
        <h1>Training</h1><br>
        <v-divider></v-divider><br>
        <!-- Training layout -->
        <v-layout row wrap>
          <v-flex xs12 sm3 md2 style="margin-top:15px"><label>Training name</label></v-flex>
          <v-flex xs12 sm4 md3 class="pt-1">
            <v-text-field v-model="Trainingname" v-validate="'required|alpha_spaces'" placeholder="Training name" :error-messages="errors.collect('Training name')"
             data-vv-name="Training name" required>
            </v-text-field>
          </v-flex>
        </v-layout>
        <!-- Duration layout -->
        <v-layout row wrap>
          <v-flex xs12 sm3 md2 style="margin-top:15px"><label>Duration</label></v-flex>
          <v-flex xs12 sm4 md3 class="pt-1">
            <v-text-field v-model="Durationname" v-validate="'required|numeric'"
              placeholder="Duration" :error-messages="errors.collect('Duration name')"
               data-vv-name="Duration name" required>
            </v-text-field>
          </v-flex>
        </v-layout>
        <!-- Pre-requestive layout -->
        <v-layout row wrap>
          <v-flex xs12 sm3 md2 style="margin-top:15px"><label>Pre-requestive</label></v-flex>
          <v-flex xs12 sm4 md3 class="pt-1">
            <v-textarea v-model="prequestive" v-validate="'required|alpha_spaces'" placeholder="Pre-requestion" auto-grow color="deep-purple" rows="1">
            </v-textarea>
          </v-flex>
        </v-layout>
        <!-- Remark layout -->
        <v-layout row wrap>
          <v-flex xs12 sm3 md2 style="margin-top:15px"><label>Remark</label></v-flex>
          <v-flex xs12 sm4 md3 class="pt-1">
            <v-text-field v-model="Rname" v-validate="'required|alpha_spaces'"
              placeholder="Write remark" :error-messages="errors.collect('Remark name')" data-vv-name="Remark name" required>
            </v-text-field>
          </v-flex>
        </v-layout>
        <br/>
         <!--Button layout  -->
        <v-layout>
          <v-flex xs12 sm6 md6 style="margin-left:50px;">
          <v-btn  round class="primary" @click="Submit">Create</v-btn>
          <v-btn round class="primary" @click="reset">Cancel</v-btn>
          </v-flex>
        </v-layout><br>
        <!-- Horizontal line -->
        <!-- <v-divider style="border:2px solid gray"/> -->
      </v-form>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data:()=>({
    StartDateMenu:false,
    EndDateMenu:false,
    Trainingname:'',
    Durationname:'',
    prequestive:'',
    Rname:''
  }),
  methods:{
      Submit() {
        this.$store.dispatch('INSERT_TRAINING',{
          training: this.Trainingname,
          duration: this.Durationname,
          pre_requestive: this.prequestive,
          remark: this.Rname
        })
      },
      reset () {
        this.$validator.reset()
        this.$refs.form.reset()
      }
    }
}
</script>