#!/bin/bash

# Variables
# POSTGRES_PASSWORD="admin"
echo "================================================================="
echo "Updating packages"
echo "================================================================="
sudo yum update -y || { echo "Package update failed. Exiting."; exit 1; }

echo "================================================================="
echo "Install Node, npm, and unzip"
echo "================================================================="
curl --silent --location https://rpm.nodesource.com/setup_21.x | sudo bash - || { echo "Failed to curl Nodejs 21. Exiting."; exit 1; }
sudo yum install nodejs -y || { echo "Failed to install Nodejs. Exiting."; exit 1; }
node -v
sudo yum install unzip -y || { echo "Failed to install unzip. Exiting."; exit 1; }

# echo "================================================================="
# echo "Installing and Setting up PostgreSQL"
# echo "================================================================="
# sudo dnf install postgresql postgresql-server postgresql-contrib -y || { echo "Failed to install PostgreSQL. Exiting."; exit 1; }
# sudo postgresql-setup --initdb || { echo "PostgreSQL setup failed. Exiting."; exit 1; }
# sudo systemctl start postgresql
# sudo systemctl enable postgresql

# echo "========Update PostgreSQL user password and configuration========"
# sudo su - postgres -c "psql -c \"ALTER USER postgres WITH PASSWORD '$POSTGRES_PASSWORD';\"" || { echo "Failed to update PostgreSQL user password. Exiting."; exit 1; }
# sudo sed -i 's/ident/md5/g' /var/lib/pgsql/data/pg_hba.conf || { echo "Failed to update PostgreSQL configuration. Exiting."; exit 1; }
# sudo systemctl restart postgresql

echo "===================================================================="
echo "Installing application dependencies in csye6225dir and setting it up"
echo "===================================================================="
sudo mkdir -p /opt/csye6225dir/webapp || { echo "Failed to create /opt/csye6225dir. Exiting."; exit 1; }
sudo mv /tmp/webapp.zip /opt/csye6225dir/webapp/webapp.zip || { echo "Failed to move zip to /opt/csye6225dir/. Exiting."; exit 1; }
cd /opt/csye6225dir/webapp || { echo "Failed to cd into /opt/csye6225dir . Exiting."; exit 1; }
sudo unzip webapp.zip || { echo "Failed to unzip webapp.zip . Exiting."; exit 1; }
sudo npm install || { echo "Failed to install npm . Exiting."; exit 1; }
sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service || { echo "Failed to move webapp.service . Exiting."; exit 1; }

echo "================================================================="
echo "Creating user and changing directory ownership"
echo "================================================================="
sudo adduser csye6225 --shell /usr/sbin/nologin || { echo "Failed to add csye6225 user. Exiting."; exit 1; }
sudo chown -R csye6225:csye6225 /opt/csye6225dir || { echo "Failed to change directory permissions. Exiting."; exit 1; }
sudo chmod -R 755 /opt/csye6225dir || { echo "Failed to change directory permissions. Exiting."; exit 1; }

echo "================================================================="
echo "Installing and setting up GCP OPS Agent"
echo "================================================================="
sudo curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh || { echo "Failed to curl add-google-cloud-ops-agent-repo.sh. Exiting."; exit 1; }
sudo bash add-google-cloud-ops-agent-repo.sh --also-install || { echo "Failed to install GCP OPS Agent. Exiting."; exit 1; }
sudo cp /tmp/config.yaml /etc/google-cloud-ops-agent/config.yaml || { echo "Failed to copy config.yaml. Exiting."; exit 1; }
sudo systemctl restart google-cloud-ops-agent || { echo "Failed to restart GCP OPS Agent. Exiting."; exit 1; }

echo "================================================================="
echo "Crerating log directory and changing ownership"
echo "================================================================="
sudo mkdir -p /var/log/webapp || { echo "Failed to create /var/log/webapp. Exiting."; exit 1; }
sudo chown -R csye6225:csye6225 /var/log/webapp || { echo "Failed to change directory permissions. Exiting."; exit 1; }

echo "=======================ALL DONE==================================="