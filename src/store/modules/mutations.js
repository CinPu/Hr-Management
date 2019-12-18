import axios from 'axios'
export default{
    create_department_detail(state,data){
        state.department_detail = []
        data.forEach( element =>{
            state.department_detail.push(
                {
                    dept_id : element.dept_id,
                    dept_name : element.dept_name,
                    branch_id: element.branch_id,
                    branch_name :element.branches.name,
                    remark :element.remark,
                    phone_no : element.phone_no,
                    priority : element.priority
                }
            )
        })
    },
    SELECT_BRANCH_DATA_FOR_DEPARTMENT(state,details){
        state.department_detail = []
        details.data.forEach( response =>{
            if( details.branch_id === response.branch_id ){
                state.department_detail.push( 
                    {
                        branch_name : response.branches.branch_name,
                        branch_id : response.branch_id,
                        dept_name : response.dept_name,
                        dept_id : response.dept_id
                    }
                )
            }
        })
    },
    SELECT_BRANCH_DATA_LIST(state,data){
        state.branch_list = []
        data.forEach( element=>{
            
            state.branch_list.push({
                branch_id : element.id,
                branch_name : element.name
            })
        })
    },
    SELECT_ALL_BRANCH_DATA(state,data){
        state.branch_data_detail = []
        data.forEach( element=>{
            state.branch_data_detail.push({
                id : element.id,
                name: element.name,
                phone_1: element.phone_1,
                phone_2: element.phone_2,
                addressId: element.addressId,
                line_1: element.addresses.line_1,
                line_2: element.addresses.line_2,
                region: element.addresses.region,
                country: element.addresses.country
                
            })
        })
    },
    EMPLOYEE_DATA_LIST_ACTIONS(state,data){
        state.employee_list=[]
        axios.get('https://localhost:5001/EmployeeRole').then( response=>{
            let no = 0
            data.forEach( emp=>{
                let count = 0 
                response.data.forEach( element=>{
                    if( emp.employeeId !== element.employee_id){
                        count = count + 1
                    }
                    if( count === response.data.length){
                        no = no + 1
                        state.employee_list.push({
                            no : no,
                            employee_id : emp.employeeId,
                            employee_Name : emp.employee_Name
                        })
                    }
                })
            })
        })
    },
    department_create_mutation(data){
        console.log(data)
        data.forEach( element =>{
            axios.post('https://localhost:5001/Departmentes',element).then(response =>{
                // alert("successful")
            console.log(response.data)
            }).catch( error =>{
                alert('fail'+ error)
            })
        })
    },
    create_branch_detail(state,data){
        state.branch_detail =[]
        data.forEach( element=>{
            state.branch_detail.push(
                {
                    branch_name : element.name,
                    branch_id : element.id
                }
            )
        })
    },
    BRANCH_CREATION_MUTATIONS(state,result){
        state.result = result
        // alert(state.result)
    },
    EMPLOYEE_CREATION_MUTATIONS(state,result){
        state.result = result
    },
    REMOVE_EMPLOYEE_OTHERS_MUTATIONS(state,data){
        state.employee_data_detail.forEach( element=>{
            if(element.department_id === data.department_id){
                // alert(element.department_id)
                if( element.branch_id === data.branch_id ){
                    // alert(element.branch_name)
                    // if( element.roleid === data.role_id){
                        // alert(element.roleid)
                        axios.put(`https://localhost:5001/EmployeeRole/${data.id}`,
                            {
                                "department_id": data.department_id,
                                "employee_id": data.employee_id,
                                "roleid": data.role_id
                            }
                        ).then( response =>{
                            console.log(response.data)
                            // alert("successful")
                            axios.delete(`https://localhost:5001/EmployeeRole/${element.id}`).then(response=>{
                            console.log(response.data)
                            // alert("successful")
                        }).catch( error =>{
                            alert("error2")
                            console.log(error)
                        })
                        }).catch( error =>{
                            console.log(error)
                            alert("error1")
                        })
                        
                }
            }
        })
    },
    CREATE_INITIALIZE_MUTATIONS(state,data){
        state.employee_data_detail =[]
        let no = 0
        data.forEach( element =>{
            no = no + 1
            state.employee_data_detail.push({
                no : no,
                id : element.id,
                employee_id: element.employee_id,
                employee_No : element.employee.employee_No,
                employee_Name : element.employee.employee_Name,
                department_id : element.department_id,
                dept_name : element.department.dept_name,
                branch_id : element.department.branch_id,
                branch_name : element.department.branches.name,
                roleid : element.roleid,
                role_name : element.role.name,
                leave_type : '',
                leave_id : '',
                leave_from:'',
                leave_to:'',
                leave_no_day:'',
                dutyroster_id:'',
                dutyroster_detail_id:'',
                shift_id:'',
                shift_name : ''
            })
        })
        console.log(state.employee_data_detail)
    },
    DUTTYROSTER_DATA(state,data){
        state.employee_data_detail.forEach( element =>{
            data.forEach( row=>{
                if( element.employee_id === row.employee_id ){
                    element.dutyroster_detail_id = row.dutyRosterDetail_id,
                    element.dutyroster_id = row.dutyRoster_id,
                    element.shift_id = row.dutyRosters.shift_Id,
                    axios.get(`https://localhost:5001/Shifts/${parseInt(element.shift_id)}`).then( response =>{
                        // alert('success')
                        element.shift_name = response.data.name
                    }).catch( error =>{
                        console.log(error)
                        // alert("error")
                    })
                }
            })
            
        })
    },
    SELECT_BRANCH_NAME_MUTATIONS(state,data){
        state.department_name = data
    },
    EMPLOYEE_DATA_DETAILS(state,data){
        state.employee_data_detail = []
        var count = 0
        data.details.forEach(element=>{
                count = count + 1
                state.employee_data_detail.push({
                    no : count,
                    id : element.id,
                    employee_id: element.employee_id,
                    employee_No : element.employee.employee_No,
                    employee_Name : element.employee.employee_Name,
                    department_id : element.department_id,
                    roleid : element.roleid,
                    role_name : element.role.name
                })
            // }
            
        })
    },
    DUTYROSTER_INPUT(state,data){
        // alert(data.employee_id)
        axios.get('https://localhost:5001/DutyRoster').then( response =>{
            var count = 0
            var dutyroster_id = ''
            response.data.forEach( element=>{
                count ++
                if( count === response.data.length){
                    dutyroster_id = element.id
                }
            })
                axios.post('https://localhost:5001/DutyRosterDetail',{
                    "dutyRoster_id": dutyroster_id,
                    "employee_id" : data.employee_id
                }).catch( error=>{
                    alert(error)
                })
                state.employee_data_detail.forEach( element=>{
                    if( data.employee_id === element.employee_id){
                        element.shift_id = data.shift_id,
                        element.shift_name = data.shift_name
                    }
                })
            // }
        })
    },
    CITY_LIST_MUTATIONS(state,data){
        state.city_list = []
        data.forEach(element=>{
            // alert(element.cityId)
            state.city_list.push({
                city_name : element.name ,
                cityId : element.cityId
            })
        })
    },
    TOWNSHIP_DATA(state,data){
        state.township_list = []
        data.forEach(element=>{
            state.township_list.push({
                name : element.name ,
                id : element.townshipId
            })
        })
    },
    SELECT_CITY_MUTATION(state,data_detail){
        state.township_list = []
        alert(data.detail.id)
        data_detail.data.forEach(element=>{
            if( element.city.name === id){
                state.township_list.push({
                    id : element.townshipId ,
                    name : element.name
                })
            }
        })
    },

    // SHIFT VIEW FORM
    SHIFTS_INITIALIZE(state,data){
        state.shift_list = []
        // let noa = 0
        data.forEach( element=>{
            // alert(element.name)
            state.shift_list.push({
                id :  element.id,
                shift_name : element.name,
                shift_start_time : element.start_Time,
                shift_end_time : element.end_Time
            })
        })
        state.employee_data_shift = []
        let no = 0
        axios.get('https://localhost:5001/DutyRosterDetail').then( response=>{
            response.data.forEach( element=>{
                no = no + 1
                state.employee_data_shift.push(
                    {
                        no : no ,
                        employee_Name : element.employees.employee_Name,
                        shift_name : element.dutyRosters.shift.name
                    }
                )
            })
            
                console.log(response.data)
            }).catch(error=>{
                alert(error + "aaaaaaaaaaaa")
            })
    },

//  ALL EMPLOYEE MUTATION
    EMPLOYEE_ALL_DATA_MUTATIONS(state,data){
        state.employee_data_details = []
        let no = 0
        console.log(data)
        data.forEach( element=>{
            no = no + 1
            state.employee_data_details.push( {
                no : no,
                employee_id : element.employee_id,
                employee_Name : element.employee.employee_Name,
                role_name : element.role.name,
                salary_range : element.role.salary_range,
                rank : element.ranks.name
            })
        })
    },
    SELECT_DEPARTMENT_FOR_EMPLOYEE_DATA(state,data){
        state.employee_data_details = []
        let no = 0
        data.forEach( element=>{
            no = no + 1
            state.employee_data_details.push( {
                no : no,
                employee_id : element.employee_id,
                employee_Name : element.employee.employee_Name,
                role_name : element.role.name,
                salary_range : element.role.salary_range,
                rank : element.ranks.name
            })
        })
    },

    // ADD NEW EMPLOEE
    DATE_POST_FOR_ANNOUNCETMENT(state,data){
        state.announcement_data = []
        data.forEach( element=>{
            state.announcement_data.push({
                id : element.announcement_id,
                title : element.announcement.title
            })
        })
    },
    EMPLOYEE_DATA_FOR_CV(state,data){
        state.employee_cv_form = []
        let no = 0
        data.forEach( element=>{
            no = no + 1
            state.employee_cv_form.push({
                id : element.id,
                no : no,
                date: element.date,
                name: element.name,
                email: element.email,
                dob: element.dob,
                ph_no_work: element.ph_no_work,
                gender: element.gender,
                qualification: element.qualification,
                title : element.announcement.title
            })
        })
        axios.get('https://localhost:5001/Announcement').then( response=>{
            state.announcement_data = []
            let no = 0
            response.data.forEach( element=>{
                let [dates,other]=element.date.split(" ")
                console.log(other)
                no = no + 1
                state.announcement_data.push({
                    no : no  ,
                    id : element.id,
                    title : element.title ,
                    description : element.description ,
                    date : dates
                })
            })
        })
        axios.get('https://localhost:5001/Rank').then(response=>{
            state.rank_data = []
            response.data.forEach( element=>{
                state.rank_data.push({
                    rank_Id : element.rank_Id ,
                    rank_name : element.name
                })
            })
        })
        axios.get('https://localhost:5001/Role').then( response=>{
            state.role_data = []
            response.data.forEach( element=>{
                state.role_data.push({
                    role_Id : element.role_Id ,
                    role_name : element.name
                })
            })
        })
        // alert(state.employee_cv_form.length)
    },
    START_TIME_ACTIONS_MUTATIONS(state,data){
        state.employee_data_attendance.forEach( element=>{
            if( element.employee_number === data.employee_id ){
                element.start_time = data.t,
                element.start_time_disable = true 
                element.status = data.status
                element.remarks = data.remarks
            }
        })
    },
    INITIALIZATION_FOR_BRANCH_AND_FOR_AWARD_DATA_MUTATIONS(state,data){
        state.award_data = []
        let no = 0
        data.forEach( element=>{
            axios.get('https://localhost:5001/Award_Punishment').then(response=>{
                response.data.forEach( elementone=>{
                    if(elementone.employee_id === element.employee_id ){
                        no = no + 1
                        state.award_data.push({
                            no : no,
                            employee_id : element.employee_id,
                            employee_Name : element.employee.employee_Name,
                            roleid : element.roleid,
                            role_name : element.role.name,
                            award_punishment_Id :elementone.award_punishment_Id,
                            prize : elementone.award_punishment,
                            date : elementone.date,
                            description : elementone.description,
                            remark : elementone.remark
                        })
                    }
                })
            })
        })
    },
    Create_initialize_leave(state,data){
        state.leave_type_list = []
        data.forEach( element => {
            state.employee_data_detail.forEach( elementone =>{
                if( elementone.employee_id === element.employee_id ){
                    elementone.leave_type = element.leave_type,
                    elementone.leave_id = element.id,
                    elementone.leave_from = element.from_date,
                    elementone.leave_to = element.to_date
                }
            })
            if( state.leave_type_list.length === 0){
                state.leave_type_list.push({
                    leave_id : element.id,
                    leave_type : element.leave_type
                }
                )
            }else{
                state.leave_type_list.forEach( leave =>{
                    if( leave.leave_type !== element.leave_type){
                            state.leave_type_list.push({
                                leave_type : element.leave_type,
                                leave_id : element.id,
                                leave_employee_id : element.employee_id
                            }
                        )
                    }
                })
            }
        })
    },
    TRAINING_MUTATIONS(state,data){
        state.training_list = []
        data.forEach( element =>{
            state.training_list.push({
                training_name : element.training,
                training_id : element.id,
                training_duration : element.duration,
                training_start_time: "1234-12-12T00:00:00",
                training_end_time: "0123-12-12T00:00:00",
                training_pre_requestive : "www",
                training_remark : "qweee"
            })
        })
    },
    Unit_Insert_Data(state,data){
        state.unit_data = []
        let no = 0
        data.forEach( element=>{
            no = no + 1
            state.unit_data.push({
                no : no + 1,
                id : element.id ,
                name : element.name ,
                price : element.price ,
                remark : element.remark
            })
        })
    },
    ADDPRODUCTPERFORMANCE(state,data){
        let no = 0
        // alert("a")
        state.product_performance_data.push({
            no : element.no + 1 ,
            employee_name : data.employee_name , 
            unit : data.unit,
            date : '2019-02-04',
            price : data.price ,
            finish : data.finish ,
            amount : data.amount
        })
        // alert(state.product_performance_data.length)
    },
    SELECT_BRANCH_FOR_DEPARTMENT_MUTATIONS(state,data){
        state.department_list = []
        data.forEach(element=>{
            state.department_list.push({
                dept_id : element.dept_id,
                dept_name : element.dept_name
            })
        })
    },
    SELECT_DATA_DETAILS(state,data){
        state.employee_data_detail = []
        let no = 0
        data.forEach( element=>{
            axios.get(`https://localhost:5001/EmployeeRole/api/${element.dept_id}`).then( response=>{
                response.data.forEach( emp=>{
                    axios.get(`https://localhost:5001/DutyRosterDetail/api/${emp.employee_id}`).then( responseone=>{
                        responseone.data.forEach( el =>{
                            if( emp.employee_id === el.employee_id ){
                                no = no + 1
                                state.employee_data_detail.push({
                                    no : no ,
                                    employee_Name : emp.employee.employee_Name,
                                    role_name : emp.role.name , 
                                    shift_name : el.dutyRosters.shift.name ,
                                    id : el.dutyRosterDetail_id
                                })
                            }else{
                                no = no + 1 
                                state.employee_data_detail.push({
                                    no : no ,
                                    employee_Name : emp.employee.employee_Name,
                                    role_name : emp.role.name , 
                                    shift_name : "" ,
                                    id : ""
                                })
                            }
                        })
                    }).catch(error=>{
                        alert(error + "a")
                    })
                })
                
            }).catch(error=>{
                alert(error)
            })
            state.department_list = []
            state.department_list.push({
                dept_id : element.dept_id ,
                dept_name : element.dept_name
            })
        })
    },
    SERVICE_PERFORMANCE(state,data){
        // let no = 0
        // alert(data.employee_name)
        // alert(data.remark)
        state.service_performance_data.push({
            no : element.no + 1 ,
            name : data.employee_name , 
            date : '2019-03-09',
            work_done : data.work_done ,
            remarks : data.remarks
        })
    },
    END_TIME_MUTATIONS(state,data){
        state.employee_data_attendance.forEach( element=>{
            if( data.employee_id === element.employee_number ) {
                element.status =data.status,
                element.end_time = data.t
                element.end_time_disable = true
            }
        })
    },
    SELECT_EMPLOYEE_DATA_WITH_DEPARTMENT(state,data){
        state.employee_data_detail = []
        let no = 0
        data.forEach( emp=>{
                axios.get(`https://localhost:5001/DutyRosterDetail/api/${emp.employee_id}`).then( responseone=>{
                    responseone.data.forEach( el =>{
                        if( emp.employee_id === el.employee_id ){
                            no = no + 1
                            state.employee_data_detail.push({
                                no : no ,
                                employee_Name : emp.employee.employee_Name,
                                role_name : emp.role.name , 
                                shift_name : el.dutyRosters.shift.name ,
                                id : el.dutyRosterDetail_id
                            })
                        }else{
                            no = no + 1 
                            state.employee_data_detail.push({
                                no : no ,
                                employee_Name : emp.employee.employee_Name,
                                role_name : emp.role.name , 
                                shift_name : "" ,
                                id : ""
                            })
                        }
                    })
                }).catch(error=>{
                    alert(error + "a")
                })
            })
    },
    Create_initialize_departments(state,data){
        state.department_list = []
        data.forEach( element =>{
            state.department_list.push(
                { department_name : element.dept_name , department_id : element.dept_id }
            )
        })
    },
    Create_initialize_branches(state,data){
        state.branch_list = []
        state.department_list = []
        state.employee_list = []
        data.forEach( element =>{
            state.branch_list.push(
                { branch_name :element.name , branch_id : element.id }
            )
        })
    },
    SELECT_DEPARTMENT_FOR_EMPLOYEE(state,data){
        state.employee_list = []
        data.forEach( element=>{
            state.employee_list.push(
                {
                    employee_id : element.employee_id,
                    employee_Name : element.employee.employee_Name
                }
            )
        })
    },
    SELECT_BRANCH_NAME_FOR_DEPARTMENT(state,data){
        state.department_list = []
        data.forEach(element=>{
            state.department_list.push({
                dept_id : element.dept_id,
                dept_name : element.dept_name
            })
        })
    },
    SELECT_ANNOUNCEMENT_FOR_CV_MUTATIONS(state,data){
        state.employee_cv_form = []
        // alert("a")
        let no = 0
        data.forEach( element=>{
            no = no + 1
            state.employee_cv_form.push({
                id: element.id,
                no : no,
                date: element.date,
                name: element.name,
                email: element.email,
                dob: element.dob,
                nrc: element.nrc,
                ph_no_work: element.ph_no_work,
                ph_no_personal: element.ph_no_personal,
                gender: element.gender,
                marital_status: element.marital_status,
                nationality: element.nationality,
                religion: element.religion,
                permanent_address: element.permanent_address,
                qualification: element.qualification,
                joined_date: element.joined_date,
                status:element.status,
                address_id: element.address_id,
                announcement_id: element.announcement_id,
                title: element.announcement.title
            })
        })
        // alert(state.employee_cv_form.length)
    },
    BRANCH_DEPARTMENT_ADDING(dept_id){
        axios.post('',{
            "start_date": "2019-07-22T00:00:00",
        "end_date": "null",
        "remark": "Good",
        "department_id": dept_id,
        "department": {
            "dept_id": 1,
            "dept_name": "Marketing Department",
            "priority": "Second ",
            "phone_no": "0977857590",
            "remark": "Good",
            "branch_id": 2,
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
        },
        "employee_id": 15,
        "employee": {
            "employeeId": 11,
            "employee_No": "emp13",
            "employee_Name": "Thian lIan Ben",
            "email": "shoonhtet@gmail.com",
            "dob": "2000-04-12T00:00:00",
            "nrc": "120456",
            "phone_no_work": "0978549300",
            "phone_no_personal": "09585774660",
            "gender": "Female",
            "marital_status": "Single",
            "nationality": "Myamar",
            "religion": "Buddsh",
            "permanent_address": "Pyay",
            "education_background": "Bechalor",
            "joined_date": "2018-02-07T00:00:00",
            "employee_state": "Nof",
            "addressId": 16,
            "addresses": {
                "addId": 16,
                "line_1": "Tamwe",
                "line_2": "3st",
                "township": "Tamwe",
                "city": "Yangon",
                "region": "Yangon",
                "country": "Myanmar"
            }
        },
        "roleid": 1,
        "rankid": 1
        })
    },
    SELECT_ANNOUNCEMENT_DATA_MUTATIONS(state,data){
        state.announcement_data =[]
        let no = 0
        data.forEach(element=>{
            no = no + 1
            let [dates,others] = element.date.split(" ")
            console.log(others)
            state.announcement_data.push({
                no : no,
                id:element.id,
                description:element.description,
                title:element.title,
                date:dates
            })
        })
    },
    EMPLOYEE_DATA_FOR_LEAVE_MUTATION(state,data){
        state.leave_employee_data = []
        let no = 0

        data.forEach(element=>{
            axios.get(`https://localhost:5001/EmployeeRole/api/emp/${element.employee_id}`).then( response=>{
                response.data.forEach( aa=>{
                    console.log(aa)
                    // if(aa.length >= 0){
                        // alert("a")
                        no = no + 1
                    //console.log(response.data)
                    state.leave_employee_data.push({
                        no : no,
                        employee_id : aa.employee_id,
                        employee_Name : aa.employee.employee_Name,
                        dept_name : aa.department.dept_name,
                        leave_type : element.leave_type,
                        leave_from : element.from_date,
                        leave_to : element.to_date
                    })
                    // }
                    
                })    
                
            }).catch(error=>{
                alert(error)
            })
        })
    },

    // Rate mutaion
    RATE_DATA_MUTATIONS(state,data){
        state.rate_data = []
        let no = 0
        data.forEach( element=>{
            no = no + 1
            // alert(element.description)
            state.rate_data.push(
                {
                    no : no, 
                    rateId: element.rateId,
                    name: element.name,
                    rate: element.rate,
                    type: element.type,
                    description: element.description
                }
            )
        })
    },

    // DEPARTMENT CREATION FROM
    BRANCH_DATA_MUTATIONS(state,data){
        state.branch_list = []
        data.forEach( element=>{
            state.branch_list.push({
                branch_id : element.id,
                branch_name : element.name
            })
        })
    },


    // EMPLOYEE TRAINING 
    SELECT_DATE_FOR_TRAINING_NAME_MUTATIONS(state,data){
        state.training_list_data = []
        data.forEach( element=>{
            state.training_list_data.push({
                trainingId: element.trainingId,
                training : element.trainings.training
            })
        })
    },
    TRAINING_DATA_LIST_MUTATIONS(state,data){
        state.training_list_data = []
        data.forEach( element=>{
            state.training_list_data.push({
                trainingId: element.id,
                training : element.training
            })
        })
    },
    SELECT_TRAINING_FOR_EMPLOYEE_MUTATIONS(state,data){
        state.employee_data_detail = []
        let no = 0
        data.forEach(element=>{
            axios.get(`https://localhost:5001/EmployeeRole/api/emp/${element.employee_id}`).then( response=>{
                // alert(response.data.length)
                response.data.forEach( elementone=>{
                    // console.log(element)
                    no = no + 1
                    // alert(no)
                    state.employee_data_detail.push({
                        no : no,
                        employee_Name : elementone.employee.employee_Name,
                        employee_id : elementone.employee_id,
                        role_name : elementone.role.name,
                        dept_id : elementone.department_id,
                        dept_name : elementone.department.dept_name,
                        branch_name : elementone.department.branches.name
                    })
                }).catch(error=>{
                    alert(error)
                })
            })
        })
        // alert(state.employee_data_detail.length)

    },
    SELECT_BRANCH_DATA_FOR_EMPLOYEE(state,data){
        state.department_list = []
        data.forEach(element=>{
            state.department_list.push({
                dept_id : element.dept_id,
                dept_name : element.dept_name
            })
        })
    },
    INITIALIZE_EMPLOYEE_DATA(state,data){
        state.employee_data_detail = []
        let no = 0
        // alert("a")
        data.forEach( element=>{
            no = no + 1
            state.employee_data_detail.push({
                no : no,
                employee_Name : element.employee.employee_Name,
                employee_id : element.employee_id,
                role_name : element.role.name,
                dept_id : element.department_id,
                dept_name : element.department.dept_name,
                branch_name : element.department.branches.name
            })
        })
        // alert(state.employee_data_detail.length)
    },
    INITIALIZE_EMPLOYEE_DATA_FOR_DIALOG(state,data){
        state.employee_data_detail_dialog = []
        let no = 0
        data.forEach( element=>{
            no = no + 1
            state.employee_data_detail_for_dialog.push({
                no : no ,
                employee_Name : element.employee.employee_Name,
                employee_id : element.employee_id,
                role_name : element.role.name,
                dept_id : element.department_id,
                dept_name : element.department.dept_name,
                branch_name : element.department.branches.name
            })
        })
    },
    SELECT_DEPARTMENT_FOR_EMPLOYEES_DATA(state,data){
        state.employee_data_detail = []
        // alert(data.length)
        // console.log(data)
        data.forEach( element=>{
            // alert(element.employee.employee_Name)
            state.employee_data_detail.push({
                employee_Name : element.employee.employee_Name,
                employee_id : element.employee_id,
                role_name : element.role.name,
                dept_id : element.department_id,
                // dept_name : element.department.dept_name,
                // branch_name : element.department.branches.name
            })
        })
    },
    SELECT_DEPARTMENT_FOR_EMPLOYEES_DATA_FOR_DIALOG(state,data){
        state.employee_data_detail_for_dialog = []
        let no = 0
        data.forEach( element=>{
            no = no + 1
            state.employee_data_detail_for_dialog.push({
                no : no ,
                employee_Name : element.employee.employee_Name,
                employee_id : element.employee_id,
                role_name : element.role.name,
                dept_id : element.department_id,
                // dept_name : element.department.dept_name,
                // branch_name : element.department.branches.name
            })
        })
    },


    // TRAINING ASSIGN
    TRAINING_MUTATIONS_List(state,data){
        state.training_list = []
        data.forEach( element=>{
            state.training_list.push({
                id : element.id,
                training : element.training
            })
        })
    },


    // RANK FROM 
    DATA_RANK_ALL_DATA_MUTATIONS(state,data){
        state.rule_data = []
        let no = 0
        data.forEach( element=>{
            no = no + 1
            state.rule_data.push({
                no : no,
                rule_Id: element.rule_Id,
                rule_no: element.rule_no,
                description: element.description
            })
        })
    },
    RANK_DATA_MUTATIONS(state,data){
        state.rank_data = []
        data.forEach( element=>{
            state.rank_data.push({
                rank_Id : element.rank_Id,
                name : element.name
            })
        })
    },

    // ROLE DATA
    ROLE_DATA_MUTATIONS(state,data){
        state.role_data = []
        let no = 0
        data.forEach( element=>{
            no = no + 1
            state.role_data.push({
                no : no ,
                role_Id: element.role_Id,
                name: element.name,
                priority: element.priority,
                salary_range: element.salary_range
            })
        })
    }
}