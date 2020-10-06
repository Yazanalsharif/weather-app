console.log("hello node.js");

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");




weatherForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const location = input.value;
    const url = "/weather?address=" + location;
    messageOne.innerHTML = "Loading....";
    messageTwo.textContent = "";
    fetch(url).then(response => {
        response.json().then(data => {
           console.log(data);
          if(data.error) {
              messageOne.textContent = "";
              return messageTwo.textContent = data.error;
          }
          const display ="the place: " + data.place + "<br> the temperature :" + data.temperature + "<br> description air:" + data.desc + "<br> wind-speed :" + data.wind_speed
          messageOne.innerHTML = display;
        })
    })


})