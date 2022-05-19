const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-text"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button");

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
  // console.log(position);
  // console.log(latitude, longitude);
}

function onError(error) {
  infoTxt.innerHTML = error.message;
  infoTxt.classList.add("info-text-error");
  // console.log(error);
}

function requestApi(city) {
  infoTxt.innerHTML = "Getting weather details...";
  infoTxt.classList.add("info-text-pending");
  let apiKey = "c6c529b4a1532933c40d21ebc9964fa3";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetail(result));
}

function weatherDetail(info) {
  console.log(info);
}
