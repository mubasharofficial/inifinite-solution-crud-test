import React from 'react'

const SelectOption = ({id,name}) => {
  return (
     <option value={id}>{name}</option>
  )
}

export default SelectOption