# Installation

## Option 1 (easiest): Docker

1. Install Docker

   On Mac and Windows, the easiest way is to install [Docker Desktop](https://www.docker.com/products/docker-desktop)

   Or you can install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) directly.

2. Create a copy of `.env.template` in the `docker` directory. Replace the `SECRET_KEY` value with your Django key, and rename the file `.env.`

3. Build the Docker image by running `docker-compose build` in the `docker` directory. You will need to run this whenever the dependencies for the frontend or api change.

4. Start the services by running `docker-compose up` in the `docker` directory.

   You can start a shell in the Django container with `docker-compose exec api bash`, and a shell in the database container with `docker-compose exec db bash`.

   To start `psql`, an interactive PostgresQL shell, open a database shell and run `psql -U [your username] -d jobhopper_dev`.

5. To Run tests, once the container is running, this command will work in a new command window to execute the tests against the running api container:
   `docker exec jobhopper_api_1 bash -c "python migrate.py test"`

## Option 2: Clone and run

1. Install [Python 3.7](https://www.python.org/downloads/release/python-378/).

2. Install [virtualenv](https://pypi.org/project/virtualenv/) from `pip`:

   ```sh
   python3.7 -m pip install virtualenv

   OR on Windows

   python -m pip install virtualenv
   ```

3. Clone this repo to local:
   ```sh
   git clone https://github.com/codeforboston/jobhopper.git
   ```
4. Create a virtual environment of Python 3.7 in the root of the local repo:

   ```sh
   cd jobhopper
   python3.7 -m virtualenv --python=3.7 venv

   OR on Windows

   cd jobhopper
   python -m virtualenv --python=3.7 venv
   ```

5. Activate venv:

   ```sh
   . ./venv/bin/activate

   OR on Windows

   ./venv/Scripts/activate
   ```

6. Install project dependencies from `requirements.txt`:
   ```sh
   pip install -r requirements.txt
   ```
7. Create a personal `.env` file to include environment variables for the app:
   (Note: Don't include `.env` in commit, thus it's in `.gitignore`):

   ```sh
   SECRET_KEY='[generated key]'
   ```

   You can get your own 50 character secret key from [here](https://miniwebtool.com/django-secret-key-generator/).

8. Create Postgres DB:

   a. Install [Postgres 12](https://www.postgresql.org/download/)

   b. Start postgresql service and check if clusters are running.

   ```sh
   sudo service postgresql start
   pg_lsclusters
   ```

   If the text is green, it's working.

   c. Run `psql` through the newly created `postgres` user.

   ```sh
   sudo -i -u postgres
   psql
   ```

   d. Create a new user/role for the site to access the database to. Name it
   however you like as long as you note the username and password for putting
   it in `.env`.

   ```sql
   CREATE ROLE [user]
   SUPERUSER
   LOGIN
   PASSWORD '[password]';
   ```

   e. Create a new database for the site to access. Name it however you like
   (preferably 'jobhopperdatabase') as long as you note the name of the
   database for putting it in `.env`.

   ```sql
   CREATE DATABASE [database name]
     WITH OWNER = [user];
   ```

   f. Exit out of `psql` and `postgres` user with the `exit` command for both
   cases.

   g. Add those information you written into the `.env` file.

   ```sh
   SECRET_KEY='[generated key]'

   DB_NAME='[database name]'
   DB_USER='[user/role name]'
   DB_PASSWORD='[password]'
   DB_HOST='127.0.0.1'  # Localhost IP
   ```

9. Migrate from `manage.py` in root.

   ```sh
   python manage.py migrate
   ```

10. Now run the server via this script:

    ```sh
    python manage.py runserver
    ```

11. Go to the URL `[baseurl]/jobs/api/leads/` and test out creating entries.
12. Go to the url `[baseurl]/api/v1/health` and ensure it returns json data.
13. Go to the url `[baseurl]/jobs` and ensure it returns data.
