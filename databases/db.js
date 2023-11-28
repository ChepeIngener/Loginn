const mysql = require('mysql');

const conection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DV_PASSWORD,
    database: process.env.DB_DATABASE,
})

conection.connect((error) =>{
    if (error){
    console.log(error);
    } else {
        console.log("Esta conectadoo");
    }
});

module.exports = conection;


