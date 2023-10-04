const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const mainRouter = require ('./app/routes')
const connection = require('./app/model/index')

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 


app.use('/',mainRouter);

app.listen(3001, () => {
    console.log('Server started on http://localhost:3001');
    connection.authenticate()
    .then(function(){
        console.log("Database Terhubung")
    })
    .catch(function(err){
        console.log("Err Koneksi ke Database", err)
        process.exit()
    })
});
