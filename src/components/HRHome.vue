<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer clipped app v-model="drawer" style="width:250px; background-color:#3533A1">
        <v-list class="white--text">
          <v-list-tile to="/" active-class="black--text">
            <v-list-tile-action>
              <v-icon small class="white--text">home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title id="font" class="white--text">
              Home
            </v-list-tile-title>
            </v-list-tile>
            <v-list-tile router to="/employyeeattendance">
                <v-list-tile-action>
                  <v-icon class="white--text" small>date_range</v-icon>
                </v-list-tile-action>
                <v-list-tile-title id="font">Attendance</v-list-tile-title>
            </v-list-tile>
            
            <v-list-tile to="/announcement">
              <v-list-tile-action>
                <v-icon small class="white--text">dashboard</v-icon>
              </v-list-tile-action>
                <v-list-tile-title id="font" class="white--text">
                  Announcement
                </v-list-tile-title>
              </v-list-tile>

            <hr width="10%">
            <v-list-group id="font" class="white--text">
              <!-- prepend-icon="fa fa-clock" -->
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon class="white--text" small>person</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title id="font">Employees</v-list-tile-title>
                </v-list-tile>
              </template>
              <template>
                <div class="pl-1">
                  <v-list-tile to="/allemployee" class="pl-5">
                  <v-list-tile-title id="font" class="white--text">
                    Employee Details
                  </v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile to="/leave" class="pl-5">
                    <v-list-tile-title id="font" class="white--text">
                      Leave
                    </v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile to="/cvform" class="pl-5">
                  <v-list-tile-title id="font" class="white--text">
                    CV Form
                  </v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile to="/awardview" class="pl-5">
                  <v-list-tile-title id="font" class="white--text">
                    Award - Punishment
                  </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile to="/promotion" class="pl-5">
                <!-- <v-list-tile-action> -->
                <!-- <v-icon small class="white--text">star</v-icon> -->
                <!-- </v-list-tile-action> -->
                <v-list-tile-title id="font" class="white--text">
                   Promotion
                </v-list-tile-title>
              </v-list-tile>
                  

                  
                </div>
              </template>
            </v-list-group>


            <v-list-group id="font">
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="white--text" small>star_rate</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title id="font">Performance</v-list-tile-title>
                  </v-list-tile>
                </template>
                <template>
                  <div class="pl-1">
                    <v-list-tile  router to="/productperformanceview">
                    <v-list-tile-action style="width:0px">
                      <v-icon  small class="white--text pl-3">stars</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title id="font">
                      Product Performance
                    </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile  router to="/serviceperformanceview">
                    <v-list-tile-action style="width:0px">
                      <v-icon small class="white--text">important_device</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title id="font">
                      Service Performance
                    </v-list-tile-title>
                    </v-list-tile>
                  </div>
                </template>
              </v-list-group>

              <v-list-group id="font">
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="white--text" small>accessible</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title id="font">Training</v-list-tile-title>
                  </v-list-tile>
                </template>
                <template>
                  <div class="pl-1">
                    <v-list-tile  router to="/employeetraining">
                    <v-list-tile-action style="width:0px">
                      <v-icon  small class="white--text pl-3">supervisor_account</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title id="font">
                      Employee Training
                    </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile  router to="/training">
                    <v-list-tile-action style="width:0px">
                      <v-icon small class="white--text pl-3">supervised_user_circle</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title id="font">
                       Creation Training
                    </v-list-tile-title>
                    </v-list-tile>
                  </div>
                </template>
              </v-list-group>

              <v-list-group id="font">
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="white--text" small>monetization_on</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title id="font">Payroll</v-list-tile-title>
                  </v-list-tile>
                </template>
                <template>
                  <div class="pl-1">
                    <v-list-tile  router to="/employeesalary">
                    <v-list-tile-action style="width:0px">
                      <v-icon  small class="white--text pl-3">monetization_on</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title id="font">
                      Employee Salary
                    </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile  router to="/payslip">
                    <v-list-tile-action style="width:15px">
                      <v-icon small class="white--text pl-3">attach_money</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title id="font">
                       PaySlip
                    </v-list-tile-title>
                    </v-list-tile>
                  </div>
                </template>
              </v-list-group>

              <v-list-tile to="/branchview">
              <v-list-tile-action>
                <v-icon small class="white--text">call_split</v-icon>
              </v-list-tile-action>
                <v-list-tile-title id="font" class="white--text">
                  Branch
                </v-list-tile-title>
              </v-list-tile>

            <v-list-tile to="/department">
              <v-list-tile-action>
                <v-icon small class="white--text">pets</v-icon>
              </v-list-tile-action>
                <v-list-tile-title id="font" class="white--text">
                  Department
                </v-list-tile-title>
              </v-list-tile>

              <v-list-tile to="/dutyroster">
                <v-list-tile-action>
                  <v-icon small class="white--text">schedule</v-icon>
                </v-list-tile-action>
                  <v-list-tile-title id="font" class="white--text">
                    Duty Roster
                  </v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile to="/shiftview">
                    <v-list-tile-action>
                      <img src="../assets/recruitment.svg" style="width:15px">
                    </v-list-tile-action>
                    <v-list-tile-title id="font" class="white--text">
                      Shift
                    </v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile to="/role">
                    <v-list-tile-action>
                      <v-icon small class="white--text">adjust</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title id="font" class="white--text">
                      Role
                    </v-list-tile-title>
                  </v-list-tile>

            <v-list-tile to="/rank">
              <v-list-tile-action>
                <img src="../assets/rules.png" style="width:15px">
              </v-list-tile-action>
              <v-list-tile-title id="font" class="white--text">
                Rank
              </v-list-tile-title>
            </v-list-tile>

            <v-list-tile to="/rate">
              <v-list-tile-action>
                <img src="../assets/recruitment.svg" style="width:15px">
              </v-list-tile-action>
              <v-list-tile-title id="font" class="white--text">
                Rate
              </v-list-tile-title>
            </v-list-tile>

              <v-list-tile to="/unit">
                <v-list-tile-action>
                <img src="../assets/recruitment.svg" style="width:15px">
                </v-list-tile-action>
                <v-list-tile-title id="font" class="white--text">
                  Unit
                </v-list-tile-title>
              </v-list-tile>

              


              <v-list-tile to="/rule">
                <v-list-tile-action>
                <img src="../assets/rules.png" style="width:15px">
                </v-list-tile-action>
                <v-list-tile-title id="font" class="white--text">
                   Rule
                </v-list-tile-title>
              </v-list-tile>

              

              <!-- Schedule Menu layout -->

              <!-- <v-list-group id="font">
                <template v-slot:activator>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="white--text" small>schedule</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title id="font">Attendance</v-list-tile-title>
                  </v-list-tile>
                </template>
                <template>
                  <div class="pl-1">
                    <v-list-tile  router to="/employyeeattendance">
                    <v-list-tile-action style="width:0px">
                      <img src="../assets/portfolio.svg" style="margin-left:20px;width:14px">
                    </v-list-tile-action>
                    <v-list-tile-title id="font">
                      Employee Attendance
                    </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile  router to="/attendancerecord">
                    <v-list-tile-action style="width:0px">
                      <img src="../assets/portfolio.svg" style="margin-left:20px;width:14px">
                    </v-list-tile-action>
                    <v-list-tile-title id="font">
                      Attendance Record
                    </v-list-tile-title>
                    </v-list-tile>
                  </div>
                </template>
              </v-list-group> -->
            <!-- </v-flex><br> -->
            <hr width="10%">
            <!-- <v-list-tile>
              <v-list-tile-action><img src="../assets/recruitment.svg" style="width:15px"></v-list-tile-action>
              <v-list-tile-title  id="font">Jop opportunities</v-list-tile-title>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action><img src="../assets/check.svg" style="width:15px"></v-list-tile-action>
              <v-list-tile-title  id="font">HR Development</v-list-tile-title>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action><img src="../assets/combination-chart.svg" style="width:15px"></v-list-tile-action>
              <v-list-tile-title  id="font">Organization Management</v-list-tile-title>
            </v-list-tile>
            -->
            <!-- <v-flex class="pl-3 pt-3" id="font" style="position:absolute;bottom:2%;width:100%">
              <v-flex style="background-color:#3533A1;width:100%">
                <v-btn flat small class="white--text"><span><img src="../assets/logout.svg" style="width:15px;"></span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Log out</v-btn>
              </v-flex>
            </v-flex>  -->

      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="#3533A1" fixed app clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer" style="color:white"></v-toolbar-side-icon>
      <!-- <span class="title ml-3 mr-5" style="color:white">HUMAN RESOURCES</span> -->
      <div>
        <img src="../assets/HRMS.png" style="width:200px;">
      </div>
      <v-spacer></v-spacer>
      <v-menu max-width="300px" v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
        <template v-slot:activator="{ on }" style="padding-top:5px">
          <v-btn small right icon absolute v-on="on" style="background-color:white">N<v-icon></v-icon></v-btn> 
        </template>
        <v-card style="height:290px;">
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>John Leider</v-list-tile-title>
                <v-list-tile-sub-title>Founder of Vuetify.js</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-btn flat small style="border:1px solid" round>Manage you Google account</v-btn>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <div class="pl-0">
                <v-btn class="btn-width" flat small><span><img src="../assets/calendar.svg" style="width:15px;">
                &nbsp;&nbsp;&nbsp;&nbsp;
                Add another account</span></v-btn>
              </div>
            </v-flex>
            <v-flex xs12>
              <div class="pl-0" width="300px">
                <v-btn small flat><span><img src="../assets/calendar.svg" style="width:15px;">
                &nbsp;&nbsp;&nbsp;&nbsp;
                Password</span></v-btn>
              </div>
            </v-flex>
            <v-flex xs12>
              <div class="pl-0">
                <v-btn small flat><span><img src="../assets/calendar.svg" style="width:15px;">
                &nbsp;&nbsp;&nbsp;&nbsp;
                Manage people</span></v-btn>
              </div>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <div>
            <v-btn flat small>Privacy Policy</v-btn>
            <v-btn flat small>Terms of service</v-btn>
          </div>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-flex>

           <router-view/>
    </v-flex>

  </v-app>
</div>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      menu:false,
      // drawer:true
    }),
    props: {
      source: String
    }
  }
</script>
<style lang="stylus" scoped>
#keep main .container {
    height: 660px;
  }

  .navigation-drawer__border {
    display: none;
  }
  #font{
  font-size:12px;
}
</style>