
class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let sum = 0;

    for (let transaction of this.transactions) {
      sum += transaction.value;
    }

    return sum;
    
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  
  commit() {
    if (this.isAllowed) {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
    } else {
      console.log(`transaction rejected`);
    }
  }

  
  
}

class Withdrawal extends Transaction {
  
  get value() {
    return -this.amount;
  }
  
  get isAllowed() {
    if (this.account.balance < this.amount) {
      return false;
    }
    return true;
  }
  
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  get isAllowed() {
    if (this.amount > 1000) {
      return false;
    }
    return true;
  }

}


const myAccount = new Account("snow-patrol");



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
let t0 = new Deposit(853.24, myAccount);
t0.commit();
console.log('Open bank account', t0);

let t1 = new Withdrawal(10, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

let t2 = new Withdrawal(200, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

let t3 = new Deposit(900.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log(`account balance is : ${myAccount.balance}`);
