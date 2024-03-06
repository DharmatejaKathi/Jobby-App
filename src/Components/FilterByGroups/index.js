import './index.css'

const FilterByGroups = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    updateActiveCheckId,
    updateActiveRadioId,
    activeCheckId,
    activeRadioId,
  } = props

  const onChangeCheck = event => {
    updateActiveCheckId(event.target.value)
  }
  const onChangeRadio = event => {
    updateActiveRadioId(event.target.value)
  }

  return (
    <div>
      {employmentTypesList.map(each => (
        <li
          className="checkbox-list"
          key={each.employmentTypeId}
          value={activeCheckId}
        >
          <input
            type="checkBox"
            id={each.employmentTypeId}
            className="check-box"
            onChange={onChangeCheck}
          />
          <label htmlFor={each.employmentTypeId} className="label-item">
            {each.label}
          </label>
        </li>
      ))}
      <hr />
      {salaryRangesList.map(each => (
        <li
          className="checkbox-list"
          key={each.salaryRangeId}
          value={activeRadioId}
        >
          <input
            type="radio"
            name="option"
            id={each.salaryRangeId}
            className="check-box"
            onChange={onChangeRadio}
          />
          <label htmlFor={each.salaryRangeId} className="label-item">
            {each.label}
          </label>
        </li>
      ))}
    </div>
  )
}

export default FilterByGroups
