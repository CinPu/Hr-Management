import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Absence from './components/absence.vue'
import Promotion from './components/Promotion.vue'
import EmployeeAttendance from './components/EmployeeAttendance.vue'
import ProductPerformanceView from './components/Product Performance View.vue'
import ServicePerformanceview from './components/ServicePerformanceView.vue'
import PaySlip from './components/PaySlip.vue'
import Role from './components/Role.vue'
import AllEmployee from './components/AllEmployeeII.vue'
import AddNewEmployee from './components/AddNewEmployee.vue'
import ServicePerformance from './components/Service Performance.vue'
import ProductPerfomance from './components/Product Performance.vue'
import Department from './components/Department.vue'
import AbsenceView from './components/AbsenceView.vue'
import EmployeeRegistration from './components/EmployeeRegistration.vue'
import DepartmentForm from './components/DepartmentForm.vue'
import BranchCreation from './components/BranchCreation.vue'
import AttendanceRecord from './components/attendanceview.vue'
import EmployeeSalary from './components/EmployeeSalary.vue'
import Award from './components/Award.vue'
import Leave from './components/Leave.vue'
import Shift from './components/Shift.vue'
import LeaveForm from './components/LeaveForm.vue'
import DutyRoster from './components/DutyRoster.vue'
import EmployeeTraining from './components/EmployeeTraining.vue'
import Announcement from './components/AnnouncementEditDelete.vue'
import Rule from './components/Rule.vue'
import Unit from './components/Unit.vue'
import TrainingAssign from './components/TrainingAssign.vue'
import AwardView from './components/AwardView.vue'
import AnnouncementCreation from './components/Announcement.vue'
import BranchView from './components/BranchView.vue'
import Training from './components/Training.vue'
import ShiftView from './components/ShiftView.vue'
import DepartmentView from './components/DepartmentView.vue'
import Rate from './components/Rate.vue'
import Rateto from './components/rateto.vue'
import Rank from './components/Rank.vue'
import Rankto from './components/rankto.vue'
import CVForm from './components/CVForm.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/cvform',
      name :'CVForm',
      component:CVForm
    },
    {
      path:'/payslip',
      name :'PaySlip',
      component:PaySlip
    },
    {
      path:'/promotion',
      name :'Promotion',
      component:Promotion
    },
    {
      path:'/rule',
      name :'Rule',
      component:Rule
    },
    {
      path:'/employeesalary',
      name :'EmployeeSalary',
      component:EmployeeSalary
    },
    {
      path:'/attendancerecord',
      name :'AttendanceRecord',
      component:AttendanceRecord
    },
    {
      path:'/serviceperformanceview',
      name :'Service Performance View',
      component:ServicePerformanceview
    },
    {
      path:'/productperformanceview',
      name :'Product Performance View',
      component:ProductPerformanceView
    },
    {
      path:'/productperfomance/:id/:name',
      name :'ProductPerformance',
      component:ProductPerfomance
    },
    {
      path:'/serviceperformance/:id/:name',
      name :'ServicePerformance',
      component:ServicePerformance
    },
    {
      path:'/role',
      name : 'Role',
      component:Role
    },
    {
      path:'/unit',
      name :'Unit',
      component:Unit
    },
    {
      path:'/addnewemployee',
      name :'AddNewEmployee',
      component:AddNewEmployee
    },
    {
      path:'/rate',
      name:'Rate',
      component:Rate
    },
    {
      path:'/rateto',
      name:'Rateto',
      component:Rateto
    },
    {
      path:'/rank',
      name:'rank',
      component:Rank
    },
    {
      path:'/rankto',
      name:'Rankto',
      component:Rankto
    },
    {
      path:'/shiftview',
      name:'ShiftView',
      component:ShiftView
    },
    {
      path:'/trainingassign',
      name:'TrainingAssign',
      component:TrainingAssign
    },
    {
      path:'/departmentview/:dept_id/:branch_id',
      name:'DepartmentView',
      component:DepartmentView
    },
    {
      path:'/training',
      name:'Training',
      component:Training
    },
    {
      path:'/absenceview',
      name:'AbsenceView',
      component:AbsenceView
    },
    {
      path:'/',
      name:'Home',
      component:Home
    },
    {
      path:'/allemployee',
      name:'AllEmployee',
      component:AllEmployee
    },
    {
      path:'/department',
      name:'Department',
      component:Department
    },
    {
      path:'/employeetraining',
      name:'EmployeeTraining',
      component:EmployeeTraining
    },
    {
      path:'/employeeregistration',
      name:'EmployeeRegistration',
      component:EmployeeRegistration
    },
    {
      path:'/awardview',
      name:'AwardView',
      component:AwardView
    },
    {
      path:'/absence',
      name:'Absence',
      component:Absence
    },
    {
      path:'/departmentform',
      name:'DepartmentForm',
      component:DepartmentForm
    },
    {
      path:'/branchcreation',
      name:'BranchCreation',
      component:BranchCreation
    },
    {
      path:'/branchview',
      name:'BranchView',
      component:BranchView
    },
    {
      path:'/award',
      name:'Award',
      component:Award
    },
    {
      path:'/anouncementcreation',
      name:'AnnouncementCreation',
      component:AnnouncementCreation
    },
    {
      path:'/leave',
      name:'Leave',
      component:Leave
    },
    {
      path:'/shift',
      name:'Shift',
      component:Shift
    },
    {
      path:'/leaveform',
      name:'LeaveForm',
      component:LeaveForm
    },
    {
      path:'/employyeeattendance',
      name:'EmployeeAttendance',
      component:EmployeeAttendance
    },
    {
      path:'/dutyroster',
      name:'DutyRoster',
      component:DutyRoster
    },
    {
      path:'/announcement',
      name:'Announcement',
      component:Announcement
    }
  ]
})
