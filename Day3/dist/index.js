"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8080; // default port to listen
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const todo_1 = __importDefault(require("./routes/api/todo"));
const user_1 = __importDefault(require("./routes/api/user"));
// define a route handler for the default home page
app.use("/", user_1.default);
app.use("/api/todo", todo_1.default);
// start the Express server
app.listen(port, () => {
    // console.log( `server started at http://localhost:${ port }` );
});
//# sourceMappingURL=index.js.map