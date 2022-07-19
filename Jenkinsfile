pipeline {
  agent any
   environment{
     
        HOST= "10.1.0.14"
        PORT= "8081"
        
        IMAGE_NAME= "nestjs-boilerplate-app"
        REGISTRY_CREDENTIAL= 'docker-registery-credentials'
        DOCKER_IMAGE=''
        HOME="." 
    }
  tools {nodejs "node"}
  //=====================================================================Build stage======================================================================================================
  stages {
    
    
    stage('build') {
      steps {
        
        mattermostSend channel: '#staging', 
                          message: '------------------------------'+JOB_NAME+' pipeline '+BUILD_NUMBER+' started------------------------------'
        mattermostSend channel: '#staging', 
                          message: JOB_NAME+' started to build with build number: '+BUILD_NUMBER
        echo('building')
        sh 'npm install --legacy-peer-deps'
      }
      post {
        success {
            mattermostSend channel: '#staging',
                          color:'good',
                          message: JOB_NAME+' is builded'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            mattermostSend channel: '#staging',
                          color:'RED',
                          message: JOB_NAME+' failed'
        }
        changed {
            echo 'Things were different before...'
        }
    }
      
    }
    //=====================================================================Test stage==========================================================================================================
    stage('test') {
            
      steps {
        mattermostSend channel: '#staging', 
                          message: JOB_NAME+' started to test with build number: '+BUILD_NUMBER
        echo('testing')
        sh 'npm test'
      }
      post {
        success {
            mattermostSend channel: '#staging', 
            color:'good',
                          message: JOB_NAME+' test passed :)'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            mattermostSend channel: '#staging',
                          color:'RED',
                          message: JOB_NAME+' failed'
        }
        changed {
            echo 'Things were different before...'
        }
    }
    }
    //=====================================================================Develop deploy======================================================================================================
    stage('develop deploy') {
            when{
          expression{
            BRANCH_NAME == "develop"
          }
        }
      steps {
        mattermostSend channel: '#staging', 
                          message: JOB_NAME+' started to develop deploy with build number: '+BUILD_NUMBER
        script{
        DOCKER_IMAGE= docker.build "${env.HOST}:${env.PORT}/comfortech/${env.IMAGE_NAME}_develop:v${BUILD_NUMBER}"
        }
        sh "docker login -u=comfortech -p=PoI456ZxC ${env.HOST}:${env.PORT}"
        sh "docker push ${env.HOST}:${env.PORT}/comfortech/${env.IMAGE_NAME}_develop:v${BUILD_NUMBER}"
      }
      post {
        success {
            mattermostSend channel: '#staging', 
            color:'good',
                          message: JOB_NAME+' develop deployed successfullt :)'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            mattermostSend channel: '#staging',
                          color:'RED',
                          message: JOB_NAME+' develop deploy failed'
        }
        changed {
            echo 'Things were different before...'
        }
    }
    }
    //=====================================================================Deploy stage======================================================================================================
    stage('prod deploy') {
      when{
          expression{
            BRANCH_NAME == "main"
          }
        }
        
      steps {
         mattermostSend channel: '#staging', 
                          message: JOB_NAME+' started to with deploy number: '+BUILD_NUMBER
        echo('deploying')
        echo('building docker image and pushing to the registry')
        script{
        DOCKER_IMAGE= docker.build "${env.HOST}:${env.PORT}/comfortech/${env.IMAGE_NAME}:v${BUILD_NUMBER}"
        }
        sh "docker login -u=comfortech -p=PoI456ZxC ${env.HOST}:${env.PORT}"
        sh "docker push ${env.HOST}:${env.PORT}/comfortech/${env.IMAGE_NAME}:v${BUILD_NUMBER}"
      }
      post {
        always{
         
                sh "docker image rm -f ${env.HOST}:${env.PORT}/comfortech/${env.IMAGE_NAME}:v${BUILD_NUMBER}"
        }
        success{
               mattermostSend channel: '#staging', 
               color:'good',
                          message: JOB_NAME+' deployed successfully :)'
              }

        failure{
                mattermostSend channel: '#staging',
                          color:'RED',
                          message: JOB_NAME+' failed'
              }
        }
    
    }
    //=====================================================================Docker cleanup stage======================================================================================================
    stage('Cleanup docker') {
      steps {
        mattermostSend channel: '#staging', 
                          message: JOB_NAME+' started to cleanup the docker with build number: '+BUILD_NUMBER
      sh 'docker system prune --force --all --volumes'
    }
    post {
        success {
            mattermostSend channel: '#staging', 
            color:'good',
                          message: JOB_NAME+' docker cleaned up successfully :)'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            mattermostSend channel: '#staging',
                          color:'RED',
                          message: JOB_NAME+' failed'
        }
        changed {
            echo 'Things were different before...'
        }
    }
    }
    //=====================================================================Workspace cleanup stage======================================================================================================
    stage('cleaning up')
    {
      steps{
        mattermostSend channel: '#staging', 
                          message: JOB_NAME+' started to cleanup the workspace with build number: '+BUILD_NUMBER
        cleanWs()
      }
      post {
        success {
            mattermostSend channel: '#staging', 
                          message: JOB_NAME+' workspace cleaned up successfully :)'

            mattermostSend channel: '#staging',
                color: "good",
                          message: JOB_NAME+' passed successfully with deploy number: '+BUILD_NUMBER +'.:)'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            mattermostSend channel: '#staging',
                          color:'RED',
                          message: JOB_NAME+' failed'
        }
        changed {
            echo 'Things were different before...'
        }
    }
    }      
} 
}
