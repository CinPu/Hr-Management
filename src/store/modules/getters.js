export default{
    country_list : state =>{
        return state.country_list
    },
    branch_detail: state =>{
        return state.branch_detail
    },
    leave_type_list : state =>{
        return state.leave_type_list
    },
    shift_list : state =>{
        return state.shift_list
    },
    city_list : state =>{
        return state.city_list
    },
    township_list : state =>{
        return state.township_list
    },
    announcement_data: state =>{
        return state.announcement_data
    },
    region_list : state =>{
        return state.region_list
    },
    result: state =>{
        return state.result
    },
    marital_status_list : state =>{
        return state.marital_status_list
    },
    nationality_list: state =>{
        return state.nationality_list
    },
    religion_list: state =>{
        return state.religion_list
    },
    rate_data:state=>{
        return state.rate_data
    },
    award_data : state =>{
        state.return_award_data = []
        state.award_data.forEach(element => {
            if( element.award_punishment_Id !== ''){
                state.return_award_data.push(element)
            }
        });
        return state.return_award_data
    },
    employee_data_details : state =>{ 
        return state.employee_data_details
    },
    leave_employee_data : state=>{
        return state.leave_employee_data
    },
    shift_data: state=>{
        return state.shift_data
    },
    employee_state_list : state =>{
        return state.employee_state
    },
    employee_data_shift: state =>{
        return state.employee_data_shift
    },
    branch_data_detail: state =>{
        return state.branch_data_detail
    },
    employee_data_detail_for_dialog: state=>{
        // alert(state.employee_data_detail_for_dialog.length)
        return state.employee_data_detail_for_dialog
    },
    service_performance_data: state =>{
        return state.service_performance_data
    },
    role_data : state =>{
        return state.role_data
    },
    rank_data: state =>{
        return state.rank_data
    },
    rule_data : state=>{
        // alert(state.rule_data.length)
        return state.rule_data
    },
    employee_list : state =>{
        return state.employee_list
    },
    department_name : state =>{
        return state.department_name
    },
    training_list_data : state =>{
        return state.training_list_data
    },
    training_list : state =>{
        return state.training_list
    },
    day_list: state =>{
        return state.day_list
    },
    employee_role_list : state =>{
        return state.employee_role_list
    },
    department_list : state =>{
        return state.department_list
    },
    branch_list : state =>{
        return state.branch_list
    },
    employee_data_detail:state =>{
        return state.employee_data_detail
    },
    unit_data : state =>{
        return state.unit_data
    },
    role_data : state=>{
        return state.role_data
    },
    rank_data : state=>{
        return state.rank_data
    },
    product_performance_data: state=>{
        return state.product_performance_data
    },
    department_detail: state =>{
        return state.department_detail
    },
    employee_data_attendance: state =>{
        // alert("getters")
        return state.employee_data_attendance
    },
    employee_cv_form : state =>{
        return state.employee_cv_form
    }
}