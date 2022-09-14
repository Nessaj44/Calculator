const numberButtons = document.querySelectorAll('.gridItem-number');
const operatorButtons = document.querySelectorAll('.gridItem-operator');
const inputField = document.querySelector('#currentInput');
const resultField = document.querySelector('#resultInput');
let a = '';
let b = '';
let operation = '';
let c = '';


//number buttons
numberButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    if(inputField.textContent.includes('=')) {
      return;
    } else if(operation === '') {
      a += this.value;
    } else {
      b += this.value;
    }
    inputField.textContent += this.value;
  });
});


//All clear button
function allClear() {
  inputField.textContent = '';
  resultField.textContent = 0;
  a = '';
  b = '';
  operation = '';
  operatorValue = '';
}


//Delete one by one
function deleteByOne() {
  if (b !== '') {
    b = b.slice(0, -1);
  } else if (operation !== '') {
    operation = operation.slice(0, -1);
  } else if (a !== '') {
    a = a.slice(0, -1);
  }
  inputField.textContent = inputField.textContent.slice(0, -1);
}


//operator buttons
operatorButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    if(
      (inputField.textContent.endsWith('+')) ||
      (inputField.textContent.endsWith('/')) ||
      (inputField.textContent.endsWith('*')) ||
      (inputField.textContent.endsWith('-')) ||
      (inputField.textContent === '')
      ) {
      return;
    } else if(a !== '' && b !== '') {
      c = operate(a, b, operation);
      inputField.textContent += this.value;
      a = c;
      b = '';
    } else {
      inputField.textContent += this.value;
    }
    operation = this.value
  });
});


function operate(a, b, operation) {
  switch(operation) {
    case '+':
      return +a + +b;
    case '-':
      return +a - +b;
    case '*':
      return +a * +b;
    case '/':
      if(b === '0') {
        return 'Error';
      } else {
        return +a / +b;
      }
  }
}


//equal button
function equals() {
  if(
    (inputField.textContent.includes('=')) ||
    (a === '') ||
    (b === '') ||
    (operation === '')
    ) {
    return;
  } else {
    c = operate(a, b, operation);
    resultField.textContent = c;
  }
}


//decimal 
function decimal() {
  if(!a.includes('.') && !operation) {
    a += '.';
    inputField.textContent += '.';
    console.log(a)
  } else if(!b.includes('.')) {
    b += '.'
    inputField.textContent += '.';
  }
}


//percent
function percent() {
  if (a === '') {
    a = a / 100;
    resultField.textContent = a;
  } else if (operation !== '') {
    b = b / 100;
    resultField.textContent = b;
  }
}