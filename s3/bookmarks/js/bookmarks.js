const bookmarksDiv = document.getElementById("bookmarks");
const loader = document.getElementById("loading");
const manageButton = document.getElementById("manage-button");
const pendingDeleteTitleSpan = document.getElementById("pending-delete-title");

const BOOKMARKS_CACHE_KEY = "dumbphoneapps-bookmarks-cache";

let localBookmarks = loadLocalBookmarks();
let editingBookmarkId = null;
let pendingDeleteId = null;
let manageModeEnabled = false;

function generateBookmarkId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

function loadLocalBookmarks() {
  try {
    const raw = localStorage.getItem(BOOKMARKS_CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalBookmarks(bookmarks) {
  try {
    localStorage.setItem(BOOKMARKS_CACHE_KEY, JSON.stringify(bookmarks));
  } catch (e) {}
}

function renderBookmarks() {
  bookmarksDiv.innerHTML = "";

  const activeBookmarks = localBookmarks
    .filter((bookmark) => bookmark.status !== "Deleted")
    .sort((a, b) => a.title.localeCompare(b.title));

  activeBookmarks.forEach((bookmark) => {
    const row = document.createElement("div");
    row.className = "bookmark-row";
    row.setAttribute("data-bookmark-id", bookmark.id);

    const link = document.createElement("a");
    link.className = "bookmark-title";
    link.href = bookmark.url;
    link.innerText = bookmark.title;
    link.setAttribute("input-group-name", "bookmarks-list");
    row.appendChild(link);

    const controls = document.createElement("div");
    controls.className = "controls bookmark-controls";
    controls.style.display = manageModeEnabled ? "flex" : "none";

    const editWrapper = document.createElement("div");
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    // editButton.setAttribute("input-group-name", "bookmark-row-controls");
    editButton.onclick = openEditBookmark;
    editWrapper.appendChild(editButton);
    controls.appendChild(editWrapper);

    const deleteWrapper = document.createElement("div");
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&times;";
    // deleteButton.setAttribute("input-group-name", "bookmark-row-controls");
    deleteButton.onclick = confirmDeleteBookmark;
    deleteWrapper.appendChild(deleteButton);
    controls.appendChild(deleteWrapper);

    row.appendChild(controls);

    bookmarksDiv.appendChild(row);
  });

  applyEmulators(scrollToItem);
  loader.style.display = "none";
}

function getEditorInputs() {
  return {
    title: document.getElementById("bookmark-title-input"),
    url: document.getElementById("bookmark-url-input"),
  };
}

function openAddBookmark(event) {
  editingBookmarkId = null;
  const inputs = getEditorInputs();
  inputs.title.value = "";
  inputs.url.value = "";
  showPanel("bookmark-editor");
}

function openEditBookmark(event) {
  const row = findParentWithClass(event.target, "bookmark-row");
  const id = row.getAttribute("data-bookmark-id");
  const bookmark = localBookmarks.find((b) => b.id === id);
  if (!bookmark) {
    return;
  }
  editingBookmarkId = id;
  const inputs = getEditorInputs();
  inputs.title.value = bookmark.title;
  inputs.url.value = bookmark.url;
  showPanel("bookmark-editor");
}

function saveBookmark(event) {
  const inputs = getEditorInputs();
  const title = inputs.title.value.trim();
  const url = inputs.url.value.trim();

  if (!title || !url) {
    showPanel("main-list");
    return;
  }

  if (editingBookmarkId) {
    const bookmark = localBookmarks.find((b) => b.id === editingBookmarkId);
    if (bookmark) {
      bookmark.title = title;
      bookmark.url = url;
      bookmark.updatedTime = Date.now();
    }
  } else {
    localBookmarks.push({
      id: generateBookmarkId(),
      title: title,
      url: url,
      status: "Active",
      updatedTime: Date.now(),
    });
  }

  editingBookmarkId = null;
  saveLocalBookmarks(localBookmarks);
  renderBookmarks();
  showPanel("main-list");
  syncBookmarks();
}

function confirmDeleteBookmark(event) {
  const row = findParentWithClass(event.target, "bookmark-row");
  const id = row.getAttribute("data-bookmark-id");
  const bookmark = localBookmarks.find((b) => b.id === id);
  if (!bookmark) {
    return;
  }
  pendingDeleteId = id;
  pendingDeleteTitleSpan.innerText = bookmark.title;
  showPanel("confirm-delete-bookmark");
}

function deleteBookmarkConfirmed(event) {
  const bookmark = localBookmarks.find((b) => b.id === pendingDeleteId);
  if (bookmark) {
    bookmark.status = "Deleted";
    bookmark.updatedTime = Date.now();
  }
  pendingDeleteId = null;
  saveLocalBookmarks(localBookmarks);
  renderBookmarks();
  showPanel("main-list");
  syncBookmarks();
}

function toggleManageMode(event) {
  manageModeEnabled = !manageModeEnabled;
  manageButton.innerText = manageModeEnabled ? "Done" : "Manage";
  const allControls = document.getElementsByClassName("bookmark-controls");
  for (let i = 0; i < allControls.length; i++) {
    allControls[i].style.display = manageModeEnabled ? "flex" : "none";
  }
}

function syncBookmarks() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", API_DOMAIN + "/one-offs/bookmarks/sync", true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleSyncResponse;
  xmlHttp.send(
    JSON.stringify({
      csrf: csrfToken,
      bookmarks: localBookmarks,
    })
  );
}

function handleSyncResponse(event) {
  const result = defaultHandler(event);
  if (!result || result.statusCode != 200) {
    loader.style.display = "none";
    return;
  }
  localBookmarks = result.responseJson.bookmarks;
  saveLocalBookmarks(localBookmarks);
  renderBookmarks();
}

renderBookmarks();
syncBookmarks();
