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

//tambahan
const port = process.env.PORT || 3000;

app.use('/',mainRouter);

app.listen(port, "0.0.0.0", function () {
// app.listen(3000, () => {
    // console.log('Server started on http://localhost:3001');
    console.log('Server started on ${port}');
    connection.authenticate()
    .then(function(){
        console.log("Database Terhubung")
    })
    .catch(function(err){
        console.log("Err Koneksi ke Database", err)
        process.exit()
    })
});
