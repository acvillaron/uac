import mysql from 'mysql'

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'diciembre96',
    database : 'uacguide'
});

connection.connect((err) => {
    if(err) console.log("It was impossible to connect with database!!");
})

export const database = connection;