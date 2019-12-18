<template>
  <v-container  justify-center>
      <v-form class="form" >
        <h1 style="text-align:left">Announcement Form</h1>
        <br>
        <v-divider style="color:gray"></v-divider>
        <br>
        <br>
        <v-layout column>
          <v-flex>
            <label>Title</label>
          </v-flex>
          <v-flex xs12 sm5 md5>
            <v-text-field
              v-model="title"
              placeholder="Title"
              style="width:300px"
              v-validate="'required'"
              name="Title"
            ></v-text-field>

            
            <span class="span1">{{ errors.first('Title') }}</span>
          </v-flex>
          <v-flex>
            <label>Date</label>
          </v-flex>
          <v-flex xs12 sm5 md5>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              full-width
              width="290px"

            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="yyyy-mm-dd"
                  prepend-icon="event"
                  color="blue"
                  :max="new Date().toISOString().substr(0, 10)"
                  style="width:300px"
                   v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable color="blue lighten-1">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex>
            <label>Description</label>
          </v-flex>
          <v-flex>
            <v-textarea style="width:400px;" v-model="description" v-validate="'required'" name="Description" placeholder="Text Here"></v-textarea>
                        <span class="span1">{{ errors.first('Description') }}</span>
          </v-flex>
        </v-layout>
        <br>
        <v-layout row>
          <v-btn small color="blue" round class="white--text" @click="submit">Submit</v-btn>
          <v-tab></v-tab>
          <v-tab></v-tab>
          <v-btn small color="blue" round class="white--text" router to="/announcement">Cancel</v-btn>
        </v-layout>
       
      </v-form>
  </v-container>
    <!-- </v-img>
    </section> -->
</template>
<script>
export default {
  data: () => ({
    title: "",
    description:"",
    announcement:[],
    date:"",
    modal: false
  }),

  
  methods:{
      submit() {
      this.$validator.validateAll().then(valid=>{
        if(valid){
          this.announcement.push({
            description:this.description,
            title:this.title,
            date:this.date,
           
        }),
        this.$store.dispatch('ANNOUNCEMENT_CREATIONS_ACTIONS',this.announcement)
        this.$validator.reset()
        }
      });
     
    
    },
        // for clear
    clear() {
      this.title="",
      this.description="",
       this.date="",
      this.$validator.reset();
    }
  }
};
</script>
<style scoped>
.card {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 14px;
  max-width: 690px;
  border-spacing: 12px;
  color: #555;
  background-color: #f5f5f5;
}
.form {
  padding: 35px;
}
.span1 {
  color: red;
  font-size: 10px;
}
body {
  max-width: 690px;
  margin-right: auto;
  margin-left: auto;
}
</style>
