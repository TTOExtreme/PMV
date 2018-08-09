#! /bin/bash
yum install -y epel-release
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
yum install -y nodejs
cd /opt/WS/
npm install
