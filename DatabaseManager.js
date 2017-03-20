var mysql = require("mysql");
var utils = require("util");
var EventEmitter = require("events").EventEmitter;

var con = mysql.createConnection({
    host: "localhost",
    user: "rycanavan",
    password: "ace135BD24",
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
    var sqlCommand = "select * from " + tableName.replace(/\s+/g, '') + " where MONTH(date)=" + con.escape(month) + ";";
    console.log(sqlCommand);
    var self = this;
    var table = "";
    con.query(sqlCommand, function(err, rows, fields){
        if(err){
            console.log("Cannot query database." + err.stack);
        }
        else{
            table = "<center><table class=\"table-bordered\">"
                  + "<tr><th>Date</th><th>" + tableName + "</th>";
            if(tableName == "solar eclipse" || tableName == "lunar eclipse"){
                for(var i = 0; i < rows.length; i++){
                    table += "<tr><th>";
                    var date = rows[i].date;
                    var dd = date.getDate();
                    var mm = date.getMonth()+1;
                    var yyyy = date.getFullYear();
                    var day = mm+'/'+dd+'/'+yyyy;
                    table += day;
                    table += "</th><th>";
                    table += rows[i].type;
                    table += "</th></tr>"
                    console.log(rows[i]);
                }
            }
            else{
                for(var i = 0; i < rows.length; i++){
                    table += "<tr><th>";
                    var date = rows[i].date;
                    var dd = date.getDate();
                    var mm = date.getMonth()+1;
                    var yyyy = date.getFullYear();
                    var day = mm+'/'+dd+'/'+yyyy;
                    table += day;
                    table += "</th><th>";
                    table += rows[i].planetName;
                    table += "</th></tr>"
                    console.log(rows[i]);
                }
            }
            table += "</table></center>";
        }
        self.emit("done", table);
    });
}

module.exports = DatabaseManager;
