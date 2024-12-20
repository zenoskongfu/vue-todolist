import axios from "axios";

const baseUrl = import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_BASE_URL;
// import.meta.env.PROD
//
//  import.meta.env.DEV 表示当前是开发环境
// import.meta.env.PROD 如果为true，表示当前是生产环境

const request = axios.create({
	baseURL: baseUrl,
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

export default request;
