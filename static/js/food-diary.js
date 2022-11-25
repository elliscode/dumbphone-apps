function addToList(event) {
    const caller = event.target;
    const input = caller.parentElement.getElementsByTagName("input")[0];
    let text = input.value;
    const fieldValues = {'calories':0,'fat':0,'carbs':0,'protein':0};
    let keys = Object.keys(fieldValues);
    for(let i = 0; i < keys.length; i++) {
        field = keys[i];
        let result = new RegExp(field + ':\\s*([0-9]+[\\.]*[0-9]*)').exec(text)
        if(result) {
            fieldValues[field] = result[1];
            text = text.substring(0,result.index) + text.substring(result.index + result[0].length, text.length)
        }
    }
    const foodName = text.trim();
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/food-diary/add?foodName=' + encodeURIComponent(foodName)
        + '&calories=' + encodeURIComponent(fieldValues.calories)
        + '&fat=' + encodeURIComponent(fieldValues.fat)
        + '&carbs=' + encodeURIComponent(fieldValues.carbs)
        + '&protein=' + encodeURIComponent(fieldValues.protein), true);
    xmlHttp.onload = refreshPage;
    xmlHttp.send(null);
}
function refreshPage(event) {
    let xmlHttp = event.target;
    input.value = '';
    location.reload();
}
let searchTimeout = undefined;
function queueSearch(event) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(search, 400, event);
}
function search(event) {
    const caller = event.target;
    const input = caller.parentElement.getElementsByTagName("input")[0];
    const query = input.value;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/food-diary/search?query=' + encodeURIComponent(query), true);
    xmlHttp.onload = displaySearch;
    xmlHttp.send(null);
}
function displaySearch(event) {
    let xmlHttp = event.target;
    const suggestions = document.getElementById("suggestions");
    while (suggestions.firstChild) {
        suggestions.removeChild(suggestions.firstChild);
    }
    let items = JSON.parse(xmlHttp.responseText);
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const li = document.createElement("li");
        li.addEventListener("click", setTextAndAdd);
        li.style.cursor = "pointer";
        li.style.display = "relative";
        const span = document.createElement("span");
        span.innerText = item.name;
        li.appendChild(span);
        const button = document.createElement("button");
        button.innerText = 'x';
        button.setAttribute('hash', item.hash);
        button.onclick = deleteFood;
        button.style.position = "absolute";
        button.style.top = "0px";
        button.style.right = "0px";
        li.appendChild(button);
        suggestions.appendChild(li);
    }
    suggestions.style.display = 'block';
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
    const textBox = document.getElementById("item-text-box");
    textBox.value = newValue;
    const suggestions = document.getElementById("suggestions");
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
function changeFood(event) {
    closeFood();
    closeServings();
    const caller = event.target;
    let foodEdit = document.getElementById('food-edit');
    caller.parentElement.appendChild(foodEdit);
    const hash = caller.getAttribute('hash');
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/food-diary/get_food?hash=' + encodeURIComponent(hash), true);
    xmlHttp.onload = displayFood;
    xmlHttp.send(null);
}
function closeFood(event) {
    let servings = document.getElementById('food-edit');
    servings.style.display = 'none';
}
function displayFood(event) {
    let xmlHttp = event.target;
    let item = JSON.parse(xmlHttp.responseText);
    let foodEdit = document.getElementById('food-edit');
    document.getElementById('food-edit-name').value = item.name;
    document.getElementById('food-edit-calories').value = item.metadata.calories;
    document.getElementById('food-edit-protein').value = item.metadata.protein;
    document.getElementById('food-edit-fat').value = item.metadata.fat;
    document.getElementById('food-edit-carbs').value = item.metadata.carbs;
    document.getElementById('food-edit-alcohol').value = item.metadata.alcohol;
    document.getElementById('food-edit-caffeine').value = item.metadata.caffeine;
    document.getElementById('food-edit-save').setAttribute("hash",item.hash);
    foodEdit.style.display = 'block';
}
function saveFood(event) {
    const caller = event.target;
    const hash = caller.getAttribute('hash');
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
function editRecipe(event) {
    console.log(event);
    console.log('Not implemented :)');
}