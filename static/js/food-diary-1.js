function addToList(event) {
    const caller = event.target;
    const input = caller.parentElement.getElementsByTagName("input")[0];
    let text = input.value;
    const fieldValues = {'calories':0,'fat':0,'carbs':0,'protein':0,'alcohol':0,'caffeine':0,};
    let keys = Object.keys(fieldValues);
    for(let i = 0; i < keys.length; i++) {
        field = keys[i];
        let result = new RegExp(field + ':\\s*([0-9]+[\\.]*[0-9]*)').exec(text)
        if(result) {
            fieldValues[field] = result[1];
            text = text.substring(0,result.index) + text.substring(result.index + result[0].length, text.length)
        }
    }
    const servingPrefix = 'serving:';
    const indexFound = text.indexOf(servingPrefix);
    let serving = '1 serving';
    if(-1 < indexFound) {
        serving = text.substring(indexFound + servingPrefix.length).trim();
        text = text.substring(0, indexFound);
    }
    const foodName = text.trim();
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/food-diary/add?foodName=' + encodeURIComponent(foodName)
        + '&calories=' + encodeURIComponent(fieldValues.calories)
        + '&fat=' + encodeURIComponent(fieldValues.fat)
        + '&carbs=' + encodeURIComponent(fieldValues.carbs)
        + '&protein=' + encodeURIComponent(fieldValues.protein)
        + '&alcohol=' + encodeURIComponent(fieldValues.alcohol)
        + '&caffeine=' + encodeURIComponent(fieldValues.caffeine)
        + '&serving=' + encodeURIComponent(serving), true);
    xmlHttp.onload = refreshPage;
    xmlHttp.send(null);
}
function refreshPage(event) {
    let searches = document.getElementsByClassName("item-text-box");
    for(let i = 0; i < searches.length; i++) {
        search = searches[i];
        search.text = '';
    }
    let xmlHttp = event.target;
    location.reload();
}
let searchTimeout = undefined;
function queueSearch(event) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(search, 400, event);
}
let currentSuggestionBox = undefined;
let currentSuggestionMethod = undefined;
function search(event) {
    const caller = event.target;
    const input = caller.parentElement.getElementsByTagName("input")[0];
    const query = input.value;
    currentSuggestionBox = caller.parentElement.parentElement.getElementsByClassName("suggestions")[0];
    if('recipe-search' == caller.id) {
        currentSuggestionMethod = addToRecipe;
    } else {
        currentSuggestionMethod = setTextAndAdd;
    }
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/food-diary/search?query=' + encodeURIComponent(query), true);
    xmlHttp.onload = displaySearch;
    xmlHttp.send(null);
}
function displaySearch(event) {
    let xmlHttp = event.target;
    const suggestionBoxes = document.getElementsByClassName("suggestions");
    for(let i = 0; i < suggestionBoxes.length; i++) {
        suggestions = suggestionBoxes[i];
        while (suggestions.firstChild) {
            suggestions.removeChild(suggestions.firstChild);
        }
    }
    let items = JSON.parse(xmlHttp.responseText);
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const li = document.createElement("li");
        li.addEventListener("click", currentSuggestionMethod);
        li.style.cursor = "pointer";
        li.style.display = "relative";
        li.setAttribute('hash', item.hash);
        li.setAttribute('food-name', item.name);
        const span = document.createElement("span");
        span.innerText = item.name;
        li.appendChild(span);
        // you can try this, but its disabled server side anyway
        if(DEBUG) {
            const button = document.createElement("button");
            button.innerText = 'x';
            button.setAttribute('hash', item.hash);
            button.onclick = deleteFood;
            button.style.position = "absolute";
            button.style.top = "0px";
            button.style.right = "0px";
            li.appendChild(button);
        }
        currentSuggestionBox.appendChild(li);
    }
    currentSuggestionBox.style.display = 'block';
}
function deleteFood(event) {
    let caller = event.target;
    const hash = caller.getAttribute('hash');
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/food-diary/delete_food?hash=' + encodeURIComponent(hash), true);
    // xmlHttp.onload = refreshPage;
    xmlHttp.send(null);
    caller.parentElement.remove();
    event.stopPropagation();
}
function setTextAndAdd(event) {
    let caller = event.target;
    while('LI' != caller.tagName) {
        caller = caller.parentElement;
    }
    const newValue = caller.firstElementChild.innerText;
    let div = caller;
    while('DIV' != div.tagName) {
        div = div.parentElement;
    }
    const textBox = div.getElementsByTagName("input")[0];
    textBox.value = newValue;
    const suggestions = div.getElementsByClassName("suggestions")[0];
    while (suggestions.firstChild) {
        suggestions.removeChild(suggestions.firstChild);
    }
    suggestions.style.display = "none";
    addToList({'target':textBox});
}
function deleteEntry(event) {
    const caller = event.target;
    const hash = caller.getAttribute('hash');
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/food-diary/delete?hash=' + encodeURIComponent(hash), true);
    xmlHttp.onload = refreshPage;
    xmlHttp.send(null);
}
function changeQuantity(event) {
    closeFood();
    closeServings();
    const caller = event.target;
    let servings = document.getElementById('servings');
    caller.parentElement.appendChild(servings);
    const hash = caller.getAttribute('hash');
    const food_hash = caller.getAttribute('food-hash');
    let save = document.getElementById('servings-save');
    save.setAttribute('hash',hash);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/food-diary/get_serving?hash=' + encodeURIComponent(food_hash), true);
    xmlHttp.onload = displayServing;
    xmlHttp.send(null);
}
function closeServings(event) {
    let servings = document.getElementById('servings');
    servings.style.display = 'none';
}
function displayServing(event) {
    let xmlHttp = event.target;
    let item = JSON.parse(xmlHttp.responseText);
    let servings = document.getElementById('servings');
    servings.style.display = 'block';
    let textBox = document.getElementById('servings-amount');
    let select = document.getElementById('servings-name');
    let edit = document.getElementById('servings-edit');
    edit.style.display = 'none';
    while(select.firstChild) {
        select.firstChild.remove();
    }
    {
        let option = document.createElement('option');
        option.innerText = 'kcal';
        option.setAttribute('amount', item.metadata.calories);
        select.appendChild(option);
        textBox.value = item.metadata.calories;
    }
    for(let i = 0; i < item.metadata.servings.length; i++) {
        let serving = item.metadata.servings[i];
        let option = document.createElement('option');
        option.innerText = serving.name;
        option.setAttribute('amount', serving.amount);
        select.appendChild(option);
    }
}

let currentFood = {};
function editEitherFoodOrRecipe(event) {
    closeFood();
    closeServings();
    const caller = event.target;
    const hash = caller.getAttribute('hash');
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/food-diary/get_food?hash=' + encodeURIComponent(hash), true);
    xmlHttp.onload = handleFood;

    let foodOrRecipeEdit = document.getElementById('food-or-recipe-edit');
    caller.parentElement.appendChild(foodOrRecipeEdit);

    xmlHttp.send(null);
}

function handleFood(event) {
    let xmlHttp = event.target;
    currentFood = JSON.parse(xmlHttp.responseText);
    if(currentFood.metadata.hasOwnProperty('recipe')) {
        displayRecipe();
    } else {
        displayFood();
    }
    let foodOrRecipeEdit = document.getElementById('food-or-recipe-edit');
    foodOrRecipeEdit.style.display = 'block';
}

function closeFood(event) {
    let servings = document.getElementById('food-or-recipe-edit');
    servings.style.display = 'none';
}
function displayFood(event) {
    let foodEdit = document.getElementById('food-edit');
    let recipeEdit = document.getElementById('recipe-edit');
    foodEdit.style.display = 'none';
    recipeEdit.style.display = 'none';

    let item = currentFood;

    document.getElementById('food-edit-name').value = item.name;
    document.getElementById('food-edit-calories').value = item.metadata.calories;
    document.getElementById('food-edit-protein').value = item.metadata.protein;
    document.getElementById('food-edit-fat').value = item.metadata.fat;
    document.getElementById('food-edit-carbs').value = item.metadata.carbs;
    document.getElementById('food-edit-alcohol').value = item.metadata.alcohol;
    document.getElementById('food-edit-caffeine').value = item.metadata.caffeine;
    foodEdit.style.display = 'block';
}
function displayRecipe(event) {
    let foodEdit = document.getElementById('food-edit');
    let recipeEdit = document.getElementById('recipe-edit');
    foodEdit.style.display = 'none';
    recipeEdit.style.display = 'none';

    if(!currentFood.metadata.hasOwnProperty('recipe') || !currentFood.metadata.recipe.hasOwnProperty('ingredients')) {
        currentFood.metadata.recipe = {'ingredients':[]};
    }

    redrawRows();

    recipeEdit.style.display = 'block';
}
function redrawRows() {
    const ingredientsTable = document.getElementById('ingredients');
    while(ingredientsTable.firstElementChild) {
        ingredientsTable.firstElementChild.remove();
    }
    let tableHeader = createTableHeader();
    ingredientsTable.appendChild(tableHeader);
    for(let i = 0; i < currentFood.metadata.recipe.ingredients.length; i++) {
        let ingredient = currentFood.metadata.recipe.ingredients[i];
        let row = createTableRow(ingredient);
        ingredientsTable.appendChild(row);
    }
}
function createTableHeader() {
    let tr = document.createElement('tr');
    {
        let th = document.createElement('th');
        th.innerText = '#';
        tr.appendChild(th);
    }
    {
        let th = document.createElement('th');
        th.innerText = 'Food';
        tr.appendChild(th);
    }
    {
        let th = document.createElement('th');
        th.innerText = '';
        tr.appendChild(th);
    }
    return tr;
}
function createTableRow(ingredient) {
    let tr = document.createElement('tr');
    {
        let td = document.createElement('td');
        let button = document.createElement('button');
        button.innerText = '#';
        td.appendChild(button);
        tr.appendChild(td);
    }
    {
        let td = document.createElement('td');
        td.innerText = ingredient.name;
        tr.appendChild(td);
    }
    {
        let td = document.createElement('td');
        let button = document.createElement('button');
        button.innerHTML = '&times;';
        td.appendChild(button);
        tr.appendChild(td);
    }
    return tr;
}
function saveFood(event) {
    const hash = currentFood.hash;
    let textBox = document.getElementById('servings-amount');
    let select = document.getElementById('servings-name');
    const name = select.value;
    const quantity = textBox.value;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/food-diary/set_food?hash=' + encodeURIComponent(hash)
                + '&name=' + encodeURIComponent(document.getElementById('food-edit-name').value)
                + '&calories=' + encodeURIComponent(document.getElementById('food-edit-calories').value)
                + '&protein=' + encodeURIComponent(document.getElementById('food-edit-protein').value)
                + '&fat=' + encodeURIComponent(document.getElementById('food-edit-fat').value)
                + '&carbs=' + encodeURIComponent(document.getElementById('food-edit-carbs').value)
                + '&alcohol=' + encodeURIComponent(document.getElementById('food-edit-alcohol').value)
                + '&caffeine=' + encodeURIComponent(document.getElementById('food-edit-caffeine').value)
                , true);
    xmlHttp.onload = refreshPage;
    xmlHttp.send(null);
}
function servingChange(event) {
    let select = event.target;
    let option = select.options[select.selectedIndex];
    let amount = option.getAttribute('amount');
    let textBox = document.getElementById('servings-amount');
    textBox.value = amount;
    let edit = document.getElementById('servings-edit');
    if('kcal' == option.value) {
        edit.style.display = 'none';
    } else {
        edit.style.display = 'inline-block';
    }
}
function saveServing(event) {
    const caller = event.target;
    const hash = caller.getAttribute('hash');
    let textBox = document.getElementById('servings-amount');
    let select = document.getElementById('servings-name');
    const name = select.value;
    const quantity = textBox.value;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/food-diary/set_serving?hash=' + encodeURIComponent(hash) + '&name=' + encodeURIComponent(name) + '&amount=' + encodeURIComponent(quantity), true);
    xmlHttp.onload = refreshPage;
    xmlHttp.send(null);
}
function editServing(event) {
    console.log(event);
    console.log('Not implemented :)');
}
function saveRecipe(event) {
    console.log(event);
    console.log('Not implemented :)');
}
function addToRecipe(event) {
    let caller = event.target;
    while('LI' != caller.tagName) {
        caller = caller.parentElement;
    }
    let hash = caller.getAttribute('hash');
    let name = caller.getAttribute('food-name');
    let newJson = {'multiplier':1,'hash':hash,'name':name,};
    currentFood.metadata.recipe.ingredients.push(newJson);
    redrawRows();
}function showHideCallback(event) {
    let button = event.target;
    let total = button.getAttribute('total');
    if("Show" == button.innerText) {
        button.innerText = total;
    } else {
        button.innerText = "Show";
    }
}
