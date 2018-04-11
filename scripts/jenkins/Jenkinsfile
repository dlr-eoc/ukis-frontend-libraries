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

}
