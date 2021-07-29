// global variable
var appId = "faa63307397f9a8437455fc4cacc3cd2";
// var pleaseNoCors = (event) => {
// let  = "api.openweathermap.org/data/2.5/onecall?lat=40.43&lon=74.39" + "&appId=" + appId;
// };
fetch("https://api.openweathermap.org/data/2.5/onecall?lat=40.43&lon=74.39" + "&appId=" + appId)
.then ((response) => response.json())
.then ((data) => console.log(data))

//Jquery starts here

$(".animalType").click(function() {
    //if mammals select then show mammals option
    //if fish select then show fish option
    //if insects select then show insects option
    //if birds select then show birds option
    //if reptiles select then show reptiles option
});

$(".animalSelection").click(function() {
    //show information base on which actuall animal is clicked
    //interacts with api
    //use logic to fire up modal
});