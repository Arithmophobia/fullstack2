import React from 'react'

const Country = ({ country, clickHandler, selected }) => {
  const name = !selected ? <div onClick={clickHandler}>{country.name}</div>
    : <h1 onClick={clickHandler}>{country.name}</h1>
  const info = !selected ? name :
    <div>
      <div> {name}</div>
      <div> capital: {country.capital}</div>
      <div> population: {country.population}</div>
      <div> <img src={country.flag} alt="flag of the country" width="300vw" height="160vh"></img></div>
    </div>;
  return (
    <div>
      {info}
    </div>
  )
}

export default Country