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
  }

  addTransaction = add =>  {
    const transactions = [...this.state.transactions]

    const transaction = {
      id: `cmr${(+new Date()).toString(16)}`,
      description: this.state.description,
      amount: this.state.amount,
      add
    }

    if(transaction.description === "" && transaction.amount === "") {
      return
    }

    transactions.push(transaction)
    
    this.setState({
      transactions,
      description: '',
      amount: ''
    })
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

  // addTotal = () => {
  //   const total
  // }
  
  render() {
    return (
      <React.Fragment>
        <header>
          <h1>Кошелек</h1>
          <h2>Калькулятор расходов</h2>
        </header>
  
        <main>
          <div className="container">
  
            <Total />
  
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
