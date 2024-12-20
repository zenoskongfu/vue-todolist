<template>
	<div class="todo-container">
		<div class="todoForm">
			<input type="text" id="todoInput" placeholder="新增待办事项..." v-model="inputValue" />
			<button type="submit" id="button-form" @click="submit">提交</button>
		</div>

		<div class="main-container">
			<button id="button-main">全部标为完成</button>
			<div class="list">
				<div class="list-item" v-for="(item, index) in tasks" :key="index" v-show="isShow(item)">
					{{ item.content }}
					<input type="checkbox" id="checkbox" value=" " v-model="item.isFinished" />
					<button class="delete-button" @click="deleteTask(item.content)">❌</button>
				</div>
			</div>
		</div>
		<div id="task-container">
			<ul class="task-list">
				<li @click="selectAllTasks()" id="li-top" :class="pageContext === 'default' ? 'selected' : ''">全部</li>
				<li @click="showInProgressTasks()" id="li-second" :class="pageContext === 'doing' ? 'selected' : ''">
					进行中
				</li>
				<!-- <li @click="showCompletedTasks()">已完成</li>
				<li @click="showRecycleBin()">回收站</li>
				<li @click="markAllAsCompleted()">全部标为已完成</li>
				<li @click="clearCompletedTasks()">清除已完成</li>
				<li @click="clearAllTasks()">清除全部</li>
				<li @click="exportData()" id="li-bittom">导出数据</li> -->
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
// ts
type TypeTask = {
	content: string;
	isFinished: boolean;
	isDeleted: boolean;
};

const tasks = ref<TypeTask[]>([]);

const inputValue = ref("");

const submit = () => {
	if (inputValue.value === "") return;
	// 类型指定
	// 新的待办事项
	const task: TypeTask = {
		content: inputValue.value,
		isFinished: false,
		isDeleted: false,
	};
	tasks.value.push(task);
	inputValue.value = "";
};

const deleteTask = async (zenos: string) => {
	// 通过传进来的task.content，来找到点击的task对象，并将task对象中的isDeleted变成true
	for (let i = 0; i < tasks.value.length; i++) {
		if (tasks.value[i].content === zenos) {
			tasks.value[i].isDeleted = true;
		}
	}
};

type PageContextType = "default" | "doing" | "completed" | "deleted";

// let pageContext: PageContextType = "default";
const pageContext = ref<PageContextType>("default");

const isShow = (task: TypeTask) => {
	// item.isFinished ===false && item.isDeleted === false
	// 当页面初始化 ：item.isDeleted === false
	// 当点击进行中 ： item.isFinished ===false && item.isDeleted === false
	// 当点击已完成 ：item.isFinished ===true && item.isDeleted === false
	// 当点击回收站： item.isDeleted === true

	switch (pageContext.value) {
		case "default":
			return task.isDeleted === false;
		case "doing":
			return task.isFinished === false && task.isDeleted === false;
		// case 'completed':
	}
};

const selectAllTasks = () => {
	pageContext.value = "default";
};

const showInProgressTasks = () => {
	pageContext.value = "doing";
};

// watchEffect(() => {
// 	// 监控tasks的变化
// 	console.log(tasks.value);
// });

watch(
	() => tasks.value.length,
	() => console.log(tasks.value)
);
</script>

<style scoped>
.selected {
	background-color: #8deeee;
}
.todo-container {
	background-color: #bfefff;
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
	border: 2px solid #4f4f4f;
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
	border: 2px solid #4f4f4f;
	border-radius: 7px;
	box-shadow: 3px 3px 2px black;
}

#button-main {
	margin-left: -300px;
	width: 150px;
	line-height: 35px;
	background-color: #8deeee;
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
	border: 2px solid #4f4f4f;
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

.list-item {
	width: 385px;
	height: 30px;
	margin: 10px 18px;
	padding: 0px 15px;
	background-color: yellow;
	text-align: left;
	line-height: 30px;
}

.delete-button {
	background: rgba(0, 0, 0, 0);
	float: right;
	height: 30px;
	margin-top: -7px;
	outline: none;
	border: none;
}
</style>
