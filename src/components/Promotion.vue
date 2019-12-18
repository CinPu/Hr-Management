<template>
    <v-flex md11>
        <br/>
        <br/>
        <v-layout row wrap>
            <h1>Promotion</h1>
            <v-flex></v-flex>
            <v-btn color="primary" round @click="addNew"><v-icon>add</v-icon> Add Promotion</v-btn>
        </v-layout>
        <v-divider></v-divider>
        <br/>
        <br/>
        <v-layout row wrap>

                <v-data-table style="width:100%;border:1px solid gray"
                :headers="headers"
                :items="promotion_data"
                >
                <template slot="headers" slot-scope="props">
               <tr style="background-color:#375aca;">
                   <td style="color:white;" v-for="header in props.headers" :key="header.text">
                       {{header.text}}
                   </td>
                </tr>
            </template>
            <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.department }}</td>
                <td class="text-xs-left">{{ props.item.promotion_destination_from }}</td>
                <td class="text-xs-left">{{ props.item.promotion_destination_to }}</td>
                <td class="text-xs-left">{{ props.item.promotion_date }}</td>
                <td class="justify-center layout px-0">
                <v-icon small class="mr-2" color="green" @click="editItem(props.item)">edit</v-icon>
                <v-icon small color="error" @click="deleteitem(props.item)" v-on="on">delete</v-icon>
                </td>
            </template>
            </v-data-table>
        </v-layout>
        <v-dialog v-model="delete_dialog" max-width="300px">
            <v-card>
                <v-card-text>Are you sure you want to delete it?</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click="delete_dialog = false" v-on="on">Cancel</v-btn>
                <v-btn color="green darken-1" flat="flat" @click="ok" v-on="on">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="new_dialog" max-width="400px">
            <v-card style="border-radius:10px;">
                <v-container>
                    <v-layout>
                        <p style="font-size:20px;">Promotion</p>
                    </v-layout>
                    <v-container>
                    <v-layout>
                        <v-combobox v-model="branch_name" :items="branch_list" @change="filterBranch" item-text="branch_name" label="Branches" ></v-combobox>
                    </v-layout>
                    <v-layout>
                        <v-combobox v-model="dept_name" :items="department_list" @change="filterDepartment" item-text="dept_name" label="Departments" ></v-combobox>
                    </v-layout>
                    <v-layout>
                        <v-combobox v-model="name" :items="employee_list" item-text="employee_Name" label="Promoted For" ></v-combobox>
                    </v-layout>
                    <v-layout>
                        <v-text-field v-model="destination_from" label="Promoted Destination from"></v-text-field>
                    </v-layout>
                    <v-layout>
                        <v-text-field v-model="destination_to" label="Promotion Destination to"></v-text-field>
                    </v-layout>
                    <v-layout>
                        <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                v-model="date"
                                readonly
                                v-on="on"
                                label="Promoted date"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="date"
                                @change="menu1 = false"
                            ></v-date-picker>
                            </v-menu>
                    </v-layout>
                    <v-layout>
                        <v-btn style="margin-left:60px;" round color="primary" @click="Submit">Submit</v-btn>
                        <v-btn  round color="primary" @click="Cancel">Cancel</v-btn>
                    </v-layout>
                    </v-container>
                </v-container>
            </v-card>
        </v-dialog>
    </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            menu1: false,
            new_dialog : false ,
            delete_dialog : false ,
            name :'',
            dept_name :'',
            branch_name : '',
            destination_from : '',
            destination_to :'',
            date :'',
            promotion_data:[
                {  id : 1 ,name : 'John Smith' ,branch:'KBZ' , department:'Web Development' , promotion_destination_from : 'Web Developer' , promotion_destination_to : 'Web Engineer' , promotion_date :'20 August 2019' },
                {  id : 2 ,name : 'Lee John Huk' ,branch:'ELA BRANCH 2', department:'Software Development' , promotion_destination_from : 'Programmer' , promotion_destination_to : 'Software Engineer' , promotion_date :'19 September 2019' },
                {  id : 3 ,name : 'Thian Lian Ben' ,branch:'AYA', department:'Marketing Development' , promotion_destination_from : 'Junior Marketing' , promotion_destination_to : 'Maketing Manager' , promotion_date :'19 December 2019' },
                {  id : 4 ,name : 'John Smith' ,branch:'ELA BRANCH 2', department:'Software Development' , promotion_destination_from : 'Programmer' , promotion_destination_to : 'Engineer' , promotion_date :'19 October 2019' }
            ],
            id : '',
            count : '',
            headers:[
                { text : 'Promoted Name' , value :'name' },
                { text : 'Department' , value : 'department'},
                { text : 'Promotion Destination from' , value :'promotion_destination_from'},
                { text : 'Promotion Destination to' , value : 'promotion_destination_to'},
                { text : 'Promotion Date' , value :'promotion_date'},
                { text : 'Actions' , value:'actions'}
            ]
        }
    },
    methods:{
        Cancel(){
            this.new_dialog = false
        },
        addNew(){
            this.count = 2
            this.new_dialog = true
        },
        deleteitem(item){
            this.delete_dialog = true
            this.id = item.id
        },
        ok(){
            this.promotion_data.splice(1,parseInt(this.id))
            this.delete_dialog = false
        },
        Submit(){
            if( this.count === 2){
                this.promotion_data.push({
                    name : this.name.employee_Name ,branch:this.branch_name.branch_name , department:this.dept_name.dept_name , promotion_destination_from : this.destination_from , promotion_destination_to : this.destination_to , promotion_date :this.date
                })
            }else{
                this.promotion_data.forEach(element=>{
                    if( element.id === this.id ){
                        element.name = this.name ,
                        element.branch = this.branch_name ,
                        element.department = this.dept_name ,
                        element.promotion_destination_from = this.destination_from ,
                        element.promotion_destination_to = this.destination_to ,
                        element.promotion_date = this.date
                    }
                })
            }
            
            this.new_dialog = false ,
            this.name = '',
            this.dept_name = '',
            this.branch_name = '',
            this.destination_from = '',
            this.destination_to = '',
            this.date = ''
        },
        editItem(item){
            this.id = item.id ,
            this.count = 1
            this.name = item.name ,
            this.dept_name = item.department ,
            this.branch_name = item.branch ,
            this.destination_from = item.promotion_destination_from ,
            this.destination_to = item.promotion_destination_to ,
            this.date = item.promotion_date
            this.new_dialog = true 
        },
        filterBranch(){
           this.$store.dispatch('SELECT_BRANCH_NAME_FOR_DEPARTMENT',this.branch_name.branch_id)
        },
        filterDepartment(){
            this.$store.dispatch('SELECT_DEPARTMENT_FOR_EMPLOYEE',this.dept_name.dept_id)
        }
    },
    computed:{
        ...mapGetters([
            'department_list','branch_list','employee_list'
        ])
    }
}
</script>

<style>

</style>
