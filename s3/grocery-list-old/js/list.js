function determineAddUrl(json) {
    let task = json.task;
    let input = json.input;
    let groupName = json.groupName;
    let commaIndex = input.indexOf(',');
    if (commaIndex > -1) {
        return {
            'name': input.substring(0, commaIndex),
            'item': input.substring(commaIndex+1),
            'csrf': csrfToken,
        };
    } else if (!!groupName) {
        return {
            'name': groupName,
            'item': input,
            'csrf': csrfToken,
        };
    } else {
        return {
            'name': 'Groceries',
            'item': input,
            'csrf': csrfToken,
        };
    }
}
function addToList(event) {
    hidePopups(event);
    const caller = event.target;
    const input = caller.parentElement.getElementsByTagName("input")[0];
    let groupName = undefined;
    if ("LI" == caller.parentElement.parentElement.tagName) {
        groupName = caller.parentElement.firstElementChild.textContent;
    }
    let url = API_DOMAIN + '/additem';
    let body = determineAddUrl({ 'groupName': groupName, 'input': input.value });
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleAddList;
    xmlHttp.send(JSON.stringify(body));
    input.value = '';
}
function handleAddList(event) {
    const result = defaultHandler(event);
    if(result.hasOwnProperty('group') && result.hasOwnProperty('item')) {
        addItem(result.group, result.item);
    }
}
function deleteFromList(event) {
    hidePopups(event);
    const groupName = event.target.parentElement.parentElement.parentElement.children[0].children[0].textContent;
    const textItem = event.target.parentElement;
    const text = textItem.children[0].textContent;

    removeItem(textItem);

    let url = API_DOMAIN + '/deleteitem';
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true); // false for synchronous request
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleDeleteList;
    xmlHttp.send(JSON.stringify({'name': groupName, 'item': text, 'csrf': csrfToken}));
}
function handleDeleteList(event) {
    const result = defaultHandler(event);
    console.log(JSON.stringify(result));
}
function openShareWindow(event) {
    let share = document.getElementById('share');
    let listName = document.getElementById('list-name');
    listName.innerText = event.target.parentElement.firstElementChild.innerText;
    listName.setAttribute('hash', event.target.parentElement.parentElement.id);
    share.style.display = 'block';
}
function hidePopups(event) {
    let share = document.getElementById('share');
    share.style.display = 'none';
    let info = document.getElementById('info');
    info.style.display = 'none';
    let modalBg = document.getElementById('modal-bg');
    modalBg.style.display = 'none';
}
function sendShareRequest(event) {
    console.log(event);
    let userToShareWithBox = document.getElementById('user-to-share-with');
    let user = userToShareWithBox.value;
    let listName = document.getElementById('list-name');
    let group_hash = listName.getAttribute('hash');

    let url = API_DOMAIN + '/sendsharelist';
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true); // false for synchronous request
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleShareResponse;
    xmlHttp.send(JSON.stringify({'csrf': csrfToken, 'user': user, 'list_id': group_hash}));
}
function acceptShare(group_hash) {
    let url = API_DOMAIN + '/acceptsharelist';
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true); // false for synchronous request
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleShareResponse;
    xmlHttp.send(JSON.stringify({'csrf': csrfToken, 'list_id': group_hash}));
}
function openInfoWindow(text) {
    let info = document.getElementById('info');
    info.style.display = 'block';
    let infoP = document.getElementById('info-p');
    infoP.innerText = text;
}
function handleShareResponse(event) {
    hidePopups();
    const result = defaultHandler(event);
    if(result.hasOwnProperty('message')) {
        openInfoWindow(result.message);
        loadList();
    } else {
        openInfoWindow("Something went wrong...");
    }
}
function moveUp(event) {
    hidePopups(event);
    const caller = event.target;
    let groupId = caller.parentElement.parentElement.id;
    let otherGroup = caller.parentElement.parentElement.previousElementSibling;
    if(otherGroup) {
        swapGroups(groupId, otherGroup.id);
        runOrderCall();
    }
}
function moveDown(event) {
    hidePopups(event);
    const caller = event.target;
    let groupId = caller.parentElement.parentElement.id;
    let otherGroup = caller.parentElement.parentElement.nextElementSibling;
    if(otherGroup) {
        swapGroups(otherGroup.id, groupId);
        runOrderCall();
    }
}

function runOrderCall() {
    let url = API_DOMAIN + '/setlistorder';
    const groups = document.querySelectorAll('ul#main-list>li')
    let group_hashes = [];
    for(let index = 0; index < groups.length; index++) {
        let group = groups[index];
        group_hashes.push(group.id);
    }
    let body = {'list_ids': group_hashes, 'csrf': csrfToken};
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true); // false for synchronous request
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleOrderCall;
    xmlHttp.send(JSON.stringify(body));
}

function handleOrderCall(event) {
    const result = defaultHandler(event);
    console.log(JSON.stringify(result));
}

function swapGroups(groupOneId, groupTwoId) {
    let mainList = document.getElementById('main-list');
    let groupOneLi = document.getElementById(groupOneId);
    let groupTwoLi = document.getElementById(groupTwoId);

    mainList.insertBefore(groupOneLi, groupTwoLi);
}

function addItem(group, item) {
    let mainList = document.getElementById('main-list');

    const groupId = group.hash;
    let groupLi = document.getElementById(groupId);
    if(!groupLi) {
        groupLi = document.createElement('li');
        groupLi.id = groupId;
        groupLi.appendChild(createAddToDiv(group));
        let itemsList = document.createElement('ul');
        itemsList.classList.add('ui-list');
        itemsList.classList.add('bottom-list');
        groupLi.appendChild(itemsList);
        mainList.appendChild(groupLi);
    }

    let itemUl = groupLi.getElementsByClassName('ui-list')[0];


    const itemId = item.hash;
    let itemLi = document.getElementById(itemId);
    if(!itemLi) {
        let itemLi = document.createElement('li');
        itemLi.id = itemId;
        let nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        nameDiv.innerHTML = item.name;
        nameDiv.addEventListener('click', crossToggle);
        if (item.crossed_off) {
            nameDiv.style.textDecoration = 'line-through';
        }
        itemLi.appendChild(nameDiv);
        let deleteButton = document.createElement('button');
        deleteButton.onclick = deleteFromList;
        deleteButton.classList.add('delete');
        deleteButton.innerHTML = '&times;'
        itemLi.appendChild(deleteButton);
        if (!item.crossed_off) {
            deleteButton.style.display = 'none';
        }
        itemUl.appendChild(itemLi);
    }

    // sort the frontend items
    let items = Array.from(itemUl.getElementsByTagName('li'));
    let itemMap = {};
    for(let index = 0; index < items.length; index++) {
        let item = items[index];
        let nameDiv = Array.from(item.getElementsByClassName('name'))[0];
        const key = nameDiv.textContent;
        itemMap[key] = item;
    }
    let sortedKeys = Object.keys(itemMap).sort(Intl.Collator().compare);
    for (let index = 0; index < sortedKeys.length; index++) {
        let key = sortedKeys[index];
        itemUl.appendChild(itemMap[key]);
    }
}

function crossToggle(event) {
    let div = event.target;
    let deleteButton = div.parentElement.querySelector('button.delete');
    let list_hash = div.parentElement.parentElement.parentElement.id;
    let newValue = undefined;
    if('line-through' == div.style.textDecoration) {
        div.style.textDecoration = 'none';
        deleteButton.style.display = 'none';
        newValue = false;
    } else {
        div.style.textDecoration = 'line-through';
        deleteButton.style.display = 'block';
        newValue = true;
    }
    let url = API_DOMAIN + '/' + 'setcrossedoff';
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleToggle;
    xmlHttp.send(JSON.stringify({'list_id': list_hash, 'item': div.innerText.trim(), 'crossed_off': newValue, 'csrf': csrfToken}));
}

function handleToggle(event) {
    const result = defaultHandler(event);
    console.log(JSON.stringify(result));
}

function askToDeleteGroup(event) {
    hidePopups(event);
    let modalBg = document.getElementById('modal-bg');
    modalBg.style.display = 'block';
}

function createAddToDiv(group) {
    let addToGroupDiv = document.createElement('div');
    addToGroupDiv.classList.add('add-to-group');
    let nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    nameDiv.textContent = group.name;
    addToGroupDiv.appendChild(nameDiv);
    let fillDiv = document.createElement('div');
    fillDiv.classList.add('fill');
    addToGroupDiv.appendChild(fillDiv);
    let shareButton = document.createElement('button');
    shareButton.innerHTML = '&#129309;';
    shareButton.onclick = openShareWindow;
    addToGroupDiv.appendChild(shareButton);
    let upButton = document.createElement('button');
    upButton.classList.add('up');
    upButton.onclick = moveUp;
    upButton.innerHTML = '&#9650;';
    addToGroupDiv.appendChild(upButton);
    let downButton = document.createElement('button');
    downButton.classList.add('down');
    downButton.onclick = moveDown;
    downButton.innerHTML = '&#9660;';
    addToGroupDiv.appendChild(downButton);
    return addToGroupDiv;
}

function removeItem(item) {
    let groupLi = item.parentElement.parentElement;
    item.remove();

    let itemUl = groupLi.getElementsByClassName('ui-list')[0];
    if(!itemUl.firstElementChild) {
        groupLi.remove();
    }
}
