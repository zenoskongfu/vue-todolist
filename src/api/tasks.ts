import request from "../utils/request";
// 待办事项的相关接口

// 查询接口

// 1. 该函数返回一个promise
// 2. 该promise的值是接口响应的数据
export const getAllTasks = (user_id: number) => {
	const url = `/api/tasks?user_id=${user_id}`; // isCompleted, isDeleted
	// 用fetch发起一个Get类型的请求
	return fetch(url)
		.then((res) => res.json())
		.then((res) => {
			console.log(res); //接口返回的数据
			return res;
		});
};

// 添加接口
export const addTask = (user_id: number, title: string) => {
	const url = "/tasks";
	const data = {
		user_id,
		title,
	};
	return request.post(url, data);
};
