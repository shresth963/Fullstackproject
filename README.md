# 🐳 Docker Full-Stack Application

A complete full-stack application demonstrating Docker containerization and orchestration with Docker Compose. This project includes a React frontend, Node.js/Express backend, PostgreSQL database, and pgAdmin for database management.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   PostgreSQL    │
│   (React)       │    │  (Node.js)      │    │   Database      │
│   Port: 3000    │◄──►│   Port: 8000    │◄──►│   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Docker Compose Network                      │
│                    (fullstack_network)                        │
└─────────────────────────────────────────────────────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Nginx       │    │    pgAdmin      │    │   Volumes      │
│  Reverse Proxy  │    │   Port: 5050    │    │  (Persistent)  │
│   Port: 80      │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Features

- **Frontend**: Modern React application with beautiful UI
- **Backend**: Node.js/Express API with PostgreSQL integration
- **Database**: PostgreSQL with persistent data storage
- **pgAdmin**: Web-based database management interface
- **Nginx**: Reverse proxy with load balancing and security
- **Health Checks**: Built-in health monitoring for all services
- **Multi-stage Builds**: Optimized Docker images
- **CI/CD**: Jenkins pipeline for automated deployment

## 📋 Prerequisites

- Docker Desktop (v20.10+)
- Docker Compose (v2.0+)
- Git

## 🛠️ Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd docker-fullstack-app
```

### 2. Configure Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your preferred values
nano .env
```

### 3. Start the Application
```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **pgAdmin**: http://localhost:5050
- **Nginx Proxy**: http://localhost:80

## 🔧 Service Details

### Frontend (React)
- **Port**: 3000
- **Technology**: React 18, CSS3, HTML5
- **Features**: 
  - Fetch messages from backend
  - Submit new messages
  - Responsive design
  - Real-time updates

### Backend (Node.js/Express)
- **Port**: 8000
- **Technology**: Node.js, Express, PostgreSQL
- **Endpoints**:
  - `GET /api/health` - Health check
  - `GET /api/message` - Get latest message
  - `POST /api/message` - Create new message

### Database (PostgreSQL)
- **Port**: 5432
- **Version**: 15-alpine
- **Features**: Persistent storage, automatic initialization
- **Tables**: `messages` (id, message, created_at)

### pgAdmin
- **Port**: 5050
- **Default Credentials**: admin@example.com / admin123
- **Features**: Database management, query execution, monitoring

### Nginx Reverse Proxy
- **Port**: 80
- **Features**: 
  - Route `/api/*` to backend
  - Route all other requests to frontend
  - Rate limiting
  - Security headers
  - Gzip compression

## 📊 Health Checks

All services include health checks that monitor:
- Service availability
- Response times
- Resource usage

View health status:
```bash
docker-compose ps
```

## 🗄️ Database Management

### Connect via pgAdmin
1. Open http://localhost:5050
2. Login with credentials from `.env`
3. Add new server:
   - Host: `db`
   - Port: `5432`
   - Database: `fullstack_app`
   - Username: `postgres`
   - Password: From `.env`

### Direct Database Access
```bash
# Connect to PostgreSQL container
docker exec -it fullstack_db psql -U postgres -d fullstack_app

# View messages
SELECT * FROM messages ORDER BY created_at DESC;
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   
   # Kill the process or change ports in docker-compose.yml
   ```

2. **Database Connection Issues**
   ```bash
   # Check database logs
   docker-compose logs db
   
   # Restart database service
   docker-compose restart db
   ```

3. **Build Failures**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

### Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

## 🧪 Testing

### Manual Testing
1. **Frontend**: Navigate to http://localhost:3000
2. **Backend**: Test API endpoints with curl or Postman
3. **Database**: Use pgAdmin to verify data persistence

### Automated Testing
```bash
# Run backend tests
docker-compose exec backend npm test

# Run frontend tests
docker-compose exec frontend npm test
```

## 🚀 Deployment

### Production Deployment
```bash
# Set production environment
export NODE_ENV=production

# Start services
docker-compose -f docker-compose.yml up -d
```

### Using Jenkins Pipeline
1. Install Jenkins with Docker plugin
2. Create new pipeline job
3. Point to the `Jenkinsfile` in this repository
4. Configure webhook for automatic builds

## 📁 Project Structure

```
docker-fullstack-app/
├── backend/                 # Node.js/Express backend
│   ├── Dockerfile          # Multi-stage backend build
│   ├── package.json        # Backend dependencies
│   └── server.js           # Express server
├── frontend/               # React frontend
│   ├── Dockerfile          # Multi-stage frontend build
│   ├── package.json        # Frontend dependencies
│   ├── public/             # Static assets
│   ├── src/                # React source code
│   └── nginx.conf          # Nginx configuration
├── nginx/                  # Nginx reverse proxy
│   ├── nginx.conf          # Main nginx config
│   └── conf.d/             # Service configurations
├── docker-compose.yml      # Service orchestration
├── init-db.sql             # Database initialization
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
├── Jenkinsfile             # CI/CD pipeline
└── README.md               # This file
```

## 🔐 Security Features

- Non-root user containers
- Security headers in Nginx
- Rate limiting
- Input validation
- SQL injection prevention
- CORS configuration

## 📈 Performance Features

- Multi-stage Docker builds
- Gzip compression
- Static asset caching
- Connection pooling
- Health monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Docker team for containerization technology
- React team for the frontend framework
- Node.js community for the backend runtime
- PostgreSQL team for the database system

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review Docker and service logs
3. Open an issue on GitHub
4. Check Docker documentation

---

**Happy Containerizing! 🐳**
