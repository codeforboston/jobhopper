# Database Setup
The database setup has been integrated the Django migrations. Set them up according to instructions in the [Setup Docs](https://github.com/codeforboston/jobhopper/blob/develop/References/Overview.md)

## Load Processes

General load processes for the BLS dataset and occupation transitions dataset are defined in `/scripts/sql_loader` in the `data` directory. These processes are used in the Django data model migrations (see `/jobhopper/jobs/migrations/`). 

# Data Descriptions

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


## BLS Occupational Employment Statistics Dataset

This dataset provides wage and employment information for 800+ occupations in the United States, each identified by a SOC code. Statewide and national data are available.

See https://www.bls.gov/oes/oes_ques.htm#overview for more information.