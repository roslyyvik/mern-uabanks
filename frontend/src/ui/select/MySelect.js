import React from 'react'
import classes from './MySelect.module.css'

function MySelect ({ options, defaultValue, value, onChange }) {

return (
  <select
    value={value}
    onChange={event => onChange(event.target.value)}
    className={classes.mySelect}
  >
  <option disabled value=''>{defaultValue}</option>
  {options.map(option =>
    <option className='option-item' key={option.value} value={option.value}>
      {option.name}
    </option>
  )}
  </select>
)

}

export default MySelect