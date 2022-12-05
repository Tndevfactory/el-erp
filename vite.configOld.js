"use strict";
exports.__esModule = true;
var plugin_react_1 = require("@vitejs/plugin-react");
var path = require("path");
var path_1 = require("path");
var vite_1 = require("vite");
var vite_plugin_imp_1 = require("vite-plugin-imp");
// https://vitejs.dev/config/
exports["default"] = (0, vite_1.defineConfig)({
    plugins: [
        (0, plugin_react_1["default"])(),
        (0, vite_plugin_imp_1["default"])({
            libList: [
                {
                    libName: "antd",
                    // style: function (name) {
                    //     if (name === "col" || name === "row") {
                    //         return "antd/lib/style/index.less";
                    //     }
                    //     return "antd/es/".concat(name, "/style/index.less");
                    // }
                },
            ]
        }),
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    define: { "process.env": process.env },
    optimizeDeps: {
        include: ["tailwind.config.js"]
    },
    resolve: {
        alias: {
            "@": (0, path_1.resolve)(__dirname, "./src"),
            "tailwind.config.js": path.resolve(__dirname, "tailwind.config.js")
        }
    }
});
