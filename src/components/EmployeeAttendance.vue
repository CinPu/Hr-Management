<template>
        <v-container class="grid-list-md" style="width:100%;">
            <v-layout>
                <v-flex style="font-size:40px;">
                    Employee Attendance
                </v-flex>
                <!-- <v-flex md2>
                    <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="showDate"
                            readonly
                            v-on="on"

                        ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @input="changeDate"></v-date-picker>
                    </v-menu>
                </v-flex>-->
            </v-layout> 
            <v-divider></v-divider>
            <br/>
            <v-layout row wrap>
                <v-flex xs12 sm3 md2>
                    <v-combobox :items="month_list" label="Months" item-text="month_name" v-model="month" @change="Select_Month" placeholder="Select month"></v-combobox>
                </v-flex>
                 <v-flex xs12 sm3 md2>
                    <v-combobox :items="years_list" label="Years" item-text="years_name" v-model="years" @change="Select_Years" placeholder="Select years"></v-combobox>
                </v-flex>
                <v-flex xs12 sm3 md1>
                    <v-combobox :items="day_list" label="Day" item-text="years_name" v-model="day"  @change="Select_Day" placeholder="Select Day"></v-combobox>
                </v-flex>
                <v-flex xs12 sm3 md3>
                    <v-select  :items="branch_list"  v-model="branch_name"  label="Branch" @change="filterBranch" item-text="branch_name" ></v-select>
                </v-flex>
                <v-flex xs12 sm3 md3>
                    <v-select  :items="employee_data_attendance" item-text="department_name"  v-model="dep" label="Department"  @change="filterDepartment"></v-select>
                </v-flex>
            </v-layout>
            <br/>
                <v-layout row wrap>
                    <v-spacer></v-spacer>
                    <v-flex md4 sm4 xs4>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        placeholder="Employee Name"
                        @input="filterSearch"
                    ></v-text-field>
                    </v-flex>
                </v-layout>   
                <v-layout row wrap>
                    <v-data-table
                    :headers="headers"
                    style="border:1px solid gray"
                    :items="employee_data_attendance"
                    item-key="employee_Name"
                    :search="filters"
                    :custom-filter="customFilter"
            >
                <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca">
                   <td style="color:white" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.no }}</td>
                            <td class="text-xs-left">{{ props.item.employee_number }}</td>
                            <td class="text-xs-left">{{ props.item.employee_name }}</td>
                            <td class="text-xs-left">
                               <v-chip color="primary" outline class="white--text chipstyle" @click.prevent="attendance_start_time(props.item)">{{ props.item.start_time }}</v-chip>
                            </td>
                            <td class="text-xs-left">
                                <v-chip color="primary"  outline class="white--text chipstyle" @click.prevent="attendance_end_time(props.item)">{{ props.item.end_time }}</v-chip>
                            </td>
                            <td class="text-xs-left">
                                {{ props.item.location }}
                            </td>
                            <td class="text-xs-left">
                                <v-chip class="chipstyle white--text" :id="`${props.item.status}`" >{{ props.item.status }}</v-chip>
                            </td>
                            <td class="text-xs-left">
                                {{ props.item.remarks }}
                            </td>
                            <td class="text-xs-left">
                                <v-icon class="ml-3" color="green" @click="Performance(props.item)">assignment</v-icon>
                            </td>
                </template>
                </v-data-table>
                <v-dialog v-model="menuperformance" max-width="300px" >
                    <v-card style="border-radius:10px;">
                        <v-card-title style="font-size:20px;">
                            Performance
                        </v-card-title>
                        <v-divider></v-divider>
                       <v-card-actions>
                           <v-btn flat style="height:60px;width:100%;" color="primary darken-1" :to="{ name: 'ServicePerformance', params: { id: this.id , name : this.name } }">Service Performance</v-btn>
                       </v-card-actions>
                       <v-divider></v-divider>
                       <v-card-actions>
                           <v-btn flat style="height:60px;width:100%" color="primary darken-1" :to="{ name:'ProductPerformance' , params:{ id : this.id , name : this.name }}">Product Performance</v-btn>
                       </v-card-actions>
                    </v-card>
                    </v-dialog>
                <v-dialog
                    ref="dialog"
                    v-model="modal2"
                    :return-value.sync="time"
                    persistent
                    lazy
                    full-width
                    width="290px"
                >
                    <v-time-picker
                    v-if="modal2"
                    v-model="time"
                    full-width
                    >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="TimeDialog">OK</v-btn>
                    </v-time-picker>
                </v-dialog>
                </v-layout>
        </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
// import { parse } from 'path';
export default {
    data(){
        return{
            id :'',
            day:'',
            month:'',
            attendance_date:'',
            years:'',
            menuperformance: false,
            month_list:[
                { month_name : 'January' , value: '01' },
                { month_name : 'February' , value: '02' },
                { month_name : 'March' , value: '03' },
                { month_name : 'April' , value: '04' },
                { month_name : 'May' , value: '05' },
                { month_name : 'June' , value: '06' },
                { month_name : 'July' , value: '07' },
                { month_name : 'August' , value: '08' },
                { month_name : 'September' , value: '09' },
                { month_name : 'October' , value: '10' },
                { month_name : 'November' , value: '11' },
                { month_name : 'December' , value: '12' },
            ],
            years_list:[
                { years_name : '2019' ,  value:'2019'},
                { years_name : '2018' ,  value:'2018'},
                { years_name : '2017' ,  value:'2017'},
                { years_name : '2016' ,  value:'2016'},
                { years_name : '2015' ,  value:'2015'}
            ],
            employee_id:'',
            search:'',
            time_click:0,
            status : '',
            late_hour : '',
            branch_name:'',
            modal2: false,
            dep:'',
            date: new Date().toISOString().substr(0, 10),
            menu2 : false,
            time:null,
            duty_start_time:'',
            name :'',
            filters: {
                search: '',
                dept_name:'',
                branch_name:'',
                date:''
            },
            headers: [
                { text: 'No',value: 'no'},
                { text: 'Employee Number', value: 'empNo' },
                { text: 'Employee Name', value: 'name' },
                { text: 'Start Time', value: 'start_time' },
                { text: 'End Time', value: 'end_time' },
                { text: 'Location', value: 'location' },
                { text: 'Status', value: 'status'},
                { text:'Remarks',value:'remarks' },
                { text:'Performance' , value : 'workdone'}
            ],
        }
    },
    methods:{
        Select_Day(){
            this.$store.dispatch('SELECT_DAY_ACTIONS',{ day : this.day , month: this.month.value , years : this.years.value })
        },
        Select_Years(){
            this.$store.dispatch('SELECT_YEARS_ACTIONS',{ month: this.month.value , years : this.years.value })
        },
        Select_Month(){
             this.$store.dispatch('SELECT_YEARS_ACTIONS',{ month: this.month.value , years : this.years.value })
        },
        filterBranch(val){
            this.filters = this.$MultiFilters.updateFilters(this.filters, {branch_name: val});
        },
        Performance(item){
            this.menuperformance = true
            this.id = item.employee_number
            this.name = item.employee_name
        },
        TimeDialog(){
            var t = this.time
            let [dh,mm] = this.duty_start_time.split(':')
            let [dm,oo] = mm.split(" ")
            this.modal2 = false
                const [h,m] = this.time.split(':')
                if(h>=12){
                    t = this.time + " PM"
                }else{
                    t = this.time + " AM"
                }
            if(this.time_click === 1){
                if( dh === h ){
                    if( parseInt(m) <= parseInt(dm)+15){
                        this.status = "attend"
                    }else{
                        this.status = "late"
                        this.late_hour =  parseInt(m)-parseInt(dm) + " mins"
                    }
                }
                // alert(this.status)
                this.$store.dispatch('START_TIME_ACTIONS',
                {
                    t : t,
                    status : this.status,
                    remarks :  this.late_hour,
                    employee_id : this.employee_id,
                    date : this.attendance_date,
                })
            }else{
                this.$store.dispatch('END_TIME_ACTIONS',
                {
                    t : t,
                    status : "present",
                    employee_id : this.employee_id,
                    date : this.attendance_date
                })
            }
            
        },
         attendance_start_time(item){
             this.time_click = 1
             if( item.start_time_disable === true){
                this.modal2 = false
             }else{
                 this.attendance_date = item.date
                 this.duty_start_time = item.duty_start_time
                this.employee_id = item.employee_number
                this.modal2 = true
             }
        },
        attendance_end_time(item){
            this.time_click = 2
            // alert(item.end_time_disable)
            if( item.end_time_disable === true){
                this.modal2 = false
             }else{
                this.attendance_date = item.date
                this.employee_id = item.employee_number
                this.modal2 = true
             }
        },
        changeDate(val){
            this.menu2 = false
            this.filters = this.$MultiFilters.updateFilters(this.filters, {date: val});
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return ` ${day} / ${month} / ${year}`
        },
        customFilter(items, filters, filter, headers) {
        // Init the filter class.
        const cf = new this.$MultiFilters(items, filters, filter, headers);

        cf.registerFilter('search', function (searchWord, items) {
          if (searchWord.trim() === '') return items;

          return items.filter(item => {
            return item.employee_Name.toLowerCase().includes(searchWord.toLowerCase());
          }, searchWord);

        });

        cf.registerFilter('dept_name', function (dept_name, items) {
          if (dept_name.trim() === '') return items;

          return items.filter(item => {
            return item.dept_name.toLowerCase() === dept_name.toLowerCase();
          }, dept_name);

        });

        cf.registerFilter('date', function (attendance_date, items) {
          if (attendance_date.trim() === '') return items;

          return items.filter(item => {
            return item.attendance_date.toLowerCase() === attendance_date.toLowerCase();
          }, attendance_date);

        });

         cf.registerFilter('branch_name', function (branch_name, items) {
          if (branch_name.trim() === '') return items;

          return items.filter(item => {
            return item.branch_name.toLowerCase() === branch_name.toLowerCase();
          }, branch_name);

        });


        // Its time to run all created filters.
        // Will be executed in the order thay were defined.
        return cf.runFilters();
      },


      filterSearch(val) {
            this.filters = this.$MultiFilters.updateFilters(this.filters, {search: val});
        },
        filterDepartment() {
        //    this.$store.dispatch()
        }
    },
    computed:{
        ...mapGetters(
            ['department_list','employee_data_attendance','branch_list','day_list']
        ),
        showDate(){
            return '  Date :   ' + this.date
        }
    },
    created(){
        // this.$store.dispatch('CREATE_INITIALIZE_Employee')
        // this.$store.dispatch('CREATE_INITIALIZE_ATTENDANCE_EMPLOYEE')
    }
}
</script>

<style>
#data_table{
    width: 100%;
}
.chipstyle{
    font-size: 12px;
    height: 26px;
}
.v-chip#present{
    background-color: rgb(5, 143, 28);
}
.v-chip#attending{
    background-color: rgb(60, 248, 12);
}
.v-chip#late{
    background-color: orange;
}
.v-chip#complete{
    background-color: rgb(5, 28, 230);
}
.v-chip#absence{
    background-color: rgb(250, 3, 3);
}
.v-chip#leave{
    background-color: rgb(250, 26, 250);
}
</style>


