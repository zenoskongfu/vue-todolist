// 待办事项的相关接口

import request from "../utils/request";

// 待办事项的增删改查

export interface Task {
	id?: number;
	title?: string;
	description?: string;
	completed?: boolean;
	user_id: number;
}

const baseUrl = "/todolist";

export const addTask = (task: Task) => {
	const url = `${baseUrl}/add`;
	return request.post(url, task);
};

export const deleteTask = (id: number, user_id: number) => {
	const url = `${baseUrl}/delete`;
	return request.delete(url, { data: { id, user_id } });
};

export const getAllTasks = (user_id: number) => {
	const url = `${baseUrl}/allTask?user_id=${user_id}`;
	return request.get(url);
};

export const updateTask = (task: Task) => {
	const url = `${baseUrl}/update`;
	return request.post(url, task);
};
