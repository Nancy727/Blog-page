import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="container">
      <div className="hero text-center">
        <div className="hero-copy">
          <p className="page-copy mb-1">A calmer place to read, write, and share</p>
          <h1>Welcome to Blog Platform</h1>
          <p>
            Share your thoughts and read amazing stories from the community
          </p>
          <div className="hero-actions">
            <Link to="/blogs">
              <button className="ghost-button">Explore Blogs</button>
            </Link>
            <Link to="/create">
              <button>Create Your Blog</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card text-center">
          <h3>📖 Read</h3>
          <p>Discover amazing blog posts from creators around the world.</p>
        </div>
        <div className="feature-card text-center">
          <h3>✍️ Write</h3>
          <p>Share your ideas and stories with our community.</p>
        </div>
        <div className="feature-card text-center">
          <h3>🌟 Connect</h3>
          <p>Build your audience and engage with readers.</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
