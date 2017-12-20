var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var burgerObject = { burgers: data };
        console.log(burgerObject);
        res.render("index", burgerObject);
    });
});

router.post("/api/burgers", function(req, res) {
    console.log(req.body.devoured);
    burger.insertOne(["burger_name", "devoured"], [req.body.name, req.body.devoured], function(result) {
        res.json({ id: result.insertID });
    });
});

router.put("/api/burgers/:id", function(req, res) {

    console.log("================== PUT /api/burgers/" + req.params.id);

    // newDevoured becomes req.body here
    console.log(req.body);

    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({ devoured: req.body.devoured }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    console.log("================== DELETE /api/burgers/" + req.params.id);
    var condition = "id = " + req.params.id;

    burger.deleteOne(condition, function(result) {
        // if (result.changedRows == 0) {
        //     return res.status(404).end();
        // }
        // else {
        res.status(200).end();
        // }
    });

})

module.exports = router;
