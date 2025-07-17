pipeline {
    agent any

    environment {
        DOCKER_IMAGE_FASTAPI = "fastapi-app"
        DOCKER_IMAGE_PGADMIN = "dpage/pgadmin4"
        DOCKER_COMPOSE_FILE = "docker-compose.yml"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/essayeswajih/APICULTURE_FULL_PROJECT.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose -f $DOCKER_COMPOSE_FILE build'
            }
        }

        stage('Deploy Containers') {
            steps {
                sh 'docker-compose -f $DOCKER_COMPOSE_FILE up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker-compose -f $DOCKER_COMPOSE_FILE ps'
            }
        }

        stage('Test FastAPI App') {
            steps {
                sh 'curl http://localhost:8000/'  // Adjust this to test a specific API endpoint
            }
        }

        stage('Cleanup') {
            steps {
                // Uncomment to stop containers after tests
                // sh 'docker-compose -f $DOCKER_COMPOSE_FILE down'
            }
        }
    }

    post {
        success {
            echo "Docker build and deployment successful"
        }

        failure {
            echo "Docker build or deployment failed"
        }
    }
}
