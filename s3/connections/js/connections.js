const TEXT = ["Perfect!","Great!","Solid!","Phew!","Next Time!"];
const COLORS = ['yellow', 'green', 'blue', 'purple'];
const json = document.getElementById("json");
const puzzle = document.getElementById("puzzle");
const answers = document.getElementById("answers");
const gameControls = document.getElementById("game-controls");
const guesses = document.getElementById("guesses");
const results = document.getElementById("results");
const displayText = document.getElementById("display-text");
const dateText = document.getElementById("date-text");
const resultBlocks = document.getElementById("result-blocks");
const comment = document.getElementById("comment");
const commentSpan = document.getElementById("comment-span");
const datePicker = document.getElementById("date-picker");
const guessSpot = document.getElementById("guess-spot");
let gameEnded = false;
function clearThePuzzle() {
  puzzleSolution = undefined;
  gameEnded = false;
  attempts = [];
  attemptsSet = [];
  deselectAll();
  Array.from(document.getElementsByClassName('card')).forEach(x=>x.remove());
  Array.from(document.getElementsByClassName('row')).forEach(x=>x.remove());
  Array.from(document.getElementsByClassName('answer')).forEach(x=>x.remove());
  seedGuesses();
  results.style.display = 'none';
  gameControls.style.display = 'none';
  guesses.style.display = 'none';
  document.addEventListener('keyup',pressCallToFocus);
}
function seedGuesses() {
  while (guessSpot.firstElementChild) {
    guessSpot.firstElementChild.remove();
  }
  for (let i = 0; i < 4; i++) {
    let guessDiv = document.createElement('div');
    guessDiv.classList.add('guess');
    guessSpot.appendChild(guessDiv);
  }
}
let loading = false;
let previousDatePickerValue = undefined;
function getThePuzzle() {
  if (loading) {
    return;
  }
  loading = true;
  let url = API_DOMAIN + "/connections/get-connections";
  if (SPORTS) {
    url += '-sports';
  }
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true); // false for synchronous request
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleThePuzzle;
  xmlHttp.send(JSON.stringify({ csrf: csrfToken, date: datePicker.value }));
}
let puzzleSolution = undefined;
let attempts = [];
let attemptsSet = [];
function handleThePuzzle(event) {
  let result = defaultHandler(event);
  puzzleSolution = result.responseJson;
  let url = API_DOMAIN + "/connections/get-guesses";
  if (SPORTS) {
    url += '-sports';
  }
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true); // false for synchronous request
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleTheData;
  xmlHttp.send(JSON.stringify({ csrf: csrfToken, date: datePicker.value }));
}
function handleTheData(event) {
  try {
    let result = defaultHandler(event);
    let connectionsData = result.responseJson;
    gameControls.style.display = 'flex';
    guesses.style.display = 'flex';
    let cards = [];
    for(let category of puzzleSolution.categories) {
      for(let card of category.cards) {
        cards.push(card);
      }
    }
    cards = cards.sort(cardSort);
    for(let card of cards) {
      drawCard(card);
    }
    if (connectionsData) {
      for (let attempt of connectionsData) {
        checkGuess(attempt);
      }
      interruptMessage(event);
      removeAllShakes(event);
    }
    applyEmulators(undefined, connectionsArrowCallback);
  } catch (e) {
    showMessage('Invalid Date!')
  }
  loading = false;
}
function cardSort(x, y) {
    return parseInt(x.position) - parseInt(y.position);
}
function textSort(x, y) {
    return x.localeCompare(y);
}
function drawCard(card) {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    let contentDiv = document.createElement('div');
    contentDiv.addEventListener('click', select);
    if (card.content) {
      contentDiv.innerText = card.content;
    } else {
      let img = document.createElement('object');
      img.data = card.image_url;
      img.type = "image/svg+xml";
      img.style.pointerEvents = "none";
      contentDiv.appendChild(img);
    }
    cardDiv.setAttribute('answer-text', card.content ? card.content : card.image_alt_text);
    contentDiv.setAttribute('input-group-name', 'navigation')
    cardDiv.appendChild(contentDiv);
    puzzle.appendChild(cardDiv);
}
function drawAnswer(category, color) {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('answer');
    let contentDiv = document.createElement('div');
    let categoryP = document.createElement('p');
    let wordListP = document.createElement('p');
    categoryP.innerText = category.title;
    contentDiv.appendChild(categoryP);
    wordListP.innerText = category.cards.map(x=>x.content ? x.content : x.image_alt_text).join(", ");
    contentDiv.appendChild(wordListP);
    cardDiv.appendChild(contentDiv);
    cardDiv.classList.add(color);
    answers.appendChild(cardDiv);
}
const connectionsPreventDefaultKeys = [
  'Backspace'
];
const connectionsPreventDefaultIfEmptyKeys = [
];
const connectionsBlurKeys = [
  'EndCall'
];
const connectionsBlurIfEmptyKeys = [
];
const connectionsInteractionKeyList = [
  'ArrowDown',
  'ArrowUp',
  'ArrowLeft',
  'ArrowRight',
  'Call'
];
function connectionsArrowCallback(event, functionHandle) {
  if ((event.target.tagName.toLowerCase() != 'textarea' && preventDefaultKeys.includes(event.key)) || (preventDefaultIfEmptyKeys.includes(event.key) && !event.target.value)) {
    event.preventDefault();
  }
  if (event.type == 'keydown' && event.target.type == 'number' && preventDefaultOnNumberInput.includes(event.key)) {
    event.preventDefault();
  }
  if (blurKeys.includes(event.key)) {
    event.target.blur();
  }
  if (event.type === 'keyup' && blurIfEmptyKeys.includes(event.key) && !event.target.value && !previousValue) {
    event.target.blur();
  }
  if (event.type === 'keydown' && connectionsInteractionKeyList.includes(event.key)) {
    // check if you are where youre supposed to be before you go
    let tooFast = (new Date()) - previousArrowTime < 100;
    if (!tooFast) {
      if (['Call'].includes(event.key)) {
        checkGuessCallback(event);
        let inputs = Array.from(document.getElementsByClassName('navigable-input'));
        if (event.target.hasAttribute('input-group-name')) {
          const currentTarget = event.target.getAttribute('input-group-name');
          inputs = inputs.filter(x=>x.getAttribute('input-group-name') == currentTarget);
        }
        if (!document.querySelector('.selected') && !gameEnded) {
          let newItem = inputs[0];
          newItem.focus();
          if (event.type === 'keydown' && 
              (newItem.hasAttribute('linked-item'))) {
            let checkbox = newItem.parentElement.getElementsByClassName('selectable')[0];
            checkbox.classList.add('selected');
          }
        }
      } else {
        let inputs = Array.from(document.getElementsByClassName('navigable-input'));
        if (event.target.hasAttribute('input-group-name')) {
          const currentTarget = event.target.getAttribute('input-group-name');
          inputs = inputs.filter(x=>x.getAttribute('input-group-name') == currentTarget);
        }
        let index = inputs.indexOf(event.target);
        let rows = {};
        for (let input of inputs) {
          let key = input.getBoundingClientRect().y.toString();
          if (!rows[key]) {
            rows[key] = [];
          }
          rows[key].push(input);
        }
        let rowNames = Object.keys(rows);
        let rowName = inputs[index].getBoundingClientRect().y.toString();
        let row = rows[rowName];
        let rowIndex = row.findIndex(x=>x==inputs[index]);
        if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
          let foundRowNameIdx = rowNames.findIndex(x=>x==rowName);
          do {
            foundRowNameIdx = foundRowNameIdx + (['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1);
            foundRowNameIdx = foundRowNameIdx < 0 ? foundRowNameIdx + rowNames.length : foundRowNameIdx;
            foundRowNameIdx = foundRowNameIdx > rowNames.length - 1 ? foundRowNameIdx - rowNames.length : foundRowNameIdx;
            rowName = rowNames[foundRowNameIdx];
          } while (!rows[rowName][rowIndex]);
        } else {
          rowIndex = rowIndex + (['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1);
          rowIndex = rowIndex < 0 ? rowIndex + row.length : rowIndex;
          rowIndex = rowIndex > row.length - 1 ? rowIndex - row.length : rowIndex;
        }
        if (!gameEnded) {
          let newItem = rows[rowName][rowIndex];
          newItem.focus();
          if (event.type === 'keydown' && 
              (newItem.hasAttribute('linked-item'))) {
            let checkbox = newItem.parentElement.getElementsByClassName('selectable')[0];
            checkbox.classList.add('selected');
          }
        }
      }
      previousArrowTime = new Date();
    }
  }
  if (event.target.tagName.toLowerCase() != 'textarea' && event.type === 'keydown' && (event.target.hasAttribute('linked-item')) && ['Enter'].includes(event.key)) {
    let button = event.target.parentElement.getElementsByClassName('selectable')[0];
    button.click();
  }
  if (functionHandle) {
    functionHandle(event);
  }
  previousValue = event.target.value;
}
function select(event) {
  if (gameEnded) {
    return;
  }
  if (event.target.classList.contains('chosen')) {
    event.target.classList.remove('chosen');
  } else if (document.querySelectorAll('div.chosen').length < 4) {
    event.target.classList.add('chosen');
  }
}
function checkGuessCallback(event) {
  let chosenTiles = Array.from(document.getElementsByClassName('chosen'));
  if (chosenTiles.length == 4) {
    let chosenValues = chosenTiles.map(x=>findParentWithClass(x,'card').getAttribute('answer-text')).sort(textSort);
    if (attemptsSet.map(x=>JSON.stringify(x)).includes(JSON.stringify(chosenValues))) {
      showMessage('Already Guessed!');
      return;
    }
    checkGuess(chosenValues);
    saveGuesses();
  }
}
function saveGuesses() {
  let url = API_DOMAIN + "/connections/set-guesses";
  if (SPORTS) {
    url += '-sports';
  }
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true); // false for synchronous request
  xmlHttp.withCredentials = true;
  xmlHttp.send(JSON.stringify({ csrf: csrfToken, date: datePicker.value, guesses: attemptsSet }));
}
function checkGuess(chosenValues) {
  attemptsSet.push(chosenValues);
  for (let i = 0; i < puzzleSolution.categories.length; i++) {
    let category = puzzleSolution.categories[i];
    let categoryValues = category.cards.map(x=>x.content ? x.content : x.image_alt_text).sort(textSort);
    if (JSON.stringify(chosenValues) == JSON.stringify(categoryValues)) {
      c = COLORS[i];
      attempts.push([c,c,c,c]);
      Array.from(document.getElementsByClassName('card')).filter(x=>chosenValues.includes(findParentWithClass(x,'card').getAttribute('answer-text'))).forEach(x=>x.remove());
      drawAnswer(category, c);
      succeedPuzzleIfAppropriate(event);
      return;
    }
  }
  let thisGuess = [];
  for (let chosenValue of chosenValues) {
    for (let i = 0; i < puzzleSolution.categories.length; i++) {
      let category = puzzleSolution.categories[i];
      let categoryValues = category.cards.map(x=>x.content ? x.content : x.image_alt_text).sort(textSort);
      if (categoryValues.includes(chosenValue)) {
        c = COLORS[i];
        thisGuess.push(c);
      }
    }
  }
  let howClose = COLORS.map(x=>thisGuess.reduce((t,y)=>t=t+(x==y),0));
  if (howClose.includes(3)) {
    showMessage('One away...');
  } else {
    showMessage('Wrong...');
  }
  attempts.push(thisGuess);
  let remainingGuess = Array.from(document.getElementsByClassName('guess'));
  let removeThisOne = remainingGuess.pop();
  removeThisOne.remove();
  if (remainingGuess.length == 0) {
    if (!!event && !!event.target && event.target instanceof HTMLElement) {
      event.target.blur();
    }
    blurEmulator();
    failPuzzle(event);
  } else {
    Array.from(document.getElementsByClassName('card')).filter(x=>chosenValues.includes(findParentWithClass(x,'card').getAttribute('answer-text'))).forEach(x=>x.classList.add('shake'));
    setTimeout(removeAllShakes, 500);
  }
}
function removeAllShakes(event) {
  Array.from(document.getElementsByClassName('shake')).forEach(x=>x.classList.remove('shake'));
}
function failPuzzle(event) {
  gameOver(false);
}
function succeedPuzzleIfAppropriate(event) {
  let appropriate = !document.querySelector('div.card');
  if (appropriate) {
    gameOver(true);
  }
}
function deselectAll(event) {
  Array.from(document.querySelectorAll('div.chosen')).forEach(x=>x.classList.remove('chosen'));
}
function gameOver(success) {
  Array.from(document.getElementsByClassName('card')).forEach(x=>x.remove());
  for (let i = 0; i < COLORS.length; i++) {
    let color = COLORS[i];
    let existingDiv = document.querySelector(`div.${color}`);
    if (!existingDiv) {
      drawAnswer(puzzleSolution.categories[i], color);
    }
  }
  document.removeEventListener('keyup', pressCallToFocus);
  gameEnded = true;
  deselectAll();
  gameControls.style.display = 'none';
  guesses.style.display = 'none';
  results.style.display = 'block';
  let textIndex = success ? attempts.length - 4 : TEXT.length - 1;
  displayText.innerText = TEXT[textIndex];
  dateText.innerText = datePicker.value;
  for(let attempt of attempts) {
    drawAttempt(attempt);
  }
}
function drawAttempt(attempt) {
  let row = document.createElement('div');
  row.classList.add('row');
  for (let item of attempt) {
    let cell = document.createElement('div');
    cell.classList.add('result-cell');
    cell.classList.add(item);
    row.appendChild(cell);
  }
  resultBlocks.appendChild(row);
}
let fadeTimeout = undefined;
let hideTimeout = undefined;
function showMessage(messageText) {
  clearTimeout(fadeTimeout);
  clearTimeout(hideTimeout);
  commentSpan.innerText = messageText;
  comment.classList.remove('slow-fade');
  comment.style.display = 'flex';
  fadeTimeout = setTimeout(startFade, 1000);
}
function interruptMessage(event) {
  clearTimeout(fadeTimeout);
  clearTimeout(hideTimeout);
  comment.style.display = 'none';
}
function startFade(event) {
  comment.classList.add('slow-fade');
  hideTimeout = setTimeout(hideMessage, 2000);
}
function hideMessage(event) {
  comment.style.display = 'none';
}
function shuffleTiles(event) {
  let cards = Array.from(document.getElementsByClassName('card'));
  let randomized = shuffle(cards);
  for (let card of randomized) {
    puzzle.appendChild(card);
  }
}
// https://stackoverflow.com/a/2450976
function shuffle(array) {
  let output = [...array];
  let currentIndex = output.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [output[currentIndex], output[randomIndex]] = [
      output[randomIndex], output[currentIndex]];
  }
  return output;
}
function setDate(event) {
  if (loading) {
    datePicker.value = previousDatePickerValue;
    return;
  }
  previousDatePickerValue = datePicker.value;
  clearThePuzzle();
  getThePuzzle();
}
if (!navigator.userAgent.includes('KAIOS/')) {
  document.getElementById('kaios-stylesheet').remove();
  setStylesheet("../connections/css/normal.css?v=030");
}
datePicker.value = getTodayOrUrlParam();
clearThePuzzle();
getThePuzzle();