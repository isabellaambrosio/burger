// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    // Remember this?
    $(document).on("click", ".changeDevoured", function(event) {
        // ...
        console.log("BUTTON IS CLICKINGGGGGGG");
        var id = $(this).data("id");
        console.log("IDDDDD " + id);
        var newDevour = $(this).data("newdevoured");
        console.log("burger state " + newDevour);

        var newDevourState = { devoured: newDevour };

        // Send the PUT request.
        $.ajax({
            url: "/api/burgers/" + id,
            method: "PUT",
            data: newDevourState
        }).then(
            function() {
                console.log("change devour to ", newDevour);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(document).on("click", ".deleteButton", function(event) {
        console.log("Button is clicking");
        var id = $(this).data("id");
        console.log("IDDDDD " + id);
        var newDelete = { id: id };

        $.ajax({
            url: "/api/burgers/" + id,
            method: "DELETE",
            data: newDelete
        }).then(
            function() {
                console.log("burger deleted ", id);
                location.reload();
            })
    });




    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            name: $("#bur").val().trim(),
            devoured: $('.changeDevoured').val()
        };


        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
