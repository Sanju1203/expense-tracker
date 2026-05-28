const form = document.getElementById("expense-form");

const titleInput = document.getElementById("title");

const amountInput = document.getElementById("amount");

const expenseList = document.getElementById("expense-list");

const balance = document.getElementById("balance");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses(){

  localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
  );

}

function updateBalance(){

  const total = expenses.reduce((sum, expense) => {

    return sum + expense.amount;

  }, 0);

  balance.innerText = `₹${total}`;

}

function renderExpenses(){

  expenseList.innerHTML = "";

  expenses.forEach((expense, index) => {

    const div = document.createElement("div");

    div.classList.add("expense-item");

    div.innerHTML = `
      <span>
        ${expense.title} - ₹${expense.amount}
      </span>

      <button class="delete-btn" onclick="deleteExpense(${index})">
        Delete
      </button>
    `;

    expenseList.appendChild(div);

  });

  updateBalance();

  saveExpenses();

}

function deleteExpense(index){

  expenses.splice(index, 1);

  renderExpenses();

}

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const title = titleInput.value;

  const amount = Number(amountInput.value);

  expenses.push({
    title,
    amount
  });

  renderExpenses();

  form.reset();

});

renderExpenses();