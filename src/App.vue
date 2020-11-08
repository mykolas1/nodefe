<template>
  <div id="app">
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
    <Table/>
  </div>
</template>

<script>
import Table from './components/Table.vue'

export default {
  name: 'App',
  components: {
    Table
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
