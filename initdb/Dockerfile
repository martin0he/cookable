FROM postgres:14

# env variables
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=db

# copy initialization scripts to the Docker entrypoint directory
COPY init.sql /docker-entrypoint-initdb.d/

CMD ["postgres", "-p", "5365"]

EXPOSE 5365
