pipeline {
    agent any
    
    tools {
        // These names must match your Jenkins Global Tool Configuration
        maven 'Maven 3'
        jdk 'Java 17'
        nodejs 'NodeJS 18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Jenkins checks out the repository by default, but this explicitly states the stage
                echo "Checking out Source Code..."
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                echo "Building Spring Boot Backend..."
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo "Building React/Vite Frontend..."
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                echo "Archiving built artifacts..."
                archiveArtifacts artifacts: 'backend/target/*.jar, frontend/dist/**/*, appspec.yml, scripts/**/*', fingerprint: true
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                // Here you would integrate with the AWS CodeDeploy plugin
                // Or run SSH commands to pull and restart the server manually
                echo "Triggering AWS CodeDeploy deployment..."
                // step([$class: 'AWSCodepipelinePublisher', ...]) 
                // Note: Configure actual plugin logic based on your Jenkins setup
            }
        }
    }
    
    post {
        always {
            echo "CI/CD Pipeline execution finished."
        }
        success {
            echo "Pipeline succeeded! Ready for deployment."
        }
        failure {
            echo "Pipeline failed. Check the logs."
        }
    }
}
