pipeline {

    agent {
        label 'garibaldi.eoc.dlr.de'
    }

    stages {
   
        stage('Build'){
       
            steps {
                sh """
                    docker build -t ukis:mofro-libraries .
                """
            }
        }
        stage('Copy out dist') {
            steps {
                sh """
                    echo $WORKSPACE
                    mkdir output
                    docker run -e USERNAME=jenkins-node -e UserID=1002 -v $WORKSPACE/output:/static ukis:mofro-libraries
                """
            }
        }
        stage('bundle build') {
            steps {
                sh """
                   
                    tar cfz ukis-mofro-libraries-dist.tar.gz output/dist
                """
            }
        }
    }
    post {
        always {
            echo 'Post step always: gathering artifacts and delete workspace'
            archiveArtifacts artifacts: 'ukis-mofro-libraries*.tar.gz', fingerprint: true
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
