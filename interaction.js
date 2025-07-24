let budget = 0;
let productCount = 0;

// Get and store budget
function budgetGet() {
  const input = document.querySelector('.js-addbudget');
  const value = parseFloat(input.value);
  if (isNaN(value) || value < 0) {
    alert('Please enter a valid budget amount.');
    return;
  }

  budget = value;
  localStorage.setItem('budget', budget);
  updateBudgetDisplay();
  input.value = '';
}

// Add product and update budget
function productPriceName() {
  const name = document.querySelector('.js-productname').value.trim();
  const priceInput = document.querySelector('.js-productprice');
  const price = parseFloat(priceInput.value);

  if (!name || isNaN(price) || price <= 0) {
    alert('Please enter valid product name and price.');
    return;
  }

  if (price > budget) {
    alert('This product exceeds your budget.');
    return;
  }

  budget -= price;
  localStorage.setItem('budget', budget);

  const li = document.createElement('li');
  li.innerHTML = `Product: <strong>${name}</strong> | Price: ${price.toFixed(2)} $`;
  li.setAttribute('data-price', price);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('deletcss');
  deleteBtn.addEventListener('click', () => {
    const restorePrice = parseFloat(li.getAttribute('data-price'));
    budget += restorePrice;
    localStorage.setItem('budget', budget);
    updateBudgetDisplay();
    li.remove();
    productCount--;
    updateProductCount();
  });

  li.appendChild(deleteBtn);
  document.querySelector('.itemList').appendChild(li);

  productCount++;
  updateProductCount();

  document.querySelector('.js-productname').value = '';
  priceInput.value = '';
  updateBudgetDisplay();
}

// Display budget
function updateBudgetDisplay() {
  document.querySelector('.display-budget').innerHTML = `Budget: ${budget.toFixed(2)} $`;
}

// Product counter
function updateProductCount() {
  document.querySelector('.product-Count').innerHTML = `Total products: ${productCount}`;
}

// Clear all
function clearAll() {
  document.querySelector('.itemList').innerHTML = '';
  productCount = 0;
  updateProductCount();
}

// Toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  const icon = document.querySelector('.dark-mode-btn i');
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
}

// Load saved theme + budget
window.onload = () => {
  const icon = document.querySelector('.dark-mode-btn i');
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  const savedBudget = parseFloat(localStorage.getItem('budget'));
  if (!isNaN(savedBudget)) {
    budget = savedBudget;
    updateBudgetDisplay();
  }

  // Add event listeners
  document.querySelector('.js-budget-btn').addEventListener('click', budgetGet);
  document.querySelector('.js-product-btn').addEventListener('click', productPriceName);
  document.querySelector('.js-clear-btn').addEventListener('click', clearAll);
  document.querySelector('.dark-mode-btn').addEventListener('click', toggleDarkMode);
};
