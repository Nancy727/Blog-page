import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { userAPI } from '../services/api'

function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Email and password are required.')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await userAPI.login(formData.email, formData.password)
      localStorage.setItem('token', response.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '400px', margin: '3rem auto' }}>
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Login</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-danger" style={{ marginBottom: '1rem' }}>{error}</p>}

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button type="submit" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Don't have an account? <Link to="/register" style={{ color: '#3498db', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
