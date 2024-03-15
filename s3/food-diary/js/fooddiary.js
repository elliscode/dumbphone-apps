function addToList(event) {
  const caller = event.target;

  const hash = caller.getAttribute("hash");
  const date = document.getElementById("date-picker").value;

  if (!hash) {
    // print something like "hey you need to pick a food" or 
    // something, idk how you'd ever get here anyway
    return;
  }

  let payload = {
    hash: hash,
    date: date,
    csrf: csrfToken
  };

  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", API_DOMAIN + "/food-diary/add", true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = setDate;
  xmlHttp.send(JSON.stringify(payload));
}
let searchTimeout = undefined;
function queueSearch(event) {
  event.target.removeAttribute("hash");
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(search, 400, event);
}
function search(event) {
  const caller = event.target;
  const input = caller.parentElement.getElementsByTagName("input")[0];
  const query = input.value;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", API_DOMAIN + "/food-diary/search", true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = displaySearch;
  xmlHttp.send(
    JSON.stringify({
      query: query,
      csrf: csrfToken
    })
  );
}
function displaySearch(event) {
  let items = defaultHandlerV1(event);
  const suggestions = document.getElementById("search-list");
  while (suggestions.firstChild) {
    suggestions.removeChild(suggestions.firstChild);
  }
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (itemsToIgnore.includes(item.hash)) {
      continue;
    }
    const li = document.createElement("li");
    li.addEventListener("click", currentSuggestionMethod);
    li.style.cursor = "pointer";
    li.style.display = "relative";
    li.setAttribute("hash", item.hash);
    li.setAttribute("food-name", item.name);
    li.setAttribute("calories", item.calories);
    const span = document.createElement("span");
    span.innerText = item.name;
    li.appendChild(span);
    suggestions.appendChild(li);
  }
}
function deleteFood(event) {
  let caller = event.target;
  const hash = caller.getAttribute("hash");
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", API_DOMAIN + "/food-diary/delete-food", true);
  xmlHttp.withCredentials = true;
  xmlHttp.send(
    JSON.stringify({
      hash: hash,
      csrf: csrfToken
    })
  );
  caller.parentElement.remove();
  event.stopPropagation();
}
function setTextAndAdd(event) {
  let caller = event.target;
  let ownerDiv = findParentWithClass(caller, 'search-blob');
  ownerDiv.style.display = 'none';
  let content = document.getElementById('content');
  content.style.display = 'block';
  while ("LI" != caller.tagName) {
    caller = caller.parentElement;
  }
  const newValue = caller.firstElementChild.innerText;
  let div = caller;
  while ("DIV" != div.tagName) {
    div = div.parentElement;
  }
  const textBox = div.getElementsByTagName("input")[0];
  textBox.value = newValue;
  textBox.setAttribute("hash", caller.getAttribute("hash"));
  const suggestions = div.getElementsByClassName("suggestions")[0];
  while (suggestions.firstChild) {
    suggestions.removeChild(suggestions.firstChild);
  }
  addToList({ target: textBox });
}
function deleteEntry(event) {
  const caller = event.target;
  const timestamp = caller.getAttribute("timestamp");
  const key = caller.getAttribute("key");
  const date = caller.getAttribute("date");
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", API_DOMAIN + "/food-diary/delete", true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = setDate;
  xmlHttp.send(
    JSON.stringify({
      timestamp: timestamp,
      key: key,
      date: date,
      csrf: csrfToken
    })
  );
}
let calculatedValues = undefined;
function changeQuantity(event) {
  const caller = event.target;
  let servings = document.getElementById("servings");
  const key = caller.getAttribute("key");
  const date = caller.getAttribute("date");
  const timestamp = caller.getAttribute("timestamp");
  const foodHash = caller.getAttribute("food-hash");
  let save = document.getElementById("servings-save");
  save.setAttribute("timestamp", timestamp);
  save.setAttribute("key", key);
  save.setAttribute("date", date);
  save.setAttribute("hash", foodHash);
  let servingsCreate = document.getElementById("servings-create");
  servingsCreate.setAttribute("food-hash", foodHash);
  servingsCreate.setAttribute("key", key);
  servingsCreate.setAttribute("date", date);
  servingsCreate.setAttribute("hash", foodHash);

  calculatedValues = JSON.parse(caller.getAttribute("calculated-values"));

  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", API_DOMAIN + "/food-diary/get-serving", true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = displayServing;
  xmlHttp.send(
    JSON.stringify({
      hash: foodHash,
      csrf: csrfToken
    })
  );
}
function closeServings(event) {
  let servings = document.getElementById("servings");
  servings.style.display = "none";
  let modalBg = findParentWithClass(servings, "modal-bg");
  modalBg.style.display = "none";
}
function closeRecipeServings(event) {
  let servings = document.getElementById("recipe-servings");
  servings.style.display = "none";
  let modalBg = findParentWithClass(servings, "modal-bg");
  modalBg.style.display = "none";
}
function displayServing(event) {
  let item = defaultHandlerV1(event);
  let servings = document.getElementById("servings");
  servings.style.display = "block";
  let modalBg = findParentWithClass(servings, "modal-bg");
  modalBg.style.display = "flex";
  let textBox = document.getElementById("servings-amount");
  let select = document.getElementById("servings-name");
  let edit = document.getElementById("servings-edit");
  let servingsText = document.getElementById("servings-text");
  let caloriesText = document.getElementById("calories-text");
  let servingsCreate = document.getElementById("servings-create");
  let servingsSave = document.getElementById("servings-save");
  edit.style.display = "none";
  servingsText.style.display = "none";
  caloriesText.style.display = "none";
  servingsCreate.style.display = "none";
  servingsSave.style.display = "inline-block";
  while (select.firstChild) {
    select.firstChild.remove();
  }
  {
    let option = document.createElement("option");
    option.innerText = "kcal";
    option.setAttribute("amount", item.metadata.calories);
    select.appendChild(option);
    textBox.value = item.metadata.calories;
  }
  for (let i = 0; i < item.metadata.servings.length; i++) {
    let serving = item.metadata.servings[i];
    let option = document.createElement("option");
    option.innerText = serving.name;
    option.setAttribute("amount", serving.amount);
    select.appendChild(option);
  }
  {
    let option = document.createElement("option");
    option.innerText = "new";
    select.appendChild(option);
  }

  if (
    calculatedValues.hasOwnProperty("serving_amount") &&
    calculatedValues.hasOwnProperty("serving_name")
  ) {
    textBox.value = calculatedValues.serving_amount;
    select.value = calculatedValues.serving_name;
  }
  textBox.focus();
  textBox.select();
}
let recipeFood = undefined;
function displayRecipeServing(event) {
  recipeFood = defaultHandlerV1(event);
  let servings = document.getElementById("recipe-servings");
  servings.style.display = "block";
  let modalBg = findParentWithClass(servings, "modal-bg");
  modalBg.style.display = "flex";
  let textBox = document.getElementById("recipe-servings-amount");
  let select = document.getElementById("recipe-servings-name");
  let servingsSave = document.getElementById("recipe-servings-save");
  servingsSave.style.display = "inline-block";
  while (select.firstChild) {
    select.firstChild.remove();
  }
  {
    let option = document.createElement("option");
    option.innerText = "kcal";
    option.setAttribute("amount", recipeFood.metadata.calories);
    select.appendChild(option);
    textBox.value = recipeFood.metadata.calories;
  }
  for (let i = 0; i < recipeFood.metadata.servings.length; i++) {
    let serving = recipeFood.metadata.servings[i];
    let option = document.createElement("option");
    option.innerText = serving.name;
    option.setAttribute("amount", serving.amount);
    select.appendChild(option);
  }
}

let currentFood = {};
function editEitherFoodOrRecipe(event) {
  closeFood();
  closeServings();
  const caller = event.target;
  const hash = caller.getAttribute("food-hash");
  const key = caller.getAttribute("key");
  const date = caller.getAttribute("date");
  const timestamp = caller.getAttribute("timestamp");
  const foodEditSave = document.getElementById("food-edit-save");
  foodEditSave.setAttribute("food-hash", hash);
  foodEditSave.setAttribute("key", key);
  foodEditSave.setAttribute("date", date);
  foodEditSave.setAttribute("timestamp", timestamp);
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", API_DOMAIN + "/food-diary/get-food", true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleFood;

  xmlHttp.send(
    JSON.stringify({
      hash: hash,
      csrf: csrfToken,
      key: key,
      timestamp: timestamp
    })
  );
}

function handleFood(event) {
  currentFood = defaultHandlerV1(event);
  if (!currentFood) {
    currentFood = createBlankFood();
  }
  if (currentFood.metadata.hasOwnProperty("ingredients")) {
    displayRecipe();
  } else {
    displayFood();
  }
}

function createBlankFood() {
  return {
    name: '',
    metadata: {
      alcohol: '',
      caffeine: '',
      calories: '',
      carbs: '',
      fat: '',
      protein: ''
    }
  };
}

function closeFood(event) {
  let foodEdit = document.getElementById("food-edit");
  let recipeEdit = document.getElementById("recipe-edit");
  foodEdit.style.display = "none";
  recipeEdit.style.display = "none";
  let content = document.getElementById('content');
  content.style.display = 'block';
}
function displayFood() {
  let item = currentFood;
  if (!item || !item.hasOwnProperty('name') || !item.hasOwnProperty('metadata')) {
    item = undefined;
  }

  let foodEdit = document.getElementById("food-edit");
  let recipeEdit = document.getElementById("recipe-edit");
  foodEdit.style.display = "none";
  recipeEdit.style.display = "none";

  let content = document.getElementById('content');
  content.style.display = 'none';

  document.getElementById("food-edit-name").value = "";
  document.getElementById("food-edit-calories").value = "";
  document.getElementById("food-edit-protein").value = "";
  document.getElementById("food-edit-fat").value = "";
  document.getElementById("food-edit-carbs").value = "";
  document.getElementById("food-edit-alcohol").value = "";
  document.getElementById("food-edit-caffeine").value = "";
  document.getElementById("food-edit-name").placeholder = item ? item.name : "";
  document.getElementById("food-edit-calories").placeholder = item ? item.metadata.calories : "";
  document.getElementById("food-edit-protein").placeholder = item ? item.metadata.protein : "";
  document.getElementById("food-edit-fat").placeholder = item ? item.metadata.fat : "";
  document.getElementById("food-edit-carbs").placeholder = item ? item.metadata.carbs : "";
  document.getElementById("food-edit-alcohol").placeholder = item ? item.metadata.alcohol : "";
  document.getElementById("food-edit-caffeine").placeholder = item ? item.metadata.caffeine : "";
  foodEdit.style.display = "block";
}
function displayRecipe(event) {
  let foodEdit = document.getElementById("food-edit");
  let recipeEdit = document.getElementById("recipe-edit");
  foodEdit.style.display = "none";
  recipeEdit.style.display = "none";

  let content = document.getElementById('content');
  content.style.display = 'none';

  if (!currentFood.metadata.hasOwnProperty("ingredients")) {
    currentFood.metadata = { ingredients: [] };
  }

  redrawRows();

  recipeEdit.style.display = "block";
}
function alterRecipeServing(event) {
  let amount = parseFloat(document.getElementById('recipe-servings-amount').value);
  let unit = document.getElementById('recipe-servings-name').value;
  let serving = recipeFood.metadata.servings.find(x=>x.name==unit);
  currentFood.metadata.ingredients[recipeIndex].serving = serving;
  currentFood.metadata.ingredients[recipeIndex].multiplier = `${amount / serving.amount}`;
  currentFood.metadata.ingredients[recipeIndex].calories = recipeFood.metadata.calories;
  redrawRows();
  closeRecipeServings();
}
function redrawRows() {
  const ingredientsTable = document.getElementById("ingredients");
  while (ingredientsTable.firstElementChild) {
    ingredientsTable.firstElementChild.remove();
  }
  let tableHeader = createTableHeader();
  ingredientsTable.appendChild(tableHeader);
  for (let i = 0; i < currentFood.metadata.ingredients.length; i++) {
    let ingredient = currentFood.metadata.ingredients[i];
    let row = createTableRow(ingredient, i);
    ingredientsTable.appendChild(row);
  }
  if (currentFood.metadata.ingredients.length > 0) {
    let tableFooter = createTotalsRow();
    ingredientsTable.appendChild(tableFooter);
  }
}
function createTableHeader() {
  let tr = document.createElement("tr");
  {
    let th = document.createElement("th");
    th.innerText = "#";
    tr.appendChild(th);
  }
  {
    let th = document.createElement("th");
    th.innerText = "Food";
    tr.appendChild(th);
  }
  {
    let th = document.createElement("th");
    th.innerText = "Amount";
    tr.appendChild(th);
  }
  {
    let th = document.createElement("th");
    th.innerText = "kcal";
    tr.appendChild(th);
  }
  {
    let th = document.createElement("th");
    th.innerText = "";
    tr.appendChild(th);
  }
  return tr;
}
function createTotalsRow() {
  let tr = document.createElement("tr");
  {
    let td = document.createElement("td");
    tr.appendChild(td);
  }
  {
    let td = document.createElement("td");
    td.innerText = 'Total kcal';
    tr.appendChild(td);
  }
  {
    let td = document.createElement("td");
    tr.appendChild(td);
  }
  {
    let td = document.createElement("td");
    td.innerText = Math.round(currentFood.metadata.ingredients.reduce((a,b)=>a+(b.serving?b.calories*b.multiplier*b.serving.multiplier:NaN),0));
    td.style.textAlign = "right";
    tr.appendChild(td);
  }
  {
    let td = document.createElement("td");
    td.innerText = "";
    tr.appendChild(td);
  }
  return tr;
}
let recipeIndex = 0;
function changeQuantityRow(event) {
  const caller = event.target;
  let servings = document.getElementById("recipe-servings");
  const foodHash = caller.getAttribute("food-hash");
  recipeIndex = parseInt(caller.getAttribute("index"));
  let save = document.getElementById("servings-save");
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", API_DOMAIN + "/food-diary/get-serving", true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = displayRecipeServing;
  xmlHttp.send(
    JSON.stringify({
      hash: foodHash,
      csrf: csrfToken
    })
  );
}
function createTableRow(ingredient, index) {
  let tr = document.createElement("tr");
  {
    let td = document.createElement("td");
    let button = document.createElement("button");
    button.innerText = "#";
    button.setAttribute("food-hash", ingredient.hash);
    button.addEventListener("click", changeQuantityRow);
    button.setAttribute("index", index);
    td.appendChild(button);
    tr.appendChild(td);
  }
  {
    let td = document.createElement("td");
    td.innerText = ingredient.name;
    tr.appendChild(td);
  }
  {
    const td = document.createElement("td");
    td.style.textAlign = "right";
    if (ingredient.hasOwnProperty('serving')) {
      let serving = ingredient.serving;
      let value = ingredient.multiplier * serving.amount;
      let trimmedServingName = serving.name;
      if(trimmedServingName.startsWith('1 ')) {
        trimmedServingName = trimmedServingName.substring(2);
      }
      let displayString = `${value.toLocaleString()} ${trimmedServingName}`;
      td.innerText = displayString;
    } else {
      td.innerText = '';
    }
    tr.appendChild(td);
  }
  {
    const td = document.createElement("td");
    td.style.textAlign = "right";
    if (ingredient.hasOwnProperty('serving')) {
      let value = Math.round(ingredient.multiplier * ingredient.serving.multiplier * ingredient.calories);
      let displayString = value;
      td.innerText = displayString;
    } else {
      td.innerText = '';
    }
    tr.appendChild(td);
  }
  {
    let td = document.createElement("td");
    let button = document.createElement("button");
    button.setAttribute("food-hash", ingredient.hash);
    button.addEventListener("click", deleteRow);
    button.innerHTML = "&times;";
    td.appendChild(button);
    tr.appendChild(td);
  }
  return tr;
}
function deleteRow(event) {
  event.parentElement.parentElement.remove();
}
function saveFood(event) {
  const key = event.target.getAttribute("key");
  const date = document.getElementById("date-picker").value;
  const timestamp = event.target.getAttribute("timestamp");
  let payload = {
    key: key,
    timestamp: timestamp,
    date: date,
    name: document.getElementById("food-edit-name").value,
    calories: document.getElementById("food-edit-calories").value,
    fat: document.getElementById("food-edit-fat").value,
    carbs: document.getElementById("food-edit-carbs").value,
    protein: document.getElementById("food-edit-protein").value,
    alcohol: document.getElementById("food-edit-alcohol").value,
    caffeine: document.getElementById("food-edit-caffeine").value,
    csrf: csrfToken
  }
  let url = undefined;
  if (currentFood.hash) {
    url = API_DOMAIN + "/food-diary/set-food";
    payload.hash = currentFood.hash;
  } else {
    url = API_DOMAIN + "/food-diary/create-food";
  }
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = setDate;
  xmlHttp.send(JSON.stringify(payload));
}
function servingRecipeChange(event) {
  let select = event.target;
  let option = select.options[select.selectedIndex];
  let amount = option.getAttribute("amount");
  let textBox = document.getElementById("recipe-servings-amount");
  textBox.value = amount;
  let servingsSave = document.getElementById("recipe-servings-save");
  servingsSave.style.display = "inline-block";
}
function servingChange(event) {
  let select = event.target;
  let option = select.options[select.selectedIndex];
  let amount = option.getAttribute("amount");
  let textBox = document.getElementById("servings-amount");
  textBox.value = amount;
  let edit = document.getElementById("servings-edit");
  let servingsText = document.getElementById("servings-text");
  let caloriesText = document.getElementById("calories-text");
  let servingsCreate = document.getElementById("servings-create");
  let servingsSave = document.getElementById("servings-save");
  if ("kcal" == option.value) {
    edit.style.display = "none";
    servingsText.style.display = "none";
    caloriesText.style.display = "none";
    servingsCreate.style.display = "none";
    servingsSave.style.display = "inline-block";
  } else if ("new" == option.value) {
    edit.style.display = "none";
    servingsText.style.display = "inline-block";
    caloriesText.style.display = "inline-block";
    servingsCreate.style.display = "inline-block";
    servingsSave.style.display = "none";
  } else {
    // edit.style.display = 'inline-block';
    servingsText.style.display = "none";
    caloriesText.style.display = "none";
    servingsCreate.style.display = "none";
    servingsSave.style.display = "inline-block";
  }
}
function saveServing(event) {
  const caller = event.target;
  const hash = caller.getAttribute("hash");
  const key = caller.getAttribute("key");
  const date = caller.getAttribute("date");
  const timestamp = caller.getAttribute("timestamp");
  let textBox = document.getElementById("servings-amount");
  let select = document.getElementById("servings-name");
  const name = select.value;
  const quantity = textBox.value;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", API_DOMAIN + "/food-diary/set-serving", true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = setDate;
  xmlHttp.send(
    JSON.stringify({
      hash: hash,
      key: key,
      date: date,
      timestamp: timestamp,
      name: name,
      amount: quantity,
      csrf: csrfToken
    })
  );
}
function editServing(event) {
  console.log(event);
  console.log("Not implemented :)");
}
function createServing(event) {
  const caller = event.target;
  const hash = caller.getAttribute("hash");
  const foodHash = caller.getAttribute("food-hash");
  let textBox = document.getElementById("servings-amount");
  let servingsText = document.getElementById("servings-text");
  let caloriesText = document.getElementById("calories-text");
  const quantity = textBox.value;
  const servingName = servingsText.value;
  const calories = caloriesText.value;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", API_DOMAIN + "/food-diary/create-serving", true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = setDate;
  xmlHttp.send(
    JSON.stringify({
      hash: foodHash,
      quantity: quantity,
      name: servingName,
      calories: calories,
      csrf: csrfToken
    })
  );
}
function saveRecipe(event) {
  const timestamp = undefined;
  const hash = currentFood.hash;
  const date = document.getElementById("date-picker").value;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", API_DOMAIN + "/food-diary/set-food", true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = setDate;
  xmlHttp.send(
    JSON.stringify({
      hash: hash,
      date: date,
      ingredients: currentFood.metadata.ingredients,
      csrf: csrfToken
    })
  );
}
function addToRecipe(event) {
  const textBoxParent = document.getElementsByClassName("search-bar")[0];
  const textBox = textBoxParent.firstElementChild;
  textBox.value = "";
  let foodEdit = document.getElementById("food-edit");
  let recipeEdit = document.getElementById("recipe-edit");
  foodEdit.style.display = "none";
  recipeEdit.style.display = "block";
  let content = document.getElementById('content');
  content.style.display = 'none';
  let searchBlob = findParentWithClass(textBox, 'search-blob');
  searchBlob.style.display = 'none';
  let caller = event.target;
  while ("LI" != caller.tagName) {
    caller = caller.parentElement;
  }
  let hash = caller.getAttribute("hash");
  let name = caller.getAttribute("food-name");
  let newJson = { multiplier: 1, hash: hash, name: name };
  currentFood.metadata.ingredients.push(newJson);
  redrawRows();
}
function showTotalsModal(event) {
  let totalsModal = document.getElementById('totals-modal');
  totalsModal.style.display = 'block';
  let modalBg = findParentWithClass(totalsModal, "modal-bg");
  modalBg.style.display = "flex";
}
function setDate(event) {
  const textBoxParent = document.getElementsByClassName("search-bar")[0];
  const textBox = textBoxParent.firstElementChild;
  textBox.value = "";

  const date = document.getElementById("date-picker").value;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", API_DOMAIN + "/food-diary/get-day", true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = populateTable;
  xmlHttp.send(
    JSON.stringify({
      date: date,
      csrf: csrfToken
    })
  );
}
function populateTable(event) {
  let data = defaultHandlerV1(event);
  closeFood();
  closeServings();
  const table = document.getElementById("diary");
  while (table.firstElementChild) {
    table.firstElementChild.remove();
  }
  {
    const tr = document.createElement("tr");
    tr.style.position = "relative";
    {
      const th = document.createElement("th");
      th.style.border = "none";
      tr.appendChild(th);
    }
    {
      const th = document.createElement("th");
      th.innerText = "Food";
      tr.appendChild(th);
    }
    {
      const th = document.createElement("th");
      th.innerText = "kcal";
      tr.appendChild(th);
    }
    {
      const th = document.createElement("th");
      th.style.border = "none";
      tr.appendChild(th);
    }
    table.appendChild(tr);
  }

  let keys = Object.keys(data.entries).sort((a,b)=>a.localeCompare(b));
  for (let index = 0; index < keys.length; index++) {
    let timestamp = keys[index];
    let entry = data.entries[timestamp];
    const tr = document.createElement("tr");
    tr.style.position = "relative";
    {
      const td = document.createElement("td");
      td.style.position = "relative";
      const button = document.createElement("button");
      button.innerText = "#";
      button.setAttribute("food-hash", entry.food_id);
      button.setAttribute("timestamp", timestamp);
      button.setAttribute(
        "calculated-values",
        JSON.stringify(entry.calculated_values)
      );
      button.setAttribute("key", data.diary_key);
      button.setAttribute("date", data.date);
      button.addEventListener("click", changeQuantity);
      td.appendChild(button);
      tr.appendChild(td);
    }
    {
      const td = document.createElement("td");
      td.style.position = "relative";
      const span = document.createElement("span");
      span.classList.add("food");
      span.innerText = entry.name;
      span.setAttribute("food-hash", entry.food_id);
      span.setAttribute("timestamp", timestamp);
      span.setAttribute("key", data.diary_key);
      span.setAttribute("date", data.date);
      span.addEventListener("click", editEitherFoodOrRecipe);
      td.appendChild(span);
      tr.appendChild(td);
    }
    {
      const td = document.createElement("td");
      td.style.textAlign = "right";
      td.innerText = Math.round(entry.calculated_values.calories);
      tr.appendChild(td);
    }
    {
      const td = document.createElement("td");
      const button = document.createElement("button");
      button.innerHTML = "&times;";
      button.setAttribute("timestamp", timestamp);
      button.setAttribute("key", data.diary_key);
      button.setAttribute("date", data.date);
      button.addEventListener("click", deleteEntry);
      td.appendChild(button);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  {
    const tr = document.createElement("tr");
    tr.style.position = "relative";
    {
      const td = document.createElement("td");
      td.style.border = "none";
      tr.appendChild(td);
    }
    {
      const td = document.createElement("td");
      td.innerText = "Total";
      tr.appendChild(td);
    }
    {
      const td = document.createElement("td");
      td.style.textAlign = "right";
      const button = document.createElement("button");
      button.innerHTML = "#";
      button.setAttribute("total", data.total);
      button.addEventListener("click", showTotalsModal);
      td.appendChild(button);
      tr.appendChild(td);
    }
    {
      const td = document.createElement("td");
      td.style.border = "none";
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  // perform totals display
  let totalKeys = Object.keys(data.totals);
  for (let index = 0; index < totalKeys.length; index++) {
    let key = totalKeys[index];
    let span = document.getElementById(`total-${key}`);
    if (!span) {
      // in the future, just add a span
      continue;
    }
    span.innerText = Math.round(data.totals[key]);
  }
  loader.style.display = "none";
}
function forceToDecimal(event) {
  let textBox = event.target;
  textBox.value = textBox.value.replace(/[^\d]+/g, ".");
}

const today = new Date();
const year = today.getFullYear();
let month = (today.getMonth() + 1).toString();
if (month.length < 2) {
  month = "0" + month;
}
let day = today.getDate().toString();
if (day.length < 2) {
  day = "0" + day;
}

document.getElementById("date-picker").value = year + "-" + month + "-" + day;

const DEBUG = false;

if (!csrfToken) {
  window.location.replace("../signup.html");
}

if (
  !navigator.userAgent.includes("Chrome") &&
  navigator.userAgent.includes("Safari")
) {
  iosCookieRefresh();
}

setDate();

document.addEventListener(
  "keydown",
  function (e) {
    if (
      e.key === "s" &&
      (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
    }
  },
  false
);

let searches = document.getElementsByClassName("item-text-box");

for (let i = 0; i < searches.length; i++) {
  search = searches[i];
  search.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      let inputs = caller.parentElement.getElementsByTagName("input");
      for (let j = 0; j < inputs.length; j++) {
        inputs[j].click();
        break;
      }
    }
  });
}

function closeModalIfApplicable(event) {
  if (event.target.classList.contains("modal-bg")) {
    event.target.getElementsByClassName("modal")[0].style.display = "none";
    event.target.style.display = "none";
  }
}

let currentSuggestionMethod = undefined;
let itemsToIgnore = [];
function showSearch(event) {
  let caller = event.target;
  let destinationId = caller.getAttribute('destination-id');
  if ("ingredients" === destinationId) {
    currentSuggestionMethod = addToRecipe;
    itemsToIgnore = [currentFood.hash];
  } else {
    currentSuggestionMethod = setTextAndAdd;
    itemsToIgnore = [];
  }
  let searchId = caller.getAttribute('search-id');
  let searchDiv = document.getElementById(searchId);
  searchDiv.style.display = 'block';
  searchDiv.getElementsByClassName('big')[0].focus();

  showPanel('food-search');
}

function showPanel(id) {
  let modals = Array.from(document.getElementsByClassName('modal-bg'));
  let panels = Array.from(document.getElementsByClassName('panel'));
  let searchBlobs = Array.from(document.getElementsByClassName('search-blob'));
  let both = modals.concat(panels, searchBlobs);
  for(let i = 0; i < both.length; i++) {
    both[i].style.display = 'none';
  }
  if (!id) {
    return;
  }
  let selected = document.getElementById(id);
  if (!selected) {
    return;
  }
  if (selected.classList.contains('panel') || selected.classList.contains('search-blob')) {
    selected.style.display = 'block';
  } else if (selected.classList.contains('modal')) {
    let modalBg = findParentWithClass(selected, 'modal-bg');
    modalBg.style.display = 'flex';
  }
}

function closeSearch(event) {
  let caller = event.target;
  let searchBlob = findParentWithClass(caller, 'search-blob');
  searchBlob.style.display = 'none';
  let content = document.getElementById('content');
  content.style.display = 'block';
}

let modalBackgrounds = document.getElementsByClassName("modal-bg");
for (let i = 0; i < modalBackgrounds.length; i++) {
  modalBg = modalBackgrounds[i];
  modalBg.style.display = "none";
  modalBg.addEventListener("click", closeModalIfApplicable);
}

const servingsTextBox = document.getElementById("servings-amount");
const servingsSaveButton = document.getElementById("servings-save");
servingsTextBox.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    servingsTextBox.blur();
    servingsSaveButton.click();
  }
});

const loader = document.getElementById("loading");
