import { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { blogAPI } from '../services/api'

function BlogListPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await blogAPI.getAll()
      setBlogs(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load blogs. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="container"><p className="text-danger">{error}</p></div>

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem' }}>All Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-center">No blogs found. Be the first to create one!</p>
      ) : (
        <div className="grid">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogListPage
