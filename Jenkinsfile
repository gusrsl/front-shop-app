pipeline {
    agent any
    environment {
        NODE_VERSION = '20.12.1'  // Versión de Node.js que necesitas
    }
    stages {
        stage('Initialize') {
            steps {
                script {
                    // Preparar el entorno
                    sh 'nvm install $NODE_VERSION'
                    sh 'nvm use $NODE_VERSION'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    dir('/var/lib/jenkins/workspace/primerjenkins') {
                        // Instalar dependencias
                        sh 'npm i'
                        // Construir el frontend
                        sh 'ionic cap build android --prod'
                    }
                }
            }
        }
        stage('Deploy Frontend') {
            steps {
                script {
                    // Remover el directorio existente
                    sh 'rm -r /home/admin/web/gustavo-rodriguez.tech/public_html'
                    // Crear nuevo directorio
                    sh 'mkdir /home/admin/web/gustavo-rodriguez.tech/public_html'
                    // Copiar archivos construidos al nuevo directorio
                    sh 'cp /var/lib/jenkins/workspace/primerjenkins/www/* /home/admin/web/gustavo-rodriguez.tech/public_html -R'
                }
            }
        }
    }
    post {
        success {
            echo 'Deploy completed successfully!'
        }
        failure {
            echo 'Deploy failed!'
        }
    }
}
