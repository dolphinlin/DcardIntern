new Vue({
  el: '#app',
  data: {
    todos: [],
    newTodo: '',
    todoindex: 0
  },
  methods: {
    addItem() {
      this.todos.push({
        id: this.todoindex,
        name: this.newTodo,
        complete: false
      })
      this.newTodo = ''
    },
    removeTodo(i) {
      this.todos.splice(this.todos.indexOf(i), 1)
    }
  }
})
