const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-text"),
  inputField = inputPart.querySelector("input");

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

function requestApi(city) {
  let apiKey = "c6c529b4a1532933c40d21ebc9964fa3";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(api).then((response) => console.log(response.json()));
}
