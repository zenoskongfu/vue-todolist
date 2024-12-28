<template>
	<div class="app-container">
		<div class="todo-container">
			<div class="todoForm">
				<input type="text" id="todoInput" placeholder="新增待办事项..." v-model="inputValue" />
				<button type="submit" id="button-form" @click="submit">提交</button>
			</div>
			<div class="todo-body-container">
				<div class="main-container">
					<button id="button-main" @click="markAllAsCompleted()">全部标为完成</button>
					<div class="list">
						<div class="list-item" v-for="(item, index) in tasks" :key="index" v-show="isShow(item)">
							{{ item.content }}
							<input type="checkbox" id="checkbox" value=" " v-model="item.isChecked" />
							<button class="delete-button" @click="deleteTask(item.id)">❌</button>
						</div>
					</div>
				</div>
				<div id="task-container">
					<ul class="task-list">
						<li @click="selectAllTasks()" id="li-top" :class="pageContext === 'default' ? 'selected' : ''">
							全部
						</li>
						<li
							@click="showInProgressTasks()"
							id="li-second"
							:class="pageContext === 'doing' ? 'selected' : ''">
							进行中
						</li>
						<li @click="showCompletedTasks()" :class="pageContext === 'completed' ? 'selected' : ''">
							已完成
						</li>
						<li @click="showRecycleBin()" :class="pageContext === 'deleted'">回收站</li>
						<li @click="markAllAsCompleted()">全部标为已完成</li>
						<li @click="clearCompletedTasks()">清除已完成</li>
						<li @click="clearAllTasks()">清除全部</li>
						<!-- <li @click="exportData()" id="li-bittom">导出数据</li> -->
						<li @click="restore()">恢复</li>
					</ul>
				</div>
			</div>
		</div>
		<div style="height: 120px"></div>
		<div class="footer">
			<BeiAnFooter author="WangShiDi & Zenos" github="https://github.com/zenoskongfu/vue-todolist"></BeiAnFooter>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { addTask, getAllTasks } from "./api/tasks";
import { BeiAnFooter } from "blue-vue-ui";
// ts
type TypeTask = {
	id: number;
	content: string;
	isDeleted: boolean;
	isChecked: boolean; // 表示是否已完成
};

const tasks = ref<TypeTask[]>([]);

const inputValue = ref("");

const newFn = () => {
	// 获取所有待办事项
	getAllTasks(1).then((res) => {
		const _tasks = res.data;
		const temp: any = [];
		_tasks.map((task: any) => {
			temp.push({
				id: task.id,
				content: task.title,
				isDeleted: task.isDeleted,
				isChecked: task.isCompleted,
			});
		});
		tasks.value = temp;
	});
};

onMounted(() => {
	newFn();
});

const submit = () => {
	if (inputValue.value === "") return;

	addTask(1, inputValue.value).then(() => {
		// 这里调用的代码，就是接口响应之后
		newFn();
	});

	// 这里调用的代码，就是接口响应之前，会执行的代码
	// 清空输入框
	inputValue.value = "";
};

const deleteTask = async (taskId: number) => {
	// for
	tasks.value.map((item) => {
		if (item.id === taskId) {
			item.isDeleted = true;
		}
	});
};

type PageContextType = "default" | "doing" | "completed" | "deleted";

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
			return task.isChecked === false && task.isDeleted === false;
		case "completed":
			return task.isChecked === true && task.isDeleted === false;
		case "deleted":
			return task.isDeleted === true;
	}
};

const selectAllTasks = () => {
	pageContext.value = "default";
};

const showInProgressTasks = () => {
	pageContext.value = "doing";
};

const showCompletedTasks = () => {
	pageContext.value = "completed";
};

const showRecycleBin = () => {
	pageContext.value = "deleted";
};

const markAllAsCompleted = async () => {
	for (let i = 0; i < tasks.value.length; i++) {
		// 检查是否已经完成，找出没有完成的
		tasks.value[i].isChecked = true;
	}
};

// 清除已完成
const clearCompletedTasks = async () => {
	for (let i = 0; i < tasks.value.length; i++) {
		if (tasks.value[i].isChecked === true) {
			tasks.value[i].isDeleted = true;
		}
	}
};

// 清除全部
const clearAllTasks = () => {
	for (let i = 0; i < tasks.value.length; i++) {
		tasks.value[i].isDeleted = true;
	}
};

// 恢复
const restore = () => {
	for (let i = 0; i < tasks.value.length; i++) {
		if (tasks.value[i].isDeleted === true) {
			tasks.value[i].isDeleted = false;
		}
	}
};

watchEffect(() => {
	// 监控tasks的变化
	console.log(tasks.value.map((item) => ({ ...item })));
});
</script>

<style scoped>
.app-container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}
.footer {
	margin-top: auto;
}
.list {
	max-height: 325px;
	overflow: auto;
	width: 95%;
	margin-left: 10px;
	margin-bottom: 10px;
	margin-top: 10px;
}

.todo-body-container {
	display: flex;
	justify-content: center;
	margin-top: 26px;
}

.selected {
	background-color: #8deeee;
}

.todo-container {
	background-color: #bfefff;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	text-align: center;
	height: 500px;
	width: 800px;
	margin: 10px auto;
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
	min-height: 250px;
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
	margin-left: 7%;
	/* float: right; */
	/* margin-top: -253px; */
	width: 135px;
	height: 360px;
	/* margin-right: 80px; */
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
	width: 370px;
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
