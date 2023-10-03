import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  const [countries, setCountries] = useState([])

  const fetchAllCountries = async () => {
    try {
      const response = await fetch('https://ih-countries-api.herokuapp.com/countries')
      console.log(response)
      if (response.ok) {
        const parsed = await response.json()
        setCountries(parsed)
        // This console is gonna access the state when it was mounted or before we try to update it
        console.log(countries)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllCountries()
  }, [])

  useEffect(() => {
    console.log(countries)
  }, [countries])

  return (
    <>
      <h1>WikiCountries: Your Guide to the World</h1>
      <ul className='list-group'>
        {countries.map(country => (
          <li className='list-group-item' key={country._id}>
            <Link
              to={`/${country.alpha3Code.toLowerCase()}`}
              className='link-secondary link-underline link-underline-opacity-0'
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                style={{ height: '20px', marginRight: '1rem' }}
              />
              <span>{country.name.official}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default HomePage
