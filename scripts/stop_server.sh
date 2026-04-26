#!/bin/bash
echo "Stopping existing Spring Boot application..."

# Find and kill the Java process running the backend JAR
PID=$(pgrep -f 'task-management-backend-0.0.1-SNAPSHOT.jar')

if [ -z "$PID" ]; then
    echo "No running Spring Boot application found."
else
    echo "Killing process $PID"
    kill -9 $PID
fi
