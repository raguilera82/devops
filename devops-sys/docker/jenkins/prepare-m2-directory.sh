#!/bin/bash
# Create .m2 directory and make a symbolic link to settings.xml
# When you run the Docker container you can bind your settings.xml at the other side
# of the simbolic link, so you will not get permissions problems

mkdir -p /var/jenkins_home/.m2
touch /usr/share/jenkins/ref/settings.xml
ln -s /usr/share/jenkins/ref/settings.xml /var/jenkins_home/.m2/settings.xml
