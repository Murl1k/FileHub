# FileHub

File sharing platform made with django rest framework and react


## Technology stack

**Backend:**
- python 3.11
- django 4
- django rest framework 3
- djoser
- django mptt

**Worker:**
- celery

**Caching:**
- redis

**Database:**
- postgres

**Object Storage:**
- minio

**Documentation:**
- swagger

**Devops:**
- docker
- docker-compose

**Frontend (not ready yet):**
- vite
- react
- redux


## Features

**API swagger docs (localhost:8000/swagger/)**

**Django admin (localhost:8000/admin/)**

**Users**
- CRUD
- count all (cached)
- avatars

**Authentication:**
- Bearer token authentication 

**Cloud storage**
- Folders
- - Multilevel tree structure
- - CRUD
- - Private Folders
- - Public Folders
- - Download as zip
- - Moving 
- - Copying
- - Properties
- - Size caching logic
- Files
- - CRUD 
- - Private Files
- - Public Files
- - Download
- - Moving
- - Copying
- - Properties


### Installation (for development)

1. Clone the repository
2. Install Docker.
3. Select the repository folder and build docker containers using `docker-compose build`
4. Do `docker-compose up`
5. Create minio bucket at localhost:9090. Get access and secret key for it.
6. Create .env file with structure as .env_example. 
7. Make django migrations: 
   - open another console and join container's console with `docker exec -it filehub-backend-1 sh`
   - do `python manage.py migrate` inside container's console

Optional: create superuser: do `python manage.py createsuperuser` inside docker's container and follow the commands.
