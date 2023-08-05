function addToList(event) {
    const caller = event.target;
    const input = caller.parentElement.getElementsByTagName("input")[0];

    const hash = caller.getAttribute('hash');
    const date = document.getElementById('date-picker').value;

    let payload = undefined;
    if (!!hash) {
        payload = {
            'hash': hash,
            'date': date,
            'csrf': csrfToken,
        };
    } else {
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

        payload = {
            'foodName': foodName,
            'calories': fieldValues.calories,
            'fat': fieldValues.fat,
            'carbs': fieldValues.carbs,
            'protein': fieldValues.protein,
            'alcohol': fieldValues.alcohol,
            'caffeine': fieldValues.caffeine,
            'serving': serving,
            'date': date,
            'csrf': csrfToken,
        };
    }

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", DOMAIN + '/food-diary/add', true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = setDate;
    xmlHttp.send(JSON.stringify(payload));
}
let searchTimeout = undefined;
function queueSearch(event) {
    event.target.removeAttribute('hash');
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
    xmlHttp.open("POST", DOMAIN + '/food-diary/search', true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = displaySearch;
    xmlHttp.send(JSON.stringify({
        'query': query,
        'csrf': csrfToken,
    }));
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
    xmlHttp.open("POST", DOMAIN + '/food-diary/delete_food', true);
    xmlHttp.withCredentials = true;
    xmlHttp.send(JSON.stringify({
        'hash': hash,
        'csrf': csrfToken,
    }));
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
    textBox.setAttribute('hash', caller.getAttribute('hash'));
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
    xmlHttp.open("POST", DOMAIN + '/food-diary/delete', true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = setDate;
    xmlHttp.send(JSON.stringify({
        'hash': hash,
        'csrf': csrfToken,
    }));
}
function changeQuantity(event) {
    const caller = event.target;
    let servings = document.getElementById('servings');
    caller.parentElement.appendChild(servings);
    const hash = caller.getAttribute('hash');
    const foodHash = caller.getAttribute('food-hash');
    let save = document.getElementById('servings-save');
    save.setAttribute('hash',hash);
    let servingsCreate = document.getElementById('servings-create');
    servingsCreate.setAttribute('food-hash',foodHash);
    servingsCreate.setAttribute('hash',hash);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", DOMAIN + '/food-diary/get_serving', true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = displayServing;
    xmlHttp.send(JSON.stringify({
        'hash': foodHash,
        'csrf': csrfToken,
    }));
}
function closeServings(event) {
    let servings = document.getElementById('servings');
    document.body.appendChild(servings);
    servings.style.display = 'none';
}
function closeRecipeServings(event) {
    let servings = document.getElementById('recipe-servings');
    document.body.appendChild(servings);
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
    let servingsText = document.getElementById('servings-text');
    let caloriesText = document.getElementById('calories-text');
    let servingsCreate = document.getElementById('servings-create');
    let servingsSave = document.getElementById('servings-save');
    edit.style.display = 'none';
    servingsText.style.display = 'none';
    caloriesText.style.display = 'none';
    servingsCreate.style.display = 'none';
    servingsSave.style.display = 'inline-block';
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
    {
        let option = document.createElement('option');
        option.innerText = 'new';
        select.appendChild(option);
    }
}
function displayRecipeServing(event) {
    let xmlHttp = event.target;
    let item = JSON.parse(xmlHttp.responseText);
    let servings = document.getElementById('recipe-servings');
    servings.style.display = 'block';
    let textBox = document.getElementById('recipe-servings-amount');
    let select = document.getElementById('recipe-servings-name');
    let servingsSave = document.getElementById('recipe-servings-save');
    servingsSave.style.display = 'inline-block';
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
    const hash = caller.getAttribute('food-hash');
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", DOMAIN + '/food-diary/get_food', true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleFood;

    let foodOrRecipeEdit = document.getElementById('food-or-recipe-edit');
    caller.parentElement.appendChild(foodOrRecipeEdit);

    xmlHttp.send(JSON.stringify({
        'hash': hash,
        'csrf': csrfToken,
    }));
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
    let foodOrRecipeEdit = document.getElementById('food-or-recipe-edit');
    document.body.appendChild(foodOrRecipeEdit);
    foodOrRecipeEdit.style.display = 'none';
}
function displayFood(event) {
    let foodEdit = document.getElementById('food-edit');
    let recipeEdit = document.getElementById('recipe-edit');
    foodEdit.style.display = 'none';
    recipeEdit.style.display = 'none';

    let item = currentFood;

    document.getElementById('food-edit-name').value = '';
    document.getElementById('food-edit-calories').value = '';
    document.getElementById('food-edit-protein').value = '';
    document.getElementById('food-edit-fat').value = '';
    document.getElementById('food-edit-carbs').value = '';
    document.getElementById('food-edit-alcohol').value = '';
    document.getElementById('food-edit-caffeine').value = '';
    document.getElementById('food-edit-name').placeholder = item.name;
    document.getElementById('food-edit-calories').placeholder = item.metadata.calories;
    document.getElementById('food-edit-protein').placeholder = item.metadata.protein;
    document.getElementById('food-edit-fat').placeholder = item.metadata.fat;
    document.getElementById('food-edit-carbs').placeholder = item.metadata.carbs;
    document.getElementById('food-edit-alcohol').placeholder = item.metadata.alcohol;
    document.getElementById('food-edit-caffeine').placeholder = item.metadata.caffeine;
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
        th.innerText = 'kcal';
        tr.appendChild(th);
    }
    {
        let th = document.createElement('th');
        th.innerText = '';
        tr.appendChild(th);
    }
    return tr;
}
function changeQuantityRow(event) {
    const caller = event.target;
    let servings = document.getElementById('recipe-servings');
    caller.parentElement.appendChild(servings);
    const hash = caller.getAttribute('hash');
    const foodHash = caller.getAttribute('food-hash');
    let save = document.getElementById('servings-save');
    save.setAttribute('hash',hash);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", DOMAIN + '/food-diary/get_serving', true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = displayRecipeServing;
    xmlHttp.send(JSON.stringify({
        'hash': foodHash,
        'csrf': csrfToken,
    }));
}
function createTableRow(ingredient) {
    let tr = document.createElement('tr');
    {
        let td = document.createElement('td');
        let button = document.createElement('button');
        button.innerText = '#';
        button.setAttribute('food-hash', entry.food.hash);
        button.addEventListener('click', changeQuantityRow);
        td.appendChild(button);
        tr.appendChild(td);
    }
    {
        let td = document.createElement('td');
        td.innerText = ingredient.name;
        tr.appendChild(td);
    }
    {
        const td = document.createElement('td');
        td.style.textAlign = 'right';
        td.innerText = Math.round(ingredient.serving);
        tr.appendChild(td);
    }
    {
        let td = document.createElement('td');
        let button = document.createElement('button');
        button.setAttribute('food-hash', entry.food.hash);
        button.addEventListener('click', deleteRow);
        button.innerHTML = '&times;';
        td.appendChild(button);
        tr.appendChild(td);
    }
    return tr;
}
function deleteRow(event) {
    event.parentElement.parentElement.remove()
}
function saveFood(event) {
    const hash = currentFood.hash;
    let textBox = document.getElementById('servings-amount');
    let select = document.getElementById('servings-name');
    const name = select.value;
    const quantity = textBox.value;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", DOMAIN + '/food-diary/set_food', true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = setDate;
    xmlHttp.send(JSON.stringify({
        'hash': hash,
        'name': document.getElementById('food-edit-name').value,
        'calories': document.getElementById('food-edit-calories').value,
        'fat': document.getElementById('food-edit-fat').value,
        'carbs': document.getElementById('food-edit-carbs').value,
        'protein': document.getElementById('food-edit-protein').value,
        'alcohol': document.getElementById('food-edit-alcohol').value,
        'caffeine': document.getElementById('food-edit-caffeine').value,
        'csrf': csrfToken,
    }));
}
function servingRecipeChange(event) {
    let select = event.target;
    let option = select.options[select.selectedIndex];
    let amount = option.getAttribute('amount');
    let textBox = document.getElementById('recipe-servings-amount');
    textBox.value = amount;
    let servingsSave = document.getElementById('recipe-servings-save');
    servingsSave.style.display = 'inline-block';
}
function servingChange(event) {
    let select = event.target;
    let option = select.options[select.selectedIndex];
    let amount = option.getAttribute('amount');
    let textBox = document.getElementById('servings-amount');
    textBox.value = amount;
    let edit = document.getElementById('servings-edit');
    let servingsText = document.getElementById('servings-text');
    let caloriesText = document.getElementById('calories-text');
    let servingsCreate = document.getElementById('servings-create');
    let servingsSave = document.getElementById('servings-save');
    if('kcal' == option.value) {
        edit.style.display = 'none';
        servingsText.style.display = 'none';
        caloriesText.style.display = 'none';
        servingsCreate.style.display = 'none';
        servingsSave.style.display = 'inline-block';
    } else if ('new' == option.value) {
        edit.style.display = 'none';
        servingsText.style.display = 'inline-block';
        caloriesText.style.display = 'inline-block';
        servingsCreate.style.display = 'inline-block';
        servingsSave.style.display = 'none';
    } else {
        // edit.style.display = 'inline-block';
        servingsText.style.display = 'none';
        caloriesText.style.display = 'none';
        servingsCreate.style.display = 'none';
        servingsSave.style.display = 'inline-block';
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
    xmlHttp.open("POST", DOMAIN + '/food-diary/set_serving', true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = setDate;
    xmlHttp.send(JSON.stringify({
        'hash': hash,
        'name': name,
        'amount': quantity,
        'csrf': csrfToken,
    }));
}
function editServing(event) {
    console.log(event);
    console.log('Not implemented :)');
}
function createServing(event) {
    const caller = event.target;
    const hash = caller.getAttribute('hash');
    const foodHash = caller.getAttribute('food-hash');
    let textBox = document.getElementById('servings-amount');
    let servingsText = document.getElementById('servings-text');
    let caloriesText = document.getElementById('calories-text');
    const quantity = textBox.value;
    const servingName = servingsText.value;
    const calories = caloriesText.value;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", DOMAIN + '/food-diary/create_serving', true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = setDate;
    xmlHttp.send(JSON.stringify({
        'hash': hash,
        'food_hash': foodHash,
        'quantity': quantity,
        'name': servingName,
        'calories': calories,
        'csrf': csrfToken,
    }));
}
function saveRecipe(event) {
    console.log(event);
    console.log('Not implemented :)');
}
function addToRecipe(event) {
    const suggestions = document.getElementsByClassName("suggestions");
    for (let i = 0; i < suggestions.length; i++) {
        suggestions[i].style.display = "none";
    }
    const textBox = document.getElementById('recipe-search');
    textBox.value = '';
    let caller = event.target;
    while('LI' != caller.tagName) {
        caller = caller.parentElement;
    }
    let hash = caller.getAttribute('hash');
    let name = caller.getAttribute('food-name');
    let newJson = {'multiplier':1,'hash':hash,'name':name,};
    currentFood.metadata.recipe.ingredients.push(newJson);
    redrawRows();
}
function showHideCallback(event) {
    let button = event.target;
    let total = button.getAttribute('total');
    if("Show" == button.innerText) {
        button.innerText = total;
    } else {
        button.innerText = "Show";
    }
}
function setDate(event) {
    const textBoxParent = document.getElementById('input');
    const textBox = textBoxParent.firstElementChild;
    textBox.value = '';

    const date = document.getElementById('date-picker').value;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", DOMAIN + '/food-diary/get-day', true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = populateTable;
    xmlHttp.send(JSON.stringify({
        'date': date,
        'csrf': csrfToken,
    }));
}
function populateTable(event) {
    const foodOrRecipeEdit = document.getElementById('food-or-recipe-edit');
    closeFood();
    closeServings();
    const table = document.getElementById('diary');
    while(table.firstElementChild) {
        table.firstElementChild.remove();
    }

    let xmlHttp = event.target;
    data = JSON.parse(xmlHttp.responseText);

    {
        const tr = document.createElement('tr');
        tr.style.position = 'relative';
        {
            const th = document.createElement('th');
            th.style.border = 'none';
            tr.appendChild(th);
        }
        {
            const th = document.createElement('th');
            th.innerText = "Food";
            tr.appendChild(th);
        }
        {
            const th = document.createElement('th');
            th.innerText = "kcal";
            tr.appendChild(th);
        }
        {
            const th = document.createElement('th');
            th.style.border = 'none';
            tr.appendChild(th);
        }
        table.appendChild(tr);
    }

    for (let index = 0; index < data.entries.length; index++) {
        entry = data.entries[index];
        const tr = document.createElement('tr');
        tr.style.position = 'relative';
        {
            const td = document.createElement('td');
            td.style.position = 'relative';
            const button = document.createElement('button');
            button.innerText = '#';
            button.setAttribute('food-hash', entry.food.hash);
            button.setAttribute('hash', entry.hash);
            button.addEventListener('click', changeQuantity);
            td.appendChild(button);
            tr.appendChild(td);
        }
        {
            const td = document.createElement('td');
            td.style.position = 'relative';
            const span = document.createElement('span');
            span.classList.add('food');
            span.innerText = entry.food.name;
            span.setAttribute('food-hash', entry.food.hash);
            span.addEventListener('click', editEitherFoodOrRecipe);
            td.appendChild(span);
            tr.appendChild(td);
        }
        {
            const td = document.createElement('td');
            td.style.textAlign = 'right';
            td.innerText = Math.round(entry.derived_values.calories);
            tr.appendChild(td);
        }
        {
            const td = document.createElement('td');
            const button = document.createElement('button');
            button.innerHTML = '&times;';
            button.setAttribute('hash', entry.hash);
            button.addEventListener('click', deleteEntry);
            td.appendChild(button);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    {
        const tr = document.createElement('tr');
        tr.style.position = 'relative';
        {
            const td = document.createElement('td');
            td.style.border = 'none';
            tr.appendChild(td);
        }
        {
            const td = document.createElement('td');
            td.innerText = "Total";
            tr.appendChild(td);
        }
        {
            const td = document.createElement('td');
            td.style.textAlign = 'right';
            const button = document.createElement('button');
            button.innerHTML = 'Show';
            button.setAttribute('total', data.total);
            button.addEventListener('click', showHideCallback);
            td.appendChild(button);
            tr.appendChild(td);
        }
        {
            const td = document.createElement('td');
            td.style.border = 'none';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

const today = new Date();
const year = today.getFullYear();
let month = (today.getMonth() + 1).toString();
if (month.length < 2) {
    month = '0' + month;
}
let day = today.getDate().toString();
if (day.length < 2) {
    day = '0' + day;
}

document.getElementById('date-picker').value = year + '-' + month + '-' + day;