<template>
  <div class="container">
    <b-navbar>
      <template slot="start">
        <b-navbar-item href="/home">
          Table
        </b-navbar-item>
<!--        <b-navbar-item href="/form">-->
<!--          Form-->
<!--        </b-navbar-item>-->
      </template>

    </b-navbar>
    <div class="container">

      <b-table :data="this.employees"
               :columns="columns"
               :selected.sync="selected">
      </b-table>
      <button class="button field is-success" @click="selected = null"
              :disabled="!selected">
        <b-icon icon="close"></b-icon>
        <span>Clear selected</span>
      </button>
      <button class="button field is-danger" @click="deleteEmp()"
              :disabled="!selected">
        <b-icon icon="close"></b-icon>
        <span>Delete employee</span>
      </button>
      <button class="button field is-warning" @click="updateEmp()"
              :disabled="!selected">
        <b-icon icon="close"></b-icon>
        <span>Update employee</span>
      </button>
      <button class="button field is-success" @click="ii()">
        <b-icon icon="close"></b-icon>
        <span>Insert employee</span>
      </button>
      <section class="container" v-if="this.update || this.insert">
        <b-field label="Name:">
          <b-input v-model="name"></b-input>
        </b-field>

        <b-field label="Employee code:">
          <b-input v-model="empCode"></b-input>
        </b-field>

        <b-field label="Salary:">
          <b-input v-model="salary"></b-input>
        </b-field>
        <b-button v-if="update" @click="updatePerson" type="is-success">Update</b-button>
        <b-button v-if="insert" @click="insertEmp" type="is-success">Insert</b-button>
      </section>
    </div>
  </div>
</template>

<script>
  import { deleteEmployee, getAllEmployees, updateEmployee, saveEmployee } from "../httpClient/api";
  export default {
  name: 'Table',
    data() {
    return {
      name: null,
      empCode: null,
      salary: null,
      update: false,
      insert: false,
      selected: null,
      data: [
        { 'id': 'Jesse', 'name': 'Simmons', 'empCode': 'Simmons', 'salary': 'Simmons' }
      ],
      columns: [
        {
          field: 'EmpID',
        },
        {
          field: 'Name',
        },
        {
          field: 'EmpCode',
        },
        {
          field: 'Salary',
        }
      ],
      computed: {
        editableFields() {
          return this.employees.filter(field => { return field.editable === true })
        }
      },
      actions: [
        {
          btn_text: "Download",
          event_name: "on-download",
          class: "btn btn-primary my-custom-class",
          event_payload: {
            msg: "my custom msg"
          }
        }
      ],
      employees: []
    }
  },
  methods: {
     deleteEmp: async function () {
      console.log("delete");
      console.log(this.selected);
      await deleteEmployee(this.selected.EmpID).then(()=> {
        this.employees = this.employees.filter(x=> {
          return x.EmpID !== this.selected.EmpID;
        });
        this.selected = null;

        console.log(this.employees);
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Employee deleted successfully!',
          type: 'is-success'
        });
      }).catch((err)=> {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something's not good. ` + err,
          position: 'is-bottom',
          type: 'is-danger'
        })
      });
    },
    updateEmp: function () {
      this.update = true;
      this.name = this.selected.Name;
      this.empCode = this.selected.EmpCode;
      this.salary = this.selected.Salary;
    },
    ii: function () {
      this.insert = true;
    },
    insertEmp: async function () {
      let payload = {
        name: this.name,
        empCode: this.empCode,
        salary: this.salary,
      };
      await saveEmployee(payload).then(()=> {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Employee added successfully!',
          type: 'is-success'
        });

        console.log(this.employees);
        let tempEmp = {
          Name: this.name,
          EmpCode: this.empCode,
          Salary: this.salary
        };
        this.employees.push(tempEmp);

        this.selected = null;
        this.insert = false;

        this.name = null;
        this.empCode = null;
        this.salary = null;
      }).catch((err)=> {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something's not good. ` + err,
          position: 'is-bottom',
          type: 'is-danger'
        })
        this.selected = null;

        this.name = null;
        this.empCode = null;
        this.salary = null;
      });
      this.employees = (await getAllEmployees()).data;
    },
    updatePerson: async function () {
      let payload = {
        name: this.name,
        empCode: this.empCode,
        salary: this.salary,
        id: this.selected.EmpID
      };
      await updateEmployee(payload).then(()=> {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Employee updated successfully!',
          type: 'is-success'
        });
        console.log("HAAAAA");

        this.employees = this.employees.filter(x=> {
          return x.EmpID !== this.selected.EmpID;
        });
        console.log("HAAAAA");
        console.log(this.employees);
        let tempEmp = {
          EmpID: this.selected.EmpID,
          Name: this.name,
          EmpCode: this.empCode,
          Salary: this.salary
        };
        this.employees.push(tempEmp);

        this.selected = null;
        this.update = false;

        this.name = null;
        this.empCode = null;
        this.salary = null;
      }).catch((err)=> {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something's not good. ` + err,
          position: 'is-bottom',
          type: 'is-danger'
        })
        this.selected = null;
        this.update = false;

        this.name = null;
        this.empCode = null;
        this.salary = null;
      });
    }
  },
  async mounted() {
    this.employees = (await getAllEmployees()).data;
    console.log(this.employees);
  }
}
</script>
