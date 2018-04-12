pipeline {

  agent {
    label 'garibaldi.eoc.dlr.de'
  }

  stages {
   
    stage('Build'){
       
        steps {
           sh """
               docker build -t ukis:mofro .
           """
        }
     }
    stage('Copy out dist') {
        steps {
            sh """
               
                mkdir dist
                docker run -v dist:/static ukis:mofro
            """
        }
    }
  }
   post {
    failure {
      // notify users when the Pipeline fails
      mail to: 'verena.jaspersen@dlr.de',
          subject: "UKIS ukis_mofro. Failed Pipeline: ${currentBuild.fullDisplayName}",
          body: "Something is wrong with ${env.BUILD_URL}"
    }
 }

}
