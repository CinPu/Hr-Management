// import Axios from '../../Axios'
import axios from 'axios'
import state from './state';
// const object = new Axios()

export default{
    REMOVE_EMPLOYEE_FROM_COMPANY({commit},id){
        // alert(parseInt(id))
        axios.delete(`https://localhost:5001/Employee/${parseInt(id)}`).then( response=>{
            console.log(response)
            commit('aa',id)
            alert("successful")
        }).catch(error=>{
            console.log(error)
        })
    },
    ANNOUNCEMENT_EDIT_ACTIONS({commit},data){
        axios.put(`https://localhost:5001/Announcement/${parseInt(data.id)}`,
        {
            "description": data.description,
            "title": data.title,
            "date": data.date
        }).then( response =>{
            console.log(response.data)
                axios.get('https://localhost:5001/Announcement').then( response1 =>{
                    commit('SELECT_ANNOUNCEMENT_DATA_MUTATIONS',response1.data)
                }).catch( error=>{
                    console.log(error)
                })
        })
    },
    DELETE_ANNOUNCEMENT_DATA({commit},data){
        // alert('a')
        axios.delete(`https://localhost:5001/Announcement/${data}`).then( response =>{
            console.log(response.data)
            axios.get('https://localhost:5001/Announcement').then( response1 =>{
                commit('SELECT_ANNOUNCEMENT_DATA_MUTATIONS',response1.data)
            }).catch( error=>{
                console.log(error)
            })
        })
    },
    SELECT_ANNOUNCEMENT_DATA({commit}){
        axios.get('https://localhost:5001/Announcement').then( response =>{
            commit('SELECT_ANNOUNCEMENT_DATA_MUTATIONS',response.data)
        }).catch( error=>{
            console.log(error)
        })
    },
    AWARD_PUNISH({commit},data){
        axios.post('https://localhost:5001/Award_Punishment',data).then( response =>{
            commit('aa',response.data)
        }).catch( error =>{
            console.log(error)
        })
    },
    CREATE_TRAINING_ACTIONS({commit},data){
        axios.post('https://localhost:5001/Training',data).then( response =>{
            // alert("successful")
            commit('aa',response.data)
        }).catch( error =>{
            console.log(error)
        })
    },
    CREATE_SHIFT_ACTIONS({commit},data){
        // alert(data.name)
        // alert(data.start_Time)
        // alert(data.end_Time)
        axios.post('https://localhost:5001/Shifts',
        {
            "name": data.name,
            "start_Time": data.start_Time,
            "end_Time": data.end_Time
        }).then( response=>{
            // alert("successful")
            console.log(response.data)
            commit('aa',"successful")
        }).catch( error=>{
            console.log(error)
        })
    },
    ANNOUNCEMENT_DATA_DETAILS({commit}){
        axios.get('https://localhost:5001/Announcement').then( response=>{
            commit('ANNOUNCEMENT_DATA_MUTATIONS',response.data)
        }).catch( error =>{
            console.log(error)
        })
    },
    ANNOUNCEMENT_CREATIONS_ACTIONS({commit},data){
        console.log(data)
        data.forEach( element=>{
            axios.post('https://localhost:5001/Announcement',element).then( response =>{
            console.log(response.data)
            // alert("successful")
            commit('aa',"successful")
        }).catch( error =>{
            console.log(error)
            // alert(error)
        })
        })
        
    },
    // Create_branch_detail({commit}){
    //     axios.get('https://localhost:5001/Branch').then( response => {
    //         commit('create_branch_detail',response.data)
    //     }).catch( error =>{
    //         console.log(error)
    //     })
    // },
    department_create_actions({commit},data_detail){
        data_detail.forEach(element => {
            axios.post('https://localhost:5001/Departmentes',element).then( response=>{
                // alert("successful")
                console.log(response.data)
                commit('aa',"successful")
            }).catch( error=>{
                console.log(error)
            })
        });
        
    },
    Create_department_detail({commit}){
        axios.get('https://localhost:5001/Departmentes').then( response =>{
            commit('create_department_detail',response.data)
        })
    },
    DELETE_LEAVE({commit},id){
        axios.delete(`https://localhost:5001/Leave/${id}`).then( response=>{
            commit('aa',response.data)
            axios.get('https://localhost:5001/Leave').then( response=>{
                commit('EMPLOYEE_DATA_FOR_LEAVE_MUTATION',response.data)
            }).catch(error=>{
                alert(error)
            })
        }).catch( error=>{
            alert(error)
        })
    },
    UNIT_DATA({commit}){
        axios.get('https://localhost:5001/Points').then( responseone=>{
                commit('Unit_Insert_Data',responseone.data)
            })
    },
    Delete_Data({commit},id){
        axios.delete(`https://localhost:5001/Points/${id}`).then( response=>{
            console.log(response.data)
            axios.get('https://localhost:5001/Points').then( responseone=>{
                commit('Unit_Insert_Data',responseone.data)
            })
        })
    },
    Edit_Unit_data({commit},data){
        axios.put(`https://localhost:5001/Points/${data.id}`,{
            "name": data.name,
            "price": data.price,
            "remark": data.remark
        }).then( response=>{
            console.log(response.data)
            axios.get('https://localhost:5001/Points').then( responseone=>{
            commit('Unit_Insert_Data',responseone.data)
        })
        })
        
    },
    INSERT_DATA_UNIT({commit},data){
        axios.post('https://localhost:5001/Points',{
            "name": data.unit_name,
            "price": data.unit_price,
            "remark": data.unit_remark
        }).then( response=>{
            console.log(response.data)
            axios.get('https://localhost:5001/Points').then( responseone=>{
                commit('Unit_Insert_Data',responseone.data)
            })
        })
    },
    ADDPRODUCTPERFORMANCE({commit},data){
        commit('ADDPRODUCTPERFORMANCE',data)
    },
    EDIT_LEAVE_INFO({commit},data){
        // alert(data.leave_id)
        axios.put(`https://localhost:5001/Leave/${parseInt(data.leave_id)}`,{
            "id": data.leave_id,
            "leave_type": data.leave_type,
            "from_date": data.leave_from,
            "to_date": data.leave_to,
            "employee_id": data.employee_id,
            "employees": {
                "employeeId": 7,
                "employee_No": "emp2",
                "employee_Name": "Myat Min",
                "email": "myatmin@gmail.com",
                "dob": "2000-04-12T00:00:00",
                "nrc": "120036",
                "phone_no_work": "0973349300",
                "phone_no_personal": "09335774660",
                "gender": "Male",
                "marital_status": "Single",
                "nationality": "Myamar",
                "religion": "Islam",
                "permanent_address": "Mandalay",
                "education_background": "Master",
                "joined_date": "2018-02-07T00:00:00",
                "employee_state": "Nof",
                "addressId": 7,
                "addresses": {
                    "addId": 7,
                    "line_1": "Ma Ma Gyi Lan",
                    "line_2": "4st",
                    "township": "Maynigone",
                    "city": "Yangon",
                    "region": "Yangon",
                    "country": "Myanmar"
                }
            }
        }).then( response =>{
            console.log(response)
            axios.get('https://localhost:5001/Leave').then( response=>{
                commit('EMPLOYEE_DATA_FOR_LEAVE_MUTATION',response.data)
            }).catch(error=>{
                alert(error)
            })
        }).catch(error=>{
            alert(error)
        })
    },
    CREATE_INITIALIZE({commit}){
        axios.get('https://localhost:5001/Training').then( response =>{
            commit('TRAINING_MUTATIONS',response.data)
        }).catch( error =>{
            console.log(error)
        })
        axios.get('https://localhost:5001/EmployeeRole').then( response => {
            commit('CREATE_INITIALIZE_MUTATIONS',response.data)
        }).catch( error =>{
            console.log(error)
        })
        axios.get('https://localhost:5001/Leave').then(response =>{
            commit('Create_initialize_leave',response.data)
        }).catch( error =>{
            console.log(error)
        })
        axios.get('https://localhost:5001/Departmentes').then( response =>{
            commit('Create_initialize_departments',response.data)
        }).catch(error =>{
            console.log(error)
        })
        axios.get('https://localhost:5001/Branch').then( response =>{
            commit('Create_initialize_branches',response.data)
        })
        axios.get('https://localhost:5001/DutyRosterDetail').then( response =>{
            // alert("on")
            commit('DUTTYROSTER_DATA',response.data)
        })
        
    },
    CREATE_INITILIZE_BRANCH({commit}){
        axios.get('https://localhost:5001/Branch').then( response =>{
            commit('Create_initialize_branches',response.data)
        })
    },
    ADD_SHIFT_EMPLOYEE({commit},data){
        axios.post('https://localhost:5001/DutyRoster',
        {
            "from_Date": data.from_date,
            "to_Date": data.to_date,
            "shift_Id": data.id
        }).then( response=>{
            console.log(response.data)
            commit('DUTYROSTER_INPUT',data)
        })
    },
    DELETE_SHIFT_DATA({commit},data){
        axios.delete(`https://localhost:5001/Shifts/${data}`).then( responseone=>{
            console.log(responseone.data)
            axios.get('https://localhost:5001/Shifts').then( response =>{
                commit('SHIFTS_INITIALIZE',response.data)
            })
        })
        axios.get('https://localhost:5001/Shifts').then( response =>{
            commit('SHIFTS_INITIALIZE',response.data)
        })
    },
    EDIT_SHIFT_DATA({commit},data){
        // alert(data.shift_name)
        // alert(data.start_time)
        // alert(data.end_time)
        axios.put(`https://localhost:5001/Shifts/${data.shift_id}`,{
            "id": data.shift_id,
            "name": data.shift_name,
            "start_Time": data.start_time,
            "end_Time": data.end_time
        }).then(response=>{
            console.log(response.data)
            axios.get('https://localhost:5001/Shifts').then( response =>{
                commit('SHIFTS_INITIALIZE',response.data)
            })
        }).catch(error=>{
            alert(error)
        })
    },
    TOWNSHIP_LIST({commit}){
        axios.get('https://localhost:5001/Township').then( response=>{
            commit('TOWNSHIP_DATA',response.data)
        }).catch( error=>{
            alert(error)
        })
    },
    // CITY_SELECT({commit},id){
    //     // alert(id)
    //     axios.get('https://localhost:5001/Township').then( response=>{
    //         commit('SELECT_CITY_MUTATION',{ data : response.data , id : id})
    //     }).catch( error=>{
    //         alert(error)
    //     })
    // },
    CITY_LIST({commit}){
        axios.get('https://localhost:5001/City').then(response=>{
            commit('CITY_LIST_MUTATIONS',response.data)
        })
    },
    SHIFT_INITIALIZE({commit}){
        axios.get('https://localhost:5001/Shifts').then( response =>{
            commit('SHIFTS_INITIALIZE',response.data)
        })
        
    },
    REMOVE_EMPLOYEE_OTHERS({commit},data){
        commit('REMOVE_EMPLOYEE_OTHERS_MUTATIONS',data)
    },
    BRANCH_CREATION_ACTIONS({commit},data){
        axios.post('https://localhost:5001/Branch',data).then( response =>{
            console.log(response)
            commit('BRANCH_CREATION_MUTATIONS',"Your branch creation is successful")
        }).catch( error =>{
            console.log(error)
            commit('BRANCH_CREATION_MUTATIONS',"Yout branch creation is not completed") 
        })
    },
    ADDITION_EMPLOYEE_DATA_TO_DEPARTMENT({commit},data){
        axios.post('https://localhost:5001/EmployeeRole',
            {
                "start_date": "2019-10-07T00:00:00",
                "end_date": "2019-07-11 08:00:00",
                "remark": "Fair",
                "department_id": data.dept_id,
                "employee_id": data.employee_id,
                "roleid": 7
            }
        ).then( response =>{
            console.log(response.data)
            axios.get('https://localhost:5001/Employee').then( response1 =>{
                commit('EMPLOYEE_DATA_LIST_ACTIONS',response1.data)
            }).catch( error =>{
                console.log(error)
            })
            axios.get('https://localhost:5001/Training').then( response2 =>{
            commit('TRAINING_MUTATIONS',response2.data)
        }).catch( error =>{
            console.log(error)
        })
        axios.get('https://localhost:5001/EmployeeRole').then( response3 => {
            commit('CREATE_INITIALIZE_MUTATIONS',response3.data)
        }).catch( error =>{
            console.log(error)
        })
        axios.get('https://localhost:5001/Leave').then(response4 =>{
            commit('Create_initialize_leave',response4.data)
        }).catch( error =>{
            console.log(error)
        })
        axios.get('https://localhost:5001/Departmentes').then( response5=>{
            commit('Create_initialize_departments',response5.data)
        }).catch(error =>{
            console.log(error)
        })
        axios.get('https://localhost:5001/Branch').then( response6 =>{
            commit('Create_initialize_branches',response6.data)
        })
        axios.get('https://localhost:5001/DutyRosterDetail').then( response7 =>{
            // alert("on")
            commit('DUTTYROSTER_DATA',response7.data)
        })
        }).catch( error =>{
            alert("error")
            console.log(error)
        })
        axios.get('https://localhost:5001/Employee').then( response =>{
            commit('EMPLOYEE_DATA_LIST_ACTIONS',response.data)
        }).catch( error =>{
            console.log(error)
        })
    },
    INSERT_TRAINING({commit},data){
        axios.post('https://localhost:5001/Training',{
            "training": data.training,
            "duration": data.duration,
            "pre_requestive": data.pre_requestive,
            "remark": data.remark
        }).then( response=>{
            commit('aa',response.data)
        }).catch(error=>{
            alert(error)
        })
    },
    SELECT_BRANCH_DATA_ALL({commit}){
        axios.get('https://localhost:5001/Branch').then( response=>{
            commit('SELECT_ALL_BRANCH_DATA',response.data)
        })
    },
    BRANCH_EDIT_DATA({commit},data){
        axios.put(`https://localhost:5001/Branch/${data.id}`,{
            "id": data.id,
            "name": data.name,
            "phone_1": data.phone_1,
            "phone_2": data.phone_2,
            "addressId": data.addressId,
            "addresses": {
                "addId": data.addressId,
                "line_1":data.line_1,
                "line_2":data.line_2,
                "township": data.township,
                "city": data.city,
                "region": data.region,
                "country": data.country
            }
        }).then( response=>{
            console.log(response.data)
            axios.get('https://localhost:5001/Branch').then( response=>{
                commit('SELECT_ALL_BRANCH_DATA',response.data)
            })
        }).catch(error=>{
            alert(error)
        })
    },
    DELETE_BRANCH_DATA({commit},id){
        axios.delete(`https://localhost:5001/Branch/${id}`).then(response=>{
            console.log(response.data)
            axios.get('https://localhost:5001/Branch').then( response=>{
                commit('SELECT_ALL_BRANCH_DATA',response.data)
            })
        })
        
    },
    ADD_EMPLOYEE_TO_DEPARTMENTS({commit},data){
        // alert(data.start_date)
        // alert(data.dept_id)
        // alert(data.employee_id)
        axios.post('https://localhost:5001/EmployeeRole',
        {
            "start_date": data.start_date,
            "end_date": "null",
            "remark": "Good",
            "department_id": data.dept_id,
            "employee_id": data.employee_id,
            "roleid": 1
        }).then( responseone=>{
            // alert("succcess")
            console.log(responseone.data)
            axios.get('https://localhost:5001/Employee').then( response =>{
                commit('EMPLOYEE_DATA_LIST_ACTIONS',response.data)
            }).catch( error =>{
                console.log(error)
            })
            axios.get(`https://localhost:5001/EmployeeRole/api/${data.dept_id}`).then( response=>{
                commit('EMPLOYEE_DATA_DETAILS',{ details : response.data , data : data } )
            }).catch( error=>{
                alert(error)
            })
        }).catch(error=>{
            alert(error)
        })
    },
    EMPLOYEE_DATA_LIST({commit}){
        axios.get('https://localhost:5001/Employee').then( response =>{
            commit('EMPLOYEE_DATA_LIST_ACTIONS',response.data)
        }).catch( error =>{
            console.log(error)
        })
    },
    EDIT_DEPARTMENT_ACTIONS({commit},data){
        // alert(data.department_id)
        // alert(data.department_name)
        // alert(data.branch_id)
        // alert(data.remark)
        // alert(data.phone_no)
        // alert(data.priority)
        axios.put(`https://localhost:5001/Departmentes/${data.department_id}`,
            {
                "dept_id": data.department_id,
                "dept_name": data.department_name,
                "priority": data.priority,
                "phone_no": data.phone_no,
                "remark": data.remark,
                "branch_id": data.branch_id,
                "branches": {
                    "id": 2,
                    "name": "ELan Branch 2",
                    "phone_1": "0978754700",
                    "phone_2": "0976654009",
                    "addressId": 11,
                    "addresses": {
                        "addId": 11,
                        "line_1": "Lan in Lay",
                        "line_2": "4st",
                        "township": "Mayangone",
                        "city": "Yangon",
                        "region": "Yangon",
                        "country": "Myanmar"
                    }
                }
            }
        ).then( response =>{
            // alert("success")
            console.log(response.data)
            axios.get('https://localhost:5001/Departmentes').then( response1 =>{
            commit('create_department_detail',response1.data)
        })
        }).catch( error=>{
            alert(error)
        })
        
    },
    DEPARTMENT_DELETE_ACTIONS({commit},data){
        axios.delete(`https://localhost:5001/Departmentes/${data}`).then(response=>{
            console.log(response)
            axios.get('https://localhost:5001/Departmentes').then( response =>{
                commit('create_department_detail',response.data)
            })
        }).catch( error =>{
            console.log(error)
            alert(error)
        })
    },
    EMPLOYEE_CREATION_ACTIONS({commit},data){
        console.log(data)
        axios.post('https://localhost:5001/Employee',{
            "employee_No": "emp2",
        "employee_Name": "Phyo Phyo",
        "email": "phyo@gmail.com",
        "dob": "2019-01-12T00:00:00",
        "nrc": "123456",
        "phone_no_work": "09785493061",
        "phone_no_personal": "09585774664",
        "gender": "Female",
        "marital_status": "Single",
        "nationality": "Myamar",
        "religion": "Islam",
        "permanent_address": "MyoHla,Pegu",
        "education_background": "Bechalor",
        "joined_date": "2018-02-07T00:00:00",
        "employee_state": "exist",
        "addressId": 1,
        "addresses": {
            "addId": 1,
            "line_1": "MarlarMyine",
            "line_2": "4st",
            "township_Id": 1,
            "township": null,
            "region": "Yangon",
            "country": "Myanmar"
        }
        //     "employee_No": data.employee_No,
        // "employee_Name": data.employee_name,
        // "email": data.email,
        // "dob": data.dob,
        // "nrc":data.nrc,
        // "phone_no_work": data.phone_no_work,
        // "phone_no_personal": data.phone_no_personal,
        // "gender": data.gender,
        // "marital_status": data.matritalstatus,
        // "nationality": data.nationality,
        // "religion": data.religion,
        // "permanent_address": data.permanent_address,
        // "education_background": data.educational_background,
        // "joined_date": data.joined_date,
        // "employee_state": "Nof",
        // "addressId": data.addressId,
        // "addresses": {
        //     "line_1": "Tamwe",
        //     "line_2": "3st",
        //     "township": "Tamwe",
        //     "city": "Yangon",
        //     "region": "Yangon",
        //     "country": "Myanmar"
        // }
        }).then( response => {
            console.log(response.data)
            commit('EMPLOYEE_CREATION_MUTATIONS',"Your employee creation is successful")
        }).catch(error =>{
            console.log(error)
            commit('EMPLOYEE_CREATION_MUTATIONS',"Your employee creation is not completed")
        })
    },
    DEPARTMENT_INITIALIZE({commit}){
        axios.get('https://localhost:5001/EmployeeRole').then( response =>{
            commit('DEPARTMENT_INITIALIZE_MUTATIONS',response.data)
        }).catch( error =>{
            console.log(error)
        })
    },
    ABSENCE_EMPLOYEE({commit},data){
        axios.post('https://localhost:5001/Absence',
        {
            date : data.date,
            rate_id : 1,
            employee_id : data.employee_id
        }).then( response =>{
            commit('a',response.data)
            console.log(response.data)
        })
    },
    CREATE_INITIALIZE_ATTENDANCE_EMPLOYEE({commit}){
        commit('CREATE_INITIALIZE_ATTENDANCE_EMPLOYEE_MUTATIONS')
    },
    SELECT_EMPLOYEE_DATA_FOR_DEPARTMENT({commit},data){
        axios.get(`https://localhost:5001/EmployeeRole/api/${data.dept_id}`).then( response=>{
            commit('SELECT_EMPLOYEE_DATA_WITH_DEPARTMENT',response.data)
        })
    },
    SELECT_BRANCH_FOR_DEPARTMENT({commit},id){
        // alert(id)
        axios.get(`https://localhost:5001/Departmentes/api/${id}`).then( response=>{
            commit('SELECT_BRANCH_FOR_DEPARTMENT_MUTATIONS',response.data)
        }).catch(error=>{
            alert(error)
        })
    },
    SELECT_EMPLOYEE_DATA_DETAIL_OF_BRANCH({commit},branch_id){
        // alert(branch_id)
        axios.get(`https://localhost:5001/Departmentes/api/${branch_id}`).then(response=>{
            commit('SELECT_DATA_DETAILS',response.data)
            // alert()
        })
    },
    EMPLOYEE_DATA_DETAILS({commit},data){

        axios.get(`https://localhost:5001/EmployeeRole/api/${data.dept_id}`).then( response=>{
            commit('EMPLOYEE_DATA_DETAILS',{ details : response.data , data : data } )
        }).catch( error=>{
            alert(error)
        })
    },
    SELECT_BRANCH_NAME({commit},data){
        axios.get(`https://localhost:5001/Departmentes/${data.dept_id}`).then( response=>{
            // alert(response.data.dept_name)
            commit('SELECT_BRANCH_NAME_MUTATIONS',response.data.dept_name)
        })
    },
    SELECT_EMPLOYEE_DATA_AWARD_DATA({commit},id){
        axios.get(`https://localhost:5001/EmployeeRole/api/${id}`).then(response=>{
            commit('INITIALIZATION_FOR_BRANCH_AND_FOR_AWARD_DATA_MUTATIONS',response.data)
        })
    },
    INITIALIZATION_FOR_BRANCH_AND_FOR_AWARD_DATA({commit}){
        axios.get('https://localhost:5001/EmployeeRole').then(response=>{
            commit('INITIALIZATION_FOR_BRANCH_AND_FOR_AWARD_DATA_MUTATIONS',response.data)
        })
    },
    DELETE_AWARD_DATA({commit},data){
        axios.delete(`https://localhost:5001/Award_Punishment/${data.award_punishment_Id}`).then( response=>{
            console.log(response.data)
            axios.get('https://localhost:5001/EmployeeRole').then(responsedata=>{
                commit('INITIALIZATION_FOR_BRANCH_AND_FOR_AWARD_DATA_MUTATIONS',responsedata.data)
            })
        }).catch( error=>{
            alert(error)
        })
    },
    EDIT_AWARD_DATA({commit},data){
        // alert(data.award_punishment_Id)
        // alert(data.prize)
        // alert(data.date)
        // alert(data.description)
        // alert(data.remark)
        // alert(data.employee_id)    
        axios.put(`https://localhost:5001/Award_Punishment/${data.award_punishment_Id}`,{
            "award_punishment_Id": data.award_punishment_Id,
            "award_punishment": data.prize,
            "date": data.date,
            "description": data.description,
            "remark": data.remark,
            "employee_id": data.employee_id
        }).then( response=>{
            console.log(response.data)
            axios.get('https://localhost:5001/EmployeeRole').then(response=>{
                commit('INITIALIZATION_FOR_BRANCH_AND_FOR_AWARD_DATA_MUTATIONS',response.data)
            })
        }).catch( error=>{
            alert(error)
        })
    },
    SELECT_YEARS_ACTIONS({commit},data){
        axios.get(`https://localhost:5001/Attendence/${data.month}/${data.years}`).then( response =>{
            commit('SELECT_ATTENDANCE_DATA_MUTATIONS',response.data)
        }).catch( error =>{
            console.log(error)
        })
    },
    ADD_SERVICE_PERFORMANCE({commit},data){
        commit('SERVICE_PERFORMANCE',data)
    },
    END_TIME_ACTIONS({commit},data){
        commit('END_TIME_MUTATIONS',data)
    },
    START_TIME_ACTIONS({commit},data){
        commit('START_TIME_ACTIONS_MUTATIONS',data)
    },
    SELECT_BRANCH_DATA_INITIALIZE({commit}){
        axios.get('https://localhost:5001/Branch').then( response=>{
            commit('SELECT_BRANCH_DATA_LIST',response.data)
        })
    },
    SELECT_BRANCH_FOR_DEPARTMENT_LIST({commit},branch_id){
        axios.get('https://localhost:5001/Departmentes').then( response=>{
            commit('SELECT_BRANCH_DATA_FOR_DEPARTMENT',{ branch_id : branch_id, data : response.data })
        })
    },
    SELECT_DAY_ACTIONS({commit},data){
        axios.get(`https://localhost:5001/Attendence/${data.day}/${data.month}/${data.years}`).then( response=>{
            commit('SELECT_ATTENDANCE_DAY_DATA_MUTATIONS',response.data)
        })
    },
    EMPLOYEE_DATA_FOR_LEAVE({commit}){
        axios.get('https://localhost:5001/Leave').then( response=>{
            commit('EMPLOYEE_DATA_FOR_LEAVE_MUTATION',response.data)
        })
    },
    AWARD_CREATE_INITIALIZE({commit}){
        axios.get('https://localhost:5001/Branch').then( response =>{
            commit('Create_initialize_branches',response.data)
        })
    },
    SELECT_BRANCH_NAME_FOR_DEPARTMENT({commit},data){
        axios.get(`https://localhost:5001/Departmentes/api/${data}`).then( response=>{
            commit('SELECT_BRANCH_NAME_FOR_DEPARTMENT',response.data)
        })
    },
    SELECT_DEPARTMENT_FOR_EMPLOYEE({commit},data){
        axios.get(`https://localhost:5001/EmployeeRole/api/${data}`).then( response=>{
            commit('SELECT_DEPARTMENT_FOR_EMPLOYEE',response.data)
        })
    },



    // Rate Form
    RATE_DATA({commit}){
        axios.get('https://localhost:5001/Rate').then( response=>{
            commit('RATE_DATA_MUTATIONS',response.data)
        })
    },
    EDIT_RATE_DATA({commit},data){
        axios.put(`https://localhost:5001/Rate/${data.id}`,
        {
            "rateId": data.id,
            "name": data.name,
            "rate": data.rate,
            "type": data.type,
            "description": data.description 
        }).then( responseone =>{
            console.log(responseone.data)
            // alert("success")
            axios.get('https://localhost:5001/Rate').then( response=>{
                commit('RATE_DATA_MUTATIONS',response.data)
            })
        }).catch( error=>{
            alert(error)
        })
    },
    INSERT_DATA_OF_RATE({commit},data){
        axios.post('https://localhost:5001/Rate',
        {
            "name": data.name,
            "rate": data.rate,
            "type": data.type,
            "description": data.description
        }).then(responseone=>{
            console.log(responseone.data)
            axios.get('https://localhost:5001/Rate').then( response=>{
                commit('RATE_DATA_MUTATIONS',response.data)
            })
        }).catch( error=>{
            alert(error)
        })
    },
    DELETE_RATE_DATA({commit},id){
        axios.delete(`https://localhost:5001/Rate/${id}`).then(response=>{
            console.log(response.data)
            axios.get('https://localhost:5001/Rate').then( response=>{
                commit('RATE_DATA_MUTATIONS',response.data)
            })
        })
    },


    // DEPARTMENT CREATION FROM
    BRANCH_DATA({commit}){
        axios.get('https://localhost:5001/Branch').then( response=>{
            commit('BRANCH_DATA_MUTATIONS',response.data)
        })
    },
    INSERT_DEPARTMENT_DATA({commit},data){
        axios.post('https://localhost:5001/Departmentes',
        {
            "dept_name": data.dept_name,
            "priority": data.priority,
            "phone_no": data.phno,
            "remark": data.remark,
            "branch_id": data.branch_id
        }).then( response=>{
            console.log(response.data)
            commit('aa')
        }).catch(error=>{
            alert(error)
        })
    },

    // LEAVE CREATION FROM
    INSERT_LEAVE_DATA({commit},data){
        axios.post('https://localhost:5001/Leave',{
            "leave_type": data.leave_type,
            "from_date": data.from_date,
            "to_date": data.to_date,
            "employee_id": data.employee_id
        }).then( response=>{
            console.log(response.data)
            commit("aa",response.data)
        })
    },


    // ALL EMPLOYEE FORM
    EMPLOYEE_ALL_DATA({commit}){
        axios.get('https://localhost:5001/EmployeeRole').then( response=>{
            commit('EMPLOYEE_ALL_DATA_MUTATIONS',response.data)
        })
    },
    SELECT_DEPARTMENT_FOR_EMPLOYEE_ALL({commit},id){
        axios.get(`https://localhost:5001/EmployeeRole/api/${id}`).then(response=>{
            commit('SELECT_DEPARTMENT_FOR_EMPLOYEE_DATA',response.data)
        })
    },


    // ADD NEW EMPLOYEE 
    ADDING_EMPLOYEE_TO_DEPARTMENT_OF_BRANCH({commit},data){
        data.array.forEach( element=>{
            // alert("a")
            axios.post('https://localhost:5001/Employee',
            {
                "employee_No": "emp" + element.no,
                "employee_Name": element.name,
                "email": element.email,
                "dob": element.dob,
                "nrc": "f",
                "phone_no_work":"0000990009",
                "phone_no_personal": "090890899",
                "gender": element.gender,
                "marital_status": "Single",
                "nationality": "Myamar",
                "religion": "Islam",
                "permanent_address": "MyoHla,Pegu",
                "education_background": "Bechalor",
                "joined_date": "2018-02-07T00:00:00",
                "employee_state": "exist",
                "addressId": 1
            }).then( response=>{
                console.log(response.data)
                commit('BRANCH_DEPARTMENT_ADDING',data.dept_id)
            }).catch( error=>{
                alert(error)
            })
        })
    },
    DATE_FOR_ANNOUNCEMENT({commit},data){
        axios.get(`https://localhost:5001/CV_Form/${data.d}/${data.m}/${data.y}`).then(response=>{
            commit('DATE_POST_FOR_ANNOUNCETMENT',response.data)
        })
    },
    SELECT_ANNOUNCEMENT_DATA_FOR_CV({commit},data){
        axios.get(`https://localhost:5001/CV_Form/api/${data}`).then( response=>{
            commit('SELECT_ANNOUNCEMENT_FOR_CV_MUTATIONS',response.data)
        })
    },
    EMPLOYEE_CV_FORM({commit}){
        axios.get('https://localhost:5001/CV_Form').then( response=>{
            commit('EMPLOYEE_DATA_FOR_CV',response.data)
        })
    },


    // EMPLOYEE TRAINING FORM ,
    SELECT_BRANCH_FOR_EMPLOYEE({commit},id){
        axios.get(`https://localhost:5001/Departmentes/api/${id}`).then( response=>{
            commit('SELECT_BRANCH_DATA_FOR_EMPLOYEE',response.data)
        }).catch(error=>{
            alert(error)
        })
    },
    SELECT_DEPRTMENT_FOR_EMPLOYEE({commit},id){
        // alert(id)
        axios.get(`https://localhost:5001/EmployeeRole/api/${id}`).then( response=>{
            commit('SELECT_DEPARTMENT_FOR_EMPLOYEES_DATA',response.data)
        })
    },
    SELECT_DEPRTMENT_FOR_EMPLOYEE_FOR_DIALOG({commit},id){
        axios.get(`https://localhost:5001/EmployeeRole/api/${id}`).then( response=>{
            commit('SELECT_DEPARTMENT_FOR_EMPLOYEES_DATA_FOR_DIALOG',response.data)
        })
    },
    SELECT_DATE_FOR_TRAINING_NAME({commit},data){
        axios.get(`https://localhost:5001/EmployeeTraining/${data.d}/${data.m}/${data.y}/${data.dd}/${data.mm}/${data.yy}`).then(response=>{
            commit('SELECT_DATE_FOR_TRAINING_NAME_MUTATIONS',response.data)
        })
    },
    TRAINING_LIST_DATA({commit}){
        axios.get('https://localhost:5001/Training').then(response=>{
            commit('TRAINING_DATA_LIST_MUTATIONS',response.data)
        })
    },
    INITIALIZE_DATA_FOR_EMPLOYEE({commit}){
        axios.get('https://localhost:5001/EmployeeRole').then( response=>[
            commit('INITIALIZE_EMPLOYEE_DATA',response.data)
        ])
    },
    SELECT_TRAINING_FOR_EMPLOYEE_DATA({commit},id){
        // alert(id)
        axios.get(`https://localhost:5001/EmployeeTraining/api/${id}`).then( response=>{
            commit('SELECT_TRAINING_FOR_EMPLOYEE_MUTATIONS',response.data)
        }).catch( error=>{
            alert(error)
        })
    },

    // RANK FROM
    DATA_RANK_ALL_DATA({commit}){
        axios.get('https://localhost:5001/Rule').then( response=>{
                commit('DATA_RANK_ALL_DATA_MUTATIONS',response.data)
            }).catch( error=>{
                alert(error)
            })
    },
    DELETE_RULE_DATA({commit},id){
        // alert(id)
        axios.delete(`https://localhost:5001/Rule/${id}`).then( response=> {
            console.log(response.data)
            axios.get('https://localhost:5001/Rule').then( response=>{
                commit('DATA_RANK_ALL_DATA_MUTATIONS',response.data)
            }).catch( error=>{
                alert(error)
            })
        }).catch( error=>{
            alert(error)
        })
    },
    RULE_EDIT_DATA({commit},data){
        axios.put(`https://localhost:5001/Rule/${data.id}`,{
            "rule_no": data.rule_no,
            "description": data.description
        }).then(responseone=>{
            console.log(responseone.data)
            axios.get('https://localhost:5001/Rule').then( response=>{
                commit('DATA_RANK_ALL_DATA_MUTATIONS',response.data)
            }).catch( error=>{
                alert(error)
            })
        })
    },
    RULE_DATA_INPUT({commit},data){
        axios.post('https://localhost:5001/Rule',{
            "rule_no": data.rule_no,
            "description": data.description
        }).then( responseone=>{
            console.log(responseone)
            axios.get('https://localhost:5001/Rule').then( response=>{
                commit('DATA_RANK_ALL_DATA_MUTATIONS',response.data)
            }).catch( error=>{
                alert(error)
            })
        })
    },


    // TRAINING ASSIGN
    INITIALIZE_DATA_FOR_EMPLOYEE_FOR_DIALOG({commit}){
        
        axios.get('https://localhost:5001/EmployeeRole').then( response=>[
            commit('INITIALIZE_EMPLOYEE_DATA_FOR_DIALOG',response.data)
        ])
    },
    
    TRANING_LIST({commit}){
        axios.get('https://localhost:5001/Training').then( response =>{
            commit('TRAINING_MUTATIONS_List',response.data)
        }).catch( error =>{
            console.log(error)
        })
    },
    
    ADD_ASSIGN_TRAINING_EMPLOYEE({commit},data){
        // alert("a")
        data.data.forEach( element=>{
            axios.post('https://localhost:5001/EmployeeTraining',{
                "from_date": data.from_date,
                "to_date": data.to_date,
                "remark": "hjhj",
                "employee_id": element.employee_id,
                "trainingId": data.id
            }).then( response=>{
                commit('aa',response.data)
            }).catch( error=>{
                alert(error)
            })
        })
    },

    // RANK FORM
    INSERT_RANK_DATA({commit},data){
        axios.post('https://localhost:5001/Rank',{
            "name" : data
        }).then( response=>{
            console.log(response.data)
            axios.get('https://localhost:5001/Rank').then(response=>{
                commit('RANK_DATA_MUTATIONS',response.data)
            })
        })
    },
    DELETE_RANK_DATA({commit},id){
        axios.delete(`https://localhost:5001/Rank/${id}`).then( response=>{
            console.log(response.data)
            axios.get('https://localhost:5001/Rank').then(response=>{
                commit('RANK_DATA_MUTATIONS',response.data)
            })
        })
    },
    RANK_DATA({commit}){
        axios.get('https://localhost:5001/Rank').then(response=>{
            commit('RANK_DATA_MUTATIONS',response.data)
        })
    },
    INSERT_DATA_RANK({commit},data){
        axios.put(`https://localhost:5001/Rank/${data.id}`,{
            "rank_Id" : data.id,
            "name" : data.name
        }).then( response=>{
            console.log(response.data)
            axios.get('https://localhost:5001/Rank').then(response=>{
                commit('RANK_DATA_MUTATIONS',response.data)
            })
        })
    },

    // ROLE FORM 
    ROLE_DATA({commit}){
        axios.get('https://localhost:5001/Role').then( response=>{
            commit('ROLE_DATA_MUTATIONS',response.data)
        })
    },
    EDITING_ROLE_DATA({commit},data){
        axios.put(`https://localhost:5001/Role/${data.role_Id}`,{
            "role_Id": data.role_Id,
            "name": data.name,
            "priority": data.priority,
            "salary_range": data.salary_range
        }).then( response=>{
            console.log(response)
            axios.get('https://localhost:5001/Role').then( response=>{
                commit('ROLE_DATA_MUTATIONS',response.data)
            })
        })
    },
    INSERT_ROLE_DATA({commit},data){
        axios.post('https://localhost:5001/Role',{
            "name": data.name,
            "priority": data.priority,
            "salary_range": data.salaryrange
        }).then( response=>{
            console.log(response)
            axios.get('https://localhost:5001/Role').then( response=>{
                commit('ROLE_DATA_MUTATIONS',response.data)
            })
        }).catch( error=>{
            alert(error)
        })
    },
    DELETE_ROLE_DATA({commit},id){
        axios.delete(`https://localhost:5001/Role/${id}`).then( response=>{
            console.log(response.data)
            axios.get('https://localhost:5001/Role').then( response=>{
                commit('ROLE_DATA_MUTATIONS',response.data)
            })
        })
    }
}