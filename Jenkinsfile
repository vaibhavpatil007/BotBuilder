pipeline {
    agent any

    triggers {
        pollSCM('H/2 * * * *')
    }

    stages {
        
        stage('Check Python') {
            steps {
                bat 'python --version'
            }
        }

        stage('Clone Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/vaibhavpatil007/BotBuilder.git'
            }
        }

        stage('Backend Setup') {
            steps {
                dir('BackEnd') {
                    bat 'python -m venv venv'
                    bat 'venv\\Scripts\\pip install -r requirements.txt'
                }
            }
        }

        stage('Run Django Tests') {
            steps {
                dir('BackEnd') {
                    bat 'venv\\Scripts\\python manage.py test'
                }
            }
        }

        stage('Frontend Setup') {
            steps {
                dir('FrontEnd') {
                    bat 'npm install'
                }
            }
        }

        stage('Build React') {
            steps {
                dir('FrontEnd') {
                    bat 'npm run build'
                }
            }
        }

    }

    post {

        success {
            echo 'Pipeline Success'
        }

        failure {
            echo 'Pipeline Failed'
        }

    }
}