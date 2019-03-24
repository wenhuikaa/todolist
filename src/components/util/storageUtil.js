/*
使用localStorage存储数据的工具模块
1，函数
2，对象
到底选择暴露函数还是对象，那就要看你是向外暴露一个功能还是多个功能，一个功能选函数，多个功能选对象
*/

const TODOS_KEY='todos_key'
export default {
    saveTodos(todos) {
        window.localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    },

    readTodos() {
        return JSON.parse(window.localStorage.getItem(TODOS_KEY) || '[]')
    }
}