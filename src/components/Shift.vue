<!-- Mi Mi Kyaw Zin & Chan Myae Myat Noe -->
<template>
  <v-container justify-center>
    <v-layout row wrap>
      <v-form ref="form" class="pt-4" style="width:100%;padding-left:3%;font-style:Lucida Grande;font-size:14px">
        <h1>Shift</h1><br><br>
        <v-divider></v-divider><br>
        <!-- Shift layout -->
        <v-layout row wrap>
          <v-flex xs12 sm3 md2 class="pt-4"><label>Shift name</label></v-flex>
          <v-flex xs12 sm4 md4 class="pt-3">
            <v-text-field v-model="shift_names" v-validate="'required|alpha_spaces'"
              placeholder="Shift name"  :error-messages="errors.collect('shiftname')" data-vv-name="shiftname" required>
            </v-text-field>
          </v-flex>
        </v-layout>
        <!-- Start Time picker layout -->
        <v-layout row wrap style="padding-top:5px">
          <v-flex xs12 sm3 md2 class="label">
            <label>Start Time</label>                 
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-menu ref="StartTimeMenu" v-model="StartTimeMenuModel" :close-on-content-click="false" :nudge-right="40"
            :return-value.sync="StartTime" lazy transition="scale-transition" offset-y full-width max-width="290px"
            min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="start_time" label="Assign start time" prepend-icon="access_time"  v-on="on"></v-text-field>
              </template>
              <v-time-picker v-if="StartTimeMenuModel" v-model="start_time" full-width @click:minute="$refs.StartTimeMenu.save(StartTime)"></v-time-picker>
            </v-menu>
          </v-flex>
        </v-layout>

        <!-- End Time picker layout -->
        <v-layout row wrap style="padding-top:5px">
          <v-flex xs12 sm3 md2 class="label">
            <label>End Time</label>                 
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-menu ref="EndTimeMenu" v-model="EndTimeMenuModel" :close-on-content-click="false" :nudge-right="40"
            :return-value.sync="EndTime" lazy transition="scale-transition" offset-y full-width max-width="290px"
            min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="EndTime" label="Assign end time" prepend-icon="access_time" v-on="on"></v-text-field>
              </template>
              <v-time-picker v-if="EndTimeMenuModel" v-model="EndTime" full-width @click:minute="$refs.EndTimeMenu.save(EndTime)"></v-time-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <br/>
        <!-- Buttons layout -->
        <v-layout>
          <v-flex xs12 sm6 md6 style="margin-left:70px;">
          <v-btn round class="primary"  @click="submit">Submit</v-btn> 
          <v-btn round class="primary" router to="/shiftview" @click="reset">Cancel</v-btn>    
          </v-flex>
        </v-layout>
      </v-form>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      shift_names: '',
      start_time: '',
      EndTime: '',
      StartTimeMenuModel:false,
      EndTimeMenuModel:false,
    }),
    methods: {
      submit () {
      //   this.$validator.validateAll().then(valid=>{
      //   if(valid){
          // alert(this.start_time)
          // alert(this.EndTime)
          // alert(this.shift_names)
          this.$store.dispatch('CREATE_SHIFT_ACTIONS',{
            name: this.shift_names,
            start_Time:this.StartTime,
            end_Time:this.EndTime
          })
        // }
        // }),
        this.$refs.form.reset()
      },
      reset () {
        this.$validator.reset()
        this.$refs.form.reset()
      }
    }
  }
</script>
<style scoped>
.label{
  padding-top: 15px;
}
</style>