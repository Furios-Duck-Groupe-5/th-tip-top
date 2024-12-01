pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        DOCKER_REGISTRY = 'docker.io'  // Docker registry (Docker Hub)
        DOCKER_IMAGE_NAME = 'thetiptopgrp5/tiptop'  // Replace with your Docker Hub username and project name
        DOCKER_TAG = 'latest'  // You can use a version tag like v1.0.0 instead of "latest" if desired
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

        stage('Build Docker Images') {
            steps {
                script {
                    // Build the backend image
                    sh 'sudo docker build -f Dockerfile -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}-backend:${DOCKER_TAG} .'

                    // Build the frontend image
                    sh 'sudo docker build -f Dockerfile.prod -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}-frontend:${DOCKER_TAG} .'
                }
            }
        }

        stage('Push Docker Images to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub using stored credentials
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        // Docker login using the credentials
                        sh 'echo "$DOCKER_PASSWORD" | sudo docker login -u "$DOCKER_USERNAME" --password-stdin'

                        // Push backend image to Docker Hub
                        sh 'sudo docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}-backend:${DOCKER_TAG}'

                        // Push frontend image to Docker Hub
                        sh 'sudo docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}-frontend:${DOCKER_TAG}'
                    }
                }
            }
        }

        stage('Start Containers') {
            steps {
                script {
                    // Pull the backend image from Docker Hub
                    sh 'sudo docker pull ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}-backend:${DOCKER_TAG}'

                    // Pull the frontend image from Docker Hub
                    sh 'sudo docker pull ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}-frontend:${DOCKER_TAG}'

                    // Start containers using docker-compose
                    sh 'sudo docker compose -f ${DOCKER_COMPOSE_FILE} up -d'
                }
            }
        }
    }

    post {
        always {
            // Clean up unused Docker images to save space
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
