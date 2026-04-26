#!/bin/bash

echo "Stopping existing Spring Boot application..."

PID=$(pgrep -f 'task-management-backend-0.0.1-SNAPSHOT.jar' || true)

if [ -z "$PID" ]; then
    echo "No running application found. Skipping stop."
else
    echo "Killing process $PID"
    kill -9 $PID || true
fi

echo "Stop script completed successfully"
exit 0