#!/bin/bash
echo "Starting Spring Boot application..."

# Give execute permission to the jar file
chmod +x /opt/taskapp/backend/task-management-backend-0.0.1-SNAPSHOT.jar

# Run the backend in the background using nohup
cd /opt/taskapp/backend
nohup java -jar task-management-backend-0.0.1-SNAPSHOT.jar > /opt/taskapp/backend/server.log 2>&1 &

echo "Restarting Apache web server for frontend..."
# Restart Apache to ensure new files are served
systemctl restart httpd

echo "Application started successfully."
