class Transaction {
  constructor(amount, description) {
    this.amount = amount;
    this.description = description;
  }

  getAmount() {
    return this.amount;
  }
}

class Income extends Transaction {
  constructor(amount, description) {
    super(amount, description);
  }

  getAmount() {
    return this.amount;
  }
}

class Expense extends Transaction {
  constructor(amount, description) {
    super(amount, description);
  }

  getAmount() {
    return this.amount;
  }
}

class Budget {
  #transactions = [];

  addIncome(amount, description) {
    if (amount <= 0) {
      throw new Error("Income amount must be greater than zero.");
    }
    if (description.trim() === "") {
      throw new Error("Description cannot be empty.");
    }
    this.#transactions.push(new Income(amount, description));
  }

  addExpense(amount, description) {
    if (amount <= 0) {
      throw new Error("Expense amount must be greater than zero.");
    }
    if (description.trim() === "") {
      throw new Error("Description cannot be empty.");
    }
    this.#transactions.push(new Expense(amount, description));
  }

  getIncomeTotal() {
    let total = 0;
    this.#transactions.forEach((transaciion) => {
      if (transaciion instanceof Income) {
        total += transaciion.getAmount();
      }
    });
    return total;
  }

  getExpenseTotal() {
    let total = 0;
    this.#transactions.forEach((transaciion) => {
      if (transaciion instanceof Expense) {
        total += transaciion.getAmount();
      }
    });
    return total;
  }

  calculateTotal() {
    return this.getIncomeTotal() - this.getExpenseTotal();
  }

  list() {
    return this.#transactions;
  }
}

// DOM + APP LOGIC
const budget = new Budget();

const incomeList = document.querySelector(".income");
const expenseList = document.querySelector(".expense");
const totalBudgetDiv = document.querySelector(".totalbudget");

const nameInput = document.getElementById("nameInput");
const amountInput = document.getElementById("amountInput");
const typeInput = document.getElementById("typeInput");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
  const description = nameInput.value.trim();
  const amount = Number(amountInput.value);
  try {
    if (!description || !amount) {
      alert("Please enter both name and amount.");
      return;
    }

    if (typeInput.value === "income") {
      budget.addIncome(amount, description);
      addIncomeCard(description, amount);
    } else {
      budget.addExpense(amount, description);
      addExpenseCard(description, amount);
    }

    updateTotals();
    clearInputs();
  } catch (error) {
    alert(error.message);
  }
});

// CARD CREATORS
function addIncomeCard(description, amount) {
  const card = document.createElement("div");
  card.className = "incomecard";
  card.innerHTML = `
    <h2 class="name">${description}</h2>
    <h3 class="amount">$${amount}</h3>
  `;
  incomeList.appendChild(card);
}

function addExpenseCard(description, amount) {
  const card = document.createElement("div");
  card.className = "expensecard";
  card.innerHTML = `
    <h2 class="name">${description}</h2>
    <h3 class="amount">$${amount}</h3>
  `;
  expenseList.appendChild(card);
}

// TOTALS UPDATE
function updateTotals() {
  const incomeTotal = budget.getIncomeTotal();
  const expenseTotal = budget.getExpenseTotal();
  const remaining = budget.calculateTotal();

  totalBudgetDiv.innerHTML = `
    <h1>Total Income: $${incomeTotal}</h1>
    <h1>Total Expenses: $${expenseTotal}</h1>
    <h1>Remaining Budget: $${remaining}</h1>
  `;
}

function clearInputs() {
  nameInput.value = "";
  amountInput.value = "";
}
