<template>
<v-layout justify-center>
    <div id="whole_page">
        <h1 style="margin-bottom:20px; margin-top:20px; margin-right:5%; color:rgb(9, 55, 73);">Award - Punishment</h1>
        <!-- <hr style="margin-bottom:50px;margin-top:20px; margin-right:5%;"> -->
        <v-divider style="margin-bottom:20px;margin-top:20px; margin-right:5%;"></v-divider>
        <v-form ref="form" v-model="valid">


            <!-- branch start -->
            <v-layout row wrap>
                <v-flex xs12 sm3 md3 lg3 xl3>
                    <p style="padding-top:15%">Branch Name</p>
                </v-flex>

                <v-flex xs9 sm4 md4 lg4 xl4>
                    <v-combobox
                    placeholder="Branch"
                        v-model="branch_name"
                        :rules="branchRules"
                        :items="branch_list"
                        item-text="branch_name"
                        @change="filterBranch"
            ></v-combobox>
                </v-flex>
            </v-layout>
            <!-- Department Name start -->
            <v-layout row wrap>
                <v-flex xs12 sm3 md3 lg3 xl3>
                    <p style="padding-top:15%">Department Name</p>
                </v-flex>

                <v-flex xs9 sm4 md4 lg4 xl4>
                    <v-combobox
                    v-model="dept_name"
                        :rules="deptRules"
                        :items="department_list"
                        placeholder="Department"
                        item-text="dept_name"
                        @change="filterDepartment"
                        
            ></v-combobox>
                </v-flex>
            </v-layout>
            <!-- Department Name end -->
            
            <!-- branch end -->

            <!-- Emp name start -->
           <v-layout row wrap>
                <v-flex xs12 sm3 md3 lg3 xl3>
                    <p style="padding-top:15%">Employee Name</p>
                </v-flex>

                <v-flex xs9 sm4 md4 lg4 xl4>
                    <v-combobox
                    v-model="employee_name"
                        :rules="empRules"
                        placeholder="Employee Name"
                        :items="employee_list"
                        item-text="employee_Name"
            ></v-combobox>
                </v-flex>
            </v-layout>
            <!-- Emp name end -->

            <br>
            <!-- prize start -->
            <v-layout row wrap>
                <v-flex xs12 sm3 md3 lg3 xl3>
                    <p>Prize</p>
                </v-flex>

                <v-flex xs12 sm3 md3 lg3 xl3>
                    <v-radio-group v-model="radios" :mandatory="false" style="margin-top:0px;">
                    <v-radio label="Award" value="award"></v-radio>
                    <v-radio label="Punish" value="punish"></v-radio>
                    </v-radio-group>
                </v-flex>
            </v-layout>
            <!-- prize end -->

            

            <!-- date start -->
            <v-layout row wrap>
                <v-flex xs12 sm3 md3 lg3 xl3 >
                    <p style="padding-top:20px">Date</p>
                </v-flex>

                <v-flex xs12 sm3 md3 lg3 xl3 >
                <div style="width:240px">
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
                            prepend-icon="event"
                            placeholder="Select the date"
                            readonly
                            v-on="on"     
                        ></v-text-field>
                        </template>
                        <v-date-picker v-model="date1" color="blue" header-color="blue" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu1.save(date1)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                    </div>
                </v-flex>
            </v-layout>
            <!-- date end -->

            <br><br>

            <!-- Title start -->
            <v-layout row wrap>
                <v-flex xs12 sm3 md3 lg3 xl3>
                    <p>Title(Description)</p>
                </v-flex>

                <v-flex xs12 sm8 md8 lg8 xl8>
                    <v-textarea v-model="title"     outline
                        style="width:80%;"
                    ></v-textarea>
                </v-flex>
            </v-layout>
            <!-- Title end -->

            <br><br>
            <!-- Remark start -->
            <v-layout row wrap>
                <v-flex xs12 sm3 md3 lg3 xl3>
                    <p style="padding-top:15%">Remark</p>
                </v-flex>

                <v-flex xs12 sm4 md4 lg4 xl4>
                    <v-text-field v-model="remark" placeholder="remark"></v-text-field>
                </v-flex>
            </v-layout>
            <!-- Remark end -->

            <br><br>

            <!-- button start -->
            <v-layout row wrap>
                <v-flex xs5 sm3 md3 lg3 xl3>
                    <v-btn round color="primary"  @click="submit">Submit
                    </v-btn>
                </v-flex>

                <v-flex xs5 sm3 md3 lg3 xl3>
                    <v-btn router to="/awardview" round color="primary">Cancel
                    </v-btn>
                </v-flex>
            </v-layout>
            <!-- button end -->
            <br><br>


        </v-form>
    </div>
</v-layout>  
</template>

<script> 
import { mapGetters } from 'vuex'
export default {
    data: () => ({
                date1: new Date().toISOString().substr(0, 10),
                menu1: false,
                valid: false,
                dept_name:'',
                radios:[],
                branch_name:'',
                remark:'',
                title:'',
                employee_name:''

    }),
    computed:{
        ...mapGetters([
            'department_list','branch_list','employee_data_detail','employee_list'
        ])
    },
    methods:{
       submit(){
           this.$validator.validateAll().then(valid=>{
            if(valid){
                this.$store.dispatch('AWARD_PUNISH',
                {
                    award_punishment:this.radios,
                    date:this.date1,
                    description:this.title,
                    remark:this.remark,
                    employee_id : this.employee_name.employee_id
                })
                this.$validator.reset()
            }
        })
       },
       filterBranch(){
           this.$store.dispatch('SELECT_BRANCH_NAME_FOR_DEPARTMENT',this.branch_name.branch_id)
       },
       filterDepartment(){
           this.$store.dispatch('SELECT_DEPARTMENT_FOR_EMPLOYEE',this.dept_name.dept_id)
       }
    },
    created(){
        this.$store.dispatch('AWARD_CREATE_INITIALIZE')
    },

    deptRules: [
        v => !!v || 'Department Name is required',
    ],

    branchRules: [
        v => !!v || 'Branch Name is required',
    ],

    

    empRules: [
        v => !!v || 'Employee Name is required',
    ],
}
</script>

<style scoped>
    
#whole_page{
    color:#555;
    margin-left: 5%;
    align-content: left;
    font-family: "Lucida Grande";
    font-size: 14px;
    width: 690px;
}

.styled-select {
   background: url(http://i62.tinypic.com/15xvbd5.png) no-repeat 97% 0;
   /* background:rgb(221, 221, 221); */
   height: 30px;
   overflow: hidden;
   width: 240px;
   border:solid 1px;
   padding-left:10px;
   border-radius: 5px;
}

.txt_style {

   height: 30px;
   overflow: hidden;
   width: 240px;
   border:solid 1px;
   padding-left:10px;
   border-radius: 5px;
}

#label{
    font-weight: bold;
}

#form{
    border:1px #555 solid;
    padding:20px;
}

</style>

