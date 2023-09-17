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
    let url = DOMAIN + '/additem';
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
    const groupName = event.target.parentElement.parentElement.parentElement.children[0].textContent;
    const textItem = event.target.parentElement;
    const text = textItem.children[0].textContent;

    removeItem(textItem);

    let url = DOMAIN + '/deleteitem';
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

    let url = DOMAIN + '/sendsharelist';
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true); // false for synchronous request
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleShareResponse;
    xmlHttp.send(JSON.stringify({'csrf': csrfToken, 'user': user, 'list_id': group_hash}));
}
function acceptShare(group_hash) {
    let url = DOMAIN + '/acceptsharelist';
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
    let url = DOMAIN + '/setlistorder';
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
    let mainList = document.getElementById('content');
    let groupOneLi = document.getElementById(groupOneId);
    let groupTwoLi = document.getElementById(groupTwoId);

    mainList.insertBefore(groupOneLi, groupTwoLi);
}

function addItem(group, item) {
    let mainList = document.getElementById('content');

    const groupId = group.hash;
    let groupLi = document.getElementById(groupId);
    if(!groupLi) {
        groupLi = document.createElement('div');
        groupLi.id = groupId;
        groupLi.classList.add('group')
        let itemsList = document.createElement('h2');
        let blankItem = document.createElement("span");
        blankItem.style.width = '60px';
        itemsList.appendChild(blankItem);
        let nameSpan = document.createElement('span');
        nameSpan.innerText = group.name
        itemsList.appendChild(nameSpan);
        let shareButton = document.createElement('button');
        shareButton.innerText = "Share"
        itemsList.appendChild(shareButton);
        groupLi.appendChild(itemsList);
        let ulInIt = document.createElement('ul');
        ulInIt.classList.add('ui-list');
        groupLi.appendChild(ulInIt)
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
    let url = DOMAIN + '/' + 'setcrossedoff';
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

function removeItem(item) {
    let groupLi = item.parentElement.parentElement;
    item.remove();

    let itemUl = groupLi.getElementsByClassName('ui-list')[0];
    if(!itemUl.firstElementChild) {
        groupLi.remove();
    }
}
//if (!csrfToken) {
//    window.location.replace("../signup.html");
//}
//if (!navigator.userAgent.includes('Chrome') && navigator.userAgent.includes('Safari')) {
//    iosCookieRefresh();
//}
const loader = document.getElementById('loading');
function handleGetList(event) {
    const result = defaultHandler(event);
    let groups = Object.keys(result);
    for(let i = 0; i < groups.length; i++) {
        let group = result[groups[i]];
        let items = result[groups[i]].items;
        for(let j = 0; j < items.length; j++) {
            let item = items[j];
            addItem(group, item);
        }
    }
    loader.style.display = 'none';
}
function loadList(event) {
    loader.style.display = 'block';
    let url = DOMAIN + '/getlist';
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleGetList;
    xmlHttp.send(JSON.stringify({ 'csrf': csrfToken }));
};
const textBox = document.getElementById('item-text-box');
const toolBar = document.getElementById('tool-bar');
const submitBar = document.getElementById('submit-bar');
function showSubmit(event) {
    toolBar.style.display = 'none';
    submitBar.style.display = 'flex';
    textBox.focus();
};
function enterKeyListener(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("add").click();
    }
};
function hideSubmit(event) {
    toolBar.style.display = 'flex';
    submitBar.style.display = 'none';
};
loadList();