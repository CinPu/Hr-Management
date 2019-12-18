<template>
 <v-layout
          justify-center
          text-xs-center
  >

  <v-flex 
      xs12  sm12 md10
  ><br><br>

 

      <v-layout row wrap >
       <h1 class="headline" style="color:black">Service Performances</h1>
    </v-layout><br>
      <v-divider></v-divider>

     <v-layout row wrap >
       <v-flex></v-flex>
       <v-spacer></v-spacer>
            
     <v-flex xs12 sm4 md3>
          <v-text-field
                    append-icon="search"
                    placeholder="Employee Name"
                    single-line
                    hide-details
                    @input="filterSearch"
            ></v-text-field>
          </v-flex>
       
    </v-layout><br>
    <v-divider></v-divider>
   
     <v-data-table
     style="border:1px solid gray"
                    :headers="headers"
                    :items="service_performance_data"
                    
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
                    <tr>
                        <td>{{ props.item.no }}</td>
                        <td>{{ props.item.date }}</td>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.work_done }}</td>
                        <td>{{ props.item.remarks }}</td>
                    </tr>
                </template>

            </v-data-table>

        </v-flex>


    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      
      filters: {
        dialog: false,
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      menu2: false,
        search: '',
        
      },

      headers: [
        {
          text: 'No',
          align: 'left',
          value: 'date',
          
        },
        {
          text: 'Date',
          value: 'date',
          align: 'left',
         
        },
        {
          text: 'Employee Name',
          value: 'employeename',
          align: 'left',
          
        },
        {
          text: 'Work Done',
          value: 'date',
          align: 'left',
          
        },
        {
          text: 'Remark',
          value: 'date',
          align: 'left',
          
        }
      ],
      rows: [
        {
           id: '1',
           date: '2015-02-12',
           employeename: 'Marcelo Tosco',
           workdone: 'Complete',
           remark:'undefined'
        },
        {
          id: '2',
          date: '2016-09-23',
          employeename: 'Carlos Campos',
          workdone: 'Complete',
          remark:'undefined'
        },
        {
          id: '3',
          date: '2017-10-29',
          employeename: 'Luis Gonzalez',
          workdone: 'Complete',
          remark:'undefined'
        },
        {
           id: '4',
          date: '2018-08-01',
          employeename: 'Keopx',
           workdone: 'Complete',
          remark:'undefined'
        },
        {
          id: '5',
          date: '2019-12-09',
          employeename: 'Marco Marocchi',
          workdone: 'Complete',
          remark:'undefined'
        },

      ]
    }),

    methods: {

      customFilter(items, filters, filter, headers) {
        // Init the filter class.
        const cf = new this.$MultiFilters(items, filters, filter, headers);

        cf.registerFilter('search', function (searchWord, items) {
          if (searchWord.trim() === '') return items;

          return items.filter(item => {
            return item.employeename.toLowerCase().includes(searchWord.toLowerCase());
          }, searchWord);

        });

        // Its time to run all created filters.
        // Will be executed in the order thay were defined.
        return cf.runFilters();
      },


      /**
       * Handler when user input something at the "Filter" text field.
       */
      filterSearch(val) {
        this.filters = this.$MultiFilters.updateFilters(this.filters, {search: val});
      },


    },
    computed:{
      ...mapGetters(['service_performance_data'])
    }

  };
</script>

<style scoped>
 .size{
  padding:10px;
}
.dialog{
  font-size: 15px;
 padding-left: 8px;
}

</style>