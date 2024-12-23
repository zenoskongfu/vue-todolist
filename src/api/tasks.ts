import request from "../utils/request";
// 待办事项的相关接口

// 查询接口
export const getAllTasks = (user_id: number) => {
	const url = `/tasks?user_id=${user_id}`; // isCompleted, isDeleted
	return request.get(url);
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
