let token = "Log@in";

let auth = (req, res, next)=>{
    let headers = req.headers;
    if (headers.token) {
        let checkToken = headers.token;
        if (token = checkToken) {
            next();
        }
        else{
            res.status(401).send("Authentication Failed!")
        }
    }
    else{
        res.status(401).send("Authentication Failed!")
    }
}

module.exports = auth;