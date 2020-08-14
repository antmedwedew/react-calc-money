import React from 'react'
import './History.css'
import HistoryItem from '../HistoryItem/HistoryItem'

const History = ({ transactions }) => {

  return (
    <section className="history">
      <h3>История расходов</h3>
      <ul className="history__list">
        {transactions.map(item => <HistoryItem key={item.id} transaction={item} />)}
      </ul>
    </section>
  )
}

export default History