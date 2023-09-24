/* ==============HIDE & SICK================== */
function hide(elements) {
  elements.forEach(element => {
    document.getElementById(element).classList.add('hidden');
  });
}

function deleteThisZone (zone) {
  const clearRightBlock = document.getElementById(zone);
  clearRightBlock.innerHTML = '';
}
/* ==============PRODUCTS & CATEGORIES================== */

function showCategories() {
  const parentElement = document.getElementById('left');

  for (let categoryKey in categories) {
    const category = categories[categoryKey];

    let element = document.createElement('div');
    element.textContent = category.name;
    element.setAttribute('data-category', categoryKey)
    element.classList.add('jsDivs');
    parentElement.appendChild(element);
  }
}

function showProducts(products, category) {
  const parentElement = document.getElementById('center');
  parentElement.innerHTML = '';

  for (let product of products) {
    let element = document.createElement('div');
    element.textContent = `${product.name} (${product.price}$)`;
    element.setAttribute('data-product', product.id);
    element.setAttribute('data-category', category);
    element.classList.add('jsDivs');
    parentElement.appendChild(element);
  }
}

function showProductDetails(product) {
  const rightBlock = document.getElementById('right');
  rightBlock.innerHTML = '';  

  let descriptionElement = document.createElement('p');
  descriptionElement.textContent = product.description;
  rightBlock.appendChild(descriptionElement);

  let buyButton = document.createElement('button');
  buyButton.classList.add('buttonCategory') 

  buyButton.textContent = 'Купить';
  buyButton.addEventListener('click', () => {
    rightBlock.innerHTML = ''; 
  });

  buyButton.addEventListener('click', () => {
    document.getElementById('customerForm').classList.toggle('hidden');
  });

  rightBlock.appendChild(buyButton);
}
/* ==============TABLE================== */
function createTableRow(data, cellType) { //headers, th
  let row = document.createElement('tr');
  for (let item of data) {
    let cell = document.createElement(cellType);
    cell.textContent = item;
    row.appendChild(cell);
  }
  
  tasks.push(cell);
  showTask(cell, tasks.length - 1);
  localStorage.setItem('ourTasks', JSON.stringify(tasks));
  return row;
}

function createTable(formData) {
  let table = document.getElementById('resultTable');

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  let headers = ['ФИО', 'Город', 'Отделение', 'Тип оплаты', 'Кол-во', 'Комментарий'];
  let headerRow = createTableRow(headers, 'th');
  table.appendChild(headerRow);

  let dataRow = createTableRow(Object.values(formData), 'td');
  table.appendChild(dataRow);

  /* dataRow */
}
/* ==============VALIDATE FORM================== */
function validateForm(hasError) {
  const form = document.forms['myForm'];
  const fields = ['customer', 'city', 'postal', 'payment', 'amount', 'comment'];

  clearErrorMessages();

  fields.forEach(fieldName => {
    const value = form.elements[fieldName].value.trim();
    if (value === '') {
      displayErrorMessage(fieldName, ' Все поля должны быть заполнены');
    } else if (hasError && fieldName === 'customer') {
      displayErrorMessage(fieldName, ' Укажите полное ФИО на русском языке');
    }
  });

  if (!hasError) {
    clearErrorMessages(fieldName);
  }
}

function displayErrorMessage(fieldName, message) {
  const errorElement = document.getElementById(`${fieldName}Error`);
  errorElement.textContent = message;
  errorElement.style.color = 'red';
}

function clearErrorMessages() {
  const errorElements = document.querySelectorAll('[id$="Error"]');
  errorElements.forEach(element => {
    element.textContent = '';
  });
}