<script setup lang="ts">
import { ref } from "vue";

// 声明一个变量，用来储存代办事项：[]
// 数组也是一种数据类型
// 数据结构：数组，栈，队列，二叉树，多叉树，链表，图
// 写一个提交按钮的点击事件，将输入框中的内容放到待办事项的变量中
const tasks = ref<string[]>([]); // 声明一个响应式变量
const inputValue = ref("");

const submit = () => {
	// 先获取输入框中的内容
	// 然后将内容放到tasks数组中
	if (inputValue.value === "") return; //结束整个函数

	tasks.value.push(inputValue.value);
	inputValue.value = "";
};
</script>

<template>
	<div class="todo_container">
		<!-- <form id="todoForm"> -->
		<input type="text" id="todoInput" placeholder="新增待办事项..." v-model="inputValue" />
		<button type="submit" id="button_form" @click="submit">提交</button>
		<!-- </form> -->
		<div class="main_container">
			<div id="button_main">全部标为完成</div>
			<div class="list">
				<div class="list-item" v-for="task in tasks">{{ task }}</div>
			</div>
		</div>
		<div id="task_container">
			<ul class="task_list">
				<li onclick="selectAllTasks()" id="li_top">全部</li>
				<li onclick="showInProgressTasks()" id="li_second">进行中</li>
				<li onclick="showCompletedTasks()">已完成</li>
				<li onclick="showRecycleBin()">回收站</li>
				<li onclick="markAllAsCompleted()">全部标为已完成</li>
				<li onclick="clearCompletedTasks()">清除已完成</li>
				<li onclick="clearAllTasks()">清除全部</li>
				<li onclick="exportData()" id="li_bittom">导出数据</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.todo_container {
	background-color: #bfefff;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	text-align: center;
	height: 500px;
	width: 800px;
}

#todoForm {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 450px;
	margin-left: 80px;
	margin-top: 30px;
	border: 2px solid #4f4f4f;
	border-radius: 7px;
	box-shadow: 3px 3px 2px black;
}

#todoInput {
	flex: 1;
	padding: 11px;
}

#button_form {
	padding: 10px 20px;
	background-color: pink;
	color: black;
	border: none;
	border-radius: 0 4px 4px 0;
	cursor: pointer;
}

.main_container {
	width: 450px;
	height: 250px;
	margin-left: 80px;
	margin-top: 30px;
	border: 2px solid #4f4f4f;
	border-radius: 7px;
	box-shadow: 3px 3px 2px black;
}

#button_main {
	float: left;
	width: 150px;
	line-height: 35px;
	background-color: #8deeee;
}
#task_container {
	display: flex;
	float: right;
	margin-top: -253px;
	width: 135px;
	height: 364px;
	margin-right: 80px;
	background-color: white;
	border: 2px solid #4f4f4f;
	border-radius: 7px;
	box-shadow: 3px 3px 2px black;
}

.task_list {
	list-style-type: none;
	padding: 0;
}

.task_list li {
	padding: 10px;
	cursor: pointer;
	border-bottom: 1px solid #ccc;
}

#li_top {
	padding: 0;
	padding-bottom: 10px;
}
</style>
