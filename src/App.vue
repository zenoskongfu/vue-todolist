<template>
    <div class="todo-container">
        <div class="todoForm">
            <input type="text" id="todoInput" placeholder="新增待办事项..." v-model="inputValue">
        <button type="submit" id="button-form" @click="submit">提交</button>
        </div>
        
        <div class="main-container">
            <button id="button-main">全部标为完成</button>
            <div class="list">
                
                <div class="list-item" v-for="task in tasks" :key="index">{{ task }}
                    <input type="checkbox" id="checkbox" value=" " v-model="inputValue" />    
                    <button class="delete-button" @click="deleteTask">❌</button>
                </div>
            </div>
        </div>
        <div id="task-container">
            <ul class="task-list">
                <li @click="selectAllTasks()" id="li-top">全部</li>
                <li @click="showInProgressTasks()" id="li-second">进行中</li>
                <li @click="showCompletedTasks()">已完成</li>
                <li @click="showRecycleBin()">回收站</li>
                <li @click="markAllAsCompleted()">全部标为已完成</li>
                <li @click="clearCompletedTasks()">清除已完成</li>
                <li @click="clearAllTasks()">清除全部</li>
                <li @click="exportData()" id="li-bittom">导出数据</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const tasks = ref<string[]>([]);
const inputValue = ref("");
const submit = () => {
    if (inputValue.value === "") return;
    tasks.value.push(inputValue.value);
    inputValue.value = "";
}

const deleteTask = async({task})=>{
    
}
</script>

<style scoped>
.todo-container {
    background-color: #BFEFFF;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    height: 500px;
    width: 800px;
}

.todoForm {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 450px;
    margin-left: 80px;
    margin-top: 30px;
    border: 2px solid #4F4F4F;
    border-radius: 7px;
    box-shadow: 3px 3px 2px black;
}

#todoInput {
    flex: 1;
    padding: 11px;
    outline: none;
    border: none;
}

#button-form {
    padding: 10px 20px;
    background-color: pink;
    color: black;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    outline: none;
    border: none;
}

.main-container {
    width: 450px;
    height: 250px;
    margin-left: 80px;
    margin-top: 30px;
    border: 2px solid #4F4F4F;
    border-radius: 7px;
    box-shadow: 3px 3px 2px black;
}

#button-main {
    margin-left:-300px;
    width: 150px;
    line-height: 35px;
    background-color: #8DEEEE;
    outline: none;
    border: none;
}

#task-container {
    display: flex;
    float: right;
    margin-top: -253px;
    width: 135px;
    height: 364px;
    margin-right: 80px;
    background-color: white;
    border: 2px solid #4F4F4F;
    border-radius: 7px;
    box-shadow: 3px 3px 2px black;

}

.task-list {
    list-style-type: none;
    padding: 0;
}

.task-list li {
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
}

#li-top {
    padding: 0;
    padding-bottom: 10px;
}

.list-item{
    width: 385px;
    height: 30px;
    margin: 10px 18px;
    padding: 0px 15px;
    background-color: yellow;
    text-align: left;
    line-height: 30px;
}

.delete-button{
    background: rgba(0, 0, 0, 0);
    float: right;
    height: 30px;
    margin-top: -7px;
    outline: none;
    border: none;
}

</style>
