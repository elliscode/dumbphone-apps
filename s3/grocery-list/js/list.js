function determineAddUrl(json) {
  let task = json.task;
  let input = json.input;
  let groupName = json.groupName;
  let commaIndex = input.indexOf(",");
  if (commaIndex > -1) {
    return {
      name: input.substring(0, commaIndex),
      item: input.substring(commaIndex + 1),
      csrf: csrfToken
    };
  } else if (!!groupName) {
    return {
      name: groupName,
      item: input,
      csrf: csrfToken
    };
  } else {
    return {
      name: "Groceries",
      item: input,
      csrf: csrfToken
    };
  }
}
function addToList(event) {
  showPanel('content-full');
  const caller = event.target;
  const input = caller.parentElement.getElementsByTagName("input")[0];
  let groupName = undefined;
  if ("LI" == caller.parentElement.parentElement.tagName) {
    groupName = caller.parentElement.firstElementChild.textContent;
  }
  let url = API_DOMAIN + "/grocery-list/add-item";
  let body = determineAddUrl({ groupName: groupName, input: input.value });
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleAddList;
  xmlHttp.send(JSON.stringify(body));
  input.value = "";
}
function handleAddList(event) {
  const result = defaultHandlerV1(event);
  if (result.hasOwnProperty("group") && result.hasOwnProperty("item")) {
    addItem(result.group, result.item);
  }
  if (!(!navigator.userAgent.includes("Chrome") && navigator.userAgent.includes("Safari"))) {
    applyEmulators(sideKeyListener);
  }
}
function findFirstChildWithClass(element, className) {
  const results = element.getElementsByClassName(className);
  if (results.length <= 0) {
    return undefined;
  }
  return results[0];
}
function deleteFromList(event) {
  showPanel('content-full');
  let groupElement = findParentWithClass(event.target, "group");
  const groupNameElement = findFirstChildWithClass(groupElement, "name");
  const groupName = groupNameElement.innerText;
  const textItem = event.target.parentElement;
  const text = textItem.children[0].textContent;

  removeItem(textItem);

  let url = API_DOMAIN + "/grocery-list/delete-item";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true); // false for synchronous request
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleDeleteFromList;
  xmlHttp.send(
    JSON.stringify({ name: groupName, item: text, csrf: csrfToken })
  );
}
function handleDeleteFromList(event) {
  const result = defaultHandlerV1(event);
}
const listName = document.getElementById('list-name');
function openShareWindow(event) {
  const groupId = event.target.getAttribute('group-id');
  const groupElement = document.querySelector(`div.group[group-id="${groupId}"]`);
  const titleElement = groupElement.querySelector('span.name');
  listName.innerText = titleElement.innerText;
  listName.setAttribute('group-id', groupId);
  showPanel('share');
  event.stopPropagation();
}
function sendShareRequest(event) {
  let userToShareWithBox = document.getElementById("user-to-share-with");
  let user = userToShareWithBox.value.replace(/[^\d]/g,'');
  if (!/^\d{10}$/.test(user) || user[0] == '1') {
    openInfoWindow(`${user} is not a valid 10 digit phone number`);
    return;
  }
  let group_hash = listName.getAttribute("group-id");

  let url = API_DOMAIN + "/grocery-list/send-share-list";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true); // false for synchronous request
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleShareResponse;
  xmlHttp.send(
    JSON.stringify({ csrf: csrfToken, user: user, list_id: group_hash })
  );
}
function acceptShare(group_hash) {
  let url = API_DOMAIN + "/grocery-list/accept-share-list";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true); // false for synchronous request
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleShareResponse;
  xmlHttp.send(JSON.stringify({ csrf: csrfToken, list_id: group_hash }));
}
function handleShareResponse(event) {
  showPanel('content-full');
  const result = defaultHandlerV1(event);
  if (result.hasOwnProperty("message")) {
    openInfoWindow(result.message);
    loadList();
  } else {
    openInfoWindow("Something went wrong...");
  }
}
const deleteListName = document.getElementById('delete-list-name');
function openDeleteWindow(event) {
  const groupId = event.target.getAttribute('group-id');
  const groupElement = document.querySelector(`div.group[group-id="${groupId}"]`);
  const titleElement = groupElement.querySelector('span.name');
  deleteListName.innerText = titleElement.innerText;
  deleteListName.setAttribute('group-id', groupId);
  showPanel('delete');
  event.stopPropagation();
}
function deleteList() {
  const groupId = deleteListName.getAttribute('group-id');
  const groupElement = document.querySelector(`div.group[group-id="${groupId}"]`);
  findParentWithClass(groupElement,'group-parent').remove();
  const groupSettingsElement = document.querySelector(`div.rounded-block[group-id="${groupId}"]`);
  groupSettingsElement.remove();
  let url = API_DOMAIN + "/grocery-list/delete-list";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true); // false for synchronous request
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleShareResponse;
  xmlHttp.send(
    JSON.stringify({ csrf: csrfToken, list_id: groupId })
  );
}
function findParentWithClass(element, className) {
  let current = element;
  while (!!current) {
    if (current.classList.contains(className)) {
      return current;
    }
    current = current.parentElement;
  }
  return current;
}
function clearCrossedOffItems(event) {
  showPanel('content-full');
  const caller = event.target;
  let groupElement = findParentWithClass(caller, "group");
  let groupId = groupElement.getAttribute('group-id');

  let crossedOffItems = Array.from(
    groupElement.getElementsByClassName("crossed-off")
  );
  while (crossedOffItems.length > 0) {
    crossedOffItem = crossedOffItems.pop();
    let listItem = findParentWithClass(crossedOffItem, "list-item");
    removeItem(listItem);
  }

  queueListCleanUp(groupId);
}
let cleanUpQueue = {};
function queueListCleanUp(groupId) {
  clearTimeout(crossOffTimeout);
  cleanUpQueue[groupId] = groupId;
  crossOffTimeout = setTimeout(runCrossOffs, 1000);
}
function moveUp(event) {
  const caller = event.target;
  let groupElement = findParentWithClass(caller, "rounded-block");
  let groupId = groupElement.getAttribute('group-id');
  let sibling = groupElement.previousElementSibling;
  if (sibling) {
    let otherGroupId = sibling.getAttribute('group-id');
    swapGroups(groupId, otherGroupId);
    queueOrderCall();
    scrollToItem(groupElement);
  }
  event.stopPropagation();
}
function moveDown(event) {
  const caller = event.target;
  let groupElement = findParentWithClass(caller, "rounded-block");
  let groupId = groupElement.getAttribute('group-id');
  let sibling = groupElement.nextElementSibling;
  if (sibling) {
    let otherGroupId = sibling.getAttribute('group-id');
    swapGroups(otherGroupId, groupId);
    queueOrderCall();
    scrollToItem(groupElement);
  }
  event.stopPropagation();
}

function setVisible(event) {
  const caller = event.target;
  let groupElement = findParentWithClass(caller, "rounded-block");
  let groupId = groupElement.getAttribute('group-id');
  const group = findParentWithClass(document.querySelector(`div.group[group-id="${groupId}"]`), 'group-parent');
  group.style.display = caller.checked && group.querySelector('li') ? 'flex' : 'none';
  queueOrderCall();
}

let orderCallTimeout = undefined;
function queueOrderCall() {
  clearTimeout(orderCallTimeout);

  orderCallTimeout = setTimeout(runOrderCall, 1000)
}

function runOrderCall() {
  let url = API_DOMAIN + "/grocery-list/set-list-order";
  const groups = document.querySelectorAll("div.rounded-block[group-id]");
  let group_hashes = [];
  for (let index = 0; index < groups.length; index++) {
    let group = groups[index];
    group_hashes.push({
      id: group.getAttribute('group-id'),
      cluster: "General",
      visible: group.querySelector("input[type='checkbox']").checked
    });
  }
  let body = { list_ids: group_hashes, csrf: csrfToken };
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true); // false for synchronous request
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleOrderCall;
  xmlHttp.send(JSON.stringify(body));
}

function handleOrderCall(event) {
  const result = defaultHandlerV1(event);
}

function swapGroups(groupOneId, groupTwoId) {
  {
    let mainList = document.getElementById("content");
    const groupOne = findParentWithClass(document.querySelector(`div.group[group-id="${groupOneId}"]`), 'group-parent');
    const groupTwo = findParentWithClass(document.querySelector(`div.group[group-id="${groupTwoId}"]`), 'group-parent');
    mainList.insertBefore(groupOne, groupTwo);
  }
  {
    let mainList = document.getElementById("manage-list-content");
    const groupOne = document.querySelector(`div.rounded-block[group-id="${groupOneId}"]`);
    const groupTwo = document.querySelector(`div.rounded-block[group-id="${groupTwoId}"]`);
    mainList.insertBefore(groupOne, groupTwo);
  }
}
function addGroupToList(group) {
  let mainList = document.getElementById("content");
  const groupId = group.hash;

  let groupLi = document.querySelector(`div.group[group-id="${groupId}"]`);
  if (!groupLi) {
    let parent = document.createElement("div");
    parent.style.display = 'none';
    parent.classList.add('group-parent');
    groupLi = document.createElement("div");
    groupLi.setAttribute('group-id', groupId);
    groupLi.classList.add("group");
    groupLi.setAttribute('input-group-name','list');
    groupLi.style.flexGrow = '1';

    let itemsList = document.createElement("h2");
    if (!(!navigator.userAgent.includes("Chrome") && navigator.userAgent.includes("Safari"))) {
      itemsList.addEventListener('click', focusList);
    }
    let nameSpan = document.createElement("span");
    nameSpan.classList.add("name");
    nameSpan.innerText = group.name;
    itemsList.appendChild(nameSpan);
    let controlsDiv = document.createElement("div");
    let broomButton = document.createElement("button");
    let broomButtonImg = document.createElement("img");
    broomButtonImg.src = "img/broom.png";
    broomButton.appendChild(broomButtonImg);
    broomButton.addEventListener("click", clearCrossedOffItems);
    controlsDiv.appendChild(broomButton);

    itemsList.appendChild(controlsDiv);

    let headerDiv = document.createElement("div");
    headerDiv.classList.add("section-header");
    headerDiv.appendChild(itemsList);

    groupLi.appendChild(headerDiv);
    let ulInIt = document.createElement("ul");
    ulInIt.classList.add("ui-list");
    groupLi.appendChild(ulInIt);
    parent.appendChild(groupLi);
    mainList.appendChild(parent);
  }
  return groupLi;
}
function addGroupToListManager(group) {
  let listManagerList = document.getElementById('manage-list-content');
  const groupId = group.hash;
  
  let managerDiv = document.querySelector(`div.rounded-block[group-id="${groupId}"]`);
  if (!managerDiv) {
    managerDiv = document.createElement('div');
    managerDiv.classList.add('rounded-block');
    managerDiv.setAttribute('group-id', groupId);

    let title = document.createElement('div');
    title.classList.add('rounded-title');
    title.innerText = group.name;
    managerDiv.appendChild(title);
    {
      let button = document.createElement("button");
      button.classList.add('up');
      let image = document.createElement("img");
      image.src = "img/up.png";
      button.appendChild(image);
      button.addEventListener("click", moveUp);
      managerDiv.appendChild(button);
    }
    {
      let button = document.createElement("button");
      button.classList.add('down');
      let image = document.createElement("img");
      image.src = "img/down.png";
      button.appendChild(image);
      button.addEventListener("click", moveDown);
      managerDiv.appendChild(button);
    }
    {
      let label = document.createElement("label");
      let input = document.createElement("input");
      input.type = 'checkbox';
      input.checked = group.visible;
      input.addEventListener('change',setVisible);
      label.appendChild(input);
      let span = document.createElement("span");
      span.innerText = 'Show list';
      label.appendChild(span);
      managerDiv.appendChild(label);
    }
    {
      let button = document.createElement("button");
      button.innerText = "Share list";
      button.setAttribute('group-id',groupId);
      button.addEventListener("click", openShareWindow);
      managerDiv.appendChild(button);
    }
    // {
    //   let button = document.createElement("button");
    //   button.innerText = "Change group";
    //   button.setAttribute('group-id',groupId);
    //   button.addEventListener("click", openGroupChangeWindow);
    //   managerDiv.appendChild(button);
    // }
    {
      let button = document.createElement("button");
      button.innerText = "Delete list";
      button.setAttribute('group-id',groupId);
      button.addEventListener("click", openDeleteWindow);
      managerDiv.appendChild(button);
    }
    listManagerList.appendChild(managerDiv);
  }
  return managerDiv;
}

function addItem(group, item) {
  const groupId = group.hash;
  let groupLi = addGroupToList(group);
  let managerDiv = addGroupToListManager(group);

  let itemUl = groupLi.getElementsByClassName("ui-list")[0];

  if (group.visible) {
    findParentWithClass(itemUl, 'group-parent').style.display = 'flex';
  }

  const itemId = item.hash;
  let itemLi = document.getElementById(itemId);
  if (!itemLi) {
    let itemLi = document.createElement("li");
    itemLi.classList.add("list-item");
    itemLi.id = itemId;
    itemLi.style.display = 'flex';
    let nameDiv = document.createElement("div");
    nameDiv.classList.add("name");
    nameDiv.innerHTML = item.name;
    nameDiv.addEventListener("click", crossToggle);
    if (item.crossed_off) {
      nameDiv.classList.add("crossed-off");
    }
    nameDiv.setAttribute('input-group-name', groupId);
    nameDiv.style.flexGrow = '1';
    itemLi.appendChild(nameDiv);
    let deleteButton = document.createElement("button");
    deleteButton.onclick = deleteFromList;
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = "&times;";
    itemLi.appendChild(deleteButton);
    if (!item.crossed_off) {
      deleteButton.style.display = "none";
    }
    itemUl.appendChild(itemLi);
  }

  // sort the frontend items
  let items = Array.from(itemUl.getElementsByTagName("li"));
  let itemMap = {};
  for (let index = 0; index < items.length; index++) {
    let item = items[index];
    let nameDiv = Array.from(item.getElementsByClassName("name"))[0];
    const key = nameDiv.textContent;
    itemMap[key] = item;
  }
  let sortedKeys = Object.keys(itemMap).sort(Intl.Collator().compare);
  for (let index = 0; index < sortedKeys.length; index++) {
    let key = sortedKeys[index];
    itemUl.appendChild(itemMap[key]);
  }
}
function openGroupChangeWindow(event) {

}
function crossToggle(event) {
  let div = event.target;
  let listItem = findParentWithClass(div, "list-item");
  let deleteButton = listItem.querySelector("button.delete");
  let groupElement = findParentWithClass(event.target, "group");
  let list_hash = groupElement.getAttribute('group-id');
  let newValue = undefined;
  if (div.classList.contains("crossed-off")) {
    div.classList.remove("crossed-off");
    deleteButton.style.display = "none";
    newValue = false;
  } else {
    div.classList.add("crossed-off");
    deleteButton.style.display = "block";
    newValue = true;
  }
  queueCross({
    list_id: list_hash,
    item: div.innerText.trim(),
    crossed_off: newValue,
  });
}
let crossOffTimeout = undefined;
let crossOffPayloads = {};
function queueCross(payload) {
  clearTimeout(crossOffTimeout);
  crossOffPayloads[payload.list_id + "_" + payload.item] = payload;
  crossOffTimeout = setTimeout(runCrossOffs, 1000);
}
function runCrossOffs(event) {
  let url = API_DOMAIN + "/grocery-list/set-crossed-off";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleToggle;
  xmlHttp.send(
    JSON.stringify({
      data: Object.values(crossOffPayloads),
      csrf: csrfToken
    })
  );
  crossOffPayloads = {};
}

function handleToggle(event) {
  const result = defaultHandlerV1(event);
  if (Object.keys(cleanUpQueue).length > 0) {
    let url = API_DOMAIN + "/grocery-list/clean-up-list";
    let body = { list_ids: Object.keys(cleanUpQueue), csrf: csrfToken };
    cleanUpQueue = {};
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true); // false for synchronous request
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleCleanup;
    xmlHttp.send(JSON.stringify(body));
    event.stopPropagation();
  } 
}

function handleCleanup(event) {
  const result = defaultHandlerV1(event);
}

function askToDeleteGroup(event) {
  showPanel('content-full');
  let modalBg = document.getElementById("modal-bg");
  modalBg.style.display = "block";
}

function removeItem(item) {
  let groupLi = findParentWithClass(item, "group");
  item.remove();

  let itemUl = groupLi.getElementsByClassName("ui-list")[0];
  if (!itemUl.firstElementChild) {
    let groupParent = findParentWithClass(groupLi, 'group-parent');
    groupParent.style.display = 'none';
  }
}
function setStylesheet(uri) {
  var head = document.head;
  var link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = uri;

  head.appendChild(link);
}
let oldUi = true;
if (!navigator.userAgent.includes("Chrome") && navigator.userAgent.includes("Safari")) {
  oldUi = false;
  iosCookieRefresh();
  setStylesheet("css/grocery-list-new.css?v=017");
  document.getElementById("item-text-box").addEventListener("blur", startHide);
} else {
  setStylesheet("css/grocery-list-old.css?v=017");
}
function handleGetList(event) {
  const result = defaultHandlerV1(event);
  let groups = Object.keys(result);
  for (let i = 0; i < groups.length; i++) {
    let group = result[groups[i]];
    addGroupToList(group);
    addGroupToListManager(group);
    let items = result[groups[i]].items;
    for (let j = 0; j < items.length; j++) {
      let item = items[j];
      addItem(group, item);
    }
  }
  hideLoader();
  hideSubmit();
  if (!(!navigator.userAgent.includes("Chrome") && navigator.userAgent.includes("Safari"))) {
    applyEmulators(sideKeyListener);
  }
}
function loadList(event) {
  showLoader();
  let url = API_DOMAIN + "/grocery-list/get-list";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleGetList;
  xmlHttp.send(JSON.stringify({ csrf: csrfToken }));
}
let hideTimeout = undefined;
function stopHide() {
  if (!!hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = undefined;
  }
}
function startHide(event) {
  stopHide();
  hideTimeout = setTimeout(hideSubmit, 1500);
}
function focusEvent(event) {
  stopHide();
  showPanel('content-full');
}
const textBox = document.getElementById("item-text-box");
const submitBar = document.getElementById("submit-bar");
function showSubmit(event) {
  Array.from(document.getElementsByClassName('section-header')).forEach(x=>{x.style.top='72px';});
  submitBar.style.display = "flex";
  textBox.focus();
}
function hideSubmit(event) {
  Array.from(document.getElementsByClassName('section-header')).forEach(x=>{x.style.top='38px';});
  if (!oldUi) {
    submitBar.style.display = "none";
  }
}
function enterKeyListener(event) {
  if (event.keyCode === 13 && event.type == 'keyup') {
    document.getElementById("add").click();
    event.preventDefault();
  }
}
function sideKeyListener(event) {
  if (event.type === 'keydown' && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    let parentDiv = findParentWithClass(event.target, 'group-parent');
    let targetGroupName = event.target.getAttribute('input-group-name');
    let invisibles = Array.from(parentDiv.getElementsByClassName('invisible-input'));
    let item = undefined;
    if (targetGroupName == 'list') {
      item = invisibles[0];
    } else {
      item = invisibles.pop();
    }
    item.focus();
    let checkbox = item.parentElement.getElementsByClassName('selectable')[0];
    checkbox.classList.add('selected');
    scrollToItem(item);
  }
  if (event.type == 'keyup' && ['ArrowUp','ArrowDown'].includes(event.key)) {
    let element = event.target;
    if (element.hasAttribute('linked-item')) {
      element = element.parentElement.getElementsByClassName('selectable')[0];
    }
    scrollToItem(element);
  }
}
function focusList(event) {
  let parentDiv = findParentWithClass(event.target, 'group-parent');
  let invisibles = Array.from(parentDiv.getElementsByClassName('invisible-input'));
  let item = invisibles.pop();
  item.focus();
  let checkbox = item.parentElement.getElementsByClassName('selectable')[0];
  checkbox.classList.add('selected');
}
function showListsManager(event) {
  showPanel('list-manager');
}
loadList();
let sharedGroupId = getParameterByName("share");
if (sharedGroupId) {
  acceptShare(sharedGroupId);
}
function closeOnClick(event) {
  if (event.target.classList.contains("modal-bg")) {
    showPanel('content-full');
  }
}
let modalBgs = document.getElementsByClassName("modal-bg");
for (let i = 0; i < modalBgs.length; i++) {
  modalBgs[i].addEventListener("click", closeOnClick);
}
applyEmulators(enterKeyListener);