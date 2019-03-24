<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- 导致addTodo函数没有生效的原因是因为这里没有传给TodoHeader -->
      <TodoHeader :addTodo="addTodo"/>
      <TodoList :todos="todos" :deleteTodo="deleteTodo"/>
      <TodoFooter
        :todos="todos"
        :deleteCompleteTodos="deleteCompleteTodos"
        :selectAllTodos="selectAllTodos"
      />
      <TodoFooter>
        <input type="checkbox" v-model="isAllCheck" slot="checkAll">
        <span slot="count">已完成{{completeSize}} / 全部{{todos.length}}</span>
        <button
          class="btn btn-danger"
          v-show="completeSize>0"
          @click="deleteCompleteTodos"
          slot="delete"
        >清除已完成任务</button>
      </TodoFooter>
    </div>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue"
import TodoList from "./components/TodoList.vue"
import TodoFooter from "./components/TodoFooter.vue"
import storageUtil from "./components/util/storageUtil"

export default {
  data() {
    return {
      // 因为localStorage里面都是文本（字符串），所以用JSON.parse解析，但是也可能是空数组，则解析空数组的字符串
      // todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
      todos:storageUtil.readTodos()
    };
  },
  components: {
    TodoHeader,
    TodoList,
    TodoFooter
  },

  watch: {
    //深度监视
    todos: {
      // handler:function(value) {
      //   //处理函数
      //   //将todos最新的值的JSON数据，保存到localStorage里面去
      //   //JSON.stringify:将javascript值转换成JSON值,因为上面传进去的是JSON值，那么这里拿出来也是JSON值
      //   // window.localStorage.setItem('todos_key', JSON.stringify(value));
      //   storageUtil.saveTodos(value)
      // },
      handler:storageUtil.saveTodos,  //其实就相当于上面的function(value)
      deep:true  //深度监视
    }
  },

  methods: {
    addTodo(todo) {
      this.todos.unshift(todo);
    },

    deleteTodo(index) {
      this.todos.splice(index, 1);
    },

    //删除所有选中的Todo
    deleteCompleteTodos() {
      this.todos = this.todos.filter(todo => !todo.complete);
    },

    //全选/全不选
    selectAllTodos(check) {
      this.todos.forEach(todo => (todo.complete = check));
    }
  },

  computed: {
    completeSize() {
      return this.todos.reduce(
        (preTotal, todo) => preTotal + (todo.complete ? 1 : 0),
        0
      );
    },

    isAllCheck: {
      get() {
        return this.completeSize === this.todos.length && this.todos.length > 0;
      },

      set(value) {
        //value是当前checkbox最新的值
        this.selectAllTodos(value);
      }
    }
  }
};
</script>

<style>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
