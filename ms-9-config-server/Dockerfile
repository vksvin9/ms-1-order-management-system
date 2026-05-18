FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY ms-9-config-server/target/*.jar app.jar
COPY config-repo /config-repo

EXPOSE 8888

ENTRYPOINT ["java", "-jar", "app.jar"]