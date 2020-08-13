import React, { Children } from 'react'

export const Button = props => (

  <button 
    className={props.class}
    onClick={props.onClick}
  >
  {Children}
  </button>
)