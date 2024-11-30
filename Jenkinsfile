pipeline {
    agent any  // This runs on any available agent
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Run Jest Tests') {
            steps {
                script {
                    // Run Jest tests using npx
                    sh 'npx jest test'
                }
            }
        }
        
        stage('Build Docker Image') {
            when {
                // Only build if the tests pass (previous stage was successful)
                branch 'main'  // Only for the main branch, modify as needed
            }
            steps {
                script {
                    // Build Docker images using Docker Compose
                    sh 'sudo docker compose -f ${DOCKER_COMPOSE_FILE} build'
                }
            }
        }
        
        stage('Start Containers') {
            when {
                // Only start containers if the tests pass and the build succeeds
                branch 'main'  // Only for the main branch, modify as needed
            }
            steps {
                script {
                    // Start the Docker containers in detached mode
                    sh 'sudo docker compose -f ${DOCKER_COMPOSE_FILE} up -d'
                }
            }
        }
    }

    post {
        always {
            // Clean up containers after the pipeline runs (optional)
            sh 'sudo docker image prune -a'
        }
        success {
            // Actions on successful completion (optional)
            echo 'Pipeline completed successfully!'
        }
        failure {
            // Actions on failure (optional)
            echo 'Pipeline failed.'
        }
    }
}
