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
        stage('bundle build') {
            steps {
                sh 'tar cfz ukis_mofro.tar.gz dist'
            }
        }
    }
    post {
        always {
            echo 'One way or another, I have finished'
            archiveArtifacts artifacts: 'ukis_mofro.tar.gz', fingerprint: true
            deleteDir() /* clean up our workspace */
        }
        success {
            echo 'Succeeded!'
        }
        unstable {
            echo 'I am unstable :/'
        }   
        failure {
            // notify users when the Pipeline fails
            mail to: 'verena.jaspersen@dlr.de',
                subject: "UKIS ukis_mofro. Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}"
        }
    }

}
