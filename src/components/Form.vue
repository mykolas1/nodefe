<template>
    <div class="container">
        <b-navbar>
            <template slot="start">
                <b-navbar-item href="/home">
                    Table
                </b-navbar-item>
                <b-navbar-item href="/form">
                    Form
                </b-navbar-item>
            </template>
        </b-navbar>
        <section class="container">
            <b-field label="Name:">
                <b-input v-model="name"></b-input>
            </b-field>

            <b-field label="Employee code:">
                <b-input v-model="empCode"></b-input>
            </b-field>

            <b-field label="Salary:">
                <b-input v-model="salary"></b-input>
            </b-field>
            <b-button @click="insertPerson" type="is-success">Insert</b-button>
        </section>
    </div>
</template>


<script>
    import { saveEmployee } from "../httpClient/api";

    export default {
        name: 'Form',
        data() {
            return {
                name: null,
                empCode: null,
                salary: null
            }
        },
        methods: {
            insertPerson: async function () {
                let payload = {
                    name: this.name,
                    empCode: this.empCode,
                    salary: this.salary
                };
                await saveEmployee(payload).then(() => {
                    this.$buefy.toast.open({
                            message: 'Employee saved correctly!',
                            type: 'is-success'
                    });
                }).catch(err => {
                    this.$buefy.toast.open({
                        duration: 5000,
                        message: `Something's not good. ` + err,
                        position: 'is-bottom',
                        type: 'is-danger'
                    })
                });
            }
        }
    }
</script>