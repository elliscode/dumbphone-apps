function determineAddUrl(json) {
    let task = json.task;
    let input = json.input;
    let groupName = json.groupName;
    let parts = input.split(",", 2);
    if (2 == parts.length) {
        return '/grocery-list/' + 'add' + '?group=' + encodeURIComponent(parts[0]) + '&name=' + encodeURIComponent(parts[1]);
    } else if (!!groupName) {
        return '/grocery-list/' + 'add' + '?group=' + encodeURIComponent(groupName) + '&name=' + encodeURIComponent(parts[0]);
    } else {
        return '/grocery-list/' + 'add' + '?name=' + encodeURIComponent(parts[0]);
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
    let url = determineAddUrl({ 'groupName': groupName, 'input': input.value });
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
    xmlHttp.onload = handleAddList;
    input.value = '';
}
function handleAddList(event) {
    let xmlHttp = event.target;
    let result = JSON.parse(xmlHttp.responseText);
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

    let url = '/grocery-list/' + 'delete' + '?group=' + encodeURIComponent(groupName) + '&name=' + encodeURIComponent(text);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true); // false for synchronous request
    xmlHttp.onload = handleDeleteList;
    xmlHttp.send(null);
}
function handleDeleteList(event) {
    let xmlHttp = event.target;
    let result = JSON.parse(xmlHttp.responseText);
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

    let url = '/grocery-list/share?tel=' + encodeURIComponent(user) + '&group_hash=' + encodeURIComponent(group_hash);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true); // false for synchronous request
    xmlHttp.onload = handleShareResponse;
    xmlHttp.send(null);
}
function openInfoWindow(text) {
    let info = document.getElementById('info');
    info.style.display = 'block';
    let infoP = document.getElementById('info-p');
    infoP.innerText = text;
}
function handleShareResponse(event) {
    hidePopups();
    let xmlHttp = event.target;
    let result = JSON.parse(xmlHttp.responseText);
    if(result.hasOwnProperty('message')) {
        openInfoWindow(result.message);
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
    let url = '/grocery-list/move';
    const groups = document.querySelectorAll('ul#main-list>li')
    let group_hashes = [];
    let formData = new FormData();
    for(let index = 0; index < groups.length; index++) {
        let group = groups[index];
        formData.append('group_hashes', group.id);
    }
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true); // false for synchronous request
    xmlHttp.setRequestHeader('X-CSRFToken', csrftoken);
    xmlHttp.send(formData);
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
    let hash = div.parentElement.id;
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
    let url = '/grocery-list/' + 'set_crossed_off' + '?item_hash=' + encodeURIComponent(hash) + '&crossed_off=' + encodeURIComponent(newValue);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
    xmlHttp.onload = handleAddList;
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
<!--            let deleteButton = document.createElement('button');-->
<!--            deleteButton.innerHTML = '&times;';-->
<!--            deleteButton.onclick = askToDeleteGroup;-->
<!--            addToGroupDiv.appendChild(deleteButton);-->
    let fillDiv = document.createElement('div');
    fillDiv.classList.add('fill');
    addToGroupDiv.appendChild(fillDiv);
    let shareButton = document.createElement('button');
    shareButton.innerHTML = '&#128101;';
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
