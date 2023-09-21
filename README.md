# FileHub

### Installation (for developers)

1. Clone the repository
2. Install Docker.
3. Select the repository folder and build docker containers using `docker-compose build`
4. Do `docker-compose up`
5. Create minio bucket at localhost:9090. Get access and secret key for it.
6. Create .env file with structure as .env_example. 
7. Make django migrations: 
   - open another console and join container's console with `docker exec -it filehub-backend-1 sh`
   - do `python manage.py migrate` inside container's console
8. Create superuser (if needed): do `python manage.py createsuperuser` inside docker's container and follow the commands.
