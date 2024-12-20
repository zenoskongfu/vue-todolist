import axios from "axios";

const baseUrl = import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_BASE_URL;

const request = axios.create({
	baseURL: baseUrl,
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

export default request;
