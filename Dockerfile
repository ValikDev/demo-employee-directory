FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=
ENV MYSQL_DATABASE=

COPY seed.sql /docker-entrypoint-initdb.d/