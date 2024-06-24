pipeline {
    agent any
    stages {
        stage('Build Frontend') {
            steps {
                script {
                    dir('/var/lib/jenkins/workspace/deploy-front-pipeline') {
                        // Instalar dependencias
                        sh 'npm install'
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
                    sh 'sudo rm -r /home/admin/web/gustavo-rodriguez.tech/public_html'
                    // Crear nuevo directorio
                    sh 'sudo mkdir /home/admin/web/gustavo-rodriguez.tech/public_html'
                    // Copiar archivos construidos al nuevo directorio
                    sh 'sudo cp /var/lib/jenkins/workspace/deploy-front-pipeline/www/* /home/admin/web/gustavo-rodriguez.tech/public_html -R'
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
