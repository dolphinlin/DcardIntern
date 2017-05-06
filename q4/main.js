const filters = {
  all(todos) {
    return todos
  },
  completed(todos) {
    return todos.filter(todo => todo.complete)
  },
  uncomplete(todos) {
    return todos.filter(todo => !todo.complete)
  }
}

new Vue({
  el: '#app',
  data: {
    todos: [],
    newTodo: '',
    todoindex: 0,
    filterBy: 'all',
    editable: false,
    editObject: {}
  },
  computed: {
    todosFilter() {
      return filters[this.filterBy](this.todos)
    }
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
    },
    changeFilter(f) {
      this.filterBy = f
    },
    clear() {
      this.todos.forEach((todo) => {
        if (todo.complete) {
          this.removeTodo(todo)
        }
      })
    },
    editTodo(todo) {
      this.editObject = todo
      this.editable = true
    },
    completeEdit() {
      this.editObject = {}
      this.editable = false
    }
  }
})
