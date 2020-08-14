import React, { Component } from 'react'
import './App.css'
import Total from './Components/Total/Total'
import History from './Components/History/History'
import Operation from './Components/Operation/Operation'

class App extends Component {

  state = {
    transactions: JSON.parse(localStorage.getItem('calcMoney')) || [],
    description: '',
    amount: '',
    totalBalance: 0,
    resultExpenses: 0,
    resultIncome: 0
  }

  componentWillMount() {
    this.getTotalBalance();
  }

  addTransaction = add =>  {
    const transactions = [...this.state.transactions]

    const transaction = {
      id: `cmr${(+new Date()).toString(16)}`,
      description: this.state.description,
      amount: this.state.amount,
      add
    }

    if (transaction.description === "" || transaction.amount === "") {
      return
    }

    transactions.push(transaction)
    
    this.setState({
      transactions,
      description: '',
      amount: '',
    }, () => {
      this.getTotalBalance();
      this.addLocalStorage();
    });
  }

  addAmount = e => {
    this.setState({
      amount: parseFloat(e.target.value)
    })
  }

  addDescription = e => {
    this.setState({
      description: e.target.value
    })
  }

  getIncome = () => this.state.transactions
      .filter(item => item.add)
      .reduce((acc, item) => item.amount + acc, 0)
  

  getExpenses = () => this.state.transactions
      .filter(item => !item.add)
      .reduce((acc, item) => item.amount + acc, 0)
  

  getTotalBalance = () => {
    const resultIncome = this.getIncome();
    const resultExpenses = this.getExpenses();

    const totalBalance = resultIncome - resultExpenses;

    this.setState({
      totalBalance,
      resultExpenses,
      resultIncome
    })
  }

  addLocalStorage() {
    localStorage.setItem('calcMoney', JSON.stringify(this.state.transactions))
  }
  
  render() {
    return (
      <React.Fragment>
        <header>
          <h1>Кошелек</h1>
          <h2>Калькулятор расходов</h2>
        </header>
  
        <main>
          <div className="container">
  
            <Total 
              totalBalance={this.state.totalBalance}
              resultExpenses={this.state.resultExpenses}
              resultIncome={this.state.resultIncome}
            />
  
            <History 
              transactions={this.state.transactions}
            />
  
            <Operation 
              addTransaction={this.addTransaction}
              addAmount={this.addAmount}
              addDescription={this.addDescription}
              description={this.state.description}
              amount={this.state.amount}
            />
  
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default App
