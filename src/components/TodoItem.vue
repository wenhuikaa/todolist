<template>
  <li @mouseenter="handleShow(true)" @mouseleave="handleShow(false)" :style="{background:bgcolor}">
    <label>
      <input type="checkbox" v-model="todo.complete">
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" style="display:none" v-show="isShow" @click="deleteItem">删除</button>
  </li>
</template>

<script>
export default {
    props:{
        todo:Object,
        index:Number,
        deleteTodo:Function
    },
    data(){
      return {
        bgcolor:'white', //默认按钮的背景颜色
        isShow:false   //表示按钮是否显示
      }
    },
    methods:{
      handleShow(isEnter){
        if(isEnter){
          this.bgcolor='#aaaaaa',
          this.isShow=true
        }else{
          this.bgcolor='white',
          this.isShow=false
        }
      },

      deleteItem(){
        //取出接收到的属性
        const {todo,index,deleteTodo}=this
        if(window.confirm(`确认删除${todo.title}吗？`)){
          deleteTodo(index)
        }
      }
    }
};
</script>

<style>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
