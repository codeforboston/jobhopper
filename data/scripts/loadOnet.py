import sqlite3
from os import listdir
from os.path import isfile, join
onlyfiles = [f for f in listdir('data/onet') if isfile(join('data/onet', f))]
print(onlyfiles)
connection = sqlite3.connect("data/jobhopper.sqlite")
# Create the database in RAM

cursor = connection.cursor()
sql_file = open(join('data/onet', onlyfiles[0]), 'r')
sql_as_string = sql_file.read()
cursor.executescript(sql_as_string)