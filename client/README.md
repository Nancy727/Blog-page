# Blog Platform Frontend

A modern React frontend for the Blog Platform, built with Vite, React Router, and Axios.

## Features

- 📱 Responsive design
- 🔐 User authentication (login & register)
- 📝 Create, read, update, and delete blogs
- 🏷️ Blog tagging system
- 🎨 Modern UI with clean styling
- ⚡ Fast development with Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
pnpm build
```

### Environment Configuration

The frontend is configured to connect to the backend at `http://localhost:5000/api`. You can modify this in `vite.config.js` or `src/services/api.js`.

## Project Structure

```
src/
├── components/        # Reusable React components
├── pages/            # Page components for routing
├── services/         # API service and axios instance
├── App.jsx           # Main app component with routing
├── main.jsx          # React DOM entry point
└── index.css         # Global styles

public/
└── index.html        # HTML template

vite.config.js        # Vite configuration
package.json          # Project dependencies
```

## Technologies Used

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Build tool and dev server
- **CSS3** - Styling

## Available Routes

- `/` - Home page
- `/blogs` - Blog listing page
- `/blogs/:id` - Blog detail page
- `/create` - Create new blog (requires login)
- `/login` - User login
- `/register` - User registration

## API Integration

The frontend communicates with the backend API through the `src/services/api.js` file. This includes:

- **Blog APIs**: Get all blogs, get by ID, create, update, delete
- **User APIs**: Login, register, get profile, update profile

Authentication tokens are automatically added to all requests and stored in localStorage.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
