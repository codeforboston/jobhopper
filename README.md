# JobHopper - README (v1)

## General Information

Jobhopper is an application for analyzing and querying career mobility and outside options data set to help workers, public sector professionals, and policymakers to improve career training, career paths, and career mobility options. GERONIMO!

## Scope & Problem Statement

Many workers have limited outside options for career and wage progression outside their current occupations. The quality of outside options matter for workers’ wages but limited data exists to provide guidance and training to workers on occupational mobility and outside-options (Monopsony and Outside Options. Schubert, Stansbury,and Taska. Harvard University, March 2020). The problem that we are tryingto solve is to provide better insight than standard data sets for improving occupational mobility options, improving worker wages, and improving policies related to investments and training.

## How to Install

1. Install [Python 3.7](https://www.python.org/downloads/release/python-378/).

2. Install [virtualenv](https://pypi.org/project/virtualenv/) from `pip`:
   ```sh
   python3.7 -m pip install virtualenv
   ```
3. Clone this repo to local:
   ```sh
   git clone https://github.com/codeforboston/jobhopper.git
   ```
4. Create a virtual environment of Python 3.7 in the root of the local repo:
   ```sh
   cd jobhopper
   python3.7 -m virtualenv --python=3.7 venv
   ```
5. Activate venv:
   ```sh
   . ./venv/bin/activate
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

### Questions That JobHopper Will Be Trying To Answer

- [ ] How might we enable citizens to have better information about the career paths that they could move into from their current job?
- [ ] How can citizens weigh and negotiate options for a new career path?
- [ ] How might we equip policymakers with labor market data?
- [ ] How might we identify where the labor market is headed and what skills and abilities are needed in the new jobs?
- [ ] How might we equip workforce development systems with job transfer data to understand regional trends in employee movements?

1. occupational trends in their national, regional, or local labor market
2. what skills and abilities their area has, and what it might need in the future
3. how their local labor market might respond to positive or negative shocks

## Directory

## Personas

TBD

## Technologies Used

| Front End          | Logic & Data Processing: | Database: |
| ------------------ | ------------------------ | --------- |
| React (JavaScript) | Django (Python 3.7)      | Postgres  |

## Features

TBD

## Data Sources & Relevant Links

### Data

1. Data Used for March 2020 Paper "Monopsony and Outside Options"

- [Occupational Mobility Data Set](https://scholar.harvard.edu/files/stansbury/files/occ_transitions_public_data_set.zip)

#### O\*NET - Task/Skill/Education Requirements by Occupation

- [Homepage](https://www.onetonline.org/)
- [API & Services](https://services.onetcenter.org/)
- ["My Next Move" Career Survey](https://www.mynextmove.org/explore/ip)

#### Mass.gov

1. Massachusetts Publicly Available Occupational Data

- [Mass.gov - Labor Market Information](https://www.mass.gov/orgs/labor-market-information)

#### Bureau of Labor Statistics

- [BLS - Occupational Employment Statistics](https://www.bls.gov/oes/home.htm)
- [BLS - Current Population Survey](https://www.bls.gov/cps/)
- [BLS - Databases, Tables, & Calculators by Subject](https://www.bls.gov/data/)

### Papers

1. 2020-03 - Monopsony and Outside Options _Gregor Schubert, Anna Stansbury, and Bledi Taska_

- Sections of Note:

  - p.13 to p.19, from "Using occupational transitions to identify outside-occupation options" to "4 Empirical Approach"
  - p.41 to p.47 Appendix Chapter A Burning Glass Technologies Resume Data
  - p. 62 to p. 69 Appendix Figures A1-A10
  - p. 75 to p.76 Appendix Tables A1 and A2

- [Linked Here](chrome-extension://cbnaodkpfinfiipjblikofhlhlcickei/src/pdfviewer/web/viewer.html?file=https://scholar.harvard.edu/files/stansbury/files/schubertstansburytaskamain_0.pdf)

### Other/Miscellaneous

1. Dice - A good visualization example of what our clients may want for job/career profiles

- [Dice](https://www.dice.com/)

## Other Information

Are you looking to join the project? If so please familiarize yourself with the available documents and links in the "Data Sources & Relevant Links" section above.

Once you've reviewed those links, please complete a new row in the following Google sheet so we may better understand your background and present interests in the project:

- [JobHopper Skills List](https://docs.google.com/spreadsheets/d/19bJoO-wbfbxbsEV0EHclG4H0Y-SjwxpPGKncMnXihh4/edit#gid=0)
