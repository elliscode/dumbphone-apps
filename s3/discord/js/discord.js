// constants
let messageTypes = [
  "DEFAULT",
  "RECIPIENT_ADD",
  "RECIPIENT_REMOVE",
  "CALL",
  "CHANNEL_NAME_CHANGE",
  "CHANNEL_ICON_CHANGE",
  "CHANNEL_PINNED_MESSAGE",
  "Welcome {username}. Say hi!",
  "GUILD_BOOST",
  "GUILD_BOOST_TIER_1",
  "GUILD_BOOST_TIER_2",
  "GUILD_BOOST_TIER_3",
  "CHANNEL_FOLLOW_ADD",
  "GUILD_DISCOVERY_DISQUALIFIED",
  "GUILD_DISCOVERY_REQUALIFIED",
  "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING",
  "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING",
  "THREAD_CREATED",
  "REPLY",
  "CHAT_INPUT_COMMAND",
  "THREAD_STARTER_MESSAGE",
  "GUILD_INVITE_REMINDER",
  "CONTEXT_MENU_COMMAND",
  "AUTO_MODERATION_ACTION",
  "ROLE_SUBSCRIPTION_PURCHASE",
  "INTERACTION_PREMIUM_UPSELL",
  "STAGE_START",
  "STAGE_END",
  "STAGE_SPEAKER",
  "STAGE_TOPIC",
  "GUILD_APPLICATION_PREMIUM_SUBSCRIPTION"
];
let loader = document.getElementById("loading");
let tokenBox = document.getElementById("token");

// caching
let history = [];
let channelToGuildMap = {};
let guildToNameMap = {};

const dynamicContentDiv = document.getElementById('dynamic-content');

function setToken() {
  localStorage.removeItem("dumbphoneapps-discord-user");
  let url = API_DOMAIN + "/set-discord-token";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleSetToken;
  let payload = {
    csrf: csrfToken,
    discordToken: tokenBox.value
  };
  xmlHttp.send(JSON.stringify(payload));
}
function handleSetToken(event) {
  defaultHandler(event);
  hideAllModals();
}
function goBack(event) {
  backMethod();
}
function clearDiscordButtons() {
  let discordButtons = Array.from(document.getElementsByClassName("discord"));
  for (let i = discordButtons.length - 1; i >= 0; i--) {
    let discordButton = discordButtons[i];
    discordButton.remove();
  }
}

function clearLoadMoreButtons() {
  let loadMoreDivs = Array.from(document.getElementsByClassName("load-more"));
  for (let i = loadMoreDivs.length - 1; i >= 0; i--) {
    let loadMoreDiv = loadMoreDivs[i];
    loadMoreDiv.style.height = `${
      loadMoreDiv.getBoundingClientRect().height
    }px`;
    loadMoreDiv.firstElementChild.remove();
  }
}

function clearLoadMoreDivs() {
  let loadMoreDivs = Array.from(document.getElementsByClassName("load-more"));
  for (let i = loadMoreDivs.length - 1; i >= 0; i--) {
    let loadMoreDiv = loadMoreDivs[i];
    loadMoreDiv.remove();
  }
}

function getUser() {
  let existingUser = localStorage.getItem("dumbphoneapps-discord-user");
  if (existingUser) {
    setUserInUi(existingUser);
  } else {
    loader.style.display = "block";
    clearDiscordButtons();
    let url = API_DOMAIN + "/discord/api/v10/users/@me";
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleUser;
    let payload = {
      csrf: csrfToken,
      method: "GET"
    };
    xmlHttp.send(JSON.stringify(payload));
  }
}

let userId = undefined;
function handleUser(event) {
  let result = defaultHandler(event);
  let responseJson = result.responseJson;
  localStorage.setItem("dumbphoneapps-discord-user", responseJson.id);
  setUserInUi(responseJson.id);
}
function setUserInUi(inputUserId) {
  userId = inputUserId;

  if (loadMostRecentHistoryItem()) {
    return;
  }
  let loadGuildsButton = document.createElement("button");
  loadGuildsButton.classList.add("discord");
  loadGuildsButton.onclick = getGuilds;
  loadGuildsButton.innerText = "Load Guilds";
  dynamicContentDiv.appendChild(loadGuildsButton);
  loader.style.display = "none";
}
let backMethod = function () {};
function getGuilds() {
  addToHistory("guilds", "guilds", "getGuilds");

  loader.style.display = "block";
  clearDiscordButtons();
  let url = API_DOMAIN + "/discord/api/v10/users/@me/guilds";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handeGuilds;
  let payload = {
    csrf: csrfToken,
    method: "GET"
  };
  xmlHttp.send(JSON.stringify(payload));
}

function handeGuilds(event) {
  let result = defaultHandler(event);
  let responseJson = result.responseJson;

  for (let i = 0; i < responseJson.length; i++) {
    let guild = responseJson[i];
    let guildButton = document.createElement("button");
    guildButton.classList.add("discord");
    guildButton.textContent = guild.name;
    guildButton.setAttribute("discord-id", guild.id);
    guildButton.onclick = getChannels;
    dynamicContentDiv.appendChild(guildButton);
    guildToNameMap[guild.id] = guild.name;
  }
  backMethod = function () {};
  loader.style.display = "none";
}

function getChannels(event) {
  let thisGuildName = event.target.innerText;
  let thisGuildId = event.target.getAttribute("discord-id");
  addToHistory(
    `channels-${thisGuildId}`,
    thisGuildName,
    "getChannels",
    thisGuildName,
    thisGuildId
  );

  loader.style.display = "block";
  clearDiscordButtons();
  let url = `${API_DOMAIN}/discord/api/v10/guilds/${thisGuildId}/channels`;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleChannels;
  let payload = {
    csrf: csrfToken,
    method: "GET"
  };
  xmlHttp.send(JSON.stringify(payload));
}

function handleChannels(event) {
  let result = defaultHandler(event);
  let responseJson = result.responseJson;

  for (let i = 0; i < responseJson.length; i++) {
    let channel = responseJson[i];
    if (channel.type != 0) {
      continue;
    }
    let channelButton = document.createElement("button");
    channelButton.classList.add("discord");
    channelButton.textContent = channel.name;
    channelButton.setAttribute("discord-id", channel.id);
    channelButton.onclick = getMessages;
    dynamicContentDiv.appendChild(channelButton);
    channelToGuildMap[channel.id] = channel.guild_id;
  }
  backMethod = getGuilds;
  loader.style.display = "none";
}
function createMethodWithFakeEvent(method, name, id) {
  return function (event) {
    method(createFakeEvent(name, id));
  };
}
function createFakeEvent(name, id) {
  return {
    target: {
      innerText: name,
      getAttribute: function (name) {
        return name == "discord-id" ? id : undefined;
      }
    }
  };
}
function getMessages(event, dontClearExisting) {
  let thisChannelName = event.target.innerText;
  let thisChannelId = event.target.getAttribute("discord-id");
  let beforeId = event.target.getAttribute("before-id");
  addToHistory(
    `messages-${thisChannelId}`,
    thisChannelName,
    "getMessages",
    thisChannelName,
    thisChannelId
  );
  backMethod = getGuilds;

  if (dontClearExisting) {
    clearLoadMoreButtons();
  } else {
    loader.style.display = "block";
    clearDiscordButtons();
  }
  let channelId = event.target.getAttribute("discord-id");
  let url = `${API_DOMAIN}/discord/api/v10/channels/${channelId}/messages`;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleMessages;
  let payload = {
    csrf: csrfToken,
    method: "GET",
    limit: 25
  };
  if (beforeId) {
    payload["before"] = beforeId;
  }
  xmlHttp.send(JSON.stringify(payload));
}

function handleMessages(event) {
  clearLoadMoreDivs();
  let result = defaultHandler(event);
  let responseJson = result.responseJson;

  let inputDiv = document.querySelector("div.input-div");
  let refreshButton = document.querySelector("button.input-refresh");
  let textBox = document.querySelector("input.input-text-box");
  let submitButton = document.querySelector("button.input-submit");
  if (!inputDiv) {
    inputDiv = document.createElement("div");
    inputDiv.classList.add("discord");
    inputDiv.classList.add("input-div");

    let div1 = document.createElement("div");
    div1.style.display = 'flex';

    refreshButton = document.createElement("button");
    refreshButton.setAttribute("input-group-name", "controls");
    refreshButton.classList.add("input-refresh");
    refreshButton.innerText = "Refresh";
    refreshButton.style.display = "block";
    refreshButton.onclick = getMessages;

    div1.appendChild(refreshButton);
    inputDiv.appendChild(div1);


    let div2 = document.createElement("div");
    div2.style.flexGrow = "1";
    div2.style.display = 'flex';

    textBox = document.createElement("input");
    textBox.setAttribute("input-group-name", "controls");
    textBox.setAttribute("primary-input","true");
    textBox.classList.add("input-text-box");
    textBox.type = "text";
    textBox.style.display = "block";
    textBox.style.width = "30px";
    textBox.style.flexGrow = "1";
    textBox.id = "message-box";
    textBox.onkeyup = enterKeyListener;

    div2.appendChild(textBox);
    inputDiv.appendChild(div2);


    let div3 = document.createElement("div");
    div3.style.display = 'flex';

    submitButton = document.createElement("button");
    submitButton.setAttribute("input-group-name", "controls");
    submitButton.classList.add("input-submit");
    submitButton.innerText = "Send";
    submitButton.onclick = sendMessage;
    submitButton.id = "submit";
    submitButton.style.display = "block";

    div3.appendChild(submitButton);
    inputDiv.appendChild(div3);

    dynamicContentDiv.appendChild(inputDiv);
  }

  let channelId = event.target.responseURL.replace(/.*\/channels\/(\d+)\/messages/, '$1');
  let lastMessageId = undefined;
  for (let i = 0; i < responseJson.length; i++) {
    let message = responseJson[i];
    channelId = message.channel_id;
    lastMessageId = message.id;
    let p = document.createElement("p");
    buildMessage(p, message);
    dynamicContentDiv.appendChild(p);
  }
  if (channelToGuildMap.hasOwnProperty(channelId)) {
    let thisGuildId = channelToGuildMap[channelId];
    let thisGuildName = guildToNameMap[thisGuildId];
    backMethod = createMethodWithFakeEvent(
      getChannels,
      thisGuildName,
      thisGuildId
    );
  } else {
    backMethod = getGuilds;
  }
  refreshButton.setAttribute("discord-id", channelId);
  submitButton.setAttribute("discord-id", channelId);

  let reloadDiv = document.createElement("div");
  reloadDiv.classList.add("load-more");
  let reloadButton = document.createElement("button");
  reloadButton.innerText = "Load more";
  reloadButton.classList.add("discord");
  reloadButton.setAttribute("discord-id", channelId);
  reloadButton.setAttribute("before-id", lastMessageId);
  reloadButton.onclick = function (e1) {
    getMessages(e1, true);
  };
  reloadDiv.appendChild(reloadButton);
  dynamicContentDiv.appendChild(reloadDiv);

  applyEmulators();

  loader.style.display = "none";
}
function buildMessage(parentElement, message) {
  parentElement.setAttribute("discord-id", message.id);
  parentElement.classList.add("discord");
  if (message.hasOwnProperty("referenced_message")) {
    let blockQuote = document.createElement("blockquote");
    parentElement.appendChild(blockQuote);
    buildMessage(blockQuote, message.referenced_message);
  }
  {
    let span = document.createElement("span");
    span.classList.add("username");
    if (message.author.global_name) {
      span.innerHTML = message.author.global_name;
    } else {
      span.innerText = message.author.username;
    }
    if (message.author.id != userId) {
      span.onclick = openDirectMessage;
      span.setAttribute("discord-id", message.author.id);
      span.style.cursor = "pointer";
    }
    parentElement.appendChild(span);
  }
  {
    let span = document.createElement("span");
    span.innerHTML = " &mdash; ";
    parentElement.appendChild(span);
  }
  if (
    !message.content &&
    message.embeds.length == 0 &&
    message.attachments.length == 0 &&
    (!message.sticker_items || message.sticker_items.length == 0)
  ) {
    let span = document.createElement("span");
    span.innerText = messageTypes[message.type].replace(
      "{username}",
      message.author.global_name
        ? message.author.global_name
        : message.author.username
    );
    parentElement.appendChild(span);
  }
  {
    let span = document.createElement("span");
    span.innerText = message.content;
    if (message.mentions) {
      for (let i = 0; i < message.mentions.length; i++) {
        let mention = message.mentions[i];
        let mentionTag = `<@${mention.id}>`;
        let mentionTagHtml = `&lt;@${mention.id}&gt;`;
        if (!message.content.includes(mentionTag)) {
          continue;
        }
        let a = document.createElement("span");
        a.classList.add("username");
        if (mention.global_name) {
          a.innerText = mention.global_name;
        } else {
          a.innerText = mention.username;
        }
        if (mention.id != userId) {
          a.setAttribute("discord-id", mention.id);
          a.style.cursor = "pointer";
        }
        span.innerHTML = span.innerHTML.replace(mentionTagHtml, a.outerHTML);
      }
    }
    parentElement.appendChild(span);
  }
  if (message.reactions) {
    for (let i = 0; i < message.reactions.length; i++) {
      let reaction = message.reactions[i];
      let topSub = document.createElement("sub");
      topSub.classList.add("reaction");
      {
        let span = document.createElement("span");
        span.innerText = reaction.emoji.name;
        topSub.appendChild(span);
      }
      {
        let sub = document.createElement("sub");
        sub.innerText = reaction.count;
        topSub.appendChild(sub);
      }
      parentElement.appendChild(topSub);
    }
  }
  if (message.author.id == userId) {
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&times;";
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("discord-id", message.id);
    deleteButton.setAttribute("channel-id", message.channel_id);
    deleteButton.onclick = deleteMessage;
    parentElement.appendChild(deleteButton);
  }
  if (message.embeds) {
    for (let i = 0; i < message.embeds.length; i++) {
      let embed = message.embeds[i];
      if (embed.hasOwnProperty("description")) {
        let lineBreak = document.createElement("br");
        parentElement.appendChild(lineBreak);
        let embedDescription = document.createElement("span");
        embedDescription.textContent = embed.description;
        parentElement.appendChild(embedDescription);
      }
      if (embed.hasOwnProperty("url")) {
        let lineBreak = document.createElement("br");
        parentElement.appendChild(lineBreak);
        let embedLink = document.createElement("a");
        embedLink.href = embed.url;
        if (embed.title) {
          embedLink.innerText = embed.title;
        } else {
          embedLink.innerText = embed.url;
        }
        let children = Array.from(parentElement.children);
        for (let j = 0; j < children.length; j++) {
          let child = children[j];
          if (child.classList.contains('username')) {
            continue;
          }
          if (child.innerHTML.includes(embed.url)) {
            child.innerHTML = child.innerHTML.replace(embed.url, embedLink.outerHTML);
          } else if (child.innerHTML.includes(embed.url.replace(/\/$/,''))) {
            child.innerHTML = child.innerHTML.replace(embed.url.replace(/\/$/,''), embedLink.outerHTML);
          } else {
            child.appendChild(embedLink);
          }
        }
      }
      if (embed.hasOwnProperty("image")) {
        let lineBreak = document.createElement("br");
        parentElement.appendChild(lineBreak);
        let placeholder = document.createElement("div");
        placeholder.classList.add("placeholder");
        placeholder.onclick = function (event) {
          loadImage(event.target, embed.image.url);
        };
        parentElement.appendChild(placeholder);
      }
    }
  }
  if (message.attachments) {
    for (let i = 0; i < message.attachments.length; i++) {
      let attachment = message.attachments[i];
      let lineBreak = document.createElement("br");
      parentElement.appendChild(lineBreak);
      if (attachment.content_type.startsWith("video/")) {
        let placeholder = document.createElement("div");
        placeholder.classList.add("placeholder");
        placeholder.onclick = function (event) {
          loadVideo(event.target, attachment.url, attachment.content_type);
        };
        parentElement.appendChild(placeholder);
      } else if (attachment.content_type.startsWith("image/")) {
        let placeholder = document.createElement("div");
        placeholder.classList.add("placeholder");
        placeholder.onclick = function (event) {
          loadImage(event.target, attachment.url);
        };
        parentElement.appendChild(placeholder);
      } else {
        let link = document.createElement('a');
        let placeholder = document.createElement("div");
        placeholder.classList.add("download-link");
        link.href = attachment.url;
        link.download = true;
        link.appendChild(placeholder);
        parentElement.appendChild(link);
      } 
    }
  }
  if (message.sticker_items) {
    for (let i = 0; i < message.sticker_items.length; i++) {
      let stickerItem = message.sticker_items[i];
      // create placeholder div that you will load later
      // "https://discord.com/stickers/816087074310193162.json"
      // figure out how to do this later
      let stickerDiv = document.createElement('div');
      stickerDiv.classList.add('to-be-loaded-sticker');
      stickerDiv.setAttribute('sticker-id', stickerItem.id);
      stickerDiv.innerText = 'Sticker description:';
      parentElement.appendChild(stickerDiv);
    }
    setTimeout(loadStickers, 100);
  }
}
function loadStickers(event) {
  let stickersToLoad = Array.from(document.getElementsByClassName('to-be-loaded-sticker'));
  if (stickersToLoad.length > 0) {
    let stickerToLoad = stickersToLoad[0];
    let stickerId = stickerToLoad.getAttribute('sticker-id');
    stickerToLoad.classList.remove('to-be-loaded-sticker');
    stickerToLoad.classList.add('to-be-set-sticker');

    let url = `${API_DOMAIN}/discord/api/v10/stickers/${stickerId}`;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleStickers;
    let payload = {
      csrf: csrfToken,
      method: "GET"
    };
    xmlHttp.send(JSON.stringify(payload));
  }
}
function handleStickers(event) {
  let result = defaultHandler(event);
  let stickerToLoad = document.getElementsByClassName('to-be-set-sticker')[0];
  stickerToLoad.classList.remove('to-be-set-sticker');
  stickerToLoad.innerText = `Sticker description: ${result.responseJson.description}`;
  loadStickers();
}
function loadImage(element, url) {
  let imageElement = document.createElement("img");
  imageElement.classList.add("size-constraint");
  imageElement.src = url;
  element.appendChild(imageElement);
  element.classList.remove("placeholder");
  setTimeout(setMediaSize, 1000);
}
function loadVideo(element, url, contentType) {
  let videoElement = document.createElement("video");
  videoElement.classList.add("video");
  videoElement.classList.add("size-constraint");
  videoElement.controls = true;
  videoElement.src = url;
  videoElement.type = contentType;
  videoElement.playsInline = true;
  videoElement.muted = true;
  videoElement.autoplay = true;
  element.appendChild(videoElement);
  element.classList.remove("placeholder");
  setTimeout(setMediaSize, 1000);
}
function setMediaSize(event) {
  for (
    let i = 0;
    i < Array.from(document.getElementsByClassName("size-constraint")).length;
    i++
  ) {
    let item = Array.from(document.getElementsByClassName("size-constraint"))[
      i
    ];
    item.style.width = `${item.getBoundingClientRect().width}px`;
    item.style.height = `${item.getBoundingClientRect().height}px`;
    item.classList.remove("size-constraint");
  }
}
function openDirectMessage(event) {
  loader.style.display = "block";
  clearDiscordButtons();
  let url = `${API_DOMAIN}/discord/api/v10/users/@me/channels`;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleOpenDirectMessage;
  let payload = {
    csrf: csrfToken,
    method: "POST",
    recipient_id: event.target.getAttribute("discord-id")
  };
  xmlHttp.send(JSON.stringify(payload));
}
function handleOpenDirectMessage(event) {
  let result = defaultHandler(event);
  let responseJson = result.responseJson;
  let names = [];
  for (let i = 0; i < responseJson.recipients.length; i++) {
    let recipient = responseJson.recipients[i];
    names.push(
      recipient.global_name ? recipient.global_name : recipient.username
    );
  }
  let thisChannelName = names.join(" & ");
  let thisChannelId = responseJson.id;
  getMessages(createFakeEvent(thisChannelName, thisChannelId));
}
function deleteMessage(event) {
  let channelId = event.target.getAttribute("channel-id");

  loader.style.display = "block";
  clearDiscordButtons();

  let url =
    API_DOMAIN +
    `/discord/api/v10/channels/${channelId}/messages/${event.target.getAttribute(
      "discord-id"
    )}`;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleDeleteMessage;
  let payload = {
    csrf: csrfToken,
    method: "DELETE"
  };
  xmlHttp.send(JSON.stringify(payload));
}

function handleDeleteMessage(event) {
  defaultHandler(event);
  loadMostRecentHistoryItem();
}

function sendMessage(event) {
  let messageBox = document.getElementById("message-box");
  let submitButton = document.getElementById("submit");
  let messageText = messageBox.value;

  loader.style.display = "block";
  clearDiscordButtons();

  let url = `${API_DOMAIN}/discord/api/v10/channels/${event.target.getAttribute(
    "discord-id"
  )}/messages`;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleSendMessage;
  let payload = {
    csrf: csrfToken,
    method: "POST",
    content: messageText
  };
  xmlHttp.send(JSON.stringify(payload));
}

function handleSendMessage(event) {
  defaultHandler(event);
  loadMostRecentHistoryItem();
}

function enterKeyListener(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("submit").click();
  }
}

function hideAllModals() {
  showPanel('content');
}

function openSettings(event) {
  showPanel('settings-div');
}

function getDms(event) {
  addToHistory("dms", "DMs", "getDms");

  loader.style.display = "block";
  clearDiscordButtons();
  let url = `${API_DOMAIN}/get-discord-dm-channels`;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleDms;
  let payload = {
    csrf: csrfToken
  };
  xmlHttp.send(JSON.stringify(payload));
}

function handleDms(event) {
  let result = defaultHandler(event);
  let responseJson = result.responseJson;
  for (let i = 0; i < responseJson.length; i++) {
    let dmChannel = responseJson[i];

    let dmButton = document.createElement("button");
    dmButton.classList.add("discord");
    let names = [];
    for (let j = 0; j < dmChannel.recipients.length; j++) {
      let recipient = dmChannel.recipients[j];
      if (recipient.global_name) {
        names.push(recipient.global_name);
      } else {
        names.push(recipient.username);
      }
    }
    dmButton.textContent = names.join(" & ");
    dmButton.setAttribute("discord-id", dmChannel.channel_id);
    dmButton.onclick = getMessages;
    dynamicContentDiv.appendChild(dmButton);
  }
  backMethod = getGuilds;
  loader.style.display = "none";
}

function addToHistory(id, name, methodName, arg1, arg2) {
  if (history.length != 0) {
    let mostRecentItem = history[history.length - 1];
    if (mostRecentItem.id == id) {
      return;
    }
  }
  if (history.length > 64) {
    history.shift();
  }
  let historyItem = {
    id: id,
    name: name,
    methodName: methodName,
    arg1: arg1,
    arg2: arg2
  };
  history.push(historyItem);
  localStorage.setItem(
    "dumbphoneapps-discord-most-recent",
    JSON.stringify(historyItem)
  );
  renderHistory();
}
function loadMostRecentHistoryItem() {
  let mostRecentItem = localStorage.getItem(
    "dumbphoneapps-discord-most-recent"
  );
  if (!mostRecentItem) {
    return false;
  }
  let item = JSON.parse(mostRecentItem);
  let derivedMethod = undefined;
  if (item.methodName == 'getDms') {
    derivedMethod = createMethodWithFakeEvent(getDms);
  } else if (item.methodName == "getGuilds") {
    derivedMethod = createMethodWithFakeEvent(getGuilds);
  } else if (item.methodName == "getChannels") {
    derivedMethod = createMethodWithFakeEvent(
      getChannels,
      item.arg1,
      item.arg2
    );
  } else if (item.methodName == "getMessages") {
    derivedMethod = createMethodWithFakeEvent(
      getMessages,
      item.arg1,
      item.arg2
    );
  }
  if (derivedMethod) {
    derivedMethod();
  } else {
    getGuilds();
  }
  return true;
}
function renderHistory() {
  let historyElement = document.getElementById("history");
  while (historyElement.firstChild) {
    historyElement.firstChild.remove();
  }
  let separator = document.createElement("span");
  for (let i = 0; i < history.length; i++) {
    item = history[i];
    historyElement.appendChild(separator);

    let span = document.createElement("span");
    let derivedMethod = undefined;
    if (item.methodName == 'getDms') {
      derivedMethod = createMethodWithFakeEvent(
        getDms
      );
    } else if (item.methodName == "getGuilds") {
      derivedMethod = createMethodWithFakeEvent(getGuilds);
    } else if (item.methodName == "getChannels") {
      derivedMethod = createMethodWithFakeEvent(
        getChannels,
        item.arg1,
        item.arg2
      );
    } else if (item.methodName == "getMessages") {
      derivedMethod = createMethodWithFakeEvent(
        getMessages,
        item.arg1,
        item.arg2
      );
    }
    span.onclick = derivedMethod;
    span.innerText = item.name;
    span.style.cursor = "pointer";
    historyElement.appendChild(span);

    separator = document.createElement("span");
    separator.innerHTML = "&gt;";
  }
  historyElement.scrollTo(historyElement.scrollWidth, 0);
}

if (
  !navigator.userAgent.includes("Chrome") &&
  navigator.userAgent.includes("Safari")
) {
  iosCookieRefresh();
}
getUser();
