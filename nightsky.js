var dropdownMenu = document.getElementById("dropdownMenu");
var listings = document.getElementById("listings");

function start(){
    document.getElementById("welcome").innerHTML = "";
    if(navigator.geolocation){
        //Use geolocation to retrieve user's latitude and longitude coordinates
        navigator.geolocation.getCurrentPosition(function(position){
            getEvents(position.coords.latitude, position.coords.longitude);
        });
    }
    else{
        dropdownMenu.innerHTML = "This browser does not support geolocation.";
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
            dropdownMenu.innerHTML = msg;
        },
        error: function(jgXHR, textStatus,errorThrown){
            console.log("Cannot connect to server.");
        }
    });
}
