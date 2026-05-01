import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { blogAPI } from '../services/api'

function BlogDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const response = await blogAPI.getById(id)
      setBlog(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load blog. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return
    try {
      await blogAPI.delete(id)
      navigate('/blogs')
    } catch (err) {
      setError('Failed to delete blog. Please try again.')
      console.error(err)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="container"><p className="text-danger">{error}</p></div>
  if (!blog) return <div className="container"><p>Blog not found.</p></div>

  return (
    <div className="container">
      <div className="card">
        <h1>{blog.title}</h1>
        <p className="text-muted">
          by {blog.author?.name || 'Unknown'} | {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        {blog.tags && blog.tags.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: 'inline-block',
                  background: '#ecf0f1',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  marginRight: '0.5rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.85rem',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div style={{ 
          lineHeight: '1.8',
          fontSize: '1.05rem',
          marginBottom: '2rem',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'
        }}>
          {blog.content}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/blogs')}>← Back to Blogs</button>
          <button onClick={handleDelete} style={{ background: '#e74c3c' }}>
            Delete Blog
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailPage
