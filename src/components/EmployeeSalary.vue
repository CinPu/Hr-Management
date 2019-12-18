<template>
    <v-flex md11>
        <br/>
        <v-layout>
            <h1 style="font-size:40px;">Employee Salary</h1>
        </v-layout>
        <v-divider></v-divider>
        <br/>
        <v-layout row wrap>
            <v-flex md2 sm3 xs12>
                <v-combobox v-model="branch" label="Branch" :items="branch_data" item-text="branch_name" @change="filterBranch">
                </v-combobox>
            </v-flex>
            <v-flex md2 sm3 xs12>
                <v-combobox style="margin-left:10px;" v-model="department" label="Departments" :items="department_data" item-text="department_name" >
                </v-combobox>
            </v-flex>
            <v-flex md2 sm3 xs12>
                <v-combobox style="margin-left:10px;" v-model="role" label="Role" :items="Role" item-text="name" >
                </v-combobox>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md3 xs12 sm3>
                <v-text-field v-model="search" label="Employee Name" append-icon="search" ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-data-table :headers="headers" :items="employee_salary_data" style="width:100%;border:1px solid gray">
                <template slot="headers" slot-scope="props">
                <tr style="background-color:#375aca;">
                    <td style="color:white" v-for="header in props.headers" :key="header.text">
                        {{header.text}}
                    </td>
                    </tr>
                </template>
                <template v-slot:items="props">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.jdate }}</td>
                  <td>{{ props.item.role }}</td>
                  <td>{{ props.item.salary }}</td>
                  <td>
                     <router-link to="/payslip" style="text-decoration:none;"> <v-chip outline color="primary" router to="/payslip" class="white--text darken-1">Generate slip</v-chip></router-link>
                  </td>
                </template>
              </v-data-table>
        </v-layout>
    </v-flex>
</template>

<script>
export default {
    data(){
        return{
            branch:'',
            department:'',
            role:'',
            headers:[
                { text:'Employee' , value:'name'},
                { text:'Employee ID' , value:'id'},
                { text:'Email' , value:'email'},
                { text:'Join Date' , value:'date'},
                { text:'Role' , value:'role'},
                { text:'Salary' , value:'salary'},
                { text:'Payslip' , value:'pay'},
            ],
            department_data:[
                { department_name : 'Software Department' , value: '1'},
                { department_name : 'Hardware Department' , value:'1'},
                { department_name : 'Data Science Department' , value :'2'},
                { department_name : 'Hosting Department' , value:'3'},
            ],
            branch_data:[
                { branch_name :'Web Hosting' , value:'1'},
                { branch_name : 'Hardware' , value:'2'},
                { branch_name : 'Software' , value:'3'}
            ],
            Role:[
                { name : 'Manager'},
                { name : 'Junior Developer'},
                { name : 'Software Engineer'}
            ],
            employee_salary_datas:[
                { id : 'FT-04040' , name : 'John Smith' , branch:'Web Hosting' , department:'Software Department' ,email:'johnsmith@gmail.com' , jdate:'13 Jan 2019' , role:'Manager' , salary : 800000 },
                { id : 'FT-04050' , name : 'Ramos' ,branch:'Web Hosting' , department:'Hardware Department' , email:'ramos@gmail.com' , jdate:'21 Jan 2019' , role:'Junior Developer' , salary : 200000 },
                { id : 'FT-05040' , name : 'Nani' ,branch:'Hardware' , department:'Data Science Department' , email:'nani@gmail.com' , jdate:'1 Feb 2019' , role:'Software Engineer' , salary : 500000 },
                { id : 'FT-01040' , name : 'Messi' ,branch:'Web Hosting' , department:'Software Department' , email:'messi@gmail.com' , jdate:'10 May 2019' , role:'Manager' , salary : 800000 },
                { id : 'FT-04560' , name : 'Ronaldo' ,branch:'Software' , department:'Hosting Department' , email:'ronaldo@gmail.com' , jdate:'9 March 2019' , role:'Software Engineer' , salary : 600000 },
                { id : 'FT-05440' , name : 'Neymar' ,branch:'Hardware' , department:'Data Science Department' , email:'neymar@gmail.com' , jdate:'30 May 2019' , role:'Junior Developer' , salary : 200000 },
            ]
        }
    },
    computed:{
        employee_salary_data(){
            return this.employee_salary_datas.filter( element=>{
                return ( element.branch.includes(this.branch.branch_name) &&
                element.department.indexOf(this.department.department_name) )||
                element.role.includes(this.role.name)
            })
        }
    }

}
</script>

<style>

</style>
