FROM mysql:latest

COPY data/seed.sql /docker-entrypoint-initdb.d/
