let isHidden = false;
let tasks = JSON.parse(localStorage.getItem('ourTasks')) || [];
showCategories();



document.getElementById('left').addEventListener('click', event => {
  if (event.target.className === 'jsDivs') {
    hide(['customerForm', 'resultTable']);
    document.forms['myForm'].reset();
    clearErrorMessages();
    deleteThisZone('right');

    const categoryKey = event.target.getAttribute('data-category');
    const categoryProducts = categories[categoryKey].products;
    showProducts(categoryProducts, categoryKey);
  }
});

document.getElementById('center').addEventListener('click', event => {
  if (event.target.className === 'jsDivs') {
    hide(['customerForm', 'resultTable']);
    document.forms['myForm'].reset();
    clearErrorMessages();

    const productId = event.target.getAttribute('data-product');
    const categoryKey = event.target.getAttribute('data-category');
    const product = categories[categoryKey].products.find(product => product.id == productId);
    let productTobuy = document.getElementById('productChoosed');
    productTobuy.textContent = 'Ваш выбор: ' + product.name + ' ' + product.price + ' ($)';
    showProductDetails(product);
  }
});

document.getElementById('btn').addEventListener('click', function () {
  let form = document.forms['myForm'];
  let formData = {
    fullName: form.elements['customer'].value,
    city: form.elements['city'].value,
    postal: form.elements['postal'].value,
    paymentMethod: form.elements['payment'].value,
    amount: form.elements['amount'].value,
    comment: form.elements['comment'].value,
  };

  if (!validateForm(formData)) {
    return;
  }

  tasks.push(formData);
  localStorage.setItem('ourTasks', JSON.stringify(tasks));
  showTasks();
  createTable(formData);
  form.reset();
});

const customerOrdersbutton = document.getElementById('buttonMyOrders');
    customerOrdersbutton.addEventListener('click', toggleOrdersDisplay);

    function toggleOrdersDisplay() {
      const ordersContainer = document.getElementById('ordersContainer');
      ordersContainer.classList.toggle('hidden');
      customerOrdersbutton.textContent = isHidden ? '< Назад' : 'Мои заказы';
      isHidden = !isHidden;
      if (!isHidden) {
        showTasks();
      }
    }

    function showTasks() {
      const parent = document.getElementById('tasksList');
      parent.innerHTML = '';
      if (tasks.length === 0) {
        return;
      }
      tasks.forEach((task, index) => {
        showTask(task, index);
      });
    }

    function showTask(task, index) {
      const parent = document.getElementById('tasksList');
      const item = document.createElement('li');
      item.textContent = `${task.fullName}, ${task.city}, ${task.postal}, ${task.paymentMethod}, ${task.amount}, ${task.comment}`;
      parent.appendChild(item);
    }

function hide(elements) {
  elements.forEach(element => {
    document.getElementById(element).classList.add('hidden');
  });
}

function deleteThisZone(zone) {
  const clearZone = document.getElementById(zone);
  clearZone.innerHTML = '';
}

function showCategories() {
  const parentElement = document.getElementById('left');
  parentElement.innerHTML = ''; // Очищаем категории перед отображением

  for (let categoryKey in categories) {
    const category = categories[categoryKey];
    let element = document.createElement('div');
    element.textContent = category.name;
    element.setAttribute('data-category', categoryKey);
    element.classList.add('jsDivs');
    parentElement.appendChild(element);
  }
}

function showProducts(products, category) {
  const parentElement = document.getElementById('center');
  parentElement.innerHTML = ''; // Очищаем продукты перед отображением

  products.forEach(product => {
    let element = document.createElement('div');
    element.textContent = `${product.name} (${product.price}$)`;
    element.setAttribute('data-product', product.id);
    element.setAttribute('data-category', category);
    element.classList.add('jsDivs');
    parentElement.appendChild(element);
  });
}

function showProductDetails(product) {
  const rightBlock = document.getElementById('right');
  rightBlock.innerHTML = ''; // Очищаем детали продукта перед отображением

  let descriptionElement = document.createElement('p');
  descriptionElement.textContent = product.description;
  rightBlock.appendChild(descriptionElement);

  let buyButton = document.createElement('button');
  buyButton.textContent = 'Купить';
  buyButton.addEventListener('click', () => {
    document.getElementById('customerForm').classList.toggle('hidden');
  });
  rightBlock.appendChild(buyButton);
}

function createTable(formData) {
  let table = document.getElementById('resultTable');
  table.innerHTML = ''; // Очищаем таблицу перед отображением
  table.classList.remove('hidden');

  let headers = ['ФИО', 'Город', 'Отделение', 'Тип оплаты', 'Кол-во', 'Комментарий'];
  let headerRow = createTableRow(headers, 'th');
  table.appendChild(headerRow);

  let dataRow = createTableRow(Object.values(formData), 'td');
  table.appendChild(dataRow);
}

function createTableRow(data, cellType) {
  let row = document.createElement('tr');
  data.forEach(item => {
    let cell = document.createElement(cellType);
    cell.textContent = item;
    row.appendChild(cell);
  });
  return row;
}



  function validateForm(formData) {
    // Вспомогательная функция для проверки поля на пустоту
    function isFieldEmpty(fieldValue, fieldName) {
      if (fieldValue.trim() === '') {
        displayErrorMessage(fieldName, 'Все поля должны быть заполнены');
        return true;
      }
      return false;
    }
  
    // Вспомогательная функция для проверки ФИО
    function isFullNameInvalid(fullName) {
      const nameParts = fullName.split(' ');
      if (nameParts.length !== 3 || nameParts.some(name => !name.trim() || !/^[\u0400-\u04FF]+$/.test(name))) {
        displayErrorMessage('customer', 'Укажите полное ФИО на русском языке');
        return true;
      }
      return false;
    }
  
    // Основная логика валидации
    let isValid = true;
    isValid = !isFullNameInvalid(formData.fullName) && isValid;
    isValid = !isFieldEmpty(formData.city, 'city') && isValid;
    isValid = !isFieldEmpty(formData.postal, 'postal') && isValid;
    isValid = !isFieldEmpty(formData.paymentMethod, 'payment') && isValid;
    isValid = !isFieldEmpty(formData.amount, 'amount') && isValid;
    isValid = !isFieldEmpty(formData.comment, 'comment') && isValid;
  
    return isValid;
  }
  

function displayErrorMessage(fieldName, message) {
  const errorElementId = `${fieldName}Error`;
  const errorElement = document.getElementById(errorElementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('error');
  } else {
    console.error(`Error element with ID ${errorElementId} not found.`);
  }
}


function clearErrorMessages() {
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach(element => {
    element.textContent = '';
    element.classList.remove('error');
  });
}

