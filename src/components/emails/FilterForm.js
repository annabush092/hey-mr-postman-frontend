import React from 'react'

const FilterForm = (props) => {
/* props = {
  handleSelect: handleSelect from EmailContainer
  emailFilter: emailFilter from EmailContainer
}
*/
  return(
    <form>
      <select onChange={props.handleSelect} selected={props.emailFilter}>
        <option value="received_emails">Received</option>
        <option value="sent_emails">Sent</option>
      </select>
    </form>
  )
}

export default FilterForm
