// global variable
var appId = "faa63307397f9a8437455fc4cacc3cd2";
// var pleaseNoCors = (event) => {
// let  = "api.openweathermap.org/data/2.5/onecall?lat=40.43&lon=74.39" + "&appId=" + appId;
// };
fetch("https://api.openweathermap.org/data/2.5/onecall?lat=40.43&lon=74.39" + "&appId=" + appId)
.then ((response) => response.json())
.then ((data) => console.log(data))

