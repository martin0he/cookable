FROM postgres:14

# Copy initialization scripts to the PostgreSQL entrypoint directory
COPY init.sql /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432
