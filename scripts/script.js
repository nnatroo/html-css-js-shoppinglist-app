const itemInput = document.getElementById('item-input');
const categoryInput = document.getElementById('category-input');
const priceInput = document.getElementById('price-input');
const addItemBtn = document.getElementById('add-item-btn');
const itemList = document.getElementById('item-list');
const totalCostDisplay = document.getElementById('total-cost');

let totalCost = 0;

// Function to add a new item
function addItem() {
  const itemText = itemInput.value.trim();
  const category = categoryInput.value;
  const price = parseFloat(priceInput.value);

  if (itemText === '' || isNaN(price)) {
    alert('Please enter a valid item and price!');
    return;
  }

  // Create a new list item
  const item = document.createElement('li');
  item.className = 'item';

  // Add item details
  item.innerHTML = `
        <span>${itemText} (${category}) - $${price.toFixed(2)}</span>
        <button class="purchased-btn">Purchased</button>
        <button class="delete-btn">Delete</button>
    `;

  // Add delete button functionality
  const deleteBtn = item.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    itemList.removeChild(item);
    updateTotalCost(-price); // Subtract price when deleted
  });

  // Add purchased button functionality
  const purchasedBtn = item.querySelector('.purchased-btn');
  purchasedBtn.addEventListener('click', () => {
    item.classList.toggle('purchased');
  });

  // Add the item to the list
  itemList.appendChild(item);

  // Update total cost
  updateTotalCost(price);

  // Clear the input fields
  itemInput.value = '';
  priceInput.value = '';
}

// Function to update the total cost
function updateTotalCost(price) {
  totalCost += price;
  totalCostDisplay.textContent = totalCost.toFixed(2);
}

// Event listener for the "Add Item" button
addItemBtn.addEventListener('click', addItem);

// Optional: Allow pressing "Enter" to add an item
itemInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addItem();
  }
});
