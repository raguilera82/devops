FROM frolvlad/alpine-oraclejdk8:slim

EXPOSE 8080

ENTRYPOINT ["/usr/bin/java", \
    "-Djava.security.egd=file:/dev/./urandom ", \
    "-Xmx512m", \
    "-jar", "app.jar" \
]

COPY target/*.jar ./app.jar