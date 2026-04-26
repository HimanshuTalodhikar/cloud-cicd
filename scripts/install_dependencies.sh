#!/bin/bash
echo "Installing dependencies..."

# Update system
yum update -y

# Install Java 17 (Amazon Corretto)
yum install -y java-17-amazon-corretto-devel || yum install -y java-17-openjdk

# Install Apache (httpd) for frontend
yum install -y httpd

# Start and enable Apache service
systemctl start httpd
systemctl enable httpd

# Clear old frontend files
rm -rf /var/www/html/*

# Create backend directory
mkdir -p /opt/taskapp/backend

echo "Dependencies installed successfully."
