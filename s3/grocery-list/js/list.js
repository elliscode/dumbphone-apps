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
  hidePopups(event);
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
}
function findFirstChildWithClass(element, className) {
  const results = element.getElementsByClassName(className);
  if (results.length <= 0) {
    return undefined;
  }
  return results[0];
}
function deleteFromList(event) {
  hidePopups(event);
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
  xmlHttp.onload = handleDeleteList;
  xmlHttp.send(
    JSON.stringify({ name: groupName, item: text, csrf: csrfToken })
  );
}
function handleDeleteList(event) {
  const result = defaultHandlerV1(event);
  console.log(JSON.stringify(result));
}
function openShareWindow(event) {
  hidePopups();
  let share = document.getElementById("share");
  let listName = document.getElementById("list-name");
  let groupElement = findParentWithClass(event.target, "group");
  listName.innerText = groupElement
    .getElementsByTagName("h2")[0]
    .innerText.trim();
  listName.setAttribute("hash", groupElement.id);
  share.style.display = "block";
}
function hidePopups(event) {
  let share = document.getElementById("share");
  share.style.display = "none";
  let info = document.getElementById("info");
  info.style.display = "none";
  let modalBg = document.getElementById("modal-bg");
  modalBg.style.display = "none";
}
function sendShareRequest(event) {
  console.log(event);
  let userToShareWithBox = document.getElementById("user-to-share-with");
  let user = userToShareWithBox.value;
  let listName = document.getElementById("list-name");
  let group_hash = listName.getAttribute("hash");

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
function openInfoWindow(text) {
  let info = document.getElementById("info");
  info.style.display = "block";
  let infoP = document.getElementById("info-p");
  infoP.innerText = text;
}
function handleShareResponse(event) {
  hidePopups();
  const result = defaultHandlerV1(event);
  if (result.hasOwnProperty("message")) {
    openInfoWindow(result.message);
    loadList();
  } else {
    openInfoWindow("Something went wrong...");
  }
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
  hidePopups(event);
  const caller = event.target;
  let groupElement = findParentWithClass(caller, "group");
  let groupId = groupElement.id;

  let crossedOffItems = Array.from(
    groupElement.getElementsByClassName("crossed-off")
  );
  while (crossedOffItems.length > 0) {
    crossedOffItem = crossedOffItems.pop();
    let listItem = findParentWithClass(crossedOffItem, "list-item");
    removeItem(listItem);
  }

  let url = API_DOMAIN + "/grocery-list/clean-up-list";
  let body = { list_id: groupId, csrf: csrfToken };
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true); // false for synchronous request
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleToggle;
  xmlHttp.send(JSON.stringify(body));
}
function moveUp(event) {
  hidePopups(event);
  const caller = event.target;
  let groupElement = findParentWithClass(caller, "group");
  let groupId = groupElement.id;
  let otherGroup = groupElement.previousElementSibling;
  if (otherGroup) {
    swapGroups(groupId, otherGroup.id);
    runOrderCall();
    window.scrollBy({ top: groupElement.getBoundingClientRect().top, behavior: "smooth" });
  }
}
function moveDown(event) {
  hidePopups(event);
  const caller = event.target;
  let groupElement = findParentWithClass(caller, "group");
  let groupId = groupElement.id;
  let otherGroup = groupElement.nextElementSibling;
  if (otherGroup) {
    swapGroups(otherGroup.id, groupId);
    runOrderCall();
    window.scrollBy({ top: groupElement.getBoundingClientRect().top, behavior: "smooth" });
  }
}

function runOrderCall() {
  let url = API_DOMAIN + "/grocery-list/set-list-order";
  const groups = document.querySelectorAll("div#content>div.group");
  let group_hashes = [];
  for (let index = 0; index < groups.length; index++) {
    let group = groups[index];
    group_hashes.push(group.id);
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
  console.log(JSON.stringify(result));
}

function swapGroups(groupOneId, groupTwoId) {
  let mainList = document.getElementById("content");
  let groupOneLi = document.getElementById(groupOneId);
  let groupTwoLi = document.getElementById(groupTwoId);

  mainList.insertBefore(groupOneLi, groupTwoLi);
}

function addItem(group, item) {
  let mainList = document.getElementById("content");

  const groupId = group.hash;
  let groupLi = document.getElementById(groupId);
  if (!groupLi) {
    groupLi = document.createElement("div");
    groupLi.id = groupId;
    groupLi.classList.add("group");

    let itemsList = document.createElement("h2");
    let blankItem = document.createElement("span");
    blankItem.classList.add("blank-item");
    blankItem.style.width = "114px";
    itemsList.appendChild(blankItem);
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

    let upButton = document.createElement("button");
    let upButtonImg = document.createElement("img");
    upButtonImg.src = "img/up.png";
    upButton.appendChild(upButtonImg);
    upButton.addEventListener("click", moveUp);
    controlsDiv.appendChild(upButton);

    let downButton = document.createElement("button");
    let downButtonImg = document.createElement("img");
    downButtonImg.src = "img/down.png";
    downButton.appendChild(downButtonImg);
    downButton.addEventListener("click", moveDown);
    controlsDiv.appendChild(downButton);

    let shareButton = document.createElement("button");
    let shareButtonImg = document.createElement("img");
    shareButtonImg.src = "img/share.png";
    shareButton.appendChild(shareButtonImg);
    shareButton.addEventListener("click", openShareWindow);
    controlsDiv.appendChild(shareButton);

    itemsList.appendChild(controlsDiv);

    let headerDiv = document.createElement("div");
    headerDiv.classList.add("section-header");
    headerDiv.appendChild(itemsList);

    groupLi.appendChild(headerDiv);
    let ulInIt = document.createElement("ul");
    ulInIt.classList.add("ui-list");
    groupLi.appendChild(ulInIt);
    mainList.appendChild(groupLi);
  }

  let itemUl = groupLi.getElementsByClassName("ui-list")[0];

  const itemId = item.hash;
  let itemLi = document.getElementById(itemId);
  if (!itemLi) {
    let itemLi = document.createElement("li");
    itemLi.classList.add("list-item");
    itemLi.id = itemId;
    let nameDiv = document.createElement("div");
    nameDiv.classList.add("name");
    nameDiv.innerHTML = item.name;
    nameDiv.addEventListener("click", crossToggle);
    if (item.crossed_off) {
      nameDiv.classList.add("crossed-off");
    }
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

function crossToggle(event) {
  let div = event.target;
  let listItem = findParentWithClass(div, "list-item");
  let deleteButton = listItem.querySelector("button.delete");
  let groupElement = findParentWithClass(event.target, "group");
  let list_hash = groupElement.id;
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
  let url = API_DOMAIN + "/grocery-list/set-crossed-off";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleToggle;
  xmlHttp.send(
    JSON.stringify({
      list_id: list_hash,
      item: div.innerText.trim(),
      crossed_off: newValue,
      csrf: csrfToken
    })
  );
}

function handleToggle(event) {
  const result = defaultHandlerV1(event);
  console.log(JSON.stringify(result));
}

function askToDeleteGroup(event) {
  hidePopups(event);
  let modalBg = document.getElementById("modal-bg");
  modalBg.style.display = "block";
}

function removeItem(item) {
  let groupLi = findParentWithClass(item, "group");
  item.remove();

  let itemUl = groupLi.getElementsByClassName("ui-list")[0];
  if (!itemUl.firstElementChild) {
    groupLi.remove();
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
if (!csrfToken) {
  window.location.replace("../signup.html");
}
if (
  !navigator.userAgent.includes("Chrome") &&
  navigator.userAgent.includes("Safari")
) {
  iosCookieRefresh();
  setStylesheet("css/grocery-list-new.css?v=003");
  document.getElementById("item-text-box").addEventListener("blur", startHide);
} else {
  setStylesheet("css/grocery-list-old.css?v=003");
}
const loader = document.getElementById("loading");
const dontDisplayWhileLoading = document.getElementById(
  "dont-display-while-loading"
);
function handleGetList(event) {
  const result = defaultHandlerV1(event);
  let groups = Object.keys(result);
  for (let i = 0; i < groups.length; i++) {
    let group = result[groups[i]];
    let items = result[groups[i]].items;
    for (let j = 0; j < items.length; j++) {
      let item = items[j];
      addItem(group, item);
    }
  }
  loader.style.display = "none";
  dontDisplayWhileLoading.style.display = "block";
}
function loadList(event) {
  loader.style.display = "block";
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
  hideTimeout = setTimeout(hideSubmit, 1000);
}
function focusEvent(event) {
  stopHide();
  hidePopups(event);
}
const textBox = document.getElementById("item-text-box");
const toolBar = document.getElementById("tool-bar");
const submitBar = document.getElementById("submit-bar");
function showSubmit(event) {
  toolBar.style.display = "none";
  submitBar.style.display = "flex";
  textBox.focus();
}
function hideSubmit(event) {
  toolBar.style.display = "flex";
  submitBar.style.display = "none";
}
function enterKeyListener(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("add").click();
  }
}
loadList();
let sharedGroupId = getParameterByName("share");
if (sharedGroupId) {
  acceptShare(sharedGroupId);
}
function closeOnClick(event) {
  if (event.target.classList.contains("modal-bg")) {
    hidePopups(event);
  }
}
let modalBgs = document.getElementsByClassName("modal-bg");
for (let i = 0; i < modalBgs.length; i++) {
  modalBgs[i].addEventListener("click", closeOnClick);
}
