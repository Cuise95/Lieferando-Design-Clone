// Arrays zum rendern des Menüs
let pizzas = [
  "Pizza Salami",
  "Pizza Tonno",
  "Pizza Pepperoni",
  "Pizza Margherita",
  "Pizza Funghi",
  "Pizza Aioli",
  "Pizza Prosciutto",
];
let pizzasDescriptions = [
  "mit Mozzarella und Salami",
  "mit Mozzarella. Thunfisch und Oliven",
  "mit Mozzarella und Pepperoni",
  "mit Mozzarella",
  "mit Mozzarella, Salami und Champignons",
  "mit Mozzarella und Knoblauchcreme",
  "mit Mozzarella, Schinken und Zwiebeln",
];
let prices = [10.99, 12.99, 11.99, 9.99, 11.99, 10.99, 12.99];

// Arrays Salate

let salads = ["Grüner Salat", "Griechischer Salat", "Ceasar Salat"];
let saladDescription = [
  "Eisbergsalat mit hausgemachtem Dressing",
  "Eisbergsalat, Oliven, Feta, Paprika und Zwiebeln",
  "Eisbergsalat, Bacon, Feta, Paprika, Zwiebeln und Croutons mit Hausgemachtem Dressing ",
];
let saladPrices = [6.99, 9.99, 11.99];

// Arrays Getränke

let drinks = [
  "Coca Cola",
  "Fanta",
  "Sprite",
  "Mineralwasser",
  "Hugo",
  "Bier",
  "Rotwein",
  "Weißwein",
];
let drinksDescription = [
  "0.33l Glasflasche",
  "0.33l Glasflasche",
  "0.33l Glasflasche",
  "0.33l Glasflasche",
  "0.5l Glasflasche",
  "0.33l Glasflasche",
  "1l Glasflasche",
  "1l Glasflasche",
];
let drinksPrices = [2.5, 2.5, 2.5, 2.0, 8.0, 3.5, 4.5, 4.5];

// Beliebte Gerichte Arrays

let favorites = ["Pizza Salami", "Pizza Aioli", "Cesar Salad"];
let favoritesDescription = [
  "mit Mozzarella und Salami",
  "mit Mozzarella und Knoblauchcreme",
  "Eisbergsalat, Bacon, Feta, Paprika, Zwiebeln und Croutons mit Hausgemachtem Dressing ",
];
let favoritesPrices = [10.99, 10.99, 11.99];
// Lieferkosten Variable
let deliveryCost = 2;

// note array
let notes = [];

//Button Hilfsvariable
let result;
// Arrays für Warenkorb
let selectedAmount = [];
let selectedFood = [];
let selectedPrices = [];

// Render Funktionen
function render() {
  renderMenu();
  renderBasket();
}

function renderMenu() {
  for (i = 0; i < favorites.length; i++) {
    document.getElementById("favoriteDishes").innerHTML +=
      favoriteDishesTemplate(i);
  }
  for (i = 0; i < pizzas.length; i++) {
    document.getElementById("pizza").innerHTML += pizzaTemplate(i);
  }
  for (i = 0; i < salads.length; i++) {
    document.getElementById("salad").innerHTML += saladTemplate(i);
  }
  for (i = 0; i < drinks.length; i++) {
    document.getElementById("drinks").innerHTML += drinksTemplate(i);
  }
}

function renderBasket() {
  document.getElementById("basketContent").innerHTML = "";

  if (selectedFood.length == 0) {
    document.getElementById("basketContent").innerHTML += emptyBasketTemplate();
  } else {
    for (i = 0; i < selectedFood.length; i++) {
      document.getElementById("basketContent").innerHTML +=
        fullBasketTemplate(i);
    }
    document.getElementById("basketContent").innerHTML += submitOrderTemplate();
  }
}

// Warenkorb Funktionen
function addToMenu(food, price) {
  if (selectedFood.includes(food)) {
    let index = selectedFood.indexOf(food);
    selectedAmount[index] += +1;
  } else {
    selectedFood.push(food);
    selectedPrices.push(price);
    selectedAmount.push(1);
  }
  renderBasket();
}

function increaseAmount(i) {
  selectedAmount[i]++;
  renderBasket();
}

function decreaseAmount(i) {
  if (selectedAmount[i] >= 2) {
    selectedAmount[i]--;
  }
  renderBasket();
}

function removeItem(i) {
  selectedFood.splice(i, 1);
  selectedAmount.splice(i, 1);
  selectedPrices.splice(i, 1);
  renderBasket();
}

function openNote(i) {
  let note = document.getElementById(`addNote${i}`);
  note.innerHTML += `
  <div id="noteContainer">
  <input class="inputNote" id="inputNote${i}" placeholder="Anmerkung hier hinzufügen"></input>
  <button onclick="addedNote(${i})" id="noteBtn">+</button> 
  </div>`;
}

function addedNote(i) {
  notes.push(document.getElementById(`inputNote${i}`).value);
  // let note = document.getElementById(`inputNote${i}`).value;
  let addedNote = document.getElementById(`noteContainer`);
  addedNote.innerHTML = `<span id="noteItself">•${notes[i]}</span>`;
}

// Warenkorb rechen Funktionen
function subTotal() {
  let sum = 0;

  for (i = 0; i < selectedFood.length; i++) {
    sum += selectedAmount[i] * selectedPrices[i];
  }
  return sum;
}

function sumTotal(sub, delivery) {
  let sum = sub + delivery;
  result = sum;
  return sum;
}

// Bestellung bestätigt

function confirmOrder() {
  document.getElementById("content").innerHTML += confirmationTemplate();
  document.getElementById("confirmDiv").classList.remove("d-none");
}

function closeConfirmation() {
  document.getElementById("confirmDiv").classList.add("d-none");
  selectedFood = [];
  selectedPrices = [];
  selectedAmount = [];
  renderBasket();
}
// Google Maps öffnen

function openInfo() {
  document.getElementById("content").innerHTML += infoTemplate();
  document.getElementById("infoContainer").classList.remove("d-none");
}

function closeInfo() {
  document.getElementById("infoContainer").classList.add("d-none");
}

// Like Button

function like() {
  if (document.getElementById("likeBtn").classList.contains("fa-solid")) {
    document.getElementById("likeBtn").classList.remove("fa-solid");
    document.getElementById("likeBtn").classList.add("fa-regular");
  } else {
    document.getElementById("likeBtn").classList.remove("fa-regular");
    document.getElementById("likeBtn").classList.add("fa-solid");
    document.getElementById("likeBtn").classList.add("liked");
  }
}
// Templates

function favoriteDishesTemplate(i) {
  return `
  <div id ="dishDiv" class="dishDiv" onclick="addToMenu('${favorites[i]}', ${favoritesPrices[i]})">
  
  <span id="foodName" class="dishName">${favorites[i]} <i class="addToBasket">+</i> </span>
  <span class="dishDescription"
    >${favoritesDescription[i]}</span
  >
  <span class="dishPrice">${favoritesPrices[i]}€</span>
</div>
`;
}

function pizzaTemplate(i) {
  return `
  <div id ="dishDiv" class="dishDiv" onclick="addToMenu('${pizzas[i]}', ${
    prices[i]
  })">
  
  <span id="foodName" class="dishName">${
    pizzas[i]
  } <i class="addToBasket">+</i> </span>
  <span class="dishDescription"
    >${pizzasDescriptions[i]}</span
  >
  <span class="dishPrice">${prices[i].toFixed(2).replace(".", ",")}€</span>
</div>
`;
}

function saladTemplate(i) {
  return `
  <div id ="dishDiv" class="dishDiv" onclick="addToMenu('${salads[i]}', ${
    saladPrices[i]
  })">
  
  <span id="foodName" class="dishName">${
    salads[i]
  } <i class="addToBasket">+</i> </span>
  <span class="dishDescription"
    >${saladDescription[i]}</span
  >
  <span class="dishPrice">${saladPrices[i].toFixed(2).replace(".", ",")}€</span>
</div>
`;
}

function drinksTemplate(i) {
  return `
  <div id ="dishDiv" class="dishDiv" onclick="addToMenu('${drinks[i]}', ${
    drinksPrices[i]
  })">
  
  <span id="foodName" class="dishName">${
    drinks[i]
  } <i class="addToBasket">+</i> </span>
  <span class="dishDescription"
    >${drinksDescription[i]}</span
  >
  <span class="dishPrice">${drinksPrices[i]
    .toFixed(2)
    .replace(".", ",")}€</span>
</div>
`;
}

function fullBasketTemplate(i) {
  return `
  <div id="selectedFood">
  <div id="orderContainer" class="orderContainer">
    <div class="order">
      <span>${selectedAmount[i]}</span>
      <span>${selectedFood[i]}</span>
      <span>${selectedPrices[i].toFixed(2).replace(".", ",")}€</span>
    </div>
    <div class="remarks">
      <span onclick="openNote(${i})" id="note">Anmerkung hinzufügen</span>
      <div class="basketBtns">
        <i onclick="removeItem(${i})" class="fa-solid fa-trash-can"></i>
        <i id="decreaseAmount" onclick="decreaseAmount(${i})" class="fa-solid fa-minus"></i>
        <i id="increaseAmount" onclick="increaseAmount(${i})" class="fa-solid fa-plus"></i>
      </div>
    </div>
    <div id="addNote${i}"></div>
    <div id="addedNote${i}"</div>
  </div>
</div>
  `;
}

function emptyBasketTemplate() {
  return `
  <div id="shoppingBasket" class="shoppingBasket">
        <h3>Warenkorb</h3>
        <div id="basketContent">
          <div id="emptyBasket">
            <i class="fa-solid fa-cart-plus"></i>
            <h4>Fülle deinen Warenkorb</h4>
            <span>Dein Warenkorb ist zurzeit noch leer</span>
          </div>
        </div>
      </div>
  `;
}

function submitOrderTemplate() {
  return `
  <div class="costsDiv">
  <div class="subTotal">
  <span>Zwischensumme</span>
  <span>${subTotal().toFixed(2).replace(".", ",")}€</span>
  </div>
  <div class="deliveryCosts">
  <span>Lieferkosten</span>
  <span>${deliveryCost.toFixed(2).replace(".", ",")}€</span>
  </div>
  <div class="sumTotal">
  <span>Gesamt</span>
  <span>${sumTotal(subTotal(), deliveryCost)
    .toFixed(2)
    .replace(".", ",")}€</span>
  </div>
  <div id="submitBtn1"></div>
</div>
  `;
}

function submitBtnEnough() {
  return `<button onclick="confirmOrder()" id="submitBtn" class="submitBtn">
  Bestellen
</button>`;
}

function submitBtnNotEnough() {
  return `<button id="submitBtnNotEnough" class="submitBtn">
  Mindestbestellwert 14€
</button>`;
}

function confirmationTemplate() {
  return `<div id="confirmDiv" class="confirmationAbsolute d-none">
    <div class="confirmation">
    <i class="confirmed fa-solid fa-check"></i>
    <h2>Bestellung bestätigt</h2>
    <span>Vielen Dank für ihre Bestellung bei FastDelivery</span>
    <button onclick="closeConfirmation()" id="closeConfirmation">x</button>
  </div>`;
}

function infoTemplate() {
  return `<div id="infoContainer" class="infoContainer d-none">
  <div class="infoDiv">
  <h3>Über das Restaurant</h3>
  <iframe id="maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.798811556171!2d9.759822415315918!3d47.51330920241166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479b0d50f80895fb%3A0xb0486c6f71c216a!2sGasthaus%20Seibl!5e0!3m2!1sde!2sat!4v1661952652152!5m2!1sde!2sat" width="400" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  <div class="openingHoursContainer">
  <div class="openingHoursEach"><span>Montag</span> <span>11:00-23:00 Uhr</span></div>
  <div class="openingHoursEach"><span>Dienstag</span> <span>11:00-23:00 Uhr</span></div>
  <div class="openingHoursEach"><span>Mittwoch</span> <span>11:00-23:00 Uhr</span></div>
  <div class="openingHoursEach"><span>Donnerstag:</span> <span>11:00-23:00 Uhr</span></div>
  <div class="openingHoursEach"><span>Freitag</span> <span>11:00-01:00 Uhr</span></div>
  <div class="openingHoursEach"><span>Samstag</span> <span>11:00-01:00 Uhr</span></div>
  <div class="openingHoursEach"><span>Sonntag</span> <span>11:00-01:00 Uhr</span></div>

  </div>
  <button onclick="closeInfo()" id="closeInfo">x</button>
</div>`;
}
