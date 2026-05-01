import { Link } from 'react-router-dom'

function BlogCard({ blog }) {
  const truncateContent = (content, maxLength = 150) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content
  }

  return (
    <div className="card">
      <h3>{blog.title}</h3>
      <p className="text-muted">by {blog.author?.name || 'Unknown'}</p>
      <p className="text-muted">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <p>{truncateContent(blog.content)}</p>
      <div style={{ marginTop: '1rem' }}>
        {blog.tags && blog.tags.length > 0 && (
          <div>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: 'inline-block',
                  background: '#ecf0f1',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  marginRight: '0.5rem',
                  fontSize: '0.85rem',
                  marginBottom: '0.5rem',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <Link to={`/blogs/${blog._id}`}>
        <button style={{ marginTop: '1rem', width: '100%' }}>
          Read More
        </button>
      </Link>
    </div>
  )
}

export default BlogCard
