import React, { Component } from 'react'
import './App.css'
import Total from './Components/Total/Total'
import History from './Components/History/History'
import Operation from './Components/Operation/Operation'

class App extends Component {

  state = {
    transactions: [],
    description: '',
    amount: '',
    globalTotal: 0,
    totalExpenses: 0,
    totalIncome: 0
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
      amount: ''
    })
    this.addBalance(add)
  }

  addAmount = e => {
    this.setState({
      amount: e.target.value
    })
  }

  addDescription = e => {
    this.setState({
      description: e.target.value
    })
  }

  addTotal = () => {
    const globalTotal = this.state.totalIncome - this.state.totalExpenses
    this.setState({
      globalTotal
    })
    console.log('work')
  }

  addBalance = (add) => {
    if (add) {
      this.setState({
        totalIncome: +this.state.amount + this.state.totalIncome
      }, this.addTotal)
      
    }
    else {
      this.setState({
        totalExpenses: +this.state.amount + this.state.totalExpenses
      }, this.addTotal)
    }
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
              globalTotal={this.state.globalTotal}
              totalExpenses={this.state.totalExpenses}
              totalIncome={this.state.totalIncome}
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
