import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar bg-info'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          WikiCountries
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
