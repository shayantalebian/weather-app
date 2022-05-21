const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-text"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  wIcon = document.querySelector(".weather-part img"),
  arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    infoTxt.innerHTML = "Getting weather details...";
    requestApi(inputField.value);
  }
});

console.log(locationBtn);

locationBtn.addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser dose not support geolocation API");
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  let apiKey = "c6c529b4a1532933c40d21ebc9964fa3";
  // console.log(position);
  // console.log(latitude, longitude);
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData();
}

function onError(error) {
  infoTxt.innerHTML = error.message;
  infoTxt.classList.add("info-text-error");
  // console.log(error);
}

function requestApi(city) {
  let apiKey = "c6c529b4a1532933c40d21ebc9964fa3";
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}

function fetchData() {
  infoTxt.innerHTML = "Getting weather details...";
  infoTxt.classList.add("info-text-pending");
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetail(result));
}

function weatherDetail(info) {
  infoTxt.classList.replace("info-text-pending", "info-text-error");
  if (info.cod == "404") {
    infoTxt.innerHTML = `${inputField.value} is not a valid city name`;
  } else {
    // Get the useful data from the API
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;

    if (id == 800) {
      wIcon.src = "assets/wIcon/clear.svg";
    } else if (id >= 200 && id <= 232) {
      wIcon.src = "assets/wIcon/storm.svg";
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "assets/wIcon/snow.svg";
    } else if (id >= 701 && id <= 781) {
      wIcon.src = "assets/wIcon/haze.svg";
    } else if (id >= 801 && id <= 804) {
      wIcon.src = "assets/wIcon/cloud.svg";
    } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
      wIcon.src = "assets/wIcon/rain.svg";
    }

    console.log(city, country, description, id, feels_like, humidity, temp);

    wrapper.querySelector(".temp .numb").innerHTML = Math.floor(temp);
    wrapper.querySelector(".weather").innerHTML = description;
    wrapper.querySelector(".location span").innerHTML = `${city} , ${country}`;
    wrapper.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like);
    wrapper.querySelector(".humidity span").innerHTML = `${humidity}%`;

    infoTxt.classList.remove("info-text-pending", "info-text-error");
    wrapper.classList.add("active");
    console.log(info);
  }
}

console.log(arrowBack);

arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
  inputField.value = "";
});
