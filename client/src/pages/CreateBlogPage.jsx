import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { blogAPI } from '../services/api'

function CreateBlogPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
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
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required.')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      await blogAPI.create({
        title: formData.title,
        content: formData.content,
        tags,
      })

      navigate('/blogs')
    } catch (err) {
      setError('Failed to create blog. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem' }}>Create New Blog</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-danger" style={{ marginBottom: '1rem' }}>{error}</p>}
        
        <div>
          <label htmlFor="title">Blog Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="content">Blog Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., react, javascript, web-development"
            disabled={loading}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Blog'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/blogs')}
            style={{ background: '#7f8c8d' }}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlogPage
