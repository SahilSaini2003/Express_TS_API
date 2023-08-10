// const { error, log } = require('console');
const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "!@Qwerty12",
    database: "postgres"
})

client.connect();

client.query(`select * from list`,(error, result)=>{
    if (!error) {
        console.log(result.rows);
    }
    else{
        console.log(error.message);
    }
    client.end;
})