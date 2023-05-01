//Create HTML markup
const body = document.body;
const wrapper = document.createElement('div');
const keyboard = document.createElement('div');
const title = document.createElement('h1');
const container = document.createElement('div');
const textarea = document.createElement('textarea');
const keys = document.createElement('div');
const text = document.createElement('div');
const description = document.createElement('p');
const shortcut = document.createElement('p');

wrapper.classList.add('wrapper');
keyboard.classList.add('keyboard');
title.classList.add('keyboard__title');
title.textContent = 'RSS Virtual Keyboard';
container.classList.add('keyboard__container');
textarea.classList.add('keyboard__textarea');
keys.classList.add('keyboard__keys');
text.classList.add('keyboard__text');
description.textContent = 'The keyboard was created in the Ubuntu OS';
shortcut.textContent = 'language switching: left ctrl + left alt';

keyboard.appendChild(title);
container.appendChild(textarea);
container.appendChild(keys);
keyboard.appendChild(container);
text.appendChild(description);
text.appendChild(shortcut);
keyboard.appendChild(text);
wrapper.appendChild(keyboard);
body.prepend(wrapper);

//create keys
const keyboardEn = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'metaKey', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',]];

const enKeys = {Backquote: '`', Backspace: 'Backspace', Digit0: '0', Digit1: '1',
  Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5', Digit6: '6', Digit7: '7',
  Digit8: '8', Digit9: '9', Equal: '=', Minus: '-',Backslash: '\\', BracketLeft: '[',
  BracketRight: ']', KeyE: 'e', KeyI: 'i', KeyO: 'o', KeyP: 'p', KeyQ: 'q', KeyR: 'r',
  KeyT: 't', KeyU: 'u', KeyW: 'w', KeyY: 'y', Tab: 'Tab', CapsLock: 'CapsLock',
  Enter: 'Enter', KeyA: 'a', KeyD: 'd', KeyF: 'f', KeyG: 'g', KeyH: 'h', KeyJ: 'j',
  KeyK: 'k', KeyL: 'l', KeyS: 's', Quote: '\'', Semicolon: ';', ArrowUp: '▲',
  Comma: ',', KeyB: 'b', KeyC: 'c', KeyM: 'm', KeyN: 'n', KeyV: 'v', KeyX: 'x',
  KeyZ: 'z', Period: '.', ShiftLeft: 'Shift', ShiftRight: 'Shift', Slash: '/',
  AltLeft: 'Alt', AltRight: 'Alt', ArrowDown: '▼', ArrowLeft: '◄',
  ArrowRight: '►', ControlLeft: 'Ctrl', ControlRight: 'Ctrl', Space: ' ', metaKey: 'Win'};

  const ruKeys = {Backquote: 'ё', Backspace: 'Backspace', Digit0: '0', Digit1: '1',
  Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5', Digit6: '6', Digit7: '7',
  Digit8: '8', Digit9: '9', Equal: '=', Minus: '-',Backslash: '\\', BracketLeft: 'х',
  BracketRight: 'ъ', KeyE: 'у', KeyI: 'ш', KeyO: 'щ', KeyP: 'з', KeyQ: 'й', KeyR: 'к',
  KeyT: 'е', KeyU: 'г', KeyW: 'ц', KeyY: 'н', Tab: 'Tab', CapsLock: 'CapsLock',
  Enter: 'Enter', KeyA: 'ф', KeyD: 'в', KeyF: 'а', KeyG: 'п', KeyH: 'р', KeyJ: 'о',
  KeyK: 'л', KeyL: 'д', KeyS: 'ы', Quote: 'э', Semicolon: 'ж', ArrowUp: '▲',
  Comma: 'б', KeyB: 'и', KeyC: 'с', KeyM: 'ь', KeyN: 'т', KeyV: 'м', KeyX: 'ч',
  KeyZ: 'я', Period: 'ю', ShiftLeft: 'Shift', ShiftRight: 'Shift', Slash: '.',
  AltLeft: 'Alt', AltRight: 'Alt', ArrowDown: '▼', ArrowLeft: '◄',
  ArrowRight: '►', ControlLeft: 'Ctrl', ControlRight: 'Ctrl', Space: ' ', metaKey: 'Win'};

const createRow = (array) => {
  const row = document.createElement('div');
  row.classList.add('keyboard__row');
  for(let i = 0; i < array.length; i++){
    const button = document.createElement('button');
    if(language === 'en'){
      button.textContent = enKeys[array[i]];
    }else{
      button.textContent = ruKeys[array[i]];
    }
    button.classList.add('keyboard__key');
    button.classList.add(array[i]);
    row.appendChild(button);
  }
  return row;
}

let language = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';

const createKeys = () => {
  const fragment = document.createDocumentFragment();
  for(let i = 0; i < keyboardEn.length; i++) {
    const rows = createRow(keyboardEn[i]);
    fragment.appendChild(rows);
  }
  keys.appendChild(fragment);
}

createKeys();

const changeLanguage = () => {
  language = language === 'ru' ? 'en' : 'ru';
  keys.innerHTML = '';
  createKeys();
}

const printKeyboard = (event) => {
  if(event.code === 'ControlLeft' && event.altKey || event.code === 'AltLeft' && event.ctrlKey){
    changeLanguage();
  }

  const current = document.querySelector(`.${event.code}`);
  current.classList.add('active-key');

  if(event.target === textarea) return;

  if(event.code === 'Tab') {
    textarea.value += '    ';
  }else if(event.code === 'CapsLock'){

  }else if(event.code === 'ShiftLeft' || event.code === 'ShiftRight'){

  }else if(event.code === 'ControlLeft' || event.code === 'ControlRight'){

  }else if(event.code === 'AltLeft' || event.code === 'AltRight'){

  }else if(event.code === 'metaKey'){

  }else if(event.code === 'ArrowUp' || event.code === 'ArrowLeft' || event.code === 'ArrowDown' || event.code === 'ArrowRight'){
    textarea.value += current.textContent;
  }else if(event.code === 'Enter'){
    textarea.value += '\n';
  }else if(event.code === 'Backspace'){
    textarea.value = textarea.value.slice(0, -1);
  }else {
    textarea.value += current.textContent;
  }
}

document.addEventListener('keydown', printKeyboard);

document.addEventListener('keyup', (event) => {
  const current = document.querySelector(`.${event.code}`);
  current.classList.remove('active-key');
});

function setLocalStorage() {
  localStorage.setItem('text', textarea.value);
  localStorage.setItem('lang', language);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('text')) {
    textarea.value = localStorage.getItem('text');
  }
}
window.addEventListener('load', getLocalStorage);
