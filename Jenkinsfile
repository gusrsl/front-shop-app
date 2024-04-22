pipeline {
    agent any
    
    stages {
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
