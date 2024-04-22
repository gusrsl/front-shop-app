pipeline {
    agent any
    
    stages {
        stage('Clonar repositorio') {
            steps {
                git 'https://github.com/gusrsl/front-shop-app.git'
            }
        }
        
        stage('Instalar dependencias') {
            steps {
                sh 'npm install -g @angular/cli @ionic/cli'
                sh 'npm install'
            }
        }
        
        stage('Construir frontend') {
            steps {
                sh 'ionic cap build --prod'
            }
        }
    }
}
