let isHidden = false;
let tasks = [];
showCategories();
/* ==============MAIN CATEGORIES================== */
document.getElementById('left').addEventListener('click', event => {

  if (event.target.nodeName === 'DIV') {
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
  if (event.target.nodeName === 'DIV') {
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
/* ==============FORM CREATE & TABLE LOAD================== */
document.getElementById('btn').addEventListener('click', function () {
  let form = document.forms['myForm'];
  document.getElementById('resultTable').classList.remove('hidden');//только щас покажи таблицу
  let formData = {
    fullName: form.elements['customer'].value,
    city: form.elements['city'].value,
    postal: form.elements['postal'].value,
    paymentMethod: form.elements['payment'].value,
    amount: form.elements['amount'].value,
    comment: form.elements['comment'].value,
  };
  let fullName = formData.fullName; 
  let names = fullName.split(' '); 
  if (names.length !== 3 || /^\s*$/.test(names[0]) || /^\s*$/.test(names[1]) || /^\s*$/.test(names[2]) || !/^[\u0400-\u04FF\s]+$/.test(fullName)) {
    names=true;
    validateForm(names)
    return;
  }else {
    names = false;
  }

  if (Object.values(formData).some(value => value === '')) {
    validateForm();
    return;
  } else {
    validateForm(false); // Передаем false в случае успешной проверки
  }
  createTable(formData);
});

/* ==============MY ORDERS BTN================== */
const customerOrdersbutton = document.getElementById('buttonMyOrders');
customerOrdersbutton.addEventListener('click', () => {

  deleteThisZone('center');
  tasks = JSON.parse(localStorage.getItem('ourTasks')) || []; // null || []
  showTasks();
  /* document.forms['myForm'].reset(); */
  hide(['customerForm', 'resultTable']);
 

  const main = document.getElementById('main');
  if (isHidden) {
    main.style.display = 'flex';
    buttonText = 'Мои заказы';
  } else {
    main.style.display = 'none';
    buttonText = '< Назад';
  }
  customerOrdersbutton.textContent = buttonText;
  isHidden = !isHidden;
});



function showTasks() {
  tasks.map((task, index) => showTask(task, index));
  // tasks.map(showTask)
}

function showTask(task, index) {
  const parent = document.getElementById('tasks');
  const item = document.createElement('li');
  item.textContent = task;

  /* const btn = document.createElement('button');
  btn.setAttribute('type', 'button');
  btn.textContent = 'X';
  btn.setAttribute('data-task-index', index);
  btn.addEventListener('click', () => {
    tasks.splice(index, 1);
    localStorage.setItem('ourTasks', JSON.stringify(tasks));
    item.remove();
  }); */

  item.appendChild(btn)
  parent.appendChild(item);
}


///////////////////////////////////////////////////
/* let tasks = [];

function showTasks() {
  tasks.map((task, index) => showTask(task, index));
  // tasks.map(showTask)
}

function showTask(task, index) {
  const parent = document.getElementById('tasks');
  const item = document.createElement('li');
  item.textContent = task;

  const btn = document.createElement('button');
  btn.setAttribute('type', 'button');
  btn.textContent = 'X';
  btn.setAttribute('data-task-index', index);
  btn.addEventListener('click', () => {
    tasks.splice(index, 1);
    localStorage.setItem('ourTasks', JSON.stringify(tasks));
    item.remove();
  });

  item.appendChild(btn)
  parent.appendChild(item);
}

window.addEventListener('load', () => {
  tasks = JSON.parse(localStorage.getItem('ourTasks')) || []; // null || []
  showTasks();



});

document.getElementById('buttonMyOrders').addEventListener('click', () => {
  for (let categoryKey in categories) {
    const category = categories[categoryKey];



    const str = category.products.name;
    return str;
  }
    tasks.push(str);
    showTask(str, tasks.length - 1);
    localStorage.setItem('ourTasks', JSON.stringify(tasks));
  
}); */