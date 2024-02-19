#!/bin/bash

# Variables
POSTGRES_PASSWORD="admin"
echo "================================================================="
echo "Updating packages"
echo "================================================================="
sudo yum update -y || { echo "Package update failed. Exiting."; exit 1; }

echo "================================================================="
echo "Creating user group and user"
echo "================================================================="
sudo groupadd csye6225group
sudo useradd -s /bin/false -g csye6225group -d /opt/csye6225dir -m csye6225user

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

#Create a database and user here if needed

echo "================================================================="
echo "Installing application dependencies and setting it up"
echo "================================================================="
sudo mv /tmp/webapp.zip /opt/csye6225dir/webapp.zip
cd /opt/csye6225dir && sudo unzip webapp.zip
sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service

sudo chown -R csye6225user:csye6225group /opt/csye6225dir

echo "=======================ALL DONE==================================="