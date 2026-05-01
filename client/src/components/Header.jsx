import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <header>
      <nav>
        <div>
          <Link to="/" className="site-brand">
            <span className="site-brand-mark">B</span>
            <span>Blog Platform</span>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/blogs" className="nav-link">Blogs</Link>
          {isLoggedIn && <Link to="/create" className="nav-link">Create Blog</Link>}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="button">
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
