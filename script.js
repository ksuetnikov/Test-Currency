"use strict";
let currency;
let result;
//Объявление всех необходимых для дальнешйей работы элементов HTML
const USD = document.getElementById("USD");
const RUB = document.getElementById("RUB");
const EUR = document.getElementById("EUR");
const USDD = document.getElementById("USDD");
const RUBB = document.getElementById("RUBB");
const EURR = document.getElementById("EURR");
const input = document.querySelector(".input");
const output = document.querySelector(".output");
const course = document.querySelector(".course");
let youval = document.querySelector(".youval");
//Получение текущей валюты браузера
$(document).ready(function () {
  var currencyCode = geoplugin_currencyCode();
  console.log(currencyCode);
  youval.innerHTML = "Ваша валюта:";
  youval.innerHTML += " " + currencyCode;
  currency = currencyCode;
  //Устанавливаем красивую окантовку
  switch (currency.toString()) {
    case "RUB":
      {
        RUB.style.borderColor = "red";
      }
      break;
    case "USD":
      {
        USD.style.borderColor = "red";
      }
      break;
    case "EUR":
      {
        EUR.style.borderColor = "red";
      }
      break;
  }
});
//Обработка нажатий на кнопки
USDD.addEventListener("click", function (e) {
  result = "USD";
  RUBB.style.borderColor = "wheat";
  EURR.style.borderColor = "wheat";
  USDD.style.borderColor = "red";
});
RUBB.addEventListener("click", function (e) {
  result = "RUB";
  RUBB.style.borderColor = "red";
  EURR.style.borderColor = "wheat";
  USDD.style.borderColor = "wheat";
});
EURR.addEventListener("click", function (e) {
  result = "EUR";
  RUBB.style.borderColor = "wheat";
  EURR.style.borderColor = "red";
  USDD.style.borderColor = "wheat";
});

USD.addEventListener("click", function (e) {
  youval.innerHTML = "Ваша валюта:";
  youval.innerHTML += ` ${USD.getAttribute("About")}`;
  currency = "USD";
  RUB.style.borderColor = "wheat";
  EUR.style.borderColor = "wheat";
  USD.style.borderColor = "red";
});
EUR.addEventListener("click", function (e) {
  youval.innerHTML = "Ваша валюта:";
  youval.innerHTML += ` ${EUR.getAttribute("About")}`;
  currency = "EUR";
  RUB.style.borderColor = "wheat";
  EUR.style.borderColor = "red";
  USD.style.borderColor = "wheat";
});
RUB.addEventListener("click", function (e) {
  youval.innerHTML = "Ваша валюта:";
  youval.innerHTML += ` ${RUB.getAttribute("About")}`;
  currency = "RUB";
  RUB.style.borderColor = "red";
  EUR.style.borderColor = "wheat";
  USD.style.borderColor = "wheat";
});
//Запрашиваем API
input.addEventListener("input", function (e) {
  if (!currency) {
    alert("Выберите везде нужную валюту!");
  }
  if (currency === result) {
    alert("Выберите разные валюты для перевода");
  }
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `http://economia.awesomeapi.com.br/json/last/${currency}-${result}`
  );
  request.send();
  request.addEventListener("load", function () {
    const json_data = JSON.parse(this.response);
    console.log(this.response);
    const namee = `${currency}${result}`;
    console.log(namee);
    const data = json_data[namee];
    const min = Number(data.ask);
    const max = Number(data.bid);
    console.log(min);
    console.log(max);
    var money = (min + max) / 2;
    console.log(money);
    output.innerHTML = "";
    let Res = parseFloat(input.value) * money;
    output.innerHTML += Res;
    course.innerHTML = `по текущему курсу: 1 ${currency} = ${money} ${result}`;
  });
});

// console.log(navigator.language.substring(0, 2));
