# Database Setup
Follow the project readme to install Postgres

Activate the venv environment to be sure you have python3 

Install the following additional packages:
pip install pandas
pip install sqlalchemy
pip install lxml
pip install requests
pip install xlrd


## Run the Load Processes

1. If you're not sure, set PYTHONPATH=.
2. Ensure you are in the jobhopper project root directory (there should be a data\scripts\sql_loader.py underneath)
3. Run python data\load_jobhopper_data.py

If you run into trouble, you might choose to download a year of data manually with this url: https://www.bls.gov//oes/special.requests/oesm19all.zip

The code assumes you will have a user defined as jobuser with password jobuser for your database. If not you may need to edit underlying files. 

Then edit the sql_loader_jed.py file in the data\scripts directory. The calls at the bottom can be edited to run one or both with the paths that work on your system. 

Once done, you should be able to run both of these queries in the psql command tool and get data back: 

jobhopperdatabase=# select * from bls_oes limit 5 \g
jobhopperdatabase=# select * from occupation_transition limit 5 \g

# Data Description

## Transitions Data (Burning Glass)

****************************************************************************************************************
Data Description for Occupation Transitions Public Dataset
from Schubert, Stansbury and Taska (2019) "Mitigating Monopsony: Occupational Mobility and Outside Options"
November 6th 2019
****************************************************************************************************************

WHEN USING THIS DATA, PLEASE CITE the paper for which it was originally constructed:
Gregor Schubert, Anna Stansbury, and Bledi Taska (2019) "Mitigating Monopsony: Occupational Mobility and Outside Options"

***************************

VARIABLE DESCRIPTIONS:
soc1: Origin occupation (SOC 6-digit, 2010 SOC codes)

soc2: Destination occupation (SOC 6-digit, 2010 SOC codes)

total_soc: Number of person-year observations in the origin occupation soc1 in the BGT data set

pi: Transition share from origin occupation soc1 to destination occupation soc2, conditional on leaving job. 
This is defined as the number of workers observed in soc1 in year T who are observed in soc2 in year T+1,
divided by the number of workers observed in soc1 in year T who are observed in a new job in year T+1.
(This is defined in more detail in our paper, section 2).

occleaveshare: Share of workers from origin occupation soc1 who do not stay in soc1, conditional on leaving job.
This is defined as the number of workers observed in soc1 in year T who are not observed at all in soc1 in year T+1 
(but remain in the data set), divided by the number of workers observed in soc1 in year T who are observed
in a new job in year T+1. (This is defined in more detail in our paper, section 2).

These variables are constructed from pairs of year-to-year observations for start years 2002-2015
(i.e. for 2002-2003, 2003-2004, ..., 2015-2016).


DATA ORIGINS:
This data is constructed from a new proprietary data set of 16 million unique resumes spanning more than 
80 million jobs over 2002–2018, provided by labor market analytics company Burning Glass
Technologies. Resumes were sourced from a variety of BGT partners, including recruitment and staffing 
agencies, workforce agencies, and job boards.Since we have all data that people have listed on their 
resumes, we are able to observe individual workers’ job histories and education up until the point where 
they submit their resume, effectively making it a longitudinal data set.


FOR MORE DETAILS on the data please see our paper at 
https://scholar.harvard.edu/files/stansbury/files/schubert-stansbury-taska-20191106.pdf
or go to the authors’ websites for the latest version.


