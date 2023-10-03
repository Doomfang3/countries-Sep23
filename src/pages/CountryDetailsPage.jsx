import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function CountryDetails() {
  const { alpha3code } = useParams()

  const [country, setCountry] = useState()

  const fetchCountry = async () => {
    try {
      const response = await fetch(
        `https://ih-countries-api.herokuapp.com/countries/${alpha3code.toUpperCase()}`
      )
      if (response.ok) {
        const parsed = await response.json()
        setCountry(parsed)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCountry()
  }, [alpha3code])

  useEffect(() => {
    console.log(country)
  }, [country])

  return country ? (
    <>
      <h1>Country Details</h1>
      <img
        src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
        alt={`flag of ${country.name.official}`}
      />
      <h2>{country.name.official}</h2>
      <div className='row'>
        <p className='col'>Capital</p>
        <p className='col'>{country.capital[0]}</p>
      </div>
      <div className='row'>
        <p className='col'>Area</p>
        <p className='col'>{country.area} km²</p>
      </div>
      <div className='row'>
        <p className='col'>Borders</p>
        <ul className='col'>
          {country.borders.map(border => (
            <li key={border}>
              <Link to={`/${border.toLowerCase()}`}>{border}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  )
}

export default CountryDetails
