const iamge = document.querySelector("#icon");
const iamge1 = document.querySelector("#icon2");
const iamge3 = document.querySelector("#icon3");
let button = document.querySelector("#button");
const input = document.querySelector("input");

let mydata = [];
let searchData = [];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

async function data() {
  const linkData = await fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=74a38342d0494ea3966115152241012&q=cairo&days=3"
  );
  const Data = await linkData.json();
  console.log(Data);
  mydata.push(Data);
  display1(mydata);
  display2(mydata);
  display3(mydata);
}
data();

function display1(primetar) {
  for (let i = 0; i < primetar.length; i++) {
    var icon = primetar[i].current.condition.icon;
    var tem = primetar[i].current.temp_c;
    var location = primetar[i].location.country;
    var dete = primetar[i].forecast.forecastday[i].date;
    var day = days[new Date().getDay()];
    var desc = primetar[i].current.condition.text;
    var degree = primetar[i].forecast.forecastday[i].day.avgtemp_c;
    var icon2 = primetar[i].forecast.forecastday[i].day.condition.icon;
  }
  document.getElementById("day").innerHTML = day;
  document.getElementById("date").innerHTML = dete;
  document.getElementById("location").innerHTML = location;
  document.getElementById("weather").innerHTML = `${tem} C`;
  iamge.setAttribute("src", `${icon}`);
  document.getElementById("desc").innerHTML = desc;
}

function display2(primetar) {
  for (let i = 0; i < primetar.length; i++) {
    var day = days[new Date().getDay()];
    var desc2 = primetar[i].forecast.forecastday[i].day.condition.text;
    var degree = primetar[i].forecast.forecastday[i].day.avgtemp_c;
    var icon2 = primetar[i].forecast.forecastday[i].day.condition.icon;
    var mindegree = primetar[i].forecast.forecastday[i].day.mintemp_c;
  }
  document.getElementById("reday").innerHTML = day;
  document.getElementById("degree").innerHTML = `${degree} C`;
  iamge1.setAttribute("src", `${icon2}`);
  document.getElementById("desc2").innerHTML = desc2;
  document.getElementById("mindegree").innerHTML = `${mindegree} C`;
}
function display3(primetar) {
  for (let i = 0; i < primetar.length; i++) {
    var tommorow =
      days[new Date(primetar[i].forecast.forecastday[i+2].date).getDay()];
    var desc3 = primetar[i].forecast.forecastday[i +1].day.condition.text;
    var tommorowDegree = primetar[i].forecast.forecastday[i + 1].day.avgtemp_c;
    var icon3 = primetar[i].forecast.forecastday[i + 1].day.condition.icon;
    var tommorowMinDegree =
      primetar[i].forecast.forecastday[i + 1].day.mintemp_c;
  }
  document.getElementById("tommorow").innerHTML = tommorow;
  document.getElementById("tommorowDegree").innerHTML = `${tommorowDegree} C`;
  iamge3.setAttribute("src", `${icon3}`);
  document.getElementById("desc3").innerHTML = desc3;
  document.getElementById(
    "tommorowMinDegree"
  ).innerHTML = `${tommorowMinDegree} C`;
}

//-----------------------------------------------------
async function search(primetarr) {
  let location = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=74a38342d0494ea3966115152241012&q=${primetarr}&days=3`
  );
  let data = await location.json();
  console.log(data);
  console.log(data.location && data.current && data.forecast);
  if (location.ok) {
    searchData.push(data);

    display1(searchData);
    display2(searchData);
    display3(searchData);
  }
}

button.addEventListener("click", function () {
  let x = input.value;
  x.toLocaleUpperCase(x.toLocaleLowerCase());
  search(x);
});
input.addEventListener("input", function () {
  let x = input.value;
  x.toLocaleUpperCase(x.toLocaleLowerCase());
  search(x);
});
