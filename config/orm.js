//ORM will create
//helper functions
// * selectAll()
// * insertOne()
// * updateOne()
// * will all be running the connection.query for future use in other files.

var connection = require("../config/connection.js");

//HELPER FUNCTIONS
//==========================================================================
//Function that will give as enough questions marks to represent each "vals"
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Bacon Cheesburger => 'Bacon Cheesburger')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {burger_name: 'Bancon Cheesburger'} => ["burger_name='Bacon Cheesburger'"]
            // e.g. {devoured: true} => ["devoured=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {
    //Function to select all
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    //Function to insert a new burger
    insertOne: function(cols, vals, cb) {
        var queryString = "INSERT INTO burgers (" + cols.toString() + ") VALUES (" + printQuestionMarks(vals.length) + ") ";
        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }, //end of create function

    updateOne: function(objColVals, condition, cb) {
        //ASK QUESTION
        var queryString = "UPDATE burgers SET " + objToSql(objColVals) + " WHERE " + condition;
        console.log("UPDATE queryString: " + queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    deleteOne: function(condition, cb) {
        var queryString = "DELETE FROM burgers WHERE " + condition;
        console.log("DELETE queryString: " + queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }

} //end of orm variable

module.exports = orm;
