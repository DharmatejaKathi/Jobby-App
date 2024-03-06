import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <ul className="header-ul">
        <li className="header-list">
          <Link to="/" className="jobs-link">
            <img
              className="website-header-img"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </li>
        <li className="header-list">
          <Link to="/" className="jobs-link">
            <h1>Home</h1>
          </Link>
          <Link to="/jobs" className="jobs-link">
            <h1>Jobs</h1>
          </Link>
        </li>
        <li className="header-list">
          <Link to="/login" className="jobs-link">
            <button
              className="logout-button"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
