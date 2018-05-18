FROM openjdk:8-alpine  
ENV SONAR_SCANNER_VERSION 3.0.3.778-linux

RUN apk add --no-cache  curl unzip  && \
    curl -LO -o sonar-scanner-cli-${SONAR_SCANNER_VERSION}.zip https://sonarsource.bintray.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_SCANNER_VERSION}.zip && \  
    unzip sonar-scanner-cli-${SONAR_SCANNER_VERSION}.zip && \  
    cd /usr/bin && ln -s /sonar-scanner-${SONAR_SCANNER_VERSION}/bin/sonar-scanner sonar-scanner

COPY sonar-scanner-run.sh /usr/bin
COPY sonar-scanner /sonar-scanner-${SONAR_SCANNER_VERSION}/bin/sonar-scanner

RUN chmod +x /usr/bin/sonar-scanner-run.sh
RUN chmod +x /sonar-scanner-${SONAR_SCANNER_VERSION}/bin/sonar-scanner