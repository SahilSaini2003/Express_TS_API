"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key = "Log@in";
function auth(req, res, next) {
    const rawToken = req.headers.token;
    if (rawToken) {
        const raw = rawToken.split(" ");
        const token = raw[1];
        jsonwebtoken_1.default.verify(token, key, (error, result) => {
            if (!error) {
                next();
            }
            else {
                res.status(400).json({ msg: "Authenticaton Failed." });
            }
        });
    }
    else {
        res.status(400).json({ msg: "Authenticaton Failed." });
    }
}
exports.auth = auth;
//# sourceMappingURL=auth.js.map