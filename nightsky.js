var info = document.getElementById("info");

function start(){
    if(navigator.geolocation){
        //Use geolocation to retrieve user's latitude and longitude coordinates
        navigator.geolocation.getCurrentPosition(function(position){
            getEvents(position.coords.latitude, position.coords.longitude);
        });
    }
    else{
        info.innerHTML = "This browser does not support geolocation.";
    }
}

function getEvents(lat, long){
    var jsonObj = {
        "lat": lat,
        "long": long
    };

    $.ajax({
        type: "POST",
        url: "./events",
        data: jsonObj,
        dataType: "html",
        success: function(msg){
            info.innerHTML = msg;
        },
        error: function(jgXHR, textStatus,errorThrown){
            console.log("Cannot connect to server.");
        }
    });
}

function query(){
    var month = document.getElementById("months").value;
    var spaceEvent = document.getElementById("spaceEvents").value;
    var listings = document.getElementById("listings");

    var jsonObj = {
        "month": month,
        "event": spaceEvent
    };
    $.ajax({
        type: "POST",
        url: "./query",
        data: jsonObj,
        dataType: "html",
        success: function(msg){
            console.log(msg);
            listings.innerHTML = msg;
        },
        error: function(jgXHR, textStatus,errorThrown){
            console.log("Cannot connect to server.");
        }
    });

}
