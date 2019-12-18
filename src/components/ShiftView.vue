<template>
  <v-container class="card">
    <v-form>
      <v-flex xs12 md10>
        <v-layout row wrap>
          <v-flex>
            <h1 style="text-align:left">Shift</h1>
          </v-flex>
          <v-spacer />
          <v-flex xs12 sm3 md3>
            <div class="text-xs-right">
              <v-btn class="primary" round router to="/shift">
                <span>
                  <v-icon small>add</v-icon>
                </span>
&nbsp;Add Shift
              </v-btn>
            </div>
          </v-flex>
          <br />
        </v-layout>
      </v-flex>
      <v-flex xs12 md10>
        <v-divider style="color:gray"></v-divider>
      </v-flex>

      <br />
      <br />

      <v-layout justify-end>
        <router-link to="/departmentform" style="text-decoration: none"></router-link>
      </v-layout>
      <v-flex xs12 md10>
        <v-data-table :headers="deptheader" :items="shift_list" style="border:1px solid gray">
          <template slot="headers" slot-scope="props">
            <tr style="background-color:#375aca">
              <td
                style="color:white"
                v-for="header in props.headers"
                :key="header.text"
              >{{header.text}}</td>
            </tr>
          </template>
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.shift_name }}</td>
            <td>{{ props.item.shift_start_time }}</td>
            <td>{{ props.item.shift_end_time }}</td>
            <td>
              <v-icon small class="icon_size" color="blue" @click="editItem(props.item)">edit</v-icon>
              <v-icon small @click="deleteItem(props.item)" color="red">delete</v-icon>
            </td>
          </template>
        </v-data-table>
      </v-flex>
      <!-- for editing shift -->
      <v-dialog v-model="dialog1" max-width="550px" persistent="on">
        <v-card class="card">
          <v-container>
            <v-form class="form">
              <h1 style="text-align:left">Editing Shift</h1>
              <br />
              <v-divider style="color:gray"></v-divider>

              <br />
              <br />
              <!-- Form design -->

              <v-layout row wrap>
                <v-flex xs12 sm5 md5>
                  <v-subheader>Shift Name :</v-subheader>
                </v-flex>
                <v-flex xs12 sm5 md6>
                  <v-text-field
                    v-model="edit_shift_name"
                    v-validate="'required'"
                    placeholder="Enter shift name"
                    name="Name"
                  ></v-text-field>

                  <span class="span1">{{ errors.first('Name') }}</span>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm5 md5>
                  <v-subheader>Start Time:</v-subheader>
                </v-flex>
                <v-flex xs12 sm5 md6>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="time2" label="Picker in menu" readonly v-on="on"></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu"
                      v-model="time2"
                      full-width
                      @click:minute="$refs.menu.save(time)"
                    ></v-time-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <br />
              <v-layout row wrap>
                <v-flex xs12 sm5 md5>
                  <v-subheader>End Time :</v-subheader>
                </v-flex>
                <v-flex xs12 sm5 md6>
                  <v-menu
                    ref="menu"
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="time1" label="Picker in menu" readonly v-on="on"></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu1"
                      v-model="time1"
                      full-width
                      @click:minute="$refs.menu.save(time)"
                    ></v-time-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-card-actions style="padding-left:150px">
                <v-btn small color="blue" round class="white--text" @click="EditSubmit">Submit</v-btn>
                <v-btn small color="blue" round class="white--text" @click="close">Cancel</v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" max-width="400px" persistent="on">
        <v-card>
          <h2 style="padding:20px;">Are You Sure to Delete item?</h2>
          <v-divider style="color:gray"></v-divider>
          <br />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" flat @click="dialog2close">Cancel</v-btn>
            <v-btn color="success" flat @click="ok">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      e1: 0,
      dialog1: "",
      dialog2: false,
      data: [],
      exitingdept: 0,
      editedIndex: -1,
      time2: null,
      menu: false,
      menu1: false,
      time1: null,

      shift_id: "",
      headers: [
        { text: "Shift Name", value: "empname" },
        { text: "Start Time", value: "id" },
        { text: "End Time", value: "id" },
        { text: "Action", value: "action", sortable: false }
      ],
      deptheader: [
        { text: "No", value: "no" },
        { text: "Shift Name", value: "name" },
        { text: "Start Time", value: "view" },
        { text: "End Time", value: "action", sortable: false },
        { text: "Action", value: "action", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters(["shift_list"])
  },
  created() {
    this.$store.dispatch("SHIFT_INITIALIZE");
  },
  methods: {
    //  To delete one row in the table
    deleteItem(item) {
      this.id = item.id;
      this.dialog2 = true;
    },
    ok() {
      this.$store.dispatch("DELETE_SHIFT_DATA", this.id);
      this.dialog2 = false;
    },

    close() {
      this.dialog1 = false;
    },
    dialog2close() {
      this.dialog2 = false;
    },

    editItem(item) {
      this.shift_id = item.id;
      this.edit_shift_name = item.shift_name;
      this.time2 = item.shift_start_time;
      this.time1 = item.shift_end_time;
      this.dialog1 = true;
    },
    EditSubmit() {
      this.$store.dispatch("EDIT_SHIFT_DATA", {
        shift_id: this.shift_id,
        shift_name: this.edit_shift_name,
        start_time: this.time2,
        end_time: this.time1
      });
      this.dialog1 = false;
    },

    add(item) {
      this.addemp.push(item);
      const index = this.employee.indexOf(item);

      this.employee.splice(index, 1);
    }
  }
};
</script>



<style scoped>
</style>

