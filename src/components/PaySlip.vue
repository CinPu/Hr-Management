<template>
    <v-flex  justify-center>
   
   
      <v-form class="form" >
          <v-layout row>
               <h1 style="text-align:left">Payslip</h1>
               <v-layout justify-end>
                   <v-btn small color="blue" round class="white--text">E-mail</v-btn>
               </v-layout>
          </v-layout>
          <br>
        <v-divider style="color:gray"></v-divider>
          <br>
          <v-form>
               <h2 style="text-align:center">PAYSLIP FOR THE MONTH OF {{new Date().getMonth()+1}}, {{new Date().getFullYear()}}</h2><br>
               <v-layout column>
                   <v-layout justify-end>
                  <h3>PAYSLIP #30298</h3>
                  </v-layout>
                  <v-layout justify-end>
                  <p style="font-size:13px">Salary Month: {{new Date().getMonth()+1}}, {{new Date().getFullYear()}}</p>
                   </v-layout>
               </v-layout>
               <br><br>
               <v-layout column>
                   <p>PearlYadana Software Solution Co.td <br>
                   MICT Park,Hlaing</p>
               </v-layout>
               <br>
               <v-layout column>
                 <p>John <br>Web Designer <br>Employee ID: FT-0001 <br>Joining Date: 2 Feb 2012</p>
               </v-layout><br>
               <v-layout row justify-center>
                   <table style="padding:30px;font-size:18px;">
                       <h3>Earnings</h3>
                    <br>
                       <tr>
                           <td style="width:300px">Basic Salary</td>
                           <td>300000 Ks.</td>
                       </tr>
                       <tr>
                           <td style="width:300px">Product</td>
                           <td>30000 Ks.</td>
                       </tr>
                        <tr>
                           <td style="width:300px">Promotion</td>
                           <td>30000 Ks.</td>
                       </tr>
                       <tr>
                           <td style="width:300px">Total</td>
                           <td>360000 Ks.</td>
                       </tr>
                   </table>
                    <table style="padding:30px;font-size:18px">
                       <h3>Deductions</h3><br>
                       <tr>
                           <td style="width:300px">Late</td>
                           <td>0 Ks.</td>
                       </tr>
                       <tr>
                           <td style="width:300px">Absence</td>
                           <td>0 Ks.</td>
                       </tr>
                       <tr>
                           <td style="width:300px">Casuel</td>
                           <td>0 Ks.</td>
                       </tr>
                       <tr style="margin-top:20px">
                           <td style="width:300px">Mental</td>
                           <td>0 Ks.</td>
                       </tr>
                       <tr>
                           <td style="width:300px">Total</td>
                           <td>0 Ks.</td>
                       </tr>
                   </table>
               </v-layout>
               <v-layout class="black--text"><h4>Net Salary </h4>: 360000 Ks. (Three lakh and Six Thousands Only)</v-layout>
          </v-form>
      </v-form>

    </v-flex>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.card {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 14px;
  width: 70%;
  border-spacing: 12px;
  
}
.form {
  padding: 35px;
}
.span1 {
  color: red;
  font-size: 10px;
}
body {
  /* max-width: 690px; */
  margin-right: auto;
  margin-left: auto;
}
table tr{
    margin-top: 20px;
}
</style>
