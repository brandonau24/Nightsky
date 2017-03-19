var mysql = require("mysql");
var utils = require("util");
var EventEmitter = require("events").EventEmitter;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abcd",
    database: "nightsky"
});

con.connect(function(error){
    if(error){
        console.log("Cannot connect to Nightsky database." + error.stack);
    }
    else{
        console.log("Successfully connected to Nightsky database.");
    }
});

function DatabaseManager(){
    EventEmitter.call(this);
}

utils.inherits(DatabaseManager, EventEmitter);

DatabaseManager.prototype.query = function(tableName, month){
    var sqlCommand = "select * from " + tableName + " where MONTH(date)=" + con.escape(month) + ";";
    console.log(sqlCommand);
    var self = this;
    var table = "";
    con.query(sqlCommand, function(err, rows, fields){
        if(err){
            console.log("Cannot query database." + err.stack);
        }
        else{
            table = "<table class=\"table-bordered\">"
                  + "<tr><th>Date</th><th>" + tableName + "</th>";
            for(var i = 0; i < rows.length; i++){
                console.log(rows[i]);
            }
        }
        self.emit("done", table);
    });
}

module.exports = DatabaseManager;
