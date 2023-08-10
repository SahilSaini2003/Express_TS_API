import express from 'express';
const app = express();
const port = 8080; // default port to listen

app.use(express.json());
app.use(express.urlencoded({extended: false}));

import router from './routes/api/todo';

app.use( "/api/todo", router );

// start the Express server
app.listen( port, () => {
    // console.log( `server started at http://localhost:${ port }` );
} );
