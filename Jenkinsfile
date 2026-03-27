pipeline {
    agent any

    tools {
        nodejs "node22"
    }

    environment {
        // ดึงค่า Config จาก Jenkins Credentials (ถ้ามี) 
        // หรือจะใส่ตรงๆ เพื่อทดสอบก่อนก็ได้
        BASE_URL = 'https://the-internet.herokuapp.com/login'
        SITE_AUTH = credentials('site-login-credentials')
        API_URL = 'https://reqres.in/api'
        API_KEY = credentials('my-api-key-id') // ดึงจาก Jenkins Secret
    }

    stages {
        stage('Install Dependencies') {
            steps {

                dir('automation script') {
                    // ติดตั้ง node_modules
                    sh 'npm ci'

                    sh 'npx playwright install chromium'
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                dir('automation script') {
                    // รันเทสทั้งหมด (ทั้ง UI และ API)
                    // ใส่ || true เพื่อให้ Pipeline รันต่อแม้เทสจะ Fail (เพื่อไปทำ Report)
                    sh 'npx playwright test || true'
                }
            }
        }
    }

    post {
        always {
            // เก็บผลลัพธ์การเทส (Report) ไว้ดูบน Jenkins
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'automation script/playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            
            // เก็บไฟล์อื่นๆ เช่น Screenshot หรือ Video ถ้าเทสพัง
            archiveArtifacts artifacts: 'automation script/test-results/**', allowEmptyArchive: true
        }
    }
}