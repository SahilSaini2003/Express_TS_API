const express = require('express');
const path = require('path');
const {engine}  = require('express-handlebars');
const mid = require('./middleware/mid');
const members = require('./Members');

const app = express();

//Init Middleware
// app.use(mid);

// Handlebars
app.engine('handlebars', engine({defaultLayout:'mian'}));
app.set('view engine', 'handlebars');

//Body Parser 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/',(req, res)=>res.render('index',{
    title : 'My Members',
    members
}));

// Adding API Route
app.use('/api/members', require('./routes/api/members'));

// Sending Html
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'intro.html'));
// })

// Setting a Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Sending Request
// app.get('/', (req, res) => {
    //     res.send("<h1>Hello World</h1>")
    // })
    

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));