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

request.interceptors.request.use((config) => {
	// 检查是否携带token，否则，放入localstorage中
	const token = localStorage.getItem("token");
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;
});

request.interceptors.response.use((res) => {
	console.log(res.status);
	
		const token = res.headers["token"];
		if (token) {
			localStorage.setItem("token", token);
		}
		return res;
	
},(res)=>{
	if (res.status === 403) {
		window.location.href = "http://dev.qdsj.top/authqdsj/login?redirect=" + window.location.href;
	}
});

export default request;
