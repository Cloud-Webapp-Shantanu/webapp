#!/bin/bash

# Variables
WEBAPP_ZIP="webapp-main.zip"
POSTGRES_PASSWORD="admin"

echo "================================================================="
echo "Updating packages"
echo "================================================================="
# Uncomment the following line if you want to update packages
# sudo yum update -y || { echo "Package update failed. Exiting."; exit 1; }

echo "================================================================="
echo "Install Node, npm, and unzip"
echo "================================================================="
sudo yum install nodejs npm unzip -y || { echo "Failed to install Node, npm, or unzip. Exiting."; exit 1; }
node -v

echo "================================================================="
echo "Installing and Setting up PostgreSQL"
echo "================================================================="
sudo dnf install postgresql postgresql-server postgresql-contrib -y || { echo "Failed to install PostgreSQL. Exiting."; exit 1; }
sudo postgresql-setup --initdb || { echo "PostgreSQL setup failed. Exiting."; exit 1; }
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Update PostgreSQL user password
sudo su - postgres -c "psql -c \"ALTER USER postgres WITH PASSWORD '$POSTGRES_PASSWORD';\"" || { echo "Failed to update PostgreSQL user password. Exiting."; exit 1; }

# Create a database and user here if needed

echo "================================================================="
echo "Installing application dependencies"
echo "================================================================="
unzip $WEBAPP_ZIP || { echo "Failed to unzip $WEBAPP_ZIP. Exiting."; exit 1; }
(cd webapp-main && npm install) || { echo "Failed to install application dependencies. Exiting."; exit 1; }

echo "=======================ALL DONE==================================="