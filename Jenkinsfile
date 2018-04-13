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
                    echo $WORKSPACE
                    mkdir output
                    docker run -e USERNAME=jenkins-node -e UserID=1002 -v $WORKSPACE/output:/static ukis:mofro
                """
            }
        }
        stage('bundle build') {
            steps {
                sh 'tar cfz ukis-mofro-doc.tar.gz output/documentation'
                sh 'tar cfz ukis-mofro-dist.tar.gz output/dist'
            }
        }
    }
    post {
        always {
            echo 'One way or another, I have finished'
            archiveArtifacts artifacts: 'ukis-mofro-*.tar.gz', fingerprint: true
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
                subject: "UKIS Jenkins: Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}"
        }
    }

}
