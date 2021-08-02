const express = require('express');
const mysql = require('mysql2')
const path = require('path');
const {PORT = 4000} = process.env;
const cors = require('cors');
const { json } = require('express');

 
const app = express();

app.use(cors());
app.use(json());

app.listen(PORT, () => {
  console.log("OK", PORT);
})

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "remotemysql.com",
  user: "mfFOp6gGgm",
  database: "mfFOp6gGgm",
  password: "X3doc6IUkC"
});

app.get("/countries", function(req, res){
  console.log(1)
  pool.query("SELECT * FROM countries", function(err, data) {
    if(err) return console.log(err);
    res.send(
        data
  
    );
  });
});

app.get("/cities/:id", function(req, res){
  console.log(1)
  pool.query(`SELECT * FROM cities WHERE country_id=${req.params.id}`, function(err, data) {
    if(err) return console.log(err);
    res.send(
        data
    );
  });
});

