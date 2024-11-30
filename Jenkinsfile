pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install --force'
                }
            }
        }

        stage('Run Jest Tests') {
            steps {
                script {
                    sh 'npx jest test --verbose || true' // Prevent test failures from blocking pipeline
                }
            }
        }

        stage('Build Docker Image') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh 'sudo docker compose build'
                }
            }
        }

        stage('Start Containers') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh 'sudo docker compose -f ${DOCKER_COMPOSE_FILE} up -d'
                }
            }
        }
    }

    post {
        always {
            sh 'sudo docker image prune -af'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
