FROM jenkins/jenkins:lts-alpine

# When you run some command inside this container,
# you can check this environment variable to know if you are inside a container
ENV container=docker


#
# Install Docker Client CLI (do not run daemon) 
#
ADD https://download.docker.com/linux/static/stable/x86_64/docker-17.06.2-ce.tgz /opt/
USER root
RUN cd /opt && \
    tar -xf docker-17.06.2-ce.tgz && \
    ln -s /opt/docker/docker /usr/local/bin/docker && \
    rm docker-17.06.2-ce.tgz
USER jenkins


#
# Configure Jenkins initial settings
#

# Do not use setup wizard
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

# Crate admin user 
COPY initial-setup.groovy /usr/share/jenkins/ref/init.groovy.d/initial-setup.groovy

# Install default plugins 
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt
