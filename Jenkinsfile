pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE_TAG = "${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = "localhost:5000"
        PROJECT_NAME = "docker-fullstack-app"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                script {
                    echo "Building backend Docker image..."
                    sh "docker build -t ${PROJECT_NAME}-backend:${DOCKER_IMAGE_TAG} ./backend"
                    sh "docker tag ${PROJECT_NAME}-backend:${DOCKER_IMAGE_TAG} ${PROJECT_NAME}-backend:latest"
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                script {
                    echo "Building frontend Docker image..."
                    sh "docker build -t ${PROJECT_NAME}-frontend:${DOCKER_IMAGE_TAG} ./frontend"
                    sh "docker tag ${PROJECT_NAME}-frontend:${DOCKER_IMAGE_TAG} ${PROJECT_NAME}-frontend:latest"
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    echo "Running backend tests..."
                    sh "docker run --rm ${PROJECT_NAME}-backend:${DOCKER_IMAGE_TAG} npm test || true"
                    
                    echo "Running frontend tests..."
                    sh "docker run --rm ${PROJECT_NAME}-frontend:${DOCKER_IMAGE_TAG} npm test || true"
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                script {
                    echo "Running security scan on Docker images..."
                    sh "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image ${PROJECT_NAME}-backend:${DOCKER_IMAGE_TAG} || true"
                    sh "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image ${PROJECT_NAME}-frontend:${DOCKER_IMAGE_TAG} || true"
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    echo "Deploying to staging environment..."
                    sh "docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d"
                    
                    // Wait for services to be healthy
                    sh "sleep 30"
                    
                    // Health checks
                    sh "curl -f http://localhost:3000/health || exit 1"
                    sh "curl -f http://localhost:8000/api/health || exit 1"
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "Deploying to production environment..."
                    
                    // Stop existing containers
                    sh "docker-compose down || true"
                    
                    // Start new containers
                    sh "docker-compose up -d"
                    
                    // Wait for services to be healthy
                    sh "sleep 30"
                    
                    // Health checks
                    sh "curl -f http://localhost:3000/health || exit 1"
                    sh "curl -f http://localhost:8000/api/health || exit 1"
                    
                    // Rollback on failure
                    sh "docker-compose ps | grep -q 'Up' || (docker-compose down && exit 1)"
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                script {
                    echo "Cleaning up old images..."
                    sh "docker image prune -f"
                    sh "docker container prune -f"
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline completed with status: ${currentBuild.result}"
        }
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed! Check logs for details."
        }
        cleanup {
            // Clean workspace
            cleanWs()
        }
    }
}
