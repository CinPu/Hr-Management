<template>
<v-container grid-list-md>
    <v-layout row wrap>
        <v-flex md3 sm4 xs12 >
            <v-card style="height:130px;border-radius:10px;">
                <v-container >
                    <v-layout row >
                        <v-flex>
                        <v-avatar size="70" style="background-color:#BBDEFB;margin-top:5px;">
                            <img src="../assets/projectimages.jpg">
                        </v-avatar>
                        </v-flex>
                        <v-list>
                            <v-list-tile><h2 style="font-size:30px;"><v-tab></v-tab>112</h2></v-list-tile>
                            <v-list-tile-tile><p style="font-size:17px;color:black"><v-tab></v-tab>Projects</p></v-list-tile-tile>
                        </v-list>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
        <v-flex md3 sm4 xs12 >
            <v-card style="height:130px;border-radius:10px;">
                <v-container >
                    <v-layout row >
                        <v-flex>
                        <v-avatar size="70" style="background-color:#BBDEFB;margin-top:5px;">
                            <img src="../assets/client.jpg">
                        </v-avatar>
                        </v-flex>
                        <v-list>
                            <v-list-tile><h2 style="font-size:30px;"><v-tab></v-tab>44</h2></v-list-tile>
                            <v-list-tile-tile><p style="font-size:17px;color:black"><v-tab></v-tab>Clients</p></v-list-tile-tile>
                        </v-list>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
        <v-flex md3 sm4 xs12 >
            <v-card style="height:130px;border-radius:10px;">
                <v-container >
                    <v-layout row >
                        <v-flex>
                        <v-avatar size="70" style="background-color:#BBDEFB;margin-top:5px;">
                            <img src="../assets/employee.png">
                        </v-avatar>
                        </v-flex>
                        <v-list>
                            <v-list-tile><h2 style="font-size:30px;"><v-tab></v-tab>240</h2></v-list-tile>
                            <v-list-tile-tile><p style="font-size:17px;color:black"><v-tab></v-tab>Employees</p></v-list-tile-tile>
                        </v-list>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
        <v-flex md3 sm4 xs12 >
            <v-card style="height:130px;border-radius:10px;">
                <v-container >
                    <v-layout row >
                        <v-flex>
                        <v-avatar size="70" style="background-color:#BBDEFB;margin-top:5px;">
                            <img src="../assets/tasks..jpg">
                        </v-avatar>
                        </v-flex>
                        <v-list>
                            <v-list-tile><h2 style="font-size:30px;"><v-tab></v-tab>21</h2></v-list-tile>
                            <v-list-tile-tile><p style="font-size:17px;color:black"><v-tab></v-tab>Tasks</p></v-list-tile-tile>
                        </v-list>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
    
    <br/>
    <v-layout>
        <v-tab></v-tab><h1>Services</h1>
    </v-layout>
    <br/>
    <v-layout row wrap>
        <v-flex style="width:30px;">
            <v-card class="text-xs-center" router to="/announcement" style="height:160px;width:150px;border-radius:10px;">
                <v-card-text><img src="../assets/announcement.png" style="width:90px;height:80px;"></v-card-text>
                <v-card-actions>&nbsp;&nbsp;&nbsp;<p style="color:black;padding-left:10px;">Announcement</p></v-card-actions>
            </v-card>
        </v-flex>
        <v-flex style="width:30px;">
            <v-card class="text-xs-center" router to="/employyeeattendance" style="height:160px;width:150px;border-radius:10px;">
                <v-card-text><img src="../assets/attendance.svg" style="width:80px;height:70px;margin-top:10px;margin-left:10px;"></v-card-text>
                <v-card-actions>&nbsp;&nbsp;&nbsp;<p style="color:black;padding-left:20px;">Attendance</p></v-card-actions>
            </v-card>
        </v-flex>
        <v-flex style="width:30px;">
            <v-card class="text-xs-center" router to="/leave" style="height:160px;width:150px;border-radius:10px;">
                <v-card-text><img src="../assets/leave.png" style="width:90px;height:70px;margin-top:10px;"></v-card-text>
                <v-card-actions>&nbsp;&nbsp;&nbsp;<p style="color:black;padding-left:9px;">Leave Tracker</p></v-card-actions>
            </v-card>
        </v-flex>
        <v-flex style="width:30px;">
            <v-card class="text-xs-center" @click="menuperformance = true" style="height:160px;width:150px;border-radius:10px;">
                <v-card-text><img src="../assets/performancea.png" style="width:70px;height:60px;margin-top:20px;"></v-card-text>
                <v-card-actions>&nbsp;&nbsp;&nbsp;<p style="color:black;padding-left:10px;">Performance</p></v-card-actions>
            </v-card>
        </v-flex>
        
        <v-flex style="width:30px;">
            <v-card class="text-xs-center" router to="/employeetraining" style="height:160px;width:150px;border-radius:10px;">
                <v-card-text><img src="../assets/training.png" style="width:80px;height:70px;margin-top:15px;"></v-card-text>
                <v-card-actions>&nbsp;&nbsp;&nbsp;<p style="color:black;">Training Manage</p></v-card-actions>
            </v-card>
        </v-flex>

        <v-flex style="width:30px;">
            <v-card class="text-xs-center" router to="/promotion" style="height:160px;width:150px;border-radius:10px;">
                <v-card-text><img src="../assets/promotion.png" style="width:80px;height:70px;margin-top:15px;"></v-card-text>
                <v-card-actions>&nbsp;&nbsp;&nbsp;<p style="color:black;padding-left:20px;">Promotion</p></v-card-actions>
            </v-card>
        </v-flex>
        
    </v-layout>
    <br/>
    <v-layout row wrap>
        <v-flex style="width:30px;">
            <v-card class="text-xs-center" router to="/allemployee" style="height:160px;width:150px;border-radius:10px;">
                <v-card-text><img src="../assets/employeedetails.png" style="width:80px;height:70px;margin-top:15px;"></v-card-text>
                <v-card-actions>&nbsp;&nbsp;&nbsp;<p style="color:black;padding-left:19px;">Employees</p></v-card-actions>
            </v-card>
        </v-flex>
        <v-flex style="width:30px;">
            <v-card class="text-xs-center" router to="/employeesalary" style="height:160px;width:150px;border-radius:10px;">
                <v-card-text><img src="../assets/payroll.png" style="width:80px;height:70px;margin-top:15px;"></v-card-text>
                <v-card-actions>&nbsp;&nbsp;&nbsp;<p style="color:black;padding-left:30px;">Payroll</p></v-card-actions>
            </v-card>
        </v-flex>
        <v-flex style="width:30px;">
            <v-card class="text-xs-center" router to="/role" style="height:160px;width:150px;border-radius:10px;">
                <v-card-text><img src="../assets/role.svg" style="width:80px;height:70px;margin-top:15px;"></v-card-text>
                <v-card-actions>&nbsp;&nbsp;&nbsp;<p style="color:black;padding-left:30px;">Roles</p></v-card-actions>
            </v-card>
        </v-flex>
        <v-flex style="width:30px;">
            <v-card class="text-xs-center" router to="/awardview" style="height:160px;width:150px;border-radius:10px;">
                <v-card-text><img src="../assets/award.png" style="width:80px;height:70px;margin-top:15px;"></v-card-text>
                <v-card-actions>&nbsp;&nbsp;&nbsp;<p style="color:black;padding-left:9px;">Award & Punish</p></v-card-actions>
            </v-card>
        </v-flex>
        <v-flex style="width:30px;">
            <v-card class="text-xs-center" router to="/dutyroster" style="height:160px;width:150px;border-radius:10px;">
                <v-card-text><img src="../assets//duty.png" style="width:85px;height:75px;margin-top:13px;"></v-card-text>
                <v-card-actions>&nbsp;&nbsp;&nbsp;<p style="color:black;padding-left:25px;">Duty Time</p></v-card-actions>
            </v-card>
        </v-flex>
        <v-flex style="width:30px;">
            <v-card class="text-xs-center" router to="/rule" style="height:160px;width:150px;border-radius:10px;">
                <v-card-text><img src="../assets/rules.png" style="width:80px;height:70px;margin-top:15px;"></v-card-text>
                <v-card-actions>&nbsp;&nbsp;&nbsp;<p style="color:black;padding-left:40px;">Rules</p></v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
    <v-layout>
        <v-dialog v-model="menuperformance" max-width="300px">
            <v-card style="border-radius:10px;">
                        <v-card-title style="font-size:20px;">
                            <h3>Performance</h3>
                        </v-card-title>
                        <v-divider></v-divider>
                       <v-card-actions>
                           <v-btn flat style="height:60px;width:100%;" color="primary darken-1" router to="/serviceperformanceview">Service Performance</v-btn>
                       </v-card-actions>
                       <v-divider></v-divider>
                       <v-card-actions>
                           <v-btn flat style="height:60px;width:100%;" color="primary darken-1" router to="/productperformanceview">Product Performance</v-btn>
                       </v-card-actions>
                    </v-card>
        </v-dialog>
        
    </v-layout>
</v-container>

</template>
<script>
export default{
    data(){
        return{
            menuperformance : false
        }
    }
}
</script>
<style>

</style>
