<template>
  <div>
    <h1>lista de tareas</h1>
    <!-- formulario de entrada de tareas -->
    <form @submit.prevent="addTodo()">
      <el-input placeholder="todo" v-model="todo"></el-input>
    </form>
    <el-row :gutter="12">
      <!-- área de visualización de tareas pendientes -->
      <ToDoItem v-for="( todo, index ) in todos" :todo="todo" @resolve="removeTodo(index)" :key="index" />
      <!-- zona de visualización de problemas -->
      <ToDoItem v-for="( issue, index ) in issues" :todo="issue.title" @resolve="closeIssue(index)" :key="issue.id" />
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import ToDoItem from '@/components/ToDoItem';

const client = axios.create({
  baseURL: `${process.env.VUE_APP_GITHUB_ENDPOINT}`,
  headers: {
    'Authorization': `token ${process.env.VUE_APP_GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type':'application/json',
  },
})

export default {
  name: 'ToDoIssues',
  components: {
    ToDoItem
  },
  data () {
    return {
      todo: '',
      todos: [],
      issues: []
    }
  },
  methods: {
    addTodo(){
      this.todos.push(this.todo);
      this.todo= '';
    },
    removeTodo(index){
      this.todos.splice(index, 1);
    },
    closeIssue(index){
      const target = this.issues[index];
      client.patch(`/issues/${target.number}`,
          {
            state: 'closed'
          },
        )
        .then(() => {
         this.issues.splice(index, 1);
      })
    },
    getIssues() {
      client.get('/issues')
        .then((res) => {
          this.issues = res.data
      })
    }
  },
  created() {
    this.getIssues();
  }
}
</script>