import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
	base: "/todolist",
	plugins: [vue()],
	server: {
		port: 8088,
		proxy: {
			"/api": {
				target: "http://qdsj.top:3000",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
