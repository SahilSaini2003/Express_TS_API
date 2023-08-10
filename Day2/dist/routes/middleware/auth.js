"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const token = "Log@in";
let auth = (req, res, next) => {
    const headers = req.headers;
    if (headers.token) {
        const checkToken = headers.token;
        if (token === checkToken) {
            next();
        }
        else {
            res.status(401).send("Authentication Failed!");
        }
    }
    else {
        res.status(401).send("Authentication Failed!");
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map