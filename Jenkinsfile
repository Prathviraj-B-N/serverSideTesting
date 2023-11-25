pipeline {
  agent any
  tools { nodejs 'node' }
  stages {
    stage('test') {
      steps {
        dir("server") {
          sh "pwd"
          sh 'npm i'
          sh 'pm2 --name server start npm -- start'
          sh 'npm test'
          sh 'pm2 delete 0'
          echo 'All test passed!'
        }
      }
    }
    stage('Docker build') {
      steps {
        sh 'docker build -f Dockerfile -t calcapp .'
        sh 'docker build -f server/Dockerfile -t server ./server'
      }
    }
    stage('push calcapp to dockerHub') {
      steps {
        sh 'docker tag calcapp prathvirajbn/calcapp'
        withDockerRegistry([ credentialsId: 'dockerHubCreds', url: '' ]) {
          sh 'docker push prathvirajbn/calcapp:latest'
        // docker run -p 4001:3000 calcapp
        }
      }
    }
    stage('push server to dockerHub') {
      steps {
        sh 'docker tag server prathvirajbn/server'
        withDockerRegistry([ credentialsId: 'dockerHubCreds', url: '' ]) {
          sh 'docker push prathvirajbn/server:latest'
        // docker run -p 4002:4002 server
        }
      }
    }
    stage('deploy') {
      steps {
        sh 'ansible-playbook playbook.yml -i ansibleInventory.ini'
      }
    } 
  }
}
